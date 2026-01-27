import { style } from '@vanilla-extract/css';
import { COLORS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '24px',
    background: `linear-gradient(135deg, ${COLORS.gray[900]} 0%, ${COLORS.gray[800]} 100%)`,
});

export const header = style({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
});

export const backButton = style({
    background: 'none',
    border: 'none',
    color: COLORS.white,
    fontSize: 24,
    cursor: 'pointer',
    padding: 8,
    borderRadius: 8,
    transition: 'background 0.2s',
    ':hover': {
        background: 'rgba(255, 255, 255, 0.1)',
    },
});

export const title = style({
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.white,
});

export const content = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 480,
    width: '100%',
    margin: '0 auto',
});

export const currentPlanCard = style({
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    border: '1px solid rgba(255, 255, 255, 0.1)',
});

export const planLabel = style({
    fontSize: 14,
    color: COLORS.gray[400],
    marginBottom: 8,
});

export const planName = style({
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.white,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
});

export const planBadge = style({
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: 4,
    backgroundColor: COLORS.primary[300],
    color: COLORS.black,
});

export const freeBadge = style({
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: 4,
    backgroundColor: COLORS.gray[600],
    color: COLORS.white,
});

export const expiresAt = style({
    fontSize: 14,
    color: COLORS.gray[400],
    marginTop: 8,
});

export const usageCard = style({
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    border: '1px solid rgba(255, 255, 255, 0.1)',
});

export const usageTitle = style({
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.white,
    marginBottom: 12,
});

export const usageBar = style({
    height: 8,
    backgroundColor: COLORS.gray[700],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
});

export const usageProgress = style({
    height: '100%',
    backgroundColor: COLORS.primary[300],
    borderRadius: 4,
    transition: 'width 0.3s ease',
});

export const usageText = style({
    fontSize: 14,
    color: COLORS.gray[400],
});

export const premiumCard = style({
    padding: 32,
    background: `linear-gradient(135deg, ${COLORS.primary[400]} 0%, ${COLORS.primary[300]} 100%)`,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
});

export const premiumLabel = style({
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
});

export const premiumTitle = style({
    fontSize: 28,
    fontWeight: 800,
    color: COLORS.black,
    marginBottom: 8,
});

export const premiumPrice = style({
    fontSize: 36,
    fontWeight: 800,
    color: COLORS.black,
    marginBottom: 24,
});

export const premiumPeriod = style({
    fontSize: 16,
    fontWeight: 400,
    color: COLORS.gray[700],
});

export const featureList = style({
    listStyle: 'none',
    padding: 0,
    margin: '0 0 24px 0',
});

export const featureItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 12,
});

export const featureIcon = style({
    color: COLORS.success.main,
    fontWeight: 600,
});

export const subscribeButton = style({
    width: '100%',
    padding: '16px 24px',
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.white,
    backgroundColor: COLORS.gray[900],
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },
    ':disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
        transform: 'none',
    },
});

export const cancelButton = style({
    width: '100%',
    padding: '16px 24px',
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.gray[400],
    backgroundColor: 'transparent',
    border: `1px solid ${COLORS.gray[600]}`,
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
        borderColor: COLORS.error.main,
        color: COLORS.error.main,
    },
});

export const paymentHistory = style({
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    border: '1px solid rgba(255, 255, 255, 0.1)',
});

export const historyTitle = style({
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.white,
    marginBottom: 16,
});

export const historyItem = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: `1px solid ${COLORS.gray[700]}`,
    ':last-child': {
        borderBottom: 'none',
    },
});

export const historyDate = style({
    fontSize: 14,
    color: COLORS.gray[400],
});

export const historyAmount = style({
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.white,
});

export const historyStatus = style({
    fontSize: 12,
    padding: '4px 8px',
    borderRadius: 4,
});

export const statusCompleted = style({
    backgroundColor: COLORS.success.light,
    color: COLORS.success.dark,
});

export const statusFailed = style({
    backgroundColor: COLORS.error.light,
    color: COLORS.error.dark,
});

export const emptyHistory = style({
    textAlign: 'center',
    color: COLORS.gray[500],
    padding: 24,
});
