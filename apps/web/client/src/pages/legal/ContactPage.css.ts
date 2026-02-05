import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F9FAFB',
    minHeight: '100%',
});

export const heroSection = style({
    width: '100%',
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: COLORS.gray[50],
    gap: `${SPACING.lg}px`,
    borderBottom: `1px solid ${COLORS.gray[100]}`,
});

export const heroTitle = style({
    fontSize: '40px',
    fontWeight: 800,
    color: COLORS.gray[900],
    marginBottom: `${SPACING.md}px`,
    lineHeight: 1.2,
    '@media': {
        'screen and (max-width: 768px)': {
            fontSize: '28px',
        },
    },
});

export const heroSubtitle = style({
    fontSize: '18px',
    color: COLORS.gray[600],
    maxWidth: '600px',
    lineHeight: 1.6,
});

export const contentSection = style({
    width: '100%',
    maxWidth: '1000px',
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: `${SPACING.xl}px`,
    '@media': {
        'screen and (max-width: 768px)': {
            gridTemplateColumns: '1fr',
        },
    },
});

export const contactCard = style({
    padding: `${SPACING.xl}px`,
    backgroundColor: COLORS.white,
    borderRadius: `${RADIUS.xl}px`,
    border: `1px solid ${COLORS.gray[200]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.md}px`,
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    ':hover': {
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        transform: 'translateY(-4px)',
    },
});

export const cardIcon = style({
    fontSize: '48px',
    marginBottom: `${SPACING.sm}px`,
});

export const cardTitle = style({
    fontSize: '22px',
    fontWeight: 700,
    color: COLORS.gray[900],
});

export const cardDesc = style({
    fontSize: '16px',
    color: COLORS.gray[600],
    lineHeight: 1.6,
});

export const cardLink = style({
    fontSize: '16px',
    color: COLORS.primary[500],
    fontWeight: 600,
    textDecoration: 'none',
    marginTop: `${SPACING.sm}px`,
    ':hover': {
        textDecoration: 'underline',
    },
});

export const faqSection = style({
    width: '100%',
    maxWidth: '900px',
    padding: `0 ${SPACING.lg}px ${SPACING.xxxl}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.lg}px`,
});

export const faqTitle = style({
    fontSize: '28px',
    fontWeight: 700,
    color: COLORS.gray[900],
    textAlign: 'center',
    marginBottom: `${SPACING.md}px`,
});

export const faqItem = style({
    padding: `${SPACING.lg}px`,
    backgroundColor: COLORS.gray[50],
    borderRadius: `${RADIUS.lg}px`,
    border: `1px solid ${COLORS.gray[200]}`,
});

export const faqQuestion = style({
    fontSize: '18px',
    fontWeight: 600,
    color: COLORS.gray[900],
    marginBottom: `${SPACING.sm}px`,
});

export const faqAnswer = style({
    fontSize: '16px',
    color: COLORS.gray[700],
    lineHeight: 1.6,
});

export const businessInfo = style({
    width: '100%',
    maxWidth: '900px',
    padding: `${SPACING.xl}px ${SPACING.lg}px`,
    backgroundColor: COLORS.gray[50],
    borderRadius: `${RADIUS.lg}px`,
    marginBottom: `${SPACING.xxxl}px`,
});

export const businessTitle = style({
    fontSize: '18px',
    fontWeight: 600,
    color: COLORS.gray[800],
    marginBottom: `${SPACING.md}px`,
});

export const businessText = style({
    fontSize: '14px',
    color: COLORS.gray[600],
    lineHeight: 1.8,
});
