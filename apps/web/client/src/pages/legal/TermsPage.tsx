import {
    container,
    heroSection,
    heroTitle,
    heroSubtitle,
    contentSection,
    section,
    sectionTitle,
    paragraph,
    list,
    listItem,
    updateDate,
} from './LegalPage.css';

/**
 * 이용약관 페이지
 * 애드센스 승인을 위한 필수 법적 페이지
 * @author Feel Economy Team
 */
export const TermsPage = () => {
    return (
        <div className={container}>
            <section className={heroSection}>
                <h1 className={heroTitle}>서비스 이용약관</h1>
                <p className={heroSubtitle}>
                    FeelLike 서비스를 이용하시기 전에 아래 약관을 주의 깊게 읽어주시기 바랍니다.
                </p>
            </section>

            <div className={contentSection}>
                <div className={section}>
                    <h2 className={sectionTitle}>제1조 (목적)</h2>
                    <p className={paragraph}>
                        본 약관은 FeelLike(이하 "회사")가 제공하는 날씨-감정 분석 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                    </p>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제2조 (정의)</h2>
                    <ul className={list}>
                        <li className={listItem}>"서비스"란 회사가 제공하는 날씨 정보 기반 감정 분석 및 맞춤형 추천 서비스를 의미합니다.</li>
                        <li className={listItem}>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                        <li className={listItem}>"회원"이란 회사와 서비스 이용계약을 체결하고 이용자 아이디(ID)를 부여받은 자를 말합니다.</li>
                        <li className={listItem}>"콘텐츠"란 서비스 내에서 제공되는 모든 정보, 데이터, 텍스트, 이미지 등을 의미합니다.</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제3조 (약관의 효력 및 변경)</h2>
                    <ul className={list}>
                        <li className={listItem}>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
                        <li className={listItem}>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</li>
                        <li className={listItem}>약관이 변경되는 경우 회사는 변경 사항을 시행일자 7일 전부터 공지합니다.</li>
                        <li className={listItem}>이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제4조 (서비스의 제공)</h2>
                    <p className={paragraph}>
                        회사는 다음과 같은 서비스를 제공합니다.
                    </p>
                    <ul className={list}>
                        <li className={listItem}>실시간 날씨 정보 제공</li>
                        <li className={listItem}>날씨와 감정의 상관관계 분석</li>
                        <li className={listItem}>맞춤형 활동 및 콘텐츠 추천</li>
                        <li className={listItem}>감정 기록 및 히스토리 관리</li>
                        <li className={listItem}>기타 회사가 정하는 서비스</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제5조 (회원가입)</h2>
                    <ul className={list}>
                        <li className={listItem}>이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후, 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.</li>
                        <li className={listItem}>회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.</li>
                        <li className={listItem}>가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                        <li className={listItem}>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                        <li className={listItem}>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제6조 (회원 탈퇴 및 자격 상실)</h2>
                    <ul className={list}>
                        <li className={listItem}>회원은 회사에 언제든지 탈퇴를 요청할 수 있으며, 회사는 즉시 회원탈퇴를 처리합니다.</li>
                        <li className={listItem}>회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.</li>
                        <li className={listItem}>가입 신청 시에 허위 내용을 등록한 경우</li>
                        <li className={listItem}>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                        <li className={listItem}>서비스를 이용하여 법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제7조 (이용자의 의무)</h2>
                    <p className={paragraph}>
                        이용자는 다음 행위를 하여서는 안 됩니다.
                    </p>
                    <ul className={list}>
                        <li className={listItem}>신청 또는 변경 시 허위 내용의 등록</li>
                        <li className={listItem}>타인의 정보 도용</li>
                        <li className={listItem}>회사가 게시한 정보의 변경</li>
                        <li className={listItem}>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                        <li className={listItem}>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                        <li className={listItem}>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                        <li className={listItem}>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제8조 (서비스의 중단)</h2>
                    <ul className={list}>
                        <li className={listItem}>회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                        <li className={listItem}>회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상하지 않습니다. 단, 회사에 고의 또는 중과실이 있는 경우에는 그러하지 아니합니다.</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제9조 (저작권의 귀속 및 이용제한)</h2>
                    <ul className={list}>
                        <li className={listItem}>회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</li>
                        <li className={listItem}>이용자는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제10조 (분쟁해결)</h2>
                    <ul className={list}>
                        <li className={listItem}>회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 고객센터를 운영합니다.</li>
                        <li className={listItem}>회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다.</li>
                        <li className={listItem}>회사와 이용자 간에 발생한 분쟁은 대한민국 법을 적용합니다.</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>제11조 (면책조항)</h2>
                    <ul className={list}>
                        <li className={listItem}>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                        <li className={listItem}>회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</li>
                        <li className={listItem}>회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</li>
                    </ul>
                </div>

                <p className={updateDate}>
                    본 이용약관은 2026년 1월 29일부터 시행됩니다.
                </p>
            </div>
        </div>
    );
};
