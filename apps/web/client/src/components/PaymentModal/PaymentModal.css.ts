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

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

export const overlay = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    animation: `${fadeIn} 0.2s ease-out`,
});

export const modal = style({
    backgroundColor: COLORS.gray[800],
    borderRadius: 20,
    maxWidth: 440,
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    animation: `${slideUp} 0.3s ease-out`,
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '::-webkit-scrollbar': {
        display: 'none',
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 24px 16px',
    borderBottom: `1px solid ${COLORS.gray[700]}`,
});

export const title = style({
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.white,
});

export const closeButton = style({
    background: 'none',
    border: 'none',
    color: COLORS.gray[400],
    fontSize: 24,
    cursor: 'pointer',
    padding: 4,
    lineHeight: 1,
    ':hover': {
        color: COLORS.white,
    },
});

export const content = style({
    padding: 24,
});

export const planSummary = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.gray[700],
    borderRadius: 12,
    marginBottom: 24,
});

export const planInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
});

export const planName = style({
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.white,
});

export const planPeriod = style({
    fontSize: 14,
    color: COLORS.gray[400],
});

export const planPrice = style({
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.primary[300],
});

export const paymentMethodSection = style({
    marginBottom: 24,
});

export const sectionTitle = style({
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.gray[400],
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
});

export const cardInputContainer = style({
    border: `1px solid ${COLORS.gray[600]}`,
    borderRadius: 12,
    padding: 16,
    backgroundColor: COLORS.gray[900],
    minHeight: 200,
});

export const loadingMessage = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    color: COLORS.gray[400],
});

export const errorMessage = style({
    padding: 12,
    backgroundColor: COLORS.error.light,
    color: COLORS.error.dark,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 16,
});

export const agreement = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
});

export const checkbox = style({
    width: 20,
    height: 20,
    marginTop: 2,
    accentColor: COLORS.primary[300],
});

export const agreementText = style({
    fontSize: 14,
    color: COLORS.gray[400],
    lineHeight: 1.5,
});

export const agreementLink = style({
    color: COLORS.primary[300],
    textDecoration: 'underline',
    cursor: 'pointer',
});

export const footer = style({
    padding: '16px 24px 24px',
});

export const payButton = style({
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
    },
    ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
});

export const processingOverlay = style({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    zIndex: 10,
});

export const spinner = style({
    width: 48,
    height: 48,
    border: `3px solid ${COLORS.gray[600]}`,
    borderTopColor: COLORS.primary[300],
    borderRadius: '50%',
    animation: `${spin} 1s linear infinite`,
    marginBottom: 16,
});

export const processingText = style({
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 500,
});

export const successMessage = style({
    textAlign: 'center',
    padding: 32,
});

export const successIcon = style({
    fontSize: 64,
    marginBottom: 16,
});

export const successTitle = style({
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.white,
    marginBottom: 8,
});

export const successDescription = style({
    fontSize: 16,
    color: COLORS.gray[400],
    marginBottom: 24,
});

export const paymentMethodGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
});

export const paymentMethodButton = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: COLORS.gray[800],
    border: `2px solid ${COLORS.gray[600]}`,
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
        backgroundColor: COLORS.gray[700],
        borderColor: COLORS.gray[500],
    },
});

export const paymentMethodButtonSelected = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: COLORS.gray[700],
    border: `2px solid ${COLORS.primary[300]}`,
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
});

export const paymentMethodIcon = style({
    fontSize: 28,
});

export const paymentMethodLabel = style({
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.white,
});
