import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: SPACING.lg,
    backgroundColor: '#F9FAFB',
});

export const content = style({
    maxWidth: 600,
    width: '100%',
});

export const resultCard = style({
    padding: `${SPACING.xl}px !important`,
    marginBottom: SPACING.lg,
    borderRadius: `${RADIUS.xl}px !important`,
});

export const theme = style({
    fontSize: 28,
    fontWeight: 700,
    color: '#111827',
    marginBottom: SPACING.xl,
    textAlign: 'center',
});

export const sectionLabel = style({
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.primary[500],
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
});

export const reasonBox = style({
    backgroundColor: '#F3F4F6',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
});

export const reason = style({
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 1.6,
});

export const solutionBox = style({
    backgroundColor: COLORS.primary[50],
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    border: `1px solid ${COLORS.primary[200]}`,
});

export const recommendation = style({
    fontSize: 20,
    fontWeight: 700,
    color: '#111827',
    marginBottom: SPACING.xs,
});

export const platform = style({
    fontSize: 14,
    color: '#6B7280',
});

export const actions = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
});

export const platformButton = style({
    width: '100%',
});

export const secondaryActions = style({
    display: 'flex',
    gap: 12,
    marginTop: 16,
});
