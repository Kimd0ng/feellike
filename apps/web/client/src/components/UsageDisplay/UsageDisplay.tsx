import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsageCheckQuery } from '@/services/usage';
import {
    container,
    usageText,
    usageCount,
    premiumBadge,
    upgradeButton,
} from './UsageDisplay.css';

type UsageDisplayProps = {
    className?: string;
    style?: CSSProperties;
};

/**
 * 사용량 표시 컴포넌트
 * 오늘의 추천 사용량을 표시하고 프리미엄 사용자는 뱃지를 표시
 * @author Feel Economy Team
 */
export const UsageDisplay = ({ className, style }: UsageDisplayProps) => {
    const navigate = useNavigate();
    const { data: usageCheck, isLoading } = useUsageCheckQuery();

    if (isLoading || !usageCheck) {
        return null;
    }

    if (usageCheck.isPremium) {
        return (
            <div className={`${container} ${className || ''}`} style={style}>
                <span className={premiumBadge}>
                    ⭐ 프리미엄
                </span>
            </div>
        );
    }

    const remaining = usageCheck.dailyLimit - usageCheck.currentUsage;

    return (
        <div className={`${container} ${className || ''}`} style={style}>
            <span className={usageText}>
                오늘 <span className={usageCount}>{remaining}</span>회 남음
            </span>
            {remaining === 0 && (
                <button
                    className={upgradeButton}
                    onClick={() => navigate('/subscription')}
                >
                    업그레이드
                </button>
            )}
        </div>
    );
};
