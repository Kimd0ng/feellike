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

export const AnxietyCare = () => {
    return (
        <div className={container}>
            <SEO
                title="폭풍 전 불안감, 기상병과 마인드 케어"
                description="비가 오기 전 무릎이 쑤시거나 이유 모를 불안감을 느끼시나요? 기상병의 원인과 마음을 진정시키는 방법을 알아봅니다."
                keywords="기상병, 불안장애, 저기압, 멘탈관리, 스트레스해소"
            />
            <section className={articleSection}>
                <h1 className={articleTitle}>폭풍 전 불안감, 어떻게 대처할까?</h1>
                <div className={articleMeta}>
                    <span>📅 2026.01.29</span>
                    <span>•</span>
                    <span>🕐 4분 읽기</span>
                </div>

                <div className={articleContent}>
                    <p className={articleParagraph}>
                        "비가 오려나, 무릎이 쑤시네." 옛 어르신들의 말씀은 단순한 미신이 아닙니다.
                        실제로 날씨 변화, 특히 기압의 변화는 우리 몸의 자율신경계에 영향을 줍니다.
                        단순한 통증을 넘어 심리적 불안감까지 유발하는 '기상병(Meteoropathy)'에 대해 알아봅시다.
                    </p>

                    <h2 className={articleHeading2}>저기압과 우리 몸의 변화</h2>
                    <p className={articleParagraph}>
                        태풍이나 비구름이 다가와 기압이 낮아지면, 우리 몸에 가해지는 압력도 줄어듭니다.
                        이때 신체 내부의 압력이 상대적으로 높아지면서 조직이 팽창하게 됩니다.
                    </p>
                    <ul className={articleList}>
                        <li className={articleListItem}>
                            팽창한 조직이 신경을 압박하여 관절통이나 두통(편두통)을 유발합니다.
                        </li>
                        <li className={articleListItem}>
                            자율신경계 중 교감신경이 자극받아 맥박이 빨라지고 불안감을 느낄 수 있습니다.
                        </li>
                    </ul>

                    <h2 className={articleHeading2}>마음의 안정 찾기</h2>
                    <p className={articleParagraph}>
                        날씨 때문에 예민해진 상태라면, 억지로 기분을 끌어올리려 하기보다
                        편안하게 이완하는 것이 좋습니다.
                    </p>

                    <h3 className={articleHeading3}>1. 귀 마사지</h3>
                    <p className={articleParagraph}>
                        내이(속귀)는 기압 변화를 감지하는 센서 역할을 합니다.
                        귀를 부드럽게 잡아당기거나 마사지해주면 내이의 혈액순환이 좋아져
                        어지럼증이나 두통 완화에 도움이 됩니다.
                    </p>

                    <h3 className={articleHeading3}>2. 마그네슘 섭취</h3>
                    <p className={articleParagraph}>
                        마그네슘은 '천연 진정제'로 불립니다. 근육의 긴장을 풀고 신경을 안정시키는 효과가 있습니다.
                        견과류, 바나나, 시금치 등을 섭취해보세요.
                    </p>

                    <div className={tipBox}>
                        <p className={tipTitle}>💡 FeelLike 팁</p>
                        <p className={tipContent}>
                            불안감이 몰려올 때는 FeelLike의 '감정 일기'를 적어보세요.
                            "이 기분은 날씨 때문이야, 내 잘못이 아니야"라고 객관화하는 것만으로도 큰 위로가 됩니다.
                        </p>
                    </div>

                    <h3 className={articleHeading3}>3. 4-7-8 호흡법</h3>
                    <p className={articleParagraph}>
                        신경계 안정을 위한 검증된 호흡법입니다.
                        4초간 코로 숨을 들이마시고, 7초간 숨을 참고, 8초간 입으로 천천히 내뱉습니다.
                        이 과정을 3-4회 반복하면 부교감신경이 활성화되어 마음이 차분해집니다.
                    </p>
                </div>
            </section>
        </div>
    );
};
