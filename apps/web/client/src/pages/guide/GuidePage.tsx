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
    articleSection,
    articleTitle,
    articleMeta,
    articleContent,
    articleParagraph,
    articleHeading2,
    articleHeading3,
    articleList,
    articleListItem,
    tipBox,
    tipTitle,
    tipContent,
} from './GuidePage.css';

/**
 * 가이드 페이지
 * 날씨와 감정에 관한 유용한 정보 제공 - 애드센스 고유 콘텐츠
 * @author Feel Economy Team
 */
export const GuidePage = () => {
    return (
        <div className={container}>
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
                        <article className={guideCard}>
                            <div className={cardIcon}>🌧️</div>
                            <span className={cardTag}>감정 과학</span>
                            <h3 className={cardTitle}>비 오는 날 우울해지는 과학적 이유</h3>
                            <p className={cardDesc}>
                                빛의 감소가 세로토닌 분비에 미치는 영향과 이를 극복하는 방법을 알아보세요.
                            </p>
                        </article>

                        <article className={guideCard}>
                            <div className={cardIcon}>☀️</div>
                            <span className={cardTag}>생산성</span>
                            <h3 className={cardTitle}>날씨에 따른 생산성 최적화 전략</h3>
                            <p className={cardDesc}>
                                맑은 날과 흐린 날, 각 날씨에 맞는 업무 스타일로 효율을 높이세요.
                            </p>
                        </article>

                        <article className={guideCard}>
                            <div className={cardIcon}>🌡️</div>
                            <span className={cardTag}>건강</span>
                            <h3 className={cardTitle}>기온 변화가 수면에 미치는 영향</h3>
                            <p className={cardDesc}>
                                적정 수면 온도와 계절별 수면 환경 최적화 팁을 확인하세요.
                            </p>
                        </article>

                        <article className={guideCard}>
                            <div className={cardIcon}>⛈️</div>
                            <span className={cardTag}>힐링</span>
                            <h3 className={cardTitle}>폭풍 전 불안감, 어떻게 대처할까?</h3>
                            <p className={cardDesc}>
                                기압 변화에 민감한 분들을 위한 마음 안정 가이드를 제공합니다.
                            </p>
                        </article>
                    </div>
                </section>

                <section className={articleSection}>
                    <h2 className={articleTitle}>비 오는 날 우울해지는 과학적 이유와 극복법</h2>
                    <div className={articleMeta}>
                        <span>📅 2026.01.29</span>
                        <span>•</span>
                        <span>🕐 5분 읽기</span>
                    </div>

                    <div className={articleContent}>
                        <p className={articleParagraph}>
                            많은 사람들이 비 오는 날 평소보다 우울하거나 무기력함을 느낍니다.
                            이것은 단순한 기분의 문제가 아니라, 과학적으로 설명 가능한 현상입니다.
                        </p>

                        <h2 className={articleHeading2}>왜 비가 오면 우울해질까요?</h2>

                        <h3 className={articleHeading3}>1. 햇빛 감소와 세로토닌</h3>
                        <p className={articleParagraph}>
                            햇빛은 우리 뇌에서 '행복 호르몬'으로 불리는 세로토닌 분비를 촉진합니다.
                            비가 오면 구름이 햇빛을 차단하여 세로토닌 생성이 감소하고,
                            이는 기분 저하로 이어질 수 있습니다.
                        </p>

                        <h3 className={articleHeading3}>2. 기압 변화의 영향</h3>
                        <p className={articleParagraph}>
                            비가 오기 전 기압이 낮아지면, 일부 사람들은 두통이나 관절통,
                            그리고 전반적인 불쾌감을 경험합니다. 이러한 신체적 불편함은
                            정서적 상태에도 영향을 미칩니다.
                        </p>

                        <h3 className={articleHeading3}>3. 활동 제한</h3>
                        <p className={articleParagraph}>
                            비로 인해 실외 활동이 제한되면, 운동량이 줄어들고
                            사회적 고립감이 증가할 수 있습니다. 이 두 가지 모두
                            우울감을 유발하는 요인입니다.
                        </p>

                        <div className={tipBox}>
                            <p className={tipTitle}>💡 FeelLike 팁</p>
                            <p className={tipContent}>
                                FeelLike 앱에서 날씨 예보를 확인하고, 비 오는 날에 맞는
                                실내 활동이나 릴렉싱 플레이리스트 추천을 받아보세요!
                            </p>
                        </div>

                        <h2 className={articleHeading2}>비 오는 날 기분 전환 방법</h2>

                        <ul className={articleList}>
                            <li className={articleListItem}>
                                <strong>조명을 밝게:</strong> 집안의 조명을 최대한 밝게 하거나,
                                광치료 램프를 사용해보세요.
                            </li>
                            <li className={articleListItem}>
                                <strong>따뜻한 음료:</strong> 따뜻한 차나 코코아는 체온을 올리고
                                심리적 안정감을 제공합니다.
                            </li>
                            <li className={articleListItem}>
                                <strong>실내 운동:</strong> 스트레칭이나 요가 같은 가벼운 운동으로
                                엔도르핀을 분비시키세요.
                            </li>
                            <li className={articleListItem}>
                                <strong>빗소리 명상:</strong> 빗소리를 배경으로 한 명상은 오히려
                                마음의 평화를 가져다 줄 수 있습니다.
                            </li>
                            <li className={articleListItem}>
                                <strong>감정 기록:</strong> FeelLike 앱에 오늘의 감정을 기록하고,
                                패턴을 파악해보세요.
                            </li>
                        </ul>

                        <p className={articleParagraph}>
                            날씨는 우리가 통제할 수 없지만, 그 날씨가 우리에게 미치는 영향은
                            인식하고 대응할 수 있습니다. FeelLike와 함께 날씨에 휘둘리지 않는
                            감정 관리를 시작해보세요.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};
