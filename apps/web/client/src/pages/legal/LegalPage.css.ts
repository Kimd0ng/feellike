import { style } from '@vanilla-extract/css';
import { COLORS, SPACING } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
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

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.md}px`,
});

export const sectionTitle = style({
    fontSize: '24px',
    fontWeight: 700,
    color: COLORS.gray[900],
    marginTop: `${SPACING.lg}px`,
    paddingBottom: `${SPACING.sm}px`,
    borderBottom: `2px solid ${COLORS.primary[500]}`,
});

export const paragraph = style({
    fontSize: '16px',
    color: COLORS.gray[700],
    lineHeight: 1.8,
});

export const list = style({
    paddingLeft: `${SPACING.xl}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.sm}px`,
});

export const listItem = style({
    fontSize: '16px',
    color: COLORS.gray[700],
    lineHeight: 1.6,
});

export const table = style({
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: `${SPACING.md}px`,
});

export const tableHeader = style({
    backgroundColor: COLORS.gray[100],
    padding: `${SPACING.md}px`,
    textAlign: 'left',
    fontWeight: 600,
    color: COLORS.gray[800],
    border: `1px solid ${COLORS.gray[200]}`,
});

export const tableCell = style({
    padding: `${SPACING.md}px`,
    border: `1px solid ${COLORS.gray[200]}`,
    color: COLORS.gray[700],
    lineHeight: 1.5,
});

export const updateDate = style({
    fontSize: '14px',
    color: COLORS.gray[500],
    marginTop: `${SPACING.xl}px`,
    paddingTop: `${SPACING.lg}px`,
    borderTop: `1px solid ${COLORS.gray[200]}`,
});
