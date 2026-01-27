/**
 * 색상 토큰 시스템 (공통)
 * Web과 React Native에서 공유하는 색상 값
 * @author Feel Economy Team
 */
export const COLORS = {
    // Primary - 따뜻한 노란색 계열
    primary: {
        50: '#FFF9E6',
        100: '#FFF3CC',
        200: '#FFE799',
        300: '#FFE54F',  // Main
        400: '#FFD700',
        500: '#FFC700',
    },

    // Secondary - 차분한 청록색
    secondary: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#06B6D4',
    },

    // Weather-themed colors
    weather: {
        sunny: '#FDB813',
        cloudy: '#94A3B8',
        rainy: '#3B82F6',
        snowy: '#DBEAFE',
    },

    // Emotion-themed colors
    emotion: {
        happy: '#FCD34D',
        sad: '#60A5FA',
        excited: '#F87171',
        calm: '#86EFAC',
        tired: '#C4B5FD',
        angry: '#FB923C',
    },

    // Grayscale
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },

    // Semantic colors
    success: {
        main: '#10B981',
        light: '#D1FAE5',
        dark: '#047857',
    },

    error: {
        main: '#EF4444',
        light: '#FEE2E2',
        dark: '#B91C1C',
    },

    warning: {
        main: '#F59E0B',
        light: '#FEF3C7',
        dark: '#D97706',
    },

    info: {
        main: '#3B82F6',
        light: '#DBEAFE',
        dark: '#1D4ED8',
    },

    // Base colors
    white: '#FFFFFF',
    black: '#000000',

    // Glassmorphism
    glass: {
        light: 'rgba(255, 255, 255, 0.1)',
        dark: 'rgba(0, 0, 0, 0.1)',
    },
} as const;

export type TColors = typeof COLORS;
