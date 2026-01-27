import { style } from '@vanilla-extract/css';
import { COLORS, SPACING } from '@feellike/ui';

export const footer = style({
    padding: `${SPACING.xl}px ${SPACING.lg}px`,
    backgroundColor: COLORS.gray[50],
    borderTop: `1px solid ${COLORS.gray[200]}`,
    marginTop: 'auto',
    textAlign: 'center',
    color: COLORS.gray[500],
    fontSize: '14px',
});

export const links = style({
    display: 'flex',
    justifyContent: 'center',
    gap: `${SPACING.md}px`,
    marginBottom: `${SPACING.md}px`,
});

export const link = style({
    color: COLORS.gray[500],
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'underline',
    },
});
