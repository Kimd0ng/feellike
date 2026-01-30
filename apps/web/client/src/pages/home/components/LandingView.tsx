import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/seo/SEO';
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

<div className={container}>
    <SEO
        title="홈"
        description="날씨와 감정의 상관관계를 기록하고 분석하는 웰니스 앱 FeelLike입니다. 날씨에 따른 기분 변화를 추적하고 맞춤형 솔루션을 받아보세요."
    />
    <section className={hero}>
        <h1 className={title}>
            당신의 감정을
            <br />
            날씨처럼 기록하세요
        </h1>
        <p className={subtitle}>
            오늘 날씨가 당신의 기분에 어떤 영향을 미쳤나요?
            <br />
            FeelLike는 기상 데이터와 당신의 감정 기록을 연결하여,
            <br />미처 몰랐던 당신만의 감정 패턴을 찾아드립니다.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            <Button
                variant="primary"
                size="large"
                onClick={() => navigate('/login')}
            >
                무료로 시작하기
            </Button>
            <Button
                variant="secondary"
                size="large"
                onClick={() => navigate('/about')}
            >
                더 알아보기
            </Button>
        </div>
    </section>

    <section className={features}>
        <div className={featureCard}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌤️</div>
            <h3 className={featureTitle}>날씨와 감정의 과학</h3>
            <p className={featureDesc}>
                비 오는 날 우울해지는 것은 단순한 기분 탓이 아닙니다.
                기압과 일조량이 호르몬에 미치는 영향을 과학적으로 분석하고,
                데이터에 기반한 멘탈 케어 솔루션을 제공합니다.
            </p>
        </div>
        <div className={featureCard}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
            <h3 className={featureTitle}>나만의 감정 리포트</h3>
            <p className={featureDesc}>
                "나는 흐린 날 집중이 잘 돼", "폭염에는 짜증이 늘어"
                무심코 지나쳤던 감정의 인과관계를 차트와 통계로
                한눈에 파악할 수 있습니다.
            </p>
        </div>
        <div className={featureCard}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎵</div>
            <h3 className={featureTitle}>날씨 맞춤 큐레이션</h3>
            <p className={featureDesc}>
                현재 날씨와 당신의 기분 상태에 가장 적합한
                음악 플레이리스트, 실내외 활동,
                그리고 마인드풀니스 콘텐츠를 추천해드립니다.
            </p>
        </div>
    </section>
</div>
