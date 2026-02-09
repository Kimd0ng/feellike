import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@feellike/ui';
import { media } from '../../styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: SPACING.lg,
    background: `linear-gradient(135deg, ${COLORS.gray[900]} 0%, ${COLORS.gray[800]} 100%)`,
});

export const header = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
});

export const backButton = style({
    background: 'none',
    border: 'none',
    color: COLORS.white,
    fontSize: 24,
    cursor: 'pointer',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    transition: 'background 0.2s',
    ':hover': {
        background: COLORS.glass.light,
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
    gap: SPACING.lg,
    maxWidth: 480,
    width: '100%',
    margin: '0 auto',
    '@media': {
        [media.desktop]: {
            maxWidth: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'start',
        },
    },
});

export const currentPlanCard = style({
    padding: SPACING.lg,
    backgroundColor: COLORS.glass.light,
    backdropFilter: 'blur(10px)',
    borderRadius: RADIUS.xl,
    border: `1px solid ${COLORS.glass.light}`,
});

export const planLabel = style({
    fontSize: 14,
    color: COLORS.gray[400],
    marginBottom: SPACING.sm,
});

export const planName = style({
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.white,
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.sm,
});

export const planBadge = style({
    fontSize: 12,
    fontWeight: 600,
    padding: `${SPACING.xs}px ${SPACING.sm}px`,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.primary[300],
    color: COLORS.black,
});

export const freeBadge = style({
    fontSize: 12,
    fontWeight: 600,
    padding: `${SPACING.xs}px ${SPACING.sm}px`,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.gray[600],
    color: COLORS.white,
});

export const expiresAt = style({
    fontSize: 14,
    color: COLORS.gray[400],
    marginTop: SPACING.sm,
});

export const usageCard = style({
    padding: SPACING.lg,
    backgroundColor: COLORS.glass.light,
    backdropFilter: 'blur(10px)',
    borderRadius: RADIUS.xl,
    border: `1px solid ${COLORS.glass.light}`,
});

export const usageTitle = style({
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.white,
    marginBottom: SPACING.sm,
});

export const usageBar = style({
    height: 8,
    backgroundColor: COLORS.gray[700],
    borderRadius: RADIUS.xs,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
});

export const usageProgress = style({
    height: '100%',
    backgroundColor: COLORS.primary[300],
    borderRadius: RADIUS.xs,
    transition: 'width 0.3s ease',
});

export const usageText = style({
    fontSize: 14,
    color: COLORS.gray[400],
});

export const premiumCard = style({
    padding: SPACING.xl,
    background: `linear-gradient(135deg, ${COLORS.primary[400]} 0%, ${COLORS.primary[300]} 100%)`,
    borderRadius: RADIUS.xxl,
    position: 'relative',
    overflow: 'hidden',
    '@media': {
        [media.desktop]: {
            gridRow: 'span 2',
        },
    },
});

export const premiumLabel = style({
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
});

export const premiumTitle = style({
    fontSize: 28,
    fontWeight: 800,
    color: COLORS.black,
    marginBottom: SPACING.sm,
});

export const premiumPrice = style({
    fontSize: 36,
    fontWeight: 800,
    color: COLORS.black,
    marginBottom: SPACING.lg,
});

export const premiumPeriod = style({
    fontSize: 16,
    fontWeight: 400,
    color: COLORS.gray[700],
});

export const featureList = style({
    listStyle: 'none',
    padding: 0,
    margin: `0 0 ${SPACING.lg}px 0`,
});

export const featureItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.sm,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: SPACING.sm,
});

export const featureIcon = style({
    color: COLORS.success.main,
    fontWeight: 600,
});

export const subscribeButton = style({
    width: '100%',
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.white,
    backgroundColor: COLORS.gray[900],
    border: 'none',
    borderRadius: RADIUS.lg,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: SHADOWS.xl,
    },
    ':disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
        transform: 'none',
    },
});

export const cancelButton = style({
    width: '100%',
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.gray[400],
    backgroundColor: 'transparent',
    border: `1px solid ${COLORS.gray[600]}`,
    borderRadius: RADIUS.lg,
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
        borderColor: COLORS.error.main,
        color: COLORS.error.main,
    },
});

export const paymentHistory = style({
    padding: SPACING.lg,
    backgroundColor: COLORS.glass.light,
    backdropFilter: 'blur(10px)',
    borderRadius: RADIUS.xl,
    border: `1px solid ${COLORS.glass.light}`,
    '@media': {
        [media.desktop]: {
            gridColumn: '1 / -1',
        },
    },
});

export const historyTitle = style({
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.white,
    marginBottom: SPACING.md,
});

export const historyItem = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${SPACING.sm}px 0`,
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
    padding: `${SPACING.xs}px ${SPACING.sm}px`,
    borderRadius: RADIUS.xs,
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
    padding: SPACING.lg,
});
