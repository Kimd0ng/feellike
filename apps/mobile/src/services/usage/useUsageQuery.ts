import { useQuery } from '@tanstack/react-query';
import {
    getTodayUsage,
    getUsageCheckResult,
    getSubscriptionStatus,
} from './usageApi';

/**
 * 사용량 쿼리 키 팩토리
 * @author Feel Economy Team
 */
export const usageKeys = {
    all: ['usage'] as const,
    today: () => [...usageKeys.all, 'today'] as const,
    check: () => [...usageKeys.all, 'check'] as const,
    subscription: () => [...usageKeys.all, 'subscription'] as const,
};

/**
 * 오늘 사용량 조회 훅
 * @author Feel Economy Team
 */
export const useTodayUsageQuery = () => {
    return useQuery({
        queryKey: usageKeys.today(),
        queryFn: getTodayUsage,
        staleTime: 1000 * 60, // 1분
    });
};

/**
 * 사용량 체크 결과 조회 훅
 * @author Feel Economy Team
 */
export const useUsageCheckQuery = () => {
    return useQuery({
        queryKey: usageKeys.check(),
        queryFn: getUsageCheckResult,
        staleTime: 1000 * 30, // 30초
    });
};

/**
 * 구독 상태 조회 훅
 * @author Feel Economy Team
 */
export const useSubscriptionStatusQuery = () => {
    return useQuery({
        queryKey: usageKeys.subscription(),
        queryFn: getSubscriptionStatus,
        staleTime: 1000 * 60 * 5, // 5분
    });
};
