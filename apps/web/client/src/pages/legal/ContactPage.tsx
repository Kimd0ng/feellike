import {
    container,
    heroSection,
    heroTitle,
    heroSubtitle,
    contentSection,
    contactCard,
    cardIcon,
    cardTitle,
    cardDesc,
    cardLink,
    faqSection,
    faqTitle,
    faqItem,
    faqQuestion,
    faqAnswer,
    businessInfo,
    businessTitle,
    businessText,
} from './ContactPage.css';

/**
 * 고객센터 페이지
 * 애드센스 승인을 위한 필수 법적 페이지
 * @author Feel Economy Team
 */
export const ContactPage = () => {
    return (
        <div className={container}>
            <section className={heroSection}>
                <h1 className={heroTitle}>고객센터</h1>
                <p className={heroSubtitle}>
                    궁금한 점이 있으시면 언제든 문의해 주세요. 최대한 빠르게 답변 드리겠습니다.
                </p>
            </section>

            <div className={contentSection}>
                <div className={contactCard}>
                    <div className={cardIcon}>📧</div>
                    <h3 className={cardTitle}>이메일 문의</h3>
                    <p className={cardDesc}>
                        일반적인 문의사항이나 제안은 이메일로 보내주세요. 영업일 기준 24시간 이내에 답변 드립니다.
                    </p>
                    <a href="mailto:support@feellike.app" className={cardLink}>
                        support@feellike.app
                    </a>
                </div>

                <div className={contactCard}>
                    <div className={cardIcon}>💬</div>
                    <h3 className={cardTitle}>실시간 채팅</h3>
                    <p className={cardDesc}>
                        긴급한 문의는 실시간 채팅으로 빠르게 해결하세요. 평일 오전 9시 ~ 오후 6시 운영됩니다.
                    </p>
                    <span className={cardLink}>
                        서비스 준비 중
                    </span>
                </div>

                <div className={contactCard}>
                    <div className={cardIcon}>📱</div>
                    <h3 className={cardTitle}>카카오톡 상담</h3>
                    <p className={cardDesc}>
                        카카오톡 채널을 통해 편리하게 문의하실 수 있습니다. 채널 추가 후 메시지를 보내주세요.
                    </p>
                    <span className={cardLink}>
                        @FeelLike
                    </span>
                </div>

                <div className={contactCard}>
                    <div className={cardIcon}>🐛</div>
                    <h3 className={cardTitle}>버그 신고</h3>
                    <p className={cardDesc}>
                        서비스 이용 중 오류를 발견하셨나요? 상세한 내용과 함께 신고해 주시면 빠르게 수정하겠습니다.
                    </p>
                    <a href="mailto:bugs@feellike.app" className={cardLink}>
                        bugs@feellike.app
                    </a>
                </div>
            </div>

            <section className={faqSection}>
                <h2 className={faqTitle}>자주 묻는 질문</h2>

                <div className={faqItem}>
                    <h3 className={faqQuestion}>Q. 회원 탈퇴는 어떻게 하나요?</h3>
                    <p className={faqAnswer}>
                        로그인 후 설정 메뉴에서 '계정 관리' → '회원 탈퇴'를 선택하시면 됩니다. 탈퇴 시 모든 데이터가 삭제되며 복구가 불가능합니다.
                    </p>
                </div>

                <div className={faqItem}>
                    <h3 className={faqQuestion}>Q. 비밀번호를 잊어버렸어요.</h3>
                    <p className={faqAnswer}>
                        로그인 페이지에서 '비밀번호 찾기'를 클릭하신 후, 가입 시 사용한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
                    </p>
                </div>

                <div className={faqItem}>
                    <h3 className={faqQuestion}>Q. 위치 정보는 어떻게 수집되나요?</h3>
                    <p className={faqAnswer}>
                        FeelLike는 날씨 정보를 제공하기 위해 사용자의 위치 정보를 수집합니다. 위치 정보는 브라우저의 위치 서비스를 통해 수집되며, 정확한 날씨 정보 제공 외의 목적으로는 사용되지 않습니다.
                    </p>
                </div>

                <div className={faqItem}>
                    <h3 className={faqQuestion}>Q. 프리미엄 구독을 취소하고 싶어요.</h3>
                    <p className={faqAnswer}>
                        설정 메뉴의 '구독 관리'에서 언제든지 구독을 취소하실 수 있습니다. 취소 후에도 결제 기간이 끝날 때까지 프리미엄 기능을 이용하실 수 있습니다.
                    </p>
                </div>

                <div className={faqItem}>
                    <h3 className={faqQuestion}>Q. 내 데이터를 다운로드할 수 있나요?</h3>
                    <p className={faqAnswer}>
                        네, 설정 메뉴의 '데이터 관리'에서 지금까지 기록한 모든 감정 데이터를 JSON 또는 CSV 형식으로 다운로드하실 수 있습니다.
                    </p>
                </div>
            </section>

            <div className={businessInfo}>
                <h4 className={businessTitle}>FeelLike 사업자 정보</h4>
                <p className={businessText}>
                    상호명: FeelLike (필라이크)<br />
                    대표자: FeelLike Team<br />
                    사업자등록번호: 000-00-00000<br />
                    통신판매업신고번호: 제0000-서울강남-0000호<br />
                    이메일: contact@feellike.app<br />
                    주소: 서울특별시 강남구<br />
                </p>
            </div>
        </div>
    );
};
