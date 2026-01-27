import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@feellike/api';
import { subscriptionKeys } from '@/services/subscription';
import { usageKeys } from '@/services/usage';

/**
 * 결제 성공 페이지
 * 토스페이먼츠에서 리다이렉트 후 빌링키 발급 및 첫 결제 처리
 * @author Feel Economy Team
 */
export const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const processPayment = async () => {
            const authKey = searchParams.get('authKey');
            const customerKey = searchParams.get('customerKey');

            if (!authKey || !customerKey) {
                setErrorMessage('결제 정보가 올바르지 않습니다.');
                setStatus('error');
                return;
            }

            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (!session) {
                    setErrorMessage('로그인이 필요합니다.');
                    setStatus('error');
                    return;
                }

                // 1. 빌링키 발급
                const authResponse = await fetch(
                    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/toss-billing-auth`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${session.access_token}`,
                        },
                        body: JSON.stringify({
                            authKey,
                            customerKey,
                        }),
                    }
                );

                if (!authResponse.ok) {
                    const errorData = await authResponse.json();
                    throw new Error(errorData.error || '빌링키 발급 실패');
                }

                const billingData = await authResponse.json();

                // 2. 첫 결제 실행
                const paymentResponse = await fetch(
                    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/toss-billing-payment`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${session.access_token}`,
                        },
                        body: JSON.stringify({
                            billingKey: billingData.billingKey,
                            customerKey,
                        }),
                    }
                );

                if (!paymentResponse.ok) {
                    const errorData = await paymentResponse.json();
                    throw new Error(errorData.error || '결제 실패');
                }

                // 캐시 무효화
                await queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
                await queryClient.invalidateQueries({ queryKey: usageKeys.all });

                setStatus('success');

                // 3초 후 홈으로 이동
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } catch (err: any) {
                console.error('Payment processing error:', err);
                setErrorMessage(err.message || '결제 처리 중 오류가 발생했습니다.');
                setStatus('error');
            }
        };

        processPayment();
    }, [searchParams, navigate, queryClient]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
                color: 'white',
                padding: 24,
            }}
        >
            {status === 'processing' && (
                <>
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            border: '4px solid #374151',
                            borderTopColor: '#FFE54F',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: 24,
                        }}
                    />
                    <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>결제 처리 중...</h1>
                    <p style={{ color: '#9CA3AF' }}>잠시만 기다려주세요.</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>결제 완료!</h1>
                    <p style={{ color: '#9CA3AF', textAlign: 'center', marginBottom: 24 }}>
                        프리미엄 구독이 시작되었습니다.
                        <br />
                        이제 무제한으로 추천을 받아보세요!
                    </p>
                    <p style={{ color: '#6B7280', fontSize: 14 }}>잠시 후 홈 화면으로 이동합니다...</p>
                </>
            )}

            {status === 'error' && (
                <>
                    <div style={{ fontSize: 64, marginBottom: 24 }}>😢</div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>결제 실패</h1>
                    <p style={{ color: '#EF4444', textAlign: 'center', marginBottom: 24 }}>{errorMessage}</p>
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
                        돌아가기
                    </button>
                </>
            )}

            <style>
                {`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};
