import type { PropsWithChildren, HTMLAttributes } from 'react';
import { classNames } from '../../utils/classNames';
import { card, type CardVariants } from './Card.css';

export type CardProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement> & CardVariants
>;

/**
 * Card 컴포넌트
 * 콘텐츠를 담는 카드 레이아웃
 * @author Feel Economy Team
 */
export const Card = ({
    elevation = 'raised',
    glass = false,
    children,
    className,
    ...props
}: CardProps) => {
    return (
        <div className={classNames(card({ elevation, glass }), className)} {...props}>
            {children}
        </div>
    );
};
