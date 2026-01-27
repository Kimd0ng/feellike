import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    signInWithEmail,
    signUpWithEmail,
    signOut,
    signInWithGoogle,
    signInWithKakao,
} from '@feellike/api';
import { authKeys } from './useAuthQuery';
import { subscriptionKeys } from '../subscription/useSubscriptionQuery';
import { usageKeys } from '../usage/useUsageQuery';

/**
 * 이메일 로그인 뮤테이션
 * @author Feel Economy Team
 */
export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            signInWithEmail(email, password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.user() });
        },
    });
};

/**
 * 이메일 회원가입 뮤테이션
 * @author Feel Economy Team
 */
export const useSignUpMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            email,
            password,
            name,
        }: {
            email: string;
            password: string;
            name?: string;
        }) => signUpWithEmail(email, password, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.user() });
        },
    });
};

/**
 * Google 로그인 뮤테이션
 * @author Feel Economy Team
 */
export const useGoogleLoginMutation = () => {
    return useMutation({
        mutationFn: signInWithGoogle,
    });
};

/**
 * Kakao 로그인 뮤테이션
 * @author Feel Economy Team
 */
export const useKakaoLoginMutation = () => {
    return useMutation({
        mutationFn: signInWithKakao,
    });
};

/**
 * 로그아웃 뮤테이션
 * 모든 사용자 관련 캐시를 초기화합니다.
 * @author Feel Economy Team
 */
export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            // 인증 캐시 초기화
            queryClient.setQueryData(authKeys.user(), null);

            // 구독 관련 캐시 제거
            queryClient.removeQueries({ queryKey: subscriptionKeys.all });

            // 사용량 관련 캐시 제거
            queryClient.removeQueries({ queryKey: usageKeys.all });

            // 기타 사용자 관련 캐시 제거 (히스토리 등)
            queryClient.removeQueries({ queryKey: ['history'] });
            queryClient.removeQueries({ queryKey: ['emotionStats'] });

            // 모든 쿼리 무효화 (새로운 사용자 데이터를 위해)
            queryClient.invalidateQueries();
        },
    });
};
