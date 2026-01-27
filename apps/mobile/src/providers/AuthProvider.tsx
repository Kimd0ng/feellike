import React, {
    createContext,
    useContext,
    useEffect,
    useCallback,
    type PropsWithChildren,
} from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { getSupabaseClient } from '@feellike/api';
import type { TUser } from '@feellike/api';
import { useGetCurrentUserQuery, authKeys } from '../services/auth';
import { subscriptionKeys } from '../services/subscription';
import { usageKeys } from '../services/usage';
import { moodAtom, recommendationAtom } from '../store/atoms';
import Config from '../config';

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
    const navigation = useNavigation();

    const { data: user, isLoading, refetch } = useGetCurrentUserQuery();

    // Jotai atom 초기화를 위한 setter
    const setMood = useSetAtom(moodAtom);
    const setRecommendation = useSetAtom(recommendationAtom);

    /**
     * 모든 사용자 관련 상태 초기화
     */
    const clearUserState = useCallback(() => {
        queryClient.setQueryData(authKeys.user(), null);
        queryClient.removeQueries({ queryKey: subscriptionKeys.all });
        queryClient.removeQueries({ queryKey: usageKeys.all });
        queryClient.removeQueries({ queryKey: ['history'] });
        queryClient.removeQueries({ queryKey: ['emotionStats'] });

        setMood('');
        setRecommendation(null);
    }, [queryClient, setMood, setRecommendation]);

    const refetchUser = useCallback(() => {
        refetch();
    }, [refetch]);

    // 인증 상태 변경 감지
    useEffect(() => {
        const supabase = getSupabaseClient();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (session) {
                    if (event === 'SIGNED_IN') {
                        clearUserState();
                    }
                    queryClient.invalidateQueries({ queryKey: authKeys.user() });
                } else {
                    clearUserState();
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [clearUserState, queryClient]);

    // 딥링크 처리
    useEffect(() => {
        const handleDeepLink = async (url: string) => {
            // OAuth 콜백 처리
            if (url.includes('auth/callback')) {
                const hashParams = new URLSearchParams(url.split('#')[1] || '');
                const accessToken = hashParams.get('access_token');
                const refreshToken = hashParams.get('refresh_token');

                if (accessToken && refreshToken) {
                    const supabase = getSupabaseClient();
                    await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    });

                    refetch();
                    navigation.navigate('Home' as never);
                }

                await InAppBrowser.close();
            }

            // 결제 성공 콜백 처리
            if (url.includes('payment/success')) {
                await InAppBrowser.close();

                const urlObj = new URL(url.replace(`${Config.APP_SCHEME}:/`, 'https://app'));
                const authKey = urlObj.searchParams.get('authKey');
                const customerKey = urlObj.searchParams.get('customerKey');

                navigation.navigate('PaymentSuccess' as never, { authKey, customerKey } as never);
            }

            // 결제 실패 콜백 처리
            if (url.includes('payment/fail')) {
                await InAppBrowser.close();
                navigation.navigate('PaymentFail' as never);
            }
        };

        // 앱이 열릴 때 딥링크 처리
        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink(url);
        });

        // 앱이 실행 중일 때 딥링크 처리
        const subscription = Linking.addEventListener('url', ({ url }) => {
            handleDeepLink(url);
        });

        return () => subscription.remove();
    }, [navigation, refetch]);

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
