import { createContext, useContext, useEffect, useCallback, type PropsWithChildren } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getSupabaseClient } from '@feellike/api';
import type { TUser } from '@feellike/api';
import { useGetCurrentUserQuery, authKeys } from '@/services/auth/useAuthQuery';
import { subscriptionKeys } from '@/services/subscription/useSubscriptionQuery';
import { usageKeys } from '@/services/usage/useUsageQuery';
import { moodAtom, recommendationAtom } from '@/store/atoms';

/**
 * 인증 컨텍스트 타입
 * @author Feel Economy Team
 */
type TAuthContext = {
    user: TUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    refetchUser: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

/**
 * 인증 상태를 제공하는 Provider
 * @author Feel Economy Team
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();
    const { data: user, isLoading, refetch } = useGetCurrentUserQuery();

    // Jotai atom 초기화를 위한 setter
    const setMood = useSetAtom(moodAtom);
    const setRecommendation = useSetAtom(recommendationAtom);
    // 날씨와 위치는 사용자와 무관하므로 초기화하지 않음

    /**
     * 모든 사용자 관련 상태 초기화
     * @author Feel Economy Team
     */
    const clearUserState = useCallback(() => {
        // React Query 캐시 제거
        queryClient.setQueryData(authKeys.user(), null);
        queryClient.removeQueries({ queryKey: subscriptionKeys.all });
        queryClient.removeQueries({ queryKey: usageKeys.all });
        queryClient.removeQueries({ queryKey: ['history'] });
        queryClient.removeQueries({ queryKey: ['emotionStats'] });

        // Jotai atom 초기화
        setMood('');
        setRecommendation(null);
    }, [queryClient, setMood, setRecommendation]);

    const refetchUser = useCallback(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        const supabase = getSupabaseClient();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            // 세션 변경 시 유저 쿼리 무효화
            if (session) {
                // 새 사용자 로그인 시 이전 캐시 제거 후 새로운 데이터 로드
                if (event === 'SIGNED_IN') {
                    clearUserState();
                }
                queryClient.invalidateQueries({ queryKey: authKeys.user() });
            } else {
                // 로그아웃 시 모든 사용자 관련 상태 초기화
                clearUserState();
            }
        });

        return () => subscription.unsubscribe();
    }, [queryClient, clearUserState]);

    return (
        <AuthContext.Provider
            value={{
                user: user ?? null,
                isLoading,
                isAuthenticated: !!user,
                refetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/**
 * 인증 상태를 사용하는 훅
 * @author Feel Economy Team
 */
export const useAuth = (): TAuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
