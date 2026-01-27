import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Button, EmotionButton, Input } from '@feellike/ui';
import { moodAtom } from '@/store/atoms';
import { UsageDisplay } from '@/components/UsageDisplay';
import {
    container,
    header,
    title,
    subtitle,
    emotionGrid,
    divider,
    freeTextSection,
    actions,
} from './MoodInputPage.css';

const EMOTIONS = [
    { emoji: '😊', label: '행복해', value: '행복함' },
    { emoji: '😢', label: '우울해', value: '우울함' },
    { emoji: '😴', label: '피곤해', value: '피곤함' },
    { emoji: '🔥', label: '짜릿해', value: '흥분됨' },
    { emoji: '😌', label: '차분해', value: '차분함' },
    { emoji: '😠', label: '화나', value: '화남' },
    { emoji: '😰', label: '불안해', value: '불안함' },
    { emoji: '🥳', label: '신나', value: '신남' },
];

/**
 * MoodInputPage 컴포넌트
 * 사용자의 현재 감정을 선택하거나 입력
 * @author Feel Economy Team
 */
export const MoodInputPage = () => {
    const navigate = useNavigate();
    const [, setMood] = useAtom(moodAtom);
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [freeText, setFreeText] = useState('');

    const handleEmotionSelect = (emotionValue: string) => {
        setSelectedEmotion(emotionValue);
        setFreeText(''); // 감정 선택 시 자유 입력 초기화
    };

    const handleSubmit = () => {
        const finalMood = freeText || selectedEmotion;

        if (!finalMood) {
            alert('감정을 선택하거나 입력해주세요');
            return;
        }

        setMood(finalMood);
        navigate('/loading', { replace: true });
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className={container}>
            <UsageDisplay style={{ position: 'absolute', top: 24, right: 24 }} />
            <div className={header}>
                <h1 className={title}>지금 기분이 어떠세요?</h1>
                <p className={subtitle}>감정을 선택하거나 자유롭게 표현해주세요</p>
            </div>

            <div className={emotionGrid}>
                {EMOTIONS.map((emotion) => (
                    <EmotionButton
                        key={emotion.value}
                        emoji={emotion.emoji}
                        label={emotion.label}
                        selected={selectedEmotion === emotion.value}
                        onClick={() => handleEmotionSelect(emotion.value)}
                    />
                ))}
            </div>

            <div className={divider}>또는</div>

            <div className={freeTextSection}>
                <Input
                    placeholder="지금 기분을 자유롭게 표현해보세요..."
                    value={freeText}
                    onChange={(e) => {
                        setFreeText(e.target.value);
                        setSelectedEmotion(''); // 자유 입력 시 감정 선택 초기화
                    }}
                    inputSize="large"
                />
            </div>

            <div className={actions}>
                <Button variant="outline" size="medium" onClick={handleBack}>
                    돌아가기
                </Button>
                <Button variant="primary" size="large" onClick={handleSubmit}>
                    분석하기 ✨
                </Button>
            </div>
        </div>
    );
};
