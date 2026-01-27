import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { RADIUS, SHADOWS, TRANSITIONS } from '../../styles/tokens.css.ts';
import { COLORS } from '../../styles/colors.css.ts';

export const button = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        border: 'none',
        cursor: 'pointer',
        transition: `all ${TRANSITIONS.normal}`,
        fontWeight: 600,
        borderRadius: RADIUS.md,
        ':disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    },

    variants: {
        variant: {
            primary: {
                backgroundColor: COLORS.primary[300],
                color: COLORS.gray[900],
                boxShadow: SHADOWS.md,
                ':hover:not(:disabled)': {
                    backgroundColor: COLORS.primary[400],
                    transform: 'translateY(-2px)',
                    boxShadow: SHADOWS.lg,
                },
                ':active:not(:disabled)': {
                    transform: 'translateY(0)',
                },
            },
            secondary: {
                backgroundColor: COLORS.gray[100],
                color: COLORS.gray[700],
                ':hover:not(:disabled)': {
                    backgroundColor: COLORS.gray[200],
                },
            },
            outline: {
                backgroundColor: 'transparent',
                color: COLORS.gray[700],
                border: `2px solid ${COLORS.gray[300]}`,
                ':hover:not(:disabled)': {
                    backgroundColor: COLORS.gray[50],
                    borderColor: COLORS.gray[400],
                    color: COLORS.gray[900],
                },
            },
            ghost: {
                backgroundColor: 'transparent',
                color: COLORS.gray[600],
                ':hover:not(:disabled)': {
                    backgroundColor: COLORS.gray[100],
                    color: COLORS.gray[900],
                },
            },
        },

        size: {
            small: {
                height: 36,
                padding: '0 16px',
                fontSize: 14,
            },
            medium: {
                height: 44,
                padding: '0 24px',
                fontSize: 16,
            },
            large: {
                height: 56,
                padding: '0 32px',
                fontSize: 18,
            },
            fullWidth: {
                width: '100%',
                height: 48,
                padding: '0 24px',
                fontSize: 16,
            },
        },
    },

    defaultVariants: {
        variant: 'primary',
        size: 'medium',
    },
});

export type ButtonVariants = RecipeVariants<typeof button>;
