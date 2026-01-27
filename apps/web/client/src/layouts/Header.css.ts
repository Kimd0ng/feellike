import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, Z_INDEX } from '@feellike/ui';

export const header = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
    padding: `0 ${SPACING.lg}px`,
    '@media': {
        'screen and (max-width: 768px)': {
            padding: `0 ${SPACING.md}px`,
            height: '60px',
        },
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${COLORS.gray[200]}`,
    position: 'sticky',
    top: 0,
    zIndex: Z_INDEX.sticky,
});

export const logo = style({
    fontSize: '24px',
    fontWeight: 700,
    color: COLORS.primary[500],
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: `${SPACING.sm}px`,
});

export const nav = style({
    display: 'flex',
    alignItems: 'center',
    gap: `${SPACING.lg}px`,
});

export const navLink = style({
    color: COLORS.gray[600],
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s',
    ':hover': {
        color: COLORS.primary[500],
    },
});

export const rightSection = style({
    display: 'flex',
    alignItems: 'center',
    gap: `${SPACING.md}px`,
});
