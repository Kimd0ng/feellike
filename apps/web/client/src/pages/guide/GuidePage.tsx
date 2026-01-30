import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/seo/SEO';
import {
    container,
    heroSection,
    heroTitle,
    heroSubtitle,
    contentSection,
    sectionTitle,
    grid,
    guideCard,
    cardIcon,
    cardTag,
    cardTitle,
    cardDesc,
} from './GuidePage.css';

/**
 * 가이드 목록 페이지
 * 날씨와 감정에 관한 유용한 정보 아티클 목록을 제공
 * @author Feel Economy Team
 */
export const GuidePage = () => {
    const navigate = useNavigate();

    return (
        <div className={container}>
            <SEO
                title="날씨와 감정 가이드"
                description="날씨가 감정과 일상에 미치는 영향을 과학적으로 알아보고, 더 나은 하루를 보내는 방법을 발견하세요."
                keywords="날씨, 감정, 가이드, 멘탈케어, 웰니스"
            />
            <section className={heroSection}>
                <h1 className={heroTitle}>날씨와 감정 가이드</h1>
                <p className={heroSubtitle}>
                    날씨가 우리의 감정과 일상에 미치는 영향을 과학적으로 알아보고,
                    더 나은 하루를 보내는 방법을 발견하세요.
                </p>
            </section>

            <div className={contentSection}>
                <section>
                    <h2 className={sectionTitle}>인기 가이드</h2>
                    <div className={grid}>
                        <article
                            className={guideCard}
                            onClick={() => navigate('/guide/weather-depression')}
                            role="button"
                            tabIndex={0}
                        >
                            <div className={cardIcon}>🌧️</div>
                            <span className={cardTag}>감정 과학</span>
                            <h3 className={cardTitle}>
                                비 오는 날 우울해지는 과학적 이유
                            </h3>
                            <p className={cardDesc}>
                                빛의 감소가 세로토닌 분비에 미치는 영향과 이를
                                극복하는 방법을 알아보세요.
                            </p>
                        </article>

                        <article
                            className={guideCard}
                            onClick={() => navigate('/guide/productivity')}
                            role="button"
                            tabIndex={0}
                        >
                            <div className={cardIcon}>☀️</div>
                            <span className={cardTag}>생산성</span>
                            <h3 className={cardTitle}>
                                날씨에 따른 생산성 최적화 전략
                            </h3>
                            <p className={cardDesc}>
                                맑은 날과 흐린 날, 각 날씨에 맞는 업무 스타일로
                                효율을 높이세요.
                            </p>
                        </article>

                        <article
                            className={guideCard}
                            onClick={() => navigate('/guide/sleep-quality')}
                            role="button"
                            tabIndex={0}
                        >
                            <div className={cardIcon}>🌡️</div>
                            <span className={cardTag}>건강</span>
                            <h3 className={cardTitle}>
                                기온 변화가 수면에 미치는 영향
                            </h3>
                            <p className={cardDesc}>
                                적정 수면 온도와 계절별 수면 환경 최적화 팁을
                                확인하세요.
                            </p>
                        </article>

                        <article
                            className={guideCard}
                            onClick={() => navigate('/guide/anxiety-care')}
                            role="button"
                            tabIndex={0}
                        >
                            <div className={cardIcon}>⛈️</div>
                            <span className={cardTag}>힐링</span>
                            <h3 className={cardTitle}>
                                폭풍 전 불안감, 어떻게 대처할까?
                            </h3>
                            <p className={cardDesc}>
                                기압 변화에 민감한 분들을 위한 마음 안정
                                가이드를 제공합니다.
                            </p>
                        </article>
                    </div>
                </section>
            </div>
        </div>
    );
};
