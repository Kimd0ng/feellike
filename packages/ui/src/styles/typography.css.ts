/**
 * 타이포그래피 토큰 시스템
 * Pretendard 폰트를 사용한 한글 최적화
 * @author Feel Economy Team
 */
export const TYPOGRAPHY = {
    display: {
        large: {
            fontSize: 48,
            fontWeight: 700,
            lineHeight: '120%',
            letterSpacing: '-0.02em',
        },
        medium: {
            fontSize: 36,
            fontWeight: 700,
            lineHeight: '130%',
            letterSpacing: '-0.01em',
        },
        small: {
            fontSize: 28,
            fontWeight: 700,
            lineHeight: '140%',
        },
    },

    heading: {
        large: {
            fontSize: 24,
            fontWeight: 700,
            lineHeight: '140%',
        },
        medium: {
            fontSize: 20,
            fontWeight: 700,
            lineHeight: '150%',
        },
        small: {
            fontSize: 18,
            fontWeight: 600,
            lineHeight: '150%',
        },
    },

    body: {
        large: {
            fontSize: 16,
            fontWeight: 500,
            lineHeight: '160%',
        },
        medium: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '160%',
        },
        small: {
            fontSize: 12,
            fontWeight: 500,
            lineHeight: '160%',
        },
        xsmall: {
            fontSize: 11,
            fontWeight: 400,
            lineHeight: '150%',
        },
    },

    caption: {
        fontSize: 10,
        fontWeight: 400,
        lineHeight: '140%',
    },
} as const;
