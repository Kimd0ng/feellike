import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { RADIUS, TRANSITIONS } from '../../styles/tokens.css.ts';
import { COLORS } from '../../styles/colors.css.ts';

export const inputWrapper = style({
    position: 'relative',
    width: '100%',
});

export const input = recipe({
    base: {
        width: '100%',
        border: `1px solid ${COLORS.gray[300]}`,
        borderRadius: RADIUS.md,
        fontSize: 16,
        transition: `all ${TRANSITIONS.normal}`,
        outline: 'none',
        color: COLORS.gray[900],
        backgroundColor: COLORS.white,
        '::placeholder': {
            color: COLORS.gray[400],
        },
        ':focus': {
            borderColor: COLORS.primary[300],
            boxShadow: `0 0 0 3px ${COLORS.primary[50]}`,
        },
        ':disabled': {
            backgroundColor: COLORS.gray[50],
            cursor: 'not-allowed',
        },
    },

    variants: {
        hasError: {
            true: {
                borderColor: COLORS.error.main,
                ':focus': {
                    borderColor: COLORS.error.main,
                    boxShadow: `0 0 0 3px ${COLORS.error.light}`,
                },
            },
            false: {},
        },
        hasLeftIcon: {
            true: {
                paddingLeft: 44,
            },
            false: {
                paddingLeft: 16,
            },
        },
        hasRightIcon: {
            true: {
                paddingRight: 44,
            },
            false: {
                paddingRight: 16,
            },
        },
        inputSize: {
            small: {
                height: 36,
                fontSize: 14,
            },
            medium: {
                height: 44,
                fontSize: 16,
            },
            large: {
                height: 52,
                fontSize: 18,
            },
        },
    },

    defaultVariants: {
        hasError: false,
        hasLeftIcon: false,
        hasRightIcon: false,
        inputSize: 'medium',
    },
});

export const iconLeft = style({
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.gray[500],
    pointerEvents: 'none',
});

export const iconRight = style({
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.gray[500],
    pointerEvents: 'none',
});

export const label = style({
    display: 'block',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.gray[700],
});

export const helperText = style({
    display: 'block',
    marginTop: 4,
    fontSize: 12,
    color: COLORS.gray[500],
});

export const errorText = style({
    display: 'block',
    marginTop: 4,
    fontSize: 12,
    color: COLORS.error.main,
});

export type InputVariants = RecipeVariants<typeof input>;
