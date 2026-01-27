import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { COLORS } from '../../styles/colors.css.ts';
import { RADIUS, SHADOWS } from '../../styles/tokens.css.ts';

export const card = recipe({
    base: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.lg,
        padding: 24,
    },

    variants: {
        elevation: {
            flat: {
                boxShadow: SHADOWS.none,
                border: `1px solid ${COLORS.gray[200]}`,
            },
            raised: {
                boxShadow: SHADOWS.md,
            },
            floating: {
                boxShadow: SHADOWS.xl,
            },
        },
        glass: {
            true: {
                backgroundColor: COLORS.glass.light,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${COLORS.gray[200]}`,
            },
            false: {},
        },
    },

    defaultVariants: {
        elevation: 'raised',
        glass: false,
    },
});

export type CardVariants = RecipeVariants<typeof card>;
