import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * 결제 실패 페이지
 * 토스페이먼츠 결제 실패 시 리다이렉트
 * @author Feel Economy Team
 */
export const PaymentFailPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const errorCode = searchParams.get('code');
    const errorMessage = searchParams.get('message');

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
            color: 'white',
            padding: 24,
        }}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>😢</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
                결제 실패
            </h1>
            <p style={{ color: '#EF4444', textAlign: 'center', marginBottom: 8 }}>
                {errorMessage || '결제 처리 중 오류가 발생했습니다.'}
            </p>
            {errorCode && (
                <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>
                    오류 코드: {errorCode}
                </p>
            )}
            <button
                onClick={() => navigate('/subscription')}
                style={{
                    padding: '12px 32px',
                    backgroundColor: '#FFE54F',
                    color: '#111827',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: 'pointer',
                }}
            >
                다시 시도하기
            </button>
        </div>
    );
};
