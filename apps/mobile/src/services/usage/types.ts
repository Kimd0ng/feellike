/**
 * 일일 사용량 타입
 * @author Feel Economy Team
 */
export type TDailyUsage = {
    id: string;
    user_id: string;
    usage_date: string;
    usage_count: number;
    created_at: string;
    updated_at: string;
};

/**
 * 구독 상태 타입
 * @author Feel Economy Team
 */
export type TSubscriptionStatus = {
    plan_type: 'free' | 'premium';
    status: 'active' | 'cancelled' | 'expired' | 'pending';
    expires_at: string | null;
    today_usage: number;
    daily_limit: number;
    is_premium: boolean;
};

/**
 * 사용량 체크 결과 타입
 * @author Feel Economy Team
 */
export type TUsageCheckResult = {
    canUse: boolean;
    currentUsage: number;
    dailyLimit: number;
    isPremium: boolean;
    remainingUsage: number;
};
