import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    backgroundColor: COLORS.gray[50],
});

export const backButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.lg,
    color: COLORS.gray[600],
    fontSize: 14,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: 0,
    ':hover': {
        color: COLORS.primary[500],
    },
});

export const content = style({
    maxWidth: 800,
    width: '100%',
    margin: '0 auto',
});

export const formCard = style({
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    boxShadow: SHADOWS.sm,
});

export const formTitle = style({
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.gray[900],
    marginBottom: SPACING.xl,
});

export const formGroup = style({
    marginBottom: SPACING.lg,
});

export const label = style({
    display: 'block',
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
});

export const input = style({
    width: '100%',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    border: `1px solid ${COLORS.gray[300]}`,
    fontSize: 16,
    ':focus': {
        outline: 'none',
        borderColor: COLORS.primary[400],
    },
});

export const textarea = style({
    width: '100%',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    border: `1px solid ${COLORS.gray[300]}`,
    fontSize: 16,
    minHeight: 200,
    resize: 'vertical',
    lineHeight: 1.6,
    ':focus': {
        outline: 'none',
        borderColor: COLORS.primary[400],
    },
});

export const emotionSection = style({
    marginBottom: SPACING.xl,
    padding: SPACING.lg,
    backgroundColor: COLORS.primary[50],
    borderRadius: RADIUS.lg,
    border: `1px solid ${COLORS.primary[200]}`,
});

export const emotionTitle = style({
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.gray[800],
    marginBottom: SPACING.md,
});

export const emotionInfo = style({
    display: 'flex',
    gap: SPACING.md,
    flexWrap: 'wrap',
});

export const emotionTag = style({
    padding: `${SPACING.xs}px ${SPACING.md}px`,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    color: COLORS.primary[500],
    fontSize: 14,
    fontWeight: 500,
    border: `1px solid ${COLORS.primary[300]}`,
});

export const checkboxGroup = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
});

export const checkbox = style({
    width: 18,
    height: 18,
    cursor: 'pointer',
});

export const checkboxLabel = style({
    fontSize: 14,
    color: COLORS.gray[600],
    cursor: 'pointer',
});

export const actions = style({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: SPACING.md,
    marginTop: SPACING.xl,
});

export const hint = style({
    fontSize: 12,
    color: COLORS.gray[400],
    marginTop: SPACING.xs,
});
