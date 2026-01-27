import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';

export const container = style({
    padding: `${SPACING.xl}px`,
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
});

export const header = style({
    marginBottom: `${SPACING.xl}px`,
    textAlign: 'center',
});

export const title = style({
    fontSize: '28px',
    fontWeight: 700,
    color: COLORS.gray[900],
    marginBottom: `${SPACING.sm}px`,
});

export const subtitle = style({
    color: COLORS.gray[600],
});

export const chartSection = style({
    backgroundColor: COLORS.white,
    padding: `${SPACING.xl}px`,
    borderRadius: `${RADIUS.xl}px`,
    border: `1px solid ${COLORS.gray[200]}`,
    marginBottom: `${SPACING.xl}px`,
});

export const chartTitle = style({
    fontSize: '18px',
    fontWeight: 600,
    color: COLORS.gray[900],
    marginBottom: `${SPACING.lg}px`,
});

export const barChart = style({
    display: 'flex',
    flexDirection: 'column',
    gap: `${SPACING.md}px`,
});

export const barRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: `${SPACING.md}px`,
});

export const barLabel = style({
    width: '60px',
    fontSize: '14px',
    color: COLORS.gray[600],
});

export const barTrack = style({
    flex: 1,
    height: '24px',
    backgroundColor: COLORS.gray[100],
    borderRadius: `${RADIUS.sm}px`,
    overflow: 'hidden',
});

export const barFill = style({
    height: '100%',
    backgroundColor: COLORS.primary[300],
    borderRadius: `${RADIUS.sm}px`,
    transition: 'width 0.5s ease-out',
});

export const barValue = style({
    width: '40px',
    textAlign: 'right',
    fontSize: '14px',
    fontWeight: 600,
    color: COLORS.gray[900],
});

export const keywordSection = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: `${SPACING.sm}px`,
});

export const keywordTag = style({
    padding: `${SPACING.sm}px ${SPACING.md}px`,
    backgroundColor: COLORS.secondary[50],
    color: COLORS.secondary[500],
    borderRadius: `${RADIUS.full}px`,
    fontSize: '14px',
    fontWeight: 500,
});
