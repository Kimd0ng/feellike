import { supabase } from '@feellike/api';
import type { TSubscription, TPaymentHistory, TSubscriptionPlan, TCreateSubscriptionRequest } from './types';

/**
 * 프리미엄 구독 플랜 정보
 * @author Feel Economy Team
 */
export const PREMIUM_PLAN: TSubscriptionPlan = {
    id: 'premium_monthly',
    name: '프리미엄',
    price: 4900,
    currency: 'KRW',
    period: 'monthly',
    features: ['무제한 AI 추천', '광고 없는 경험', '우선 고객 지원'],
};

/**
 * 현재 사용자의 구독 정보 조회
 * @author Feel Economy Team
 */
export const getSubscription = async (): Promise<TSubscription | null> => {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return null;
        }

        const { data, error } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).maybeSingle();

        if (error) {
            // 테이블이 존재하지 않는 경우 (406 Not Acceptable)
            if (error.code === '42P01' || error.message?.includes('does not exist')) {
                console.warn('Subscriptions table does not exist. Please run subscription_schema.sql in Supabase.');
                return null;
            }
            console.error('Error fetching subscription:', error);
            return null;
        }

        // maybeSingle()은 결과가 없으면 null을 반환
        if (!data) {
            return null;
        }

        return data as TSubscription;
    } catch (err) {
        console.error('Unexpected error fetching subscription:', err);
        return null;
    }
};

/**
 * 구독 생성 (빌링키 저장 후 첫 결제)
 * @author Feel Economy Team
 */
export const createSubscription = async (request: TCreateSubscriptionRequest): Promise<TSubscription> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    // Calculate expiration date (1 month from now)
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const { data, error } = await supabase
        .from('subscriptions')
        .upsert(
            {
                user_id: user.id,
                plan_type: 'premium',
                billing_key: request.billingKey,
                customer_key: request.customerKey,
                status: 'active',
                started_at: new Date().toISOString(),
                expires_at: expiresAt.toISOString(),
                updated_at: new Date().toISOString(),
            },
            {
                onConflict: 'user_id',
            }
        )
        .select()
        .single();

    if (error) {
        console.error('Error creating subscription:', error);
        throw error;
    }

    return data as TSubscription;
};

/**
 * 구독 취소
 * @author Feel Economy Team
 */
export const cancelSubscription = async (): Promise<void> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { error } = await supabase
        .from('subscriptions')
        .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

    if (error) {
        console.error('Error cancelling subscription:', error);
        throw error;
    }
};

/**
 * 결제 내역 조회
 * @author Feel Economy Team
 */
export const getPaymentHistory = async (page = 1, limit = 10): Promise<{ data: TPaymentHistory[]; count: number }> => {
    try {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await supabase
            .from('payment_history')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            // 테이블이 존재하지 않는 경우
            if (error.code === '42P01' || error.message?.includes('does not exist')) {
                console.warn('Payment history table does not exist. Please run subscription_schema.sql in Supabase.');
                return { data: [], count: 0 };
            }
            console.error('Error fetching payment history:', error);
            return { data: [], count: 0 };
        }

        return { data: (data as TPaymentHistory[]) || [], count: count || 0 };
    } catch (err) {
        console.error('Unexpected error fetching payment history:', err);
        return { data: [], count: 0 };
    }
};

/**
 * 결제 내역 추가
 * @author Feel Economy Team
 */
export const addPaymentHistory = async (
    payment: Omit<TPaymentHistory, 'id' | 'user_id' | 'created_at'>
): Promise<TPaymentHistory> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('payment_history')
        .insert({
            user_id: user.id,
            ...payment,
        })
        .select()
        .single();

    if (error) {
        console.error('Error adding payment history:', error);
        throw error;
    }

    return data as TPaymentHistory;
};

/**
 * 사용자가 프리미엄 구독자인지 확인
 * @author Feel Economy Team
 */
export const isPremiumSubscriber = async (): Promise<boolean> => {
    const subscription = await getSubscription();

    if (!subscription) {
        return false;
    }

    const isActive = subscription.status === 'active';
    const isNotExpired = !subscription.expires_at || new Date(subscription.expires_at) > new Date();
    const isPremium = subscription.plan_type === 'premium';

    return isActive && isNotExpired && isPremium;
};

/**
 * 주문 ID 생성
 * @author Feel Economy Team
 */
export const generateOrderId = (): string => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `FL_${timestamp}_${randomStr}`.toUpperCase();
};
