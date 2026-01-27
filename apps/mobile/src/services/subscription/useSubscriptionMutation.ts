import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createSubscription,
    cancelSubscription,
    addPaymentHistory,
} from './subscriptionApi';
import { subscriptionKeys } from './useSubscriptionQuery';
import { usageKeys } from '../usage/useUsageQuery';
import type { TCreateSubscriptionRequest, TPaymentHistory } from './types';

/**
 * 구독 생성 뮤테이션 훅
 * @author Feel Economy Team
 */
export const useCreateSubscriptionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request: TCreateSubscriptionRequest) => {
            return await createSubscription(request);
        },
        onSuccess: () => {
            // 구독 관련 캐시 무효화
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
            queryClient.invalidateQueries({ queryKey: usageKeys.all });
        },
    });
};

/**
 * 구독 취소 뮤테이션 훅
 * @author Feel Economy Team
 */
export const useCancelSubscriptionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await cancelSubscription();
        },
        onSuccess: () => {
            // 구독 관련 캐시 무효화
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
            queryClient.invalidateQueries({ queryKey: usageKeys.all });
        },
    });
};

/**
 * 결제 내역 추가 뮤테이션 훅
 * @author Feel Economy Team
 */
export const useAddPaymentHistoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payment: Omit<TPaymentHistory, 'id' | 'user_id' | 'created_at'>) => {
            return await addPaymentHistory(payment);
        },
        onSuccess: () => {
            // 결제 내역 캐시 무효화
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
        },
    });
};
