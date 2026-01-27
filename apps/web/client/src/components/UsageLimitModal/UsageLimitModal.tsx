import { useState } from 'react';
import { PREMIUM_PLAN } from '@/services/subscription';
import { PaymentModal } from '@/components/PaymentModal';
import {
    overlay,
    modal,
    icon,
    title,
    description,
    highlight,
    premiumCard,
    premiumPrice,
    premiumPeriod,
    premiumFeature,
    buttonGroup,
    upgradeButton,
    laterButton,
} from './UsageLimitModal.css';

type UsageLimitModalProps = {
    onClose: () => void;
};

/**
 * 사용량 제한 초과 모달
 * 무료 사용량을 모두 소진했을 때 표시되는 구독 유도 모달
 * @author Feel Economy Team
 */
export const UsageLimitModal = ({ onClose }: UsageLimitModalProps) => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount) + '원';
    };

    const handleUpgrade = () => {
        setShowPaymentModal(true);
    };

    if (showPaymentModal) {
        return (
            <PaymentModal
                onClose={() => {
                    setShowPaymentModal(false);
                    onClose();
                }}
                onSuccess={onClose}
            />
        );
    }

    return (
        <div className={overlay} onClick={onClose}>
            <div className={modal} onClick={(e) => e.stopPropagation()}>
                <div className={icon}>😢</div>
                <h2 className={title}>오늘의 무료 추천을 모두 사용했어요</h2>
                <p className={description}>
                    무료 플랜에서는 하루에 <span className={highlight}>3번</span>까지만 추천을 받을 수 있어요.
                    <br />
                    프리미엄으로 업그레이드하면 <span className={highlight}>무제한</span>으로 이용할 수 있어요!
                </p>

                <div className={premiumCard}>
                    <p className={premiumPrice}>
                        {formatAmount(PREMIUM_PLAN.price)}
                        <span className={premiumPeriod}> / 월</span>
                    </p>
                    <p className={premiumFeature}>✓ 무제한 AI 추천 • 광고 없음 • 우선 지원</p>
                </div>

                <div className={buttonGroup}>
                    <button className={upgradeButton} onClick={handleUpgrade}>
                        지금 업그레이드하기
                    </button>
                    <button className={laterButton} onClick={onClose}>
                        내일 다시 이용할게요
                    </button>
                </div>
            </div>
        </div>
    );
};
