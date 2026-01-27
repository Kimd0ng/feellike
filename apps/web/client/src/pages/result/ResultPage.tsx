import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Button, Card } from '@feellike/ui';
import { recommendationAtom } from '@/store/atoms';
import { generateWebUrl } from '@/utils/helpers';
import {
    container,
    content,
    resultCard,
    theme,
    reasonBox,
    reason,
    solutionBox,
    recommendation as recommendationStyle,
    platform,
    actions,
    platformButton,
    secondaryActions,
    sectionLabel,
} from './ResultPage.css';

const PLATFORM_NAMES = {
    baemin: '배달의민족',
    youtube: '유튜브',
    coupang: '쿠팡',
};

const PLATFORM_EMOJIS = {
    baemin: '🍔',
    youtube: '📺',
    coupang: '🛒',
};

/**
 * ResultPage 컴포넌트
 * AI 추천 결과 표시 및 플랫폼 이동
 * @author Feel Economy Team
 */
export const ResultPage = () => {
    const navigate = useNavigate();
    const [recommendation] = useAtom(recommendationAtom);

    useEffect(() => {
        if (!recommendation) {
            navigate('/', { replace: true });
        }
    }, [recommendation, navigate]);

    if (!recommendation) {
        return null;
    }

    const handlePlatformOpen = () => {
        const webUrl = generateWebUrl(recommendation.platform, recommendation.searchKeyword);

        // 딥링크로 앱 열기 시도
        window.location.href = recommendation.deepLink;

        // 딥링크 실패 시 웹 URL로 fallback (1초 후)
        setTimeout(() => {
            window.open(webUrl, '_blank');
        }, 1000);
    };

    const handleTryAgain = () => {
        navigate('/mood-input', { replace: true });
    };

    const handleHome = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className={container}>
            <div className={content}>
                <Card elevation="raised" className={resultCard}>
                    <h2 className={theme}>{recommendation.theme}</h2>

                    <div className={reasonBox}>
                        <p className={sectionLabel}>Why?</p>
                        <p className={reason}>{recommendation.reason}</p>
                    </div>

                    <div className={solutionBox}>
                        <p className={sectionLabel}>맞춤 솔루션</p>
                        <p className={recommendationStyle}>{recommendation.recommendation}</p>
                        <p className={platform}>
                            {PLATFORM_EMOJIS[recommendation.platform]} {PLATFORM_NAMES[recommendation.platform]}에서
                            만나보세요
                        </p>
                    </div>

                    <div className={actions}>
                        <Button
                            variant="primary"
                            size="fullWidth"
                            onClick={handlePlatformOpen}
                            className={platformButton}
                        >
                            {PLATFORM_NAMES[recommendation.platform]} 열기
                        </Button>

                        <div className={secondaryActions}>
                            <Button variant="outline" size="medium" onClick={handleHome} style={{ flex: 1 }}>
                                처음으로
                            </Button>
                            <Button variant="ghost" size="medium" onClick={handleTryAgain} style={{ flex: 1 }}>
                                다시 입력하기
                            </Button>
                        </div>
                    </div>
                </Card>

                {recommendation.pastContext && recommendation.pastContext.logs.length > 0 && (
                    <div style={{ marginTop: '24px', opacity: 0.9 }}>
                        <p style={{ fontSize: '14px', color: '#fff', marginBottom: '12px' }}>
                            💡 이전에도 비슷한 날엔 이런 걸 추천받으셨네요:
                        </p>
                        <div
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                padding: '16px',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {recommendation.pastContext.logs.slice(0, 2).map((log, index) => (
                                <div
                                    key={index}
                                    style={{
                                        fontSize: '14px',
                                        color: '#fff',
                                        marginBottom: index === 0 ? '8px' : '0',
                                    }}
                                >
                                    • {log.recommendation.recommendation}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
