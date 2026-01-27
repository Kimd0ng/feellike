import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@feellike/api';
import { PREMIUM_PLAN, subscriptionKeys } from '@/services/subscription';
import { usageKeys } from '@/services/usage';
import {
    overlay,
    modal,
    header,
    title,
    closeButton,
    content,
    planSummary,
    planInfo,
    planName,
    planPeriod,
    planPrice,
    paymentMethodSection,
    sectionTitle,
    cardInputContainer,
    loadingMessage,
    errorMessage,
    agreement,
    checkbox,
    agreementText,
    footer,
    payButton,
    processingOverlay,
    processingText,
    successMessage,
    successIcon,
    successTitle,
    successDescription,
    paymentMethodGrid,
    paymentMethodButton,
    paymentMethodButtonSelected,
    paymentMethodIcon,
    paymentMethodLabel,
} from './PaymentModal.css';

type PaymentModalProps = {
    onClose: () => void;
    onSuccess?: () => void;
};

type PaymentStep = 'input' | 'processing' | 'success' | 'error';

type TPaymentMethod = {
    id: string;
    label: string;
    icon: string;
    tossMethod: string;
};

const PAYMENT_METHODS: TPaymentMethod[] = [
    { id: 'card', label: '카드', icon: '💳', tossMethod: '카드' },
    { id: 'transfer', label: '계좌이체', icon: '🏦', tossMethod: '계좌이체' },
    { id: 'virtual', label: '가상계좌', icon: '🧾', tossMethod: '가상계좌' },
    { id: 'phone', label: '휴대폰', icon: '📱', tossMethod: '휴대폰' },
    { id: 'tosspay', label: '토스페이', icon: '🔵', tossMethod: '토스페이' },
    { id: 'kakaopay', label: '카카오페이', icon: '💬', tossMethod: '카카오페이' },
];

/**
 * 결제 모달 컴포넌트
 * 토스페이먼츠를 통한 구독 결제 (다양한 결제 수단 지원)
 * @author Feel Economy Team
 */
export const PaymentModal = ({ onClose, onSuccess }: PaymentModalProps) => {
    const queryClient = useQueryClient();
    const [step, setStep] = useState<PaymentStep>('input');
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [sdkError, setSdkError] = useState(false);
    const [tossPayments, setTossPayments] = useState<any>(null);
    const [selectedMethod, setSelectedMethod] = useState<string>('card');

    // 토스페이먼츠 v1 SDK 로드 및 초기화
    useEffect(() => {
        let isMounted = true;

        const initTossPayments = async () => {
            try {
                // 클라이언트 키 확인
                const clientKey = import.meta.env['VITE_TOSS_CLIENT_KEY'];

                // 클라이언트 키가 없으면 SDK 로드 스킵 (테스트 결제만 사용)
                if (!clientKey || typeof clientKey !== 'string' || clientKey.trim() === '') {
                    console.warn('TossPayments client key not configured, using test payment mode');
                    if (isMounted) {
                        setSdkLoaded(true);
                    }
                    return;
                }

                // 이미 로드되어 있으면 재사용
                if ((window as any).TossPayments) {
                    try {
                        const TossPayments = (window as any).TossPayments;
                        const instance = TossPayments(clientKey);
                        if (isMounted) {
                            setTossPayments(instance);
                            setSdkLoaded(true);
                        }
                    } catch (err) {
                        console.error('Failed to initialize existing TossPayments:', err);
                        if (isMounted) {
                            setSdkError(true);
                            setSdkLoaded(true);
                        }
                    }
                    return;
                }

                // SDK 스크립트 로드 (v1)
                const script = document.createElement('script');
                script.src = 'https://js.tosspayments.com/v1/payment';
                script.async = true;

                script.onload = () => {
                    try {
                        const TossPayments = (window as any).TossPayments;
                        if (TossPayments && typeof TossPayments === 'function') {
                            const instance = TossPayments(clientKey);
                            if (isMounted) {
                                setTossPayments(instance);
                                setSdkLoaded(true);
                            }
                        } else {
                            throw new Error('TossPayments SDK not available');
                        }
                    } catch (err) {
                        console.error('Failed to initialize TossPayments:', err);
                        if (isMounted) {
                            setSdkError(true);
                            setSdkLoaded(true);
                        }
                    }
                };

                script.onerror = () => {
                    console.error('Failed to load TossPayments SDK');
                    if (isMounted) {
                        setSdkError(true);
                        setSdkLoaded(true);
                    }
                };

                document.head.appendChild(script);
            } catch (err) {
                console.error('Error in TossPayments initialization:', err);
                if (isMounted) {
                    setSdkError(true);
                    setSdkLoaded(true);
                }
            }
        };

        initTossPayments();

        return () => {
            isMounted = false;
        };
    }, []);

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount) + '원';
    };

    const handlePayment = useCallback(async () => {
        if (!tossPayments || !agreed) return;

        const selectedPaymentMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethod);
        if (!selectedPaymentMethod) return;

        setStep('processing');
        setError(null);

        try {
            const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

            const baseUrl = window.location.origin;
            const successUrl = `${baseUrl}/payment/success`;
            const failUrl = `${baseUrl}/payment/fail`;

            // v1 SDK를 통한 결제 요청
            await tossPayments.requestPayment(selectedPaymentMethod.tossMethod, {
                amount: PREMIUM_PLAN.price,
                orderId,
                orderName: `${PREMIUM_PLAN.name} 플랜 구독`,
                successUrl,
                failUrl,
            });

            // 참고: 실제 플로우에서는 successUrl로 리다이렉트 후
            // 서버에서 결제 승인 및 구독 처리를 진행합니다.
        } catch (err: any) {
            console.error('Payment error:', err);

            if (err.code === 'USER_CANCEL') {
                setStep('input');
                return;
            }

            setError(err.message || '결제 처리 중 오류가 발생했습니다.');
            setStep('error');
        }
    }, [tossPayments, agreed, selectedMethod]);

    // 개발 모드용 테스트 결제
    const handleTestPayment = async () => {
        setStep('processing');
        setError(null);

        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                throw new Error('로그인이 필요합니다.');
            }

            const customerKey = `FL_USER_${session.user.id}`;
            const mockAuthKey = `mock_auth_${Date.now()}`;

            // 빌링키 발급 요청
            const authResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/toss-billing-auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                    authKey: mockAuthKey,
                    customerKey,
                }),
            });

            if (!authResponse.ok) {
                const errorData = await authResponse.json();
                throw new Error(errorData.error || '빌링키 발급 실패');
            }

            const billingData = await authResponse.json();

            // 결제 요청
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

            setStep('success');

            // 3초 후 모달 닫기
            setTimeout(() => {
                onSuccess?.();
                onClose();
            }, 3000);
        } catch (err: any) {
            console.error('Test payment error:', err);
            setError(err.message || '결제 처리 중 오류가 발생했습니다.');
            setStep('error');
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && step === 'input') {
            onClose();
        }
    };

    return (
        <div className={overlay} onClick={handleOverlayClick}>
            <div className={modal} style={{ position: 'relative' }}>
                {/* 처리 중 오버레이 */}
                {step === 'processing' && (
                    <div className={processingOverlay}>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                border: '3px solid #374151',
                                borderTopColor: '#FFE54F',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                marginBottom: 16,
                            }}
                        />
                        <p className={processingText}>결제 처리 중...</p>
                    </div>
                )}

                {/* 성공 화면 */}
                {step === 'success' ? (
                    <div className={successMessage}>
                        <div className={successIcon}>🎉</div>
                        <h2 className={successTitle}>구독 완료!</h2>
                        <p className={successDescription}>
                            프리미엄 플랜으로 업그레이드되었습니다.
                            <br />
                            이제 무제한으로 추천을 받아보세요!
                        </p>
                    </div>
                ) : (
                    <>
                        <div className={header}>
                            <h2 className={title}>결제하기</h2>
                            <button className={closeButton} onClick={onClose}>
                                ×
                            </button>
                        </div>

                        <div className={content}>
                            {/* 플랜 요약 */}
                            <div className={planSummary}>
                                <div className={planInfo}>
                                    <p className={planName}>{PREMIUM_PLAN.name} 플랜</p>
                                    <p className={planPeriod}>월간 구독</p>
                                </div>
                                <p className={planPrice}>{formatAmount(PREMIUM_PLAN.price)}</p>
                            </div>

                            {/* 에러 메시지 */}
                            {error && <div className={errorMessage}>{error}</div>}

                            {/* 결제 수단 */}
                            <div className={paymentMethodSection}>
                                <p className={sectionTitle}>결제 수단</p>
                                <div className={cardInputContainer}>
                                    {!sdkLoaded ? (
                                        <div className={loadingMessage}>결제 모듈을 불러오는 중...</div>
                                    ) : sdkError ? (
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
                                                color: '#EF4444',
                                                textAlign: 'center',
                                                padding: 20,
                                            }}
                                        >
                                            <p style={{ marginBottom: 16 }}>결제 모듈 로드에 실패했습니다.</p>
                                            <p style={{ fontSize: 14, color: '#6B7280' }}>테스트 결제로 진행합니다.</p>
                                        </div>
                                    ) : tossPayments ? (
                                        <div className={paymentMethodGrid}>
                                            {PAYMENT_METHODS.map((method) => (
                                                <button
                                                    key={method.id}
                                                    type="button"
                                                    className={
                                                        selectedMethod === method.id
                                                            ? paymentMethodButtonSelected
                                                            : paymentMethodButton
                                                    }
                                                    onClick={() => setSelectedMethod(method.id)}
                                                >
                                                    <span className={paymentMethodIcon}>{method.icon}</span>
                                                    <span className={paymentMethodLabel}>{method.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
                                                color: '#9CA3AF',
                                                textAlign: 'center',
                                                padding: 20,
                                            }}
                                        >
                                            <p style={{ marginBottom: 16 }}>테스트 결제 모드</p>
                                            <p style={{ fontSize: 14, color: '#6B7280' }}>
                                                개발 모드에서는 테스트 결제를 진행합니다.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 동의 체크박스 */}
                            <label className={agreement}>
                                <input
                                    type="checkbox"
                                    className={checkbox}
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <span className={agreementText}>
                                    정기결제에 동의합니다. 구독은 매월 자동으로 갱신되며, 언제든 취소할 수 있습니다.
                                </span>
                            </label>
                        </div>

                        <div className={footer}>
                            <button
                                className={payButton}
                                onClick={tossPayments ? handlePayment : handleTestPayment}
                                disabled={!agreed || step === 'processing' || !sdkLoaded}
                            >
                                {!sdkLoaded ? '로딩 중...' : `${formatAmount(PREMIUM_PLAN.price)} 결제하기`}
                            </button>
                        </div>
                    </>
                )}
            </div>

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
