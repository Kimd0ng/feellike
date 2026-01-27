import { useNavigate } from 'react-router-dom';
import { Button } from '@feellike/ui';
import {
    container,
    heroSection,
    heroTitle,
    heroSubtitle,
    section,
    sectionTitle,
    grid,
    card,
    cardIcon,
    cardTitle,
    cardDesc,
    ctaSection,
} from './AboutPage.css';

export const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <div className={container}>
            {/* Mission Section */}
            <section className={heroSection}>
                <h1 className={heroTitle}>
                    날씨와 감정,
                    <br />그 미묘한 관계를 탐구합니다
                </h1>
                <p className={heroSubtitle}>
                    FeelLike는 단순히 날씨를 알려주는 것이 아닙니다.
                    <br />
                    날씨가 당신의 감정에 미치는 영향을 분석하고,
                    <br />더 나은 하루를 보낼 수 있도록 돕는 웰니스 파트너입니다.
                </p>
            </section>

            {/* Features Details */}
            <section className={section}>
                <h2 className={sectionTitle}>FeelLike가 제공하는 가치</h2>
                <div className={grid}>
                    <div className={card}>
                        <div className={cardIcon}>🌦️</div>
                        <h3 className={cardTitle}>감정 날씨 예보</h3>
                        <p className={cardDesc}>
                            기상 예보뿐만 아니라, 날씨가 당신의 기분에 미칠 수 있는 영향을 미리 알려드립니다.
                            비 오는 날 우울해지기 쉽다면, 따뜻한 차 한 잔을 미리 준비할 수 있도록 돕습니다.
                        </p>
                    </div>
                    <div className={card}>
                        <div className={cardIcon}>📈</div>
                        <h3 className={cardTitle}>데이터 기반 분석</h3>
                        <p className={cardDesc}>
                            당신의 감정 기록이 쌓일수록 분석은 정교해집니다.
                            "나는 흐린 날 집중이 잘 되는구나"와 같은 새로운 사실을 발견해보세요.
                        </p>
                    </div>
                    <div className={card}>
                        <div className={cardIcon}>🎁</div>
                        <h3 className={cardTitle}>맞춤형 솔루션</h3>
                        <p className={cardDesc}>
                            현재 날씨와 기분에 딱 맞는 음악 플레이리스트,
                            스트레스를 날려줄 운동, 혹은 편안한 휴식 방법을 추천해드립니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={ctaSection}>
                <h2 className={sectionTitle}>지금 바로 시작해보세요</h2>
                <p className={heroSubtitle}>
                    당신의 하루를 조금 더 세심하게 챙겨드릴게요.
                    <br />
                    FeelLike와 함께 감정의 주인이 되어보세요.
                </p>
                <Button
                    variant="primary"
                    size="large"
                    onClick={() => navigate('/login')}
                >
                    무료로 시작하기
                </Button>
            </section>
        </div>
    );
};
