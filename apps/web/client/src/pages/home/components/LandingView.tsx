import { useNavigate } from 'react-router-dom';
import { Button } from '@feellike/ui';
import {
    container,
    hero,
    title,
    subtitle,
    features,
    featureCard,
    featureTitle,
    featureDesc,
} from './LandingView.css';

export const LandingView = () => {
    const navigate = useNavigate();

    return (
        <div className={container}>
            <section className={hero}>
                <h1 className={title}>
                    당신의 감정을
                    <br />
                    날씨처럼 기록하세요
                </h1>
                <p className={subtitle}>
                    FeelLike는 감정과 날씨의 상관관계를 분석하여
                    <br />더 나은 하루를 보낼 수 있도록 도와주는 웰니스 서비스입니다.
                </p>
                <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                    <Button variant="primary" size="large" onClick={() => navigate('/login')}>
                        시작하기
                    </Button>
                    <Button variant="secondary" size="large" onClick={() => navigate('/about')}>
                        더 알아보기
                    </Button>
                </div>
            </section>

            <section className={features}>
                <div className={featureCard}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🌤️</div>
                    <h3 className={featureTitle}>날씨와 감정</h3>
                    <p className={featureDesc}>
                        현재 날씨와 당신의 감정을 함께 기록하고
                        <br />
                        패턴을 발견하세요.
                    </p>
                </div>
                <div className={featureCard}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
                    <h3 className={featureTitle}>감정 분석</h3>
                    <p className={featureDesc}>
                        주간, 월간 리포트를 통해
                        <br />
                        나의 감정 변화를 추적하세요.
                    </p>
                </div>
                <div className={featureCard}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎵</div>
                    <h3 className={featureTitle}>맞춤 추천</h3>
                    <p className={featureDesc}>
                        현재 기분과 날씨에 딱 맞는
                        <br />
                        음악과 활동을 추천해드립니다.
                    </p>
                </div>
            </section>
        </div>
    );
};
