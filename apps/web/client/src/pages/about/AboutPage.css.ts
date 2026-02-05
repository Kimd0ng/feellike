import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F9FAFB',
});

export const heroSection = style({
    width: '100%',
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: COLORS.gray[50], // Using grey from shared colors if available, or fallback to gray
    gap: `${SPACING.lg}px`,
    borderBottom: `1px solid ${COLORS.gray[100]}`,
});

export const heroTitle = style({
    fontSize: '48px',
    fontWeight: 800,
    color: COLORS.gray[900],
    marginBottom: `${SPACING.md}px`,
    lineHeight: 1.2,
    '@media': {
        'screen and (max-width: 768px)': {
            fontSize: '32px',
        },
    },
});

export const heroSubtitle = style({
    fontSize: '20px',
    color: COLORS.gray[600],
    maxWidth: '700px',
    lineHeight: 1.6,
});

export const section = style({
    width: '100%',
    maxWidth: '1200px',
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: `${SPACING.xl}px`,
});

export const sectionTitle = style({
    fontSize: '32px',
    fontWeight: 700,
    color: COLORS.gray[900],
    textAlign: 'center',
    marginBottom: `${SPACING.lg}px`,
});

export const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: `${SPACING.xl}px`,
    width: '100%',
});

export const card = style({
    padding: `${SPACING.xl}px`,
    backgroundColor: COLORS.white,
    borderRadius: `${RADIUS.xl}px`,
    border: `1px solid ${COLORS.gray[200]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.md}px`,
});

export const cardIcon = style({
    fontSize: '40px',
    marginBottom: `${SPACING.xs}px`,
});

export const cardTitle = style({
    fontSize: '20px',
    fontWeight: 600,
    color: COLORS.gray[900],
});

export const cardDesc = style({
    color: COLORS.gray[600],
    lineHeight: 1.5,
});

export const ctaSection = style({
    width: '100%',
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    backgroundColor: COLORS.primary[50],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: `${SPACING.lg}px`,
});
