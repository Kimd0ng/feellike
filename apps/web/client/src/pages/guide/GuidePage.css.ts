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
    background: `linear-gradient(135deg, ${COLORS.primary[50]} 0%, ${COLORS.gray[50]} 100%)`,
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
    maxWidth: '1200px',
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.xxxl}px`,
});

export const sectionTitle = style({
    fontSize: '28px',
    fontWeight: 700,
    color: COLORS.gray[900],
    marginBottom: `${SPACING.lg}px`,
});

export const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: `${SPACING.xl}px`,
    '@media': {
        'screen and (max-width: 768px)': {
            gridTemplateColumns: '1fr',
        },
    },
});

export const guideCard = style({
    padding: `${SPACING.xl}px`,
    backgroundColor: COLORS.white,
    borderRadius: `${RADIUS.xl}px`,
    border: `1px solid ${COLORS.gray[200]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.md}px`,
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    cursor: 'pointer',
    ':hover': {
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        transform: 'translateY(-4px)',
    },
});

export const cardIcon = style({
    fontSize: '48px',
    marginBottom: `${SPACING.xs}px`,
});

export const cardTag = style({
    display: 'inline-block',
    padding: `${SPACING.xs}px ${SPACING.sm}px`,
    backgroundColor: COLORS.primary[100],
    color: COLORS.primary[500],
    borderRadius: `${RADIUS.sm}px`,
    fontSize: '12px',
    fontWeight: 600,
    width: 'fit-content',
});

export const cardTitle = style({
    fontSize: '20px',
    fontWeight: 700,
    color: COLORS.gray[900],
    lineHeight: 1.3,
});

export const cardDesc = style({
    fontSize: '15px',
    color: COLORS.gray[600],
    lineHeight: 1.6,
});

export const articleSection = style({
    width: '100%',
    maxWidth: '800px',
    padding: `${SPACING.xxxl}px ${SPACING.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.xl}px`,
});

export const articleTitle = style({
    fontSize: '32px',
    fontWeight: 800,
    color: COLORS.gray[900],
    lineHeight: 1.3,
});

export const articleMeta = style({
    display: 'flex',
    alignItems: 'center',
    gap: `${SPACING.md}px`,
    color: COLORS.gray[500],
    fontSize: '14px',
});

export const articleContent = style({
    fontSize: '17px',
    color: COLORS.gray[700],
    lineHeight: 1.9,
});

export const articleParagraph = style({
    marginBottom: `${SPACING.lg}px`,
});

export const articleHeading2 = style({
    fontSize: '24px',
    fontWeight: 700,
    color: COLORS.gray[900],
    marginTop: `${SPACING.xl}px`,
    marginBottom: `${SPACING.md}px`,
});

export const articleHeading3 = style({
    fontSize: '20px',
    fontWeight: 600,
    color: COLORS.gray[800],
    marginTop: `${SPACING.lg}px`,
    marginBottom: `${SPACING.sm}px`,
});

export const articleList = style({
    paddingLeft: `${SPACING.xl}px`,
    marginBottom: `${SPACING.lg}px`,
});

export const articleListItem = style({
    marginBottom: `${SPACING.sm}px`,
});

export const tipBox = style({
    padding: `${SPACING.lg}px`,
    backgroundColor: COLORS.primary[50],
    borderRadius: `${RADIUS.lg}px`,
    borderLeft: `4px solid ${COLORS.primary[500]}`,
    marginBottom: `${SPACING.lg}px`,
});

export const tipTitle = style({
    fontSize: '16px',
    fontWeight: 600,
    color: COLORS.primary[500],
    marginBottom: `${SPACING.xs}px`,
});

export const tipContent = style({
    fontSize: '15px',
    color: COLORS.gray[700],
    lineHeight: 1.6,
});
