/**
 * 구독 정보 타입
 * @author Feel Economy Team
 */
export type TSubscription = {
    id: string;
    user_id: string;
    plan_type: 'free' | 'premium';
    billing_key: string | null;
    customer_key: string | null;
    status: 'active' | 'cancelled' | 'expired' | 'pending';
    started_at: string;
    expires_at: string | null;
    cancelled_at: string | null;
    created_at: string;
    updated_at: string;
};

/**
 * 결제 내역 타입
 * @author Feel Economy Team
 */
export type TPaymentHistory = {
    id: string;
    user_id: string;
    subscription_id: string | null;
    amount: number;
    currency: string;
    payment_key: string | null;
    order_id: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
    payment_method: string | null;
    card_company: string | null;
    card_number: string | null;
    receipt_url: string | null;
    failure_reason: string | null;
    paid_at: string | null;
    created_at: string;
};

/**
 * 구독 플랜 정보 타입
 * @author Feel Economy Team
 */
export type TSubscriptionPlan = {
    id: string;
    name: string;
    price: number;
    currency: string;
    period: 'monthly' | 'yearly';
    features: string[];
};

/**
 * 구독 생성 요청 타입
 * @author Feel Economy Team
 */
export type TCreateSubscriptionRequest = {
    billingKey: string;
    customerKey: string;
};

/**
 * 토스페이먼츠 빌링키 발급 요청 타입
 * @author Feel Economy Team
 */
export type TIssueBillingKeyRequest = {
    authKey: string;
    customerKey: string;
};

/**
 * 토스페이먼츠 빌링키 발급 응답 타입
 * @author Feel Economy Team
 */
export type TIssueBillingKeyResponse = {
    billingKey: string;
    customerKey: string;
    cardCompany: string;
    cardNumber: string;
};

/**
 * 결제 요청 타입
 * @author Feel Economy Team
 */
export type TPaymentRequest = {
    billingKey: string;
    customerKey: string;
    amount: number;
    orderId: string;
    orderName: string;
};

/**
 * 결제 응답 타입
 * @author Feel Economy Team
 */
export type TPaymentResponse = {
    paymentKey: string;
    orderId: string;
    status: string;
    approvedAt: string;
    receiptUrl: string;
};
