import type { InputHTMLAttributes, ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import {
    inputWrapper,
    input,
    iconLeft,
    iconRight,
    label as labelStyle,
    helperText as helperTextStyle,
    errorText as errorTextStyle,
    type InputVariants,
} from './Input.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
    Omit<InputVariants, 'hasLeftIcon' | 'hasRightIcon' | 'hasError'> & {
        label?: string;
        helperText?: string;
        errorText?: string;
        leftIcon?: ReactNode;
        rightIcon?: ReactNode;
        inputSize?: 'small' | 'medium' | 'large';
    };

/**
 * Input 컴포넌트
 * 아이콘, 라벨, 에러 메시지를 지원하는 입력 필드
 * @author Feel Economy Team
 */
export const Input = ({
    label,
    helperText,
    errorText,
    leftIcon,
    rightIcon,
    inputSize = 'medium',
    className,
    ...props
}: InputProps) => {
    const hasError = Boolean(errorText);

    return (
        <div>
            {label && <label className={labelStyle}>{label}</label>}
            <div className={inputWrapper}>
                {leftIcon && <div className={iconLeft}>{leftIcon}</div>}
                <input
                    className={classNames(
                        input({
                            hasError,
                            hasLeftIcon: Boolean(leftIcon),
                            hasRightIcon: Boolean(rightIcon),
                            inputSize,
                        }),
                        className
                    )}
                    {...props}
                />
                {rightIcon && <div className={iconRight}>{rightIcon}</div>}
            </div>
            {errorText && <span className={errorTextStyle}>{errorText}</span>}
            {!errorText && helperText && (
                <span className={helperTextStyle}>{helperText}</span>
            )}
        </div>
    );
};
