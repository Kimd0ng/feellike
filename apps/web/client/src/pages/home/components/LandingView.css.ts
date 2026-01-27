import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
});

export const hero = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    maxWidth: '800px',
    gap: `${SPACING.lg}px`,
});

export const title = style({
    fontSize: '48px',
    fontWeight: 800,
    background: `linear-gradient(135deg, ${COLORS.primary[500]} 0%, ${COLORS.secondary[500]} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1.2,
    '@media': {
        'screen and (max-width: 768px)': {
            fontSize: '32px',
        },
    },
});

export const subtitle = style({
    fontSize: '20px',
    color: COLORS.gray[600],
    maxWidth: '600px',
    lineHeight: 1.6,
});

export const features = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: `${SPACING.xl}px`,
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    backgroundColor: COLORS.gray[50],
    width: '100%',
    maxWidth: '1200px',
    borderRadius: `${RADIUS.xxl}px`,
    marginTop: `${SPACING.xl}px`,
});

export const featureCard = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: `${SPACING.md}px`,
    padding: `${SPACING.xl}px`,
});

export const featureTitle = style({
    fontSize: '24px',
    fontWeight: 700,
    color: COLORS.gray[900],
});

export const featureDesc = style({
    color: COLORS.gray[600],
});
