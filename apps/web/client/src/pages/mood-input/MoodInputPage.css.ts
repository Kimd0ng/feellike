import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';
import { media } from '../../styles/media';

export const container = style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: SPACING.lg,
    backgroundColor: COLORS.gray[50],
});

export const header = style({
    marginTop: SPACING.xxl,
    marginBottom: SPACING.xl,
    textAlign: 'center',
});

export const title = style({
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.gray[900],
    marginBottom: SPACING.sm,
});

export const subtitle = style({
    fontSize: 16,
    color: COLORS.gray[600],
});

export const contentWrapper = style({
    width: '100%',
    '@media': {
        [media.desktop]: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: SPACING.xxl,
            marginTop: SPACING.xl,
        },
    },
});

export const emotionGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
    '@media': {
        [media.tablet]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        [media.desktop]: {
            flex: 1,
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginBottom: 0,
        },
    },
});

export const divider = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
    color: COLORS.gray[500],
    fontSize: 14,
    '::before': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: COLORS.gray[300],
    },
    '::after': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: COLORS.gray[300],
    },
    '@media': {
        [media.desktop]: {
            display: 'none',
        },
    },
});

export const freeTextSection = style({
    marginBottom: SPACING.xl,
    '@media': {
        [media.desktop]: {
            flex: 1,
            marginBottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
        },
    },
});

export const actions = style({
    display: 'flex',
    justifyContent: 'center',
    gap: SPACING.md,
    marginTop: 'auto',
    paddingTop: SPACING.xl,
});
