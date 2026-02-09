import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.gray[50],
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
    maxWidth: '900px',
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.xl}px`,
});

export const categoryTitle = style({
    fontSize: '24px',
    fontWeight: 700,
    color: COLORS.gray[900],
    marginTop: `${SPACING.lg}px`,
    marginBottom: `${SPACING.sm}px`,
    display: 'flex',
    alignItems: 'center',
    gap: `${SPACING.sm}px`,
});

export const faqList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.md}px`,
});

export const faqItem = style({
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.gray[200]}`,
    borderRadius: `${RADIUS.lg}px`,
    overflow: 'hidden',
    transition: 'box-shadow 0.2s ease',
    ':hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
});

export const faqQuestion = style({
    width: '100%',
    padding: `${SPACING.lg}px`,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    fontSize: '17px',
    fontWeight: 600,
    color: COLORS.gray[900],
    lineHeight: 1.4,
    ':hover': {
        backgroundColor: COLORS.gray[50],
    },
});

export const faqIcon = style({
    fontSize: '18px',
    color: COLORS.gray[500],
    transition: 'transform 0.2s ease',
    flexShrink: 0,
    marginLeft: `${SPACING.md}px`,
});

export const faqAnswer = style({
    padding: `0 ${SPACING.lg}px ${SPACING.lg}px`,
    fontSize: '16px',
    color: COLORS.gray[700],
    lineHeight: 1.7,
    borderTop: `1px solid ${COLORS.gray[100]}`,
    paddingTop: `${SPACING.lg}px`,
});

export const searchSection = style({
    width: '100%',
    maxWidth: '600px',
    marginBottom: `${SPACING.xl}px`,
});

export const searchInput = style({
    width: '100%',
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    fontSize: '16px',
    border: `1px solid ${COLORS.gray[300]}`,
    borderRadius: `${RADIUS.full}px`,
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    ':focus': {
        borderColor: COLORS.primary[500],
        boxShadow: `0 0 0 3px ${COLORS.primary[100]}`,
    },
    '::placeholder': {
        color: COLORS.gray[400],
    },
});

export const contactCta = style({
    width: '100%',
    padding: `${SPACING.xl}px`,
    backgroundColor: COLORS.primary[50],
    borderRadius: `${RADIUS.xl}px`,
    textAlign: 'center',
    marginTop: `${SPACING.xl}px`,
});

export const ctaTitle = style({
    fontSize: '20px',
    fontWeight: 600,
    color: COLORS.gray[900],
    marginBottom: `${SPACING.sm}px`,
});

export const ctaDesc = style({
    fontSize: '16px',
    color: COLORS.gray[600],
    marginBottom: `${SPACING.md}px`,
});

export const ctaLink = style({
    fontSize: '16px',
    color: COLORS.primary[500],
    fontWeight: 600,
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'underline',
    },
});
