import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Button } from '@feellike/ui';
import { weatherAtom } from '@/store/atoms';
import { getGreeting } from '@/utils/helpers';
import { useEmotionHistoryQuery } from '@/services/history';
import {
    container,
    welcomeSection,
    title,
    subtitle,
    grid,
    card,
    cardTitle,
    moodButton,
} from './DashboardView.css';

export const DashboardView = () => {
    const navigate = useNavigate();
    const [weather] = useAtom(weatherAtom);
    const { data: historyData } = useEmotionHistoryQuery(1, 1); // Fetch only latest 1
    const latestLog = historyData?.data?.[0];

    return (
        <div className={container}>
            <div className={welcomeSection}>
                <h1 className={title}>{getGreeting()}</h1>
                <p className={subtitle}>오늘의 기분을 기록하고 더 나은 하루를 만들어보세요.</p>
            </div>

            <div className={grid}>
                <div className={card}>
                    <div>
                        <h2 className={cardTitle}>지금 기분은 어떠신가요?</h2>
                        <p>간단한 기록으로 감정 흐름을 파악하세요.</p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/mood-input')}
                        className={moodButton}
                    >
                        기분 기록하기 ✏️
                    </Button>
                </div>

                <div className={card}>
                    <div>
                        <h2 className={cardTitle}>오늘의 날씨</h2>
                        {weather ? (
                            <div>
                                <p style={{ fontSize: 32, fontWeight: 'bold' }}>
                                    {Math.round(weather.temp)}° {weather.condition}
                                </p>
                                <p>{weather.description}</p>
                                <div style={{
                                    marginTop: 12,
                                    padding: 12,
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: 8,
                                    fontSize: 14,
                                    color: '#4B5563'
                                }}>
                                    💡 {
                                        weather.condition === 'sunny' ? "에너지가 솟아나는 날이에요! 야외 활동은 어떠신가요?" :
                                            weather.condition === 'rainy' ? "차분한 빗소리와 함께 깊은 집중을 해보세요." :
                                                weather.condition === 'snowy' ? "포근하고 로맨틱한 분위기를 즐겨보세요." :
                                                    "안정적인 날씨예요. 루틴을 지키기 좋은 날입니다."
                                    }
                                </div>
                            </div>
                        ) : (
                            <p>날씨 정보를 불러오는 중...</p>
                        )}
                    </div>
                </div>

                <div className={card}>
                    <div>
                        <h2 className={cardTitle}>최근 활동</h2>
                        {latestLog ? (
                            <div style={{ marginTop: 8 }}>
                                <p style={{ fontSize: 18, fontWeight: 'bold' }}>{latestLog.mood}</p>
                                <p style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                                    {latestLog.recommendation.recommendation}
                                </p>
                                <Button
                                    variant="secondary"
                                    size="small"
                                    onClick={() => navigate('/history')}
                                    style={{ marginTop: 16 }}
                                >
                                    전체 기록 보기
                                </Button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <p>아직 기록된 활동이 없습니다.</p>
                                <Button
                                    variant="secondary"
                                    size="small"
                                    onClick={() => navigate('/mood-input')}
                                    style={{ marginTop: 'auto' }}
                                >
                                    첫 기록 남기기
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
