import { style } from '@vanilla-extract/css';
import { COLORS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    backgroundColor: COLORS.primary[300],
    borderRadius: 20,
    border: `1px solid ${COLORS.primary[200]}`,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
});

export const usageText = style({
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.gray[900],
});

export const usageCount = style({
    fontWeight: 700,
    color: COLORS.gray[900],
});

export const premiumBadge = style({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.black,
});

export const upgradeButton = style({
    backgroundColor: COLORS.gray[900],
    border: 'none',
    color: COLORS.white,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '6px 12px',
    marginLeft: 4,
    borderRadius: 12,
    transition: 'all 0.2s',
    ':hover': {
        backgroundColor: COLORS.gray[800],
    },
});
