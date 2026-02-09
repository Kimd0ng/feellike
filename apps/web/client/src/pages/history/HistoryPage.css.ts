import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';
import { media } from '../../styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: SPACING.lg,
    paddingBottom: 100,
    backgroundColor: COLORS.gray[50],
});

export const backButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    padding: `${SPACING.sm}px 0`,
    background: 'none',
    border: 'none',
    fontSize: 14,
    color: COLORS.gray[600],
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    ':hover': {
        color: COLORS.gray[900],
    },
});

export const header = style({
    marginBottom: SPACING.xl,
});

export const title = style({
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.gray[900],
    marginBottom: SPACING.sm,
});

export const subtitle = style({
    fontSize: 16,
    color: COLORS.gray[600],
});

export const historyList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.md,
    '@media': {
        [media.tablet]: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [media.desktop]: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
    },
});

export const historyItem = style({
    padding: SPACING.lg,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
});

export const itemHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
});

export const mood = style({
    fontSize: 20,
    fontWeight: 600,
    color: COLORS.gray[900],
});

export const date = style({
    fontSize: 14,
    color: COLORS.gray[400],
});

export const recommendationText = style({
    fontSize: 14,
    color: COLORS.gray[600],
    marginBottom: SPACING.sm,
    flex: 1,
});

export const platformTag = style({
    display: 'inline-block',
    padding: `${SPACING.xs}px ${SPACING.sm}px`,
    backgroundColor: COLORS.primary[100],
    borderRadius: RADIUS.lg,
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.warning.dark,
    alignSelf: 'flex-start',
});

export const emptyState = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xxxl,
    textAlign: 'center',
    color: COLORS.gray[400],
});

export const emptyStateEmoji = style({
    fontSize: 64,
    marginBottom: SPACING.md,
});

export const emptyStateText = style({
    fontSize: 16,
    marginBottom: SPACING.lg,
});

export const pagination = style({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: 'rgba(249, 250, 251, 0.95)',
    backdropFilter: 'blur(8px)',
    borderTop: `1px solid ${COLORS.gray[300]}`,
    '@media': {
        [media.desktop]: {
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '1200px',
            width: '100%',
        },
    },
});

export const pageInfo = style({
    fontSize: 14,
    color: COLORS.gray[600],
    fontWeight: 500,
});
