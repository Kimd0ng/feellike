import { SEO } from '@/components/seo/SEO';
import {
    container,
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
} from '../GuidePage.css';

export const SleepQuality = () => {
    return (
        <div className={container}>
            <SEO
                title="기온 변화가 수면에 미치는 영향과 꿀잠 팁"
                description="잠 못 이루는 밤, 혹시 방 온도가 문제일까요? 계절별 최적의 수면 온도와 환경 조성 방법을 알려드립니다."
                keywords="수면, 불면증, 수면온도, 숙면, 건강관리"
            />
            <section className={articleSection}>
                <h1 className={articleTitle}>기온 변화가 수면에 미치는 영향</h1>
                <div className={articleMeta}>
                    <span>📅 2026.01.29</span>
                    <span>•</span>
                    <span>🕐 3분 읽기</span>
                </div>

                <div className={articleContent}>
                    <p className={articleParagraph}>
                        우리는 인생의 1/3을 잠으로 보냅니다. 숙면은 건강의 기초지만,
                        많은 사람들이 계절이 바뀔 때마다 수면 장애를 겪습니다.
                        특히 '온도'는 빛, 소음과 함께 수면의 질을 결정하는 가장 중요한 3대 요소 중 하나입니다.
                    </p>

                    <h2 className={articleHeading2}>가장 잠 잘 오는 온도는?</h2>
                    <p className={articleParagraph}>
                        수면 전문가들은 침실의 적정 온도를 **18도에서 22도** 사이로 권장합니다.
                        생각보다 서늘하다고 느껴질 수 있는 온도입니다.
                        우리 몸은 잠들 때 심부 체온이 약간 떨어져야 깊은 수면 단계로 진입할 수 있기 때문입니다.
                    </p>

                    <h3 className={articleHeading3}>🌡️ 여름철 열대야 극복</h3>
                    <p className={articleParagraph}>
                        여름밤 기온이 25도를 넘어가면 체온 조절 중추가 흥분 상태를 유지해 잠들기 어렵습니다.
                    </p>
                    <ul className={articleList}>
                        <li className={articleListItem}>
                            에어컨은 잠들기 1~2시간 전에 틀어 방을 식히고, 타이머를 설정하세요.
                        </li>
                        <li className={articleListItem}>
                            미지근한 물로 샤워하세요. 찬물 샤워는 오히려 체온을 오르게 합니다.
                        </li>
                        <li className={articleListItem}>
                            통기성이 좋은 린넨 소재의 침구를 사용하세요.
                        </li>
                    </ul>

                    <h3 className={articleHeading3}>❄️ 겨울철 난방 주의</h3>
                    <p className={articleParagraph}>
                        겨울철 전기장판을 너무 뜨겁게 하거나 난방을 과하게 하면 습도가 20% 이하로 떨어집니다.
                        건조함은 코 점막을 마르게 하여 코골이를 유발하거나 수면 중 깸의 원인이 됩니다.
                    </p>
                    <div className={tipBox}>
                        <p className={tipTitle}>💡 FeelLike 팁</p>
                        <p className={tipContent}>
                            FeelLike 앱의 날씨 예보에서 습도를 확인하세요.
                            습도가 40% 미만이라면 가습기를 틀거나 젖은 수건을 널어두는 것이 숙면의 지름길입니다.
                        </p>
                    </div>

                    <h2 className={articleHeading2}>손발 온도와 수면</h2>
                    <p className={articleParagraph}>
                        "머리는 차갑게, 발은 따뜻하게(두한족열)"라는 말은 과학적 근거가 있습니다.
                        손과 발이 따뜻해지면 혈관이 확장되어 열이 발산되고,
                        결과적으로 심부 체온이 떨어져 수면 유도에 도움이 됩니다.
                    </p>
                    <p className={articleParagraph}>
                        수면 양말을 신거나, 자기 전 족욕을 하는 것이 불면증 완화에 효과적인 이유입니다.
                        오늘 밤, 침실 온도를 1도만 낮추고 이불은 포근하게 덮어보는 건 어떨까요?
                    </p>
                </div>
            </section>
        </div>
    );
};
