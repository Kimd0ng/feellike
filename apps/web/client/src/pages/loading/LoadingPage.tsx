import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { moodAtom, weatherAtom, recommendationAtom } from '@/store/atoms';
import { getTimeOfDay } from '@/utils/helpers';
import { useRecommendationMutation, UsageLimitExceededError } from '@/services/recommendation';
import { useSaveEmotionLogMutation } from '@/services/history';
import { UsageLimitModal } from '@/components/UsageLimitModal';
import { container, content, spinner, message, submessage } from './LoadingPage.css';

/**
 * LoadingPage 컴포넌트
 * AI 분석 중 로딩 화면
 * @author Feel Economy Team
 */
export const LoadingPage = () => {
    const navigate = useNavigate();
    const [mood] = useAtom(moodAtom);
    const [weather] = useAtom(weatherAtom);
    const [, setRecommendation] = useAtom(recommendationAtom);
    const [showUsageLimitModal, setShowUsageLimitModal] = useState(false);
    const hasRequestedRef = useRef(false);

    const { mutateAsync } = useRecommendationMutation();
    const { mutateAsync: saveLog } = useSaveEmotionLogMutation();

    // 최초 요청 - mutateAsync로 직접 Promise 처리
    useEffect(() => {
        if (hasRequestedRef.current) {
            return;
        }

        if (!mood || !weather) {
            navigate('/', { replace: true });
            return;
        }

        hasRequestedRef.current = true;

        const fetchRecommendation = async () => {
            console.log('[LOADING] Calling mutateAsync...');
            try {
                const result = await mutateAsync({
                    mood,
                    weather: {
                        temp: weather.temp,
                        condition: weather.condition,
                        description: weather.description,
                    },
                    timeOfDay: getTimeOfDay(),
                });

                console.log('[LOADING] mutateAsync resolved:', result);

                if (result) {
                    setRecommendation(result);

                    // 감정 로그 저장
                    try {
                        await saveLog({
                            mood,
                            weather: {
                                temp: weather.temp,
                                condition: weather.condition,
                                description: weather.description,
                                icon: weather.icon || '',
                            },
                            recommendation: result,
                        });
                        console.log('[LOADING] Emotion log saved successfully');
                    } catch (saveError) {
                        console.error('[LOADING] Failed to save emotion log:', saveError);
                        // 저장 실패해도 결과 페이지로 이동
                    }

                    setTimeout(() => {
                        console.log('[LOADING] Navigating to /result');
                        navigate('/result', { replace: true });
                    }, 500);
                }
            } catch (err) {
                console.error('[LOADING] mutateAsync error:', err);
                
                // 사용량 제한 초과 에러 처리
                if (err instanceof UsageLimitExceededError) {
                    setShowUsageLimitModal(true);
                    return;
                }

                alert('추천을 가져오는 데 실패했습니다. 다시 시도해주세요.');
                navigate('/mood-input', { replace: true });
            }
        };

        fetchRecommendation();
    }, [mood, weather, navigate, mutateAsync, setRecommendation, saveLog]);

    const handleUsageLimitModalClose = () => {
        setShowUsageLimitModal(false);
        navigate('/mood-input', { replace: true });
    };

    return (
        <>
            <div className={container}>
                <div className={content}>
                    <div className={spinner} />
                    <p className={message}>당신의 기분을 분석하고 있어요...</p>
                    <p className={submessage}>잠시만 기다려주세요 ✨</p>
                </div>
            </div>

            {showUsageLimitModal && (
                <UsageLimitModal onClose={handleUsageLimitModalClose} />
            )}
        </>
    );
};
