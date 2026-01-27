import { supabase } from '@feellike/api';
import type { TDailyUsage, TSubscriptionStatus, TUsageCheckResult } from './types';

const FREE_DAILY_LIMIT = 3;

/**
 * 오늘의 사용량 조회
 * @author Feel Economy Team
 */
export const getTodayUsage = async (): Promise<TDailyUsage | null> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data, error } = await supabase.rpc('get_or_create_daily_usage', {
        target_user_id: user.id,
    });

    if (error) {
        console.error('Error fetching today usage:', error);
        return null;
    }

    return data as TDailyUsage;
};

/**
 * 사용량 증가 (추천 요청 후 호출)
 * @author Feel Economy Team
 */
export const incrementUsage = async (): Promise<number> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase.rpc('increment_daily_usage', {
        target_user_id: user.id,
    });

    if (error) {
        console.error('Error incrementing usage:', error);
        throw error;
    }

    return data as number;
};

/**
 * 사용 가능 여부 체크 (DB 함수 사용)
 * @author Feel Economy Team
 */
export const checkUsageAvailability = async (): Promise<boolean> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return false;
    }

    const { data, error } = await supabase.rpc('check_usage_availability', {
        target_user_id: user.id,
    });

    if (error) {
        console.error('Error checking usage availability:', error);
        return false;
    }

    return data as boolean;
};

/**
 * 사용량 체크 결과 조회 (상세 정보 포함)
 * @author Feel Economy Team
 */
export const getUsageCheckResult = async (): Promise<TUsageCheckResult> => {
    const defaultFreeResult: TUsageCheckResult = {
        canUse: true,
        currentUsage: 0,
        dailyLimit: FREE_DAILY_LIMIT,
        isPremium: false,
        remainingUsage: FREE_DAILY_LIMIT,
    };

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return {
                ...defaultFreeResult,
                canUse: false,
                remainingUsage: 0,
            };
        }

        const { data, error } = await supabase.rpc('get_subscription_status', {
            target_user_id: user.id,
        });

        if (error) {
            // RPC 함수가 존재하지 않는 경우 (스키마 미적용)
            if (error.code === '42883' || error.message?.includes('does not exist')) {
                console.warn('Subscription functions do not exist. Please run subscription_schema.sql in Supabase.');
                return defaultFreeResult;
            }
            console.error('Error fetching subscription status:', error);
            return defaultFreeResult;
        }

        if (!data || data.length === 0) {
            return defaultFreeResult;
        }

        const status = data[0] as TSubscriptionStatus;
        const isPremium = status.is_premium;
        const currentUsage = status.today_usage;
        const dailyLimit = status.daily_limit;
        const remainingUsage = isPremium ? Infinity : Math.max(0, dailyLimit - currentUsage);
        const canUse = isPremium || currentUsage < dailyLimit;

        return {
            canUse,
            currentUsage,
            dailyLimit,
            isPremium,
            remainingUsage,
        };
    } catch (err) {
        console.error('Unexpected error in getUsageCheckResult:', err);
        return defaultFreeResult;
    }
};

/**
 * 구독 상태 조회
 * @author Feel Economy Team
 */
export const getSubscriptionStatus = async (): Promise<TSubscriptionStatus | null> => {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return null;
        }

        const { data, error } = await supabase.rpc('get_subscription_status', {
            target_user_id: user.id,
        });

        if (error) {
            // RPC 함수가 존재하지 않는 경우 (스키마 미적용)
            if (error.code === '42883' || error.message?.includes('does not exist')) {
                console.warn(
                    'get_subscription_status function does not exist. Please run subscription_schema.sql in Supabase.'
                );
                return null;
            }
            console.error('Error fetching subscription status:', error);
            return null;
        }

        if (!data || data.length === 0) {
            return null;
        }

        return data[0] as TSubscriptionStatus;
    } catch (err) {
        console.error('Unexpected error in getSubscriptionStatus:', err);
        return null;
    }
};

export * from './types';
export * from './useUsageQuery';
