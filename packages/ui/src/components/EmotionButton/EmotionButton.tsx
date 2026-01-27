import type { ButtonHTMLAttributes } from 'react';
import { classNames } from '../../utils/classNames';
import {
    emotionButton,
    emoji as emojiStyle,
    emotionLabel,
    type EmotionButtonVariants,
} from './EmotionButton.css';

export type EmotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    EmotionButtonVariants & {
        emoji: string;
        label: string;
    };

/**
 * EmotionButton 컴포넌트
 * 감정 선택용 버튼 (이모지 + 라벨)
 * @author Feel Economy Team
 */
export const EmotionButton = ({
    emoji,
    label,
    selected = false,
    className,
    ...props
}: EmotionButtonProps) => {
    return (
        <button
            className={classNames(emotionButton({ selected }), className)}
            {...props}
        >
            <span className={emojiStyle}>{emoji}</span>
            <span className={emotionLabel}>{label}</span>
        </button>
    );
};
