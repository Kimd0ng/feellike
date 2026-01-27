import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { RADIUS, SHADOWS, TRANSITIONS } from '../../styles/tokens.css.ts';
import { COLORS } from '../../styles/colors.css.ts';

export const emotionButton = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 20,
        border: `2px solid ${COLORS.gray[200]}`,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.white,
        cursor: 'pointer',
        transition: `all ${TRANSITIONS.normal}`,
        minWidth: 100,
        ':hover': {
            borderColor: COLORS.primary[300],
            backgroundColor: COLORS.primary[50],
            transform: 'translateY(-4px)',
            boxShadow: SHADOWS.lg,
        },
        ':active': {
            transform: 'translateY(-2px)',
        },
    },

    variants: {
        selected: {
            true: {
                borderColor: COLORS.primary[300],
                backgroundColor: COLORS.primary[100],
                boxShadow: SHADOWS.md,
            },
            false: {},
        },
    },

    defaultVariants: {
        selected: false,
    },
});

export const emoji = style({
    fontSize: 40,
    lineHeight: 1,
});

export const emotionLabel = style({
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.gray[900],
});

export type EmotionButtonVariants = RecipeVariants<typeof emotionButton>;
