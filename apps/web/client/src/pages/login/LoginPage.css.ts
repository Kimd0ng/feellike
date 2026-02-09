import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: `${SPACING.lg}px`,
    background: `linear-gradient(135deg, ${COLORS.primary[300]} 0%, ${COLORS.secondary[400]} 100%)`,
});

export const card = style({
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.lg,
    padding: SPACING.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: RADIUS.xxl,
    width: '100%',
    maxWidth: 400,
    boxShadow: SHADOWS.xl,
});

export const header = style({
    textAlign: 'center',
    marginBottom: SPACING.sm,
});

export const title = style({
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.gray[900],
    marginBottom: SPACING.sm,
});

export const subtitle = style({
    fontSize: 14,
    color: COLORS.gray[600],
});

export const formSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.md,
});

export const inputWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.sm,
});

export const label = style({
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.gray[700],
});

export const input = style({
    padding: `${SPACING.md}px ${SPACING.md}px`,
    fontSize: 16,
    border: `1px solid ${COLORS.gray[300]}`,
    borderRadius: RADIUS.lg,
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
        borderColor: COLORS.primary[300],
    },
});

export const divider = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.md,
    color: COLORS.gray[500],
    fontSize: 14,
    '::before': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: COLORS.gray[300],
    },
    '::after': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: COLORS.gray[300],
    },
});

export const oauthSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.sm,
});

export const oauthButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    padding: `${SPACING.md}px ${SPACING.md}px`,
    fontSize: 15,
    fontWeight: 500,
    border: `1px solid ${COLORS.gray[300]}`,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
        backgroundColor: COLORS.gray[50],
        borderColor: COLORS.gray[400],
    },
});

export const googleButton = style([
    oauthButton,
    {
        color: COLORS.gray[900],
    },
]);

export const kakaoButton = style([
    oauthButton,
    {
        backgroundColor: '#FEE500',
        borderColor: '#FEE500',
        color: COLORS.black,
        ':hover': {
            backgroundColor: '#FDDC3F',
            borderColor: '#FDDC3F',
        },
    },
]);

export const footer = style({
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.gray[600],
});

export const link = style({
    color: COLORS.primary[500],
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
        textDecoration: 'underline',
    },
});

export const errorMessage = style({
    padding: SPACING.sm,
    backgroundColor: COLORS.error.light,
    borderRadius: RADIUS.md,
    color: COLORS.error.main,
    fontSize: 14,
    textAlign: 'center',
});
