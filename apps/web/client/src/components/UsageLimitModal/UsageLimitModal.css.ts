import { style, keyframes } from '@vanilla-extract/css';
import { COLORS } from '@feellike/ui';

const fadeIn = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});

const slideUp = keyframes({
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const overlay = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    animation: `${fadeIn} 0.2s ease-out`,
});

export const modal = style({
    backgroundColor: COLORS.gray[800],
    borderRadius: 24,
    maxWidth: 400,
    width: '90%',
    padding: 32,
    textAlign: 'center',
    animation: `${slideUp} 0.3s ease-out`,
});

export const icon = style({
    fontSize: 64,
    marginBottom: 16,
});

export const title = style({
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.white,
    marginBottom: 12,
});

export const description = style({
    fontSize: 16,
    color: COLORS.gray[400],
    lineHeight: 1.6,
    marginBottom: 24,
});

export const highlight = style({
    color: COLORS.primary[300],
    fontWeight: 600,
});

export const premiumCard = style({
    padding: 20,
    background: `linear-gradient(135deg, ${COLORS.primary[400]} 0%, ${COLORS.primary[300]} 100%)`,
    borderRadius: 16,
    marginBottom: 24,
});

export const premiumPrice = style({
    fontSize: 32,
    fontWeight: 800,
    color: COLORS.gray[900],
});

export const premiumPeriod = style({
    fontSize: 16,
    fontWeight: 400,
    color: COLORS.gray[700],
});

export const premiumFeature = style({
    fontSize: 14,
    color: COLORS.gray[800],
    marginTop: 8,
});

export const buttonGroup = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
});

export const upgradeButton = style({
    width: '100%',
    padding: '16px 24px',
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.gray[900],
    backgroundColor: COLORS.primary[300],
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
        backgroundColor: COLORS.primary[400],
        transform: 'translateY(-2px)',
    },
});

export const laterButton = style({
    width: '100%',
    padding: '14px 24px',
    fontSize: 16,
    fontWeight: 500,
    color: COLORS.gray[400],
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'color 0.2s',
    ':hover': {
        color: COLORS.white,
    },
});
