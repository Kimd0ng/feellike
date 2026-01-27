import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
    getSubscription,
    getPaymentHistory,
    isPremiumSubscriber,
    PREMIUM_PLAN,
} from './subscriptionApi';

/**
 * 구독 쿼리 키 팩토리
 * @author Feel Economy Team
 */
export const subscriptionKeys = {
    all: ['subscription'] as const,
    detail: () => [...subscriptionKeys.all, 'detail'] as const,
    isPremium: () => [...subscriptionKeys.all, 'isPremium'] as const,
    plan: () => [...subscriptionKeys.all, 'plan'] as const,
    payments: (page: number, limit: number) => [...subscriptionKeys.all, 'payments', page, limit] as const,
};

/**
 * 구독 정보 조회 훅
 * @author Feel Economy Team
 */
export const useSubscriptionQuery = () => {
    return useQuery({
        queryKey: subscriptionKeys.detail(),
        queryFn: getSubscription,
        staleTime: 1000 * 60 * 5, // 5분
    });
};

/**
 * 프리미엄 구독 여부 조회 훅
 * @author Feel Economy Team
 */
export const useIsPremiumQuery = () => {
    return useQuery({
        queryKey: subscriptionKeys.isPremium(),
        queryFn: isPremiumSubscriber,
        staleTime: 1000 * 60 * 5, // 5분
    });
};

/**
 * 구독 플랜 정보 조회 훅
 * @author Feel Economy Team
 */
export const useSubscriptionPlanQuery = () => {
    return useQuery({
        queryKey: subscriptionKeys.plan(),
        queryFn: async () => PREMIUM_PLAN,
        staleTime: Infinity, // 정적 데이터
    });
};

/**
 * 결제 내역 조회 훅
 * @author Feel Economy Team
 */
export const usePaymentHistoryQuery = (page: number, limit: number) => {
    return useQuery({
        queryKey: subscriptionKeys.payments(page, limit),
        queryFn: () => getPaymentHistory(page, limit),
        placeholderData: keepPreviousData,
    });
};
