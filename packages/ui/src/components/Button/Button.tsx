import type { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import { classNames } from '../../utils/classNames';
import { button, type ButtonVariants } from './Button.css';

export type ButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants
>;

/**
 * Button 컴포넌트
 * 다양한 variant와 size를 지원하는 버튼
 * @author Feel Economy Team
 */
export const Button = ({
    variant = 'primary',
    size = 'medium',
    children,
    className,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={classNames(button({ variant, size }), className)}
            {...props}
        >
            {children}
        </button>
    );
};
