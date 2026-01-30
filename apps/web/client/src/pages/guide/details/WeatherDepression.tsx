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

export const WeatherDepression = () => {
    return (
        <div className={container}>
            <SEO
                title="비 오는 날 우울해지는 과학적 이유와 극복법"
                description="비가 오면 왜 기분이 처질까요? 햇빛 감소와 세로토닌의 관계, 그리고 이를 극복하는 실질적인 방법을 소개합니다."
                keywords="비오는날, 우울증, 세로토닌, 계절성우울증, 기분전환"
            />
            <section className={articleSection}>
                <h1 className={articleTitle}>비 오는 날 우울해지는 과학적 이유와 극복법</h1>
                <div className={articleMeta}>
                    <span>📅 2026.01.29</span>
                    <span>•</span>
                    <span>🕐 5분 읽기</span>
                </div>

                <div className={articleContent}>
                    <p className={articleParagraph}>
                        많은 사람들이 비 오는 날 평소보다 우울하거나 무기력함을 느낍니다.
                        이것은 단순한 기분의 문제가 아니라, 과학적으로 설명 가능한 현상입니다.
                        '비'라는 날씨 요소가 우리 몸과 마음에 미치는 영향을 깊이 있게 알아보고,
                        현명하게 대처하는 방법을 찾아봅시다.
                    </p>

                    <h2 className={articleHeading2}>왜 비가 오면 우울해질까요?</h2>

                    <h3 className={articleHeading3}>1. 햇빛 감소와 세로토닌</h3>
                    <p className={articleParagraph}>
                        햇빛은 우리 뇌에서 '행복 호르몬'으로 불리는 세로토닌 분비를 촉진합니다.
                        비가 오면 구름이 햇빛을 차단하여 세로토닌 생성이 감소하고,
                        이는 자연스럽게 기분 저하로 이어질 수 있습니다.
                        특히 장마철처럼 흐린 날이 지속되면 계절성 정동 장애(SAD)와 유사한 증상을 겪기도 합니다.
                    </p>

                    <h3 className={articleHeading3}>2. 멜라토닌 분비 증가</h3>
                    <p className={articleParagraph}>
                        어두운 환경은 수면을 유도하는 호르몬인 멜라토닌 분비를 늘립니다.
                        낮 시간에도 하늘이 어두우면 뇌는 밤으로 착각하여 멜라토닌을 분비하게 되고,
                        이로 인해 졸음과 무기력증이 찾아옵니다.
                    </p>

                    <h3 className={articleHeading3}>3. 기압 변화의 영향</h3>
                    <p className={articleParagraph}>
                        비가 오기 전 저기압 상태가 되면, 체내 히스타민 분비가 늘어날 수 있습니다.
                        히스타민은 신경을 자극하여 두통이나 관절 통증을 유발할 수 있으며,
                        이러한 신체적 컨디션 난조는 짜증이나 우울감으로 이어지기 쉽습니다.
                    </p>

                    <div className={tipBox}>
                        <p className={tipTitle}>💡 FeelLike 팁</p>
                        <p className={tipContent}>
                            FeelLike 앱에서 현재 날씨에 따른 '기분 예보'를 확인하세요.
                            저기압이 예상될 때 미리 스트레칭 알림을 설정해두면 컨디션 조절에 도움이 됩니다.
                        </p>
                    </div>

                    <h2 className={articleHeading2}>비 오는 날 기분 전환 방법</h2>

                    <ul className={articleList}>
                        <li className={articleListItem}>
                            <strong>조명을 밝게:</strong> 실내 조명을 평소보다 밝게 하거나,
                            광치료 램프(Lux Lamp)를 사용해 부족한 일조량을 보충하세요.
                        </li>
                        <li className={articleListItem}>
                            <strong>따뜻한 음료:</strong> 따뜻한 차나 코코아는 체온을 올리고
                            심리적 안정감을 제공합니다. 특히 캐모마일 티는 진정 효과가 있습니다.
                        </li>
                        <li className={articleListItem}>
                            <strong>실내 운동:</strong> 스트레칭이나 요가 같은 가벼운 운동으로
                            엔도르핀을 분비시키세요. 땀을 흘리면 기분 전환에 효과적입니다.
                        </li>
                        <li className={articleListItem}>
                            <strong>리듬감 있는 음악:</strong> 빗소리가 처진다면,
                            템포가 빠른 음악을 들어 뇌를 깨워주세요.
                        </li>
                    </ul>

                    <p className={articleParagraph}>
                        날씨는 우리가 통제할 수 없지만, 그 날씨가 우리에게 미치는 영향은
                        인식하고 대응할 수 있습니다. 비 오는 날만의 운치를 즐기며,
                        스스로의 마음을 다독이는 시간을 가져보는 건 어떨까요?
                    </p>
                </div>
            </section>
        </div>
    );
};
