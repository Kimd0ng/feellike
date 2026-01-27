import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.xl}px`,
    padding: `${SPACING.lg}px`,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
});

export const welcomeSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.sm}px`,
});

export const title = style({
    fontSize: '32px',
    fontWeight: 700,
    color: COLORS.gray[900],
});

export const subtitle = style({
    fontSize: '16px',
    color: COLORS.gray[600],
});

export const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: `${SPACING.lg}px`,
});

export const card = style({
    backgroundColor: COLORS.white,
    borderRadius: `${RADIUS.xl}px`,
    padding: `${SPACING.xl}px`,
    boxShadow: SHADOWS.sm,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.md}px`,
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: SHADOWS.md,
    },
});

export const cardTitle = style({
    fontSize: '20px',
    fontWeight: 600,
    color: COLORS.gray[900],
    marginBottom: `${SPACING.xs}px`,
});

export const moodButton = style({
    marginTop: 'auto',
});
