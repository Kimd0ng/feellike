import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@feellike/ui';
import {
    useSubscriptionQuery,
    usePaymentHistoryQuery,
    useCancelSubscriptionMutation,
    PREMIUM_PLAN,
} from '@/services/subscription';
import { useUsageCheckQuery } from '@/services/usage';
import { PaymentModal } from '@/components/PaymentModal';
import {
    container,
    header,
    backButton,
    title,
    content,
    currentPlanCard,
    planLabel,
    planName,
    planBadge,
    freeBadge,
    expiresAt,
    usageCard,
    usageTitle,
    usageBar,
    usageProgress,
    usageText,
    premiumCard,
    premiumLabel,
    premiumTitle,
    premiumPrice,
    premiumPeriod,
    featureList,
    featureItem,
    featureIcon,
    subscribeButton,
    cancelButton,
    paymentHistory,
    historyTitle,
    historyItem,
    historyDate,
    historyAmount,
    historyStatus,
    statusCompleted,
    statusFailed,
    emptyHistory,
} from './SubscriptionPage.css';

/**
 * 구독 관리 페이지
 * @author Feel Economy Team
 */
export const SubscriptionPage = () => {
    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const { data: subscription, isLoading: subscriptionLoading } = useSubscriptionQuery();
    const { data: usageCheck } = useUsageCheckQuery();
    const { data: payments } = usePaymentHistoryQuery(1, 5);
    const cancelMutation = useCancelSubscriptionMutation();

    const isPremium = subscription?.plan_type === 'premium' && subscription?.status === 'active';

    const handleSubscribe = () => {
        setShowPaymentModal(true);
    };

    const handleCancel = async () => {
        if (confirm('정말 구독을 취소하시겠습니까? 현재 결제 기간이 끝나면 무료 플랜으로 전환됩니다.')) {
            await cancelMutation.mutateAsync();
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount) + '원';
    };

    if (subscriptionLoading) {
        return (
            <div className={container}>
                <div className={content}>
                    <p style={{ color: 'white', textAlign: 'center' }}>로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={container}>
            <div className={header}>
                <button className={backButton} onClick={() => navigate('/')}>
                    ←
                </button>
                <h1 className={title}>구독 관리</h1>
            </div>

            <div className={content}>
                {/* 현재 플랜 */}
                <div className={currentPlanCard}>
                    <p className={planLabel}>현재 플랜</p>
                    <h2 className={planName}>
                        {isPremium ? (
                            <>
                                프리미엄 <span className={planBadge}>PREMIUM</span>
                            </>
                        ) : (
                            <>
                                무료 <span className={freeBadge}>FREE</span>
                            </>
                        )}
                    </h2>
                    {isPremium && subscription?.expires_at && (
                        <p className={expiresAt}>다음 결제일: {formatDate(subscription.expires_at)}</p>
                    )}
                </div>

                {/* 사용량 (무료 플랜만) */}
                {!isPremium && usageCheck && (
                    <div className={usageCard}>
                        <h3 className={usageTitle}>오늘의 사용량</h3>
                        <div className={usageBar}>
                            <div
                                className={usageProgress}
                                style={{
                                    width: `${Math.min(100, (usageCheck.currentUsage / usageCheck.dailyLimit) * 100)}%`,
                                }}
                            />
                        </div>
                        <p className={usageText}>
                            {usageCheck.currentUsage} / {usageCheck.dailyLimit}회 사용
                        </p>
                    </div>
                )}

                {/* 프리미엄 플랜 카드 (무료 사용자만) */}
                {!isPremium && (
                    <div className={premiumCard}>
                        <p className={premiumLabel}>추천 플랜</p>
                        <h2 className={premiumTitle}>{PREMIUM_PLAN.name}</h2>
                        <p className={premiumPrice}>
                            {formatAmount(PREMIUM_PLAN.price)}
                            <span className={premiumPeriod}> / 월</span>
                        </p>
                        <ul className={featureList}>
                            {PREMIUM_PLAN.features.map((feature, index) => (
                                <li key={index} className={featureItem}>
                                    <span className={featureIcon}>✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className={subscribeButton} onClick={handleSubscribe}>
                            프리미엄 시작하기
                        </button>
                    </div>
                )}

                {/* 구독 취소 버튼 (프리미엄 사용자만) */}
                {isPremium && (
                    <button className={cancelButton} onClick={handleCancel} disabled={cancelMutation.isPending}>
                        {cancelMutation.isPending ? '처리 중...' : '구독 취소'}
                    </button>
                )}

                {/* 결제 내역 */}
                <div className={paymentHistory}>
                    <h3 className={historyTitle}>결제 내역</h3>
                    {payments && payments.data.length > 0 ? (
                        payments.data.map((payment) => (
                            <div key={payment.id} className={historyItem}>
                                <div>
                                    <p className={historyDate}>{payment.paid_at ? formatDate(payment.paid_at) : '-'}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span className={historyAmount}>{formatAmount(payment.amount)}</span>
                                    <span
                                        className={classNames(
                                            historyStatus,
                                            payment.status === 'completed' ? statusCompleted : statusFailed
                                        )}
                                    >
                                        {payment.status === 'completed' ? '완료' : '실패'}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={emptyHistory}>결제 내역이 없습니다</p>
                    )}
                </div>
            </div>

            {/* 결제 모달 */}
            {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} />}
        </div>
    );
};
