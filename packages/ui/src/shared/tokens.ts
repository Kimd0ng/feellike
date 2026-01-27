/**
 * 디자인 토큰 시스템 (공통)
 * Web과 React Native에서 공유하는 토큰 값
 * @author Feel Economy Team
 */

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

export const RADIUS = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
} as const;

export const FONT_SIZE = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
} as const;

export const FONT_WEIGHT = {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
};

export const LINE_HEIGHT = {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
} as const;

export type TSpacing = typeof SPACING;
export type TRadius = typeof RADIUS;
export type TFontSize = typeof FONT_SIZE;
