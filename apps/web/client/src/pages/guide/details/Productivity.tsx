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

export const Productivity = () => {
    return (
        <div className={container}>
            <SEO
                title="날씨에 따른 생산성 최적화 전략"
                description="맑은 날과 흐린 날, 날씨에 따라 업무 효율이 달라진다는 사실을 알고 계셨나요? 날씨별 최적의 업무 스타일을 제안합니다."
                keywords="생산성, 업무효율, 날씨와업무, 집중력, 시간관리"
            />
            <section className={articleSection}>
                <h1 className={articleTitle}>날씨에 따른 생산성 최적화 전략</h1>
                <div className={articleMeta}>
                    <span>📅 2026.01.29</span>
                    <span>•</span>
                    <span>🕐 4분 읽기</span>
                </div>

                <div className={articleContent}>
                    <p className={articleParagraph}>
                        '오늘은 왠지 일이 손에 안 잡히네'라고 느낀 적이 있나요?
                        그 이유가 밖의 날씨 때문일 수도 있습니다.
                        연구에 따르면 날씨는 우리의 인지 능력과 집중력에 상당한 영향을 미칩니다.
                        각 날씨에 맞는 업무 전략을 세워 생산성을 극대화해 보세요.
                    </p>

                    <h2 className={articleHeading2}>날씨별 업무 스타일 가이드</h2>

                    <h3 className={articleHeading3}>☀️ 맑은 날: 창의력과 미팅</h3>
                    <p className={articleParagraph}>
                        맑고 화창한 날은 기분이 고양되고 개방적인 사고를 하게 됩니다.
                        하지만 역설적으로 너무 좋은 날씨는 '나가서 놀고 싶다'는 생각 때문에
                        산만해지기 쉽다는 연구 결과도 있습니다.
                    </p>
                    <ul className={articleList}>
                        <li className={articleListItem}>
                            <strong>추천 업무:</strong> 아이디어 브레인스토밍, 팀 미팅, 네트워킹, 발표
                        </li>
                        <li className={articleListItem}>
                            <strong>주의점:</strong> 꼼꼼한 문서 작업 시 집중력이 흐트러질 수 있으니 주의하세요.
                        </li>
                    </ul>

                    <h3 className={articleHeading3}>☁️ 흐린 날: 집중과 분석</h3>
                    <p className={articleParagraph}>
                        비가 오거나 흐린 날은 차분해지고 외부 유혹이 줄어듭니다.
                        하버드 경영대학원의 연구에 따르면, 날씨가 안 좋을 때
                        오히려 업무 생산성이 높아진다고 합니다.
                    </p>
                    <ul className={articleList}>
                        <li className={articleListItem}>
                            <strong>추천 업무:</strong> 데이터 분석, 보고서 작성, 코딩, 교정/교열
                        </li>
                        <li className={articleListItem}>
                            <strong>주의점:</strong> 기분이 처질 수 있으니 주기적인 휴식이 필요합니다.
                        </li>
                    </ul>

                    <h2 className={articleHeading2}>환경을 통제하는 법</h2>
                    <p className={articleParagraph}>
                        날씨에 끌려다니지 않고, 환경을 조성하여 흐름을 바꿀 수도 있습니다.
                    </p>

                    <h3 className={articleHeading3}>1. 온도 조절</h3>
                    <p className={articleParagraph}>
                        코넬 대학의 연구에 따르면, 실내 온도가 20도에서 25도로 올라갔을 때
                        타이핑 오타율이 44% 감소하고 생산량은 150% 증가했다고 합니다.
                        약간 따뜻한 환경이 집중력 유지에 좋습니다.
                    </p>

                    <div className={tipBox}>
                        <p className={tipTitle}>💡 FeelLike 팁</p>
                        <p className={tipContent}>
                            FeelLike에 업무 일지를 간단히 기록해보세요.
                            '비 오는 날 코딩이 잘 된다' 같은 나만의 리듬을 발견할 수 있습니다.
                        </p>
                    </div>

                    <h3 className={articleHeading3}>2. 백색 소음 활용</h3>
                    <p className={articleParagraph}>
                        너무 조용한 사무실보다는 적당한 소음(70데시벨 정도)이 창의력에 도움이 됩니다.
                        맑은 날인데 집중이 필요하다면 '비 오는 소리' ASMR을 듣는 것도
                        뇌를 속여 집중력을 높이는 훌륭한 해킹 방법입니다.
                    </p>
                </div>
            </section>
        </div>
    );
};
