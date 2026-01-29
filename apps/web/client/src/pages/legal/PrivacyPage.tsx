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
    table,
    tableHeader,
    tableCell,
    updateDate,
} from './LegalPage.css';

/**
 * 개인정보처리방침 페이지
 * 애드센스 승인을 위한 필수 법적 페이지
 * @author Feel Economy Team
 */
export const PrivacyPage = () => {
    return (
        <div className={container}>
            <section className={heroSection}>
                <h1 className={heroTitle}>개인정보처리방침</h1>
                <p className={heroSubtitle}>
                    FeelLike는 이용자의 개인정보를 소중히 여기며, 관련 법령에 따라 안전하게 보호합니다.
                </p>
            </section>

            <div className={contentSection}>
                <div className={section}>
                    <h2 className={sectionTitle}>1. 개인정보의 수집 및 이용 목적</h2>
                    <p className={paragraph}>
                        FeelLike는 다음의 목적을 위해 개인정보를 수집하고 이용합니다. 수집된 개인정보는 다음의 목적 이외의 용도로는 이용되지 않습니다.
                    </p>
                    <ul className={list}>
                        <li className={listItem}>회원 가입 및 관리: 회원 식별, 서비스 이용 자격 확인</li>
                        <li className={listItem}>서비스 제공: 날씨-감정 분석, 맞춤형 추천 서비스 제공</li>
                        <li className={listItem}>서비스 개선: 서비스 품질 향상을 위한 통계 분석</li>
                        <li className={listItem}>고객 지원: 문의 응대 및 불만 처리</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>2. 수집하는 개인정보 항목</h2>
                    <table className={table}>
                        <thead>
                            <tr>
                                <th className={tableHeader}>구분</th>
                                <th className={tableHeader}>수집 항목</th>
                                <th className={tableHeader}>수집 방법</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={tableCell}>필수 항목</td>
                                <td className={tableCell}>이메일 주소, 비밀번호, 위치 정보</td>
                                <td className={tableCell}>회원가입, 서비스 이용</td>
                            </tr>
                            <tr>
                                <td className={tableCell}>자동 수집</td>
                                <td className={tableCell}>IP 주소, 접속 기록, 쿠키, 기기 정보</td>
                                <td className={tableCell}>서비스 이용 시 자동 생성</td>
                            </tr>
                            <tr>
                                <td className={tableCell}>선택 항목</td>
                                <td className={tableCell}>감정 기록, 날씨 선호도</td>
                                <td className={tableCell}>서비스 이용 중 직접 입력</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>3. 개인정보의 보유 및 이용 기간</h2>
                    <p className={paragraph}>
                        이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 다음과 같이 관계 법령에서 정한 일정한 기간 동안 개인정보를 보관합니다.
                    </p>
                    <ul className={list}>
                        <li className={listItem}>서비스 이용 기록: 3년 (통신비밀보호법)</li>
                        <li className={listItem}>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                        <li className={listItem}>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                        <li className={listItem}>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>4. 개인정보의 제3자 제공</h2>
                    <p className={paragraph}>
                        FeelLike는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.
                    </p>
                    <ul className={list}>
                        <li className={listItem}>이용자가 사전에 동의한 경우</li>
                        <li className={listItem}>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>5. 개인정보의 파기 절차 및 방법</h2>
                    <p className={paragraph}>
                        이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다.
                    </p>
                    <ul className={list}>
                        <li className={listItem}>전자적 파일 형태: 복구 및 재생이 불가능한 방법으로 영구 삭제</li>
                        <li className={listItem}>종이 문서: 분쇄기로 분쇄하거나 소각</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>6. 이용자의 권리와 행사 방법</h2>
                    <p className={paragraph}>
                        이용자는 언제든지 자신의 개인정보에 대해 다음의 권리를 행사할 수 있습니다.
                    </p>
                    <ul className={list}>
                        <li className={listItem}>개인정보 열람 요구</li>
                        <li className={listItem}>오류 등이 있을 경우 정정 요구</li>
                        <li className={listItem}>삭제 요구</li>
                        <li className={listItem}>처리 정지 요구</li>
                    </ul>
                    <p className={paragraph}>
                        위 권리 행사는 서비스 내 설정 메뉴 또는 고객센터(contact@feellike.app)를 통해 가능합니다.
                    </p>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>7. 개인정보 보호책임자</h2>
                    <p className={paragraph}>
                        FeelLike는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제를 처리하기 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                    </p>
                    <ul className={list}>
                        <li className={listItem}>개인정보 보호책임자: FeelLike 개인정보보호팀</li>
                        <li className={listItem}>이메일: privacy@feellike.app</li>
                    </ul>
                </div>

                <div className={section}>
                    <h2 className={sectionTitle}>8. 쿠키의 사용</h2>
                    <p className={paragraph}>
                        FeelLike는 이용자에게 맞춤형 서비스를 제공하기 위해 쿠키를 사용합니다. 쿠키는 웹사이트가 이용자의 브라우저로 전송하는 소량의 정보입니다. 이용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나, 이 경우 서비스 이용에 제한이 있을 수 있습니다.
                    </p>
                </div>

                <p className={updateDate}>
                    본 개인정보처리방침은 2026년 1월 29일부터 시행됩니다.
                </p>
            </div>
        </div>
    );
};
