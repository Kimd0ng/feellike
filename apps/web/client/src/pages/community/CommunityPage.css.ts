import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';
import { media } from '../../styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    backgroundColor: '#F9FAFB',
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
    marginBottom: SPACING.xl,
});

export const title = style({
    fontSize: 28,
    fontWeight: 700,
    color: '#111827',
});

export const writeButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.xs,
});

export const filterSection = style({
    display: 'flex',
    gap: SPACING.sm,
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
    marginBottom: SPACING.lg,
    flexWrap: 'wrap',
});

export const filterButton = style({
    padding: `${SPACING.xs}px ${SPACING.md}px`,
    borderRadius: RADIUS.full,
    border: `1px solid ${COLORS.gray[300]}`,
    backgroundColor: '#FFFFFF',
    color: COLORS.gray[600],
    fontSize: 14,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
        borderColor: COLORS.primary[400],
        color: COLORS.primary[500],
    },
});

export const filterButtonActive = style({
    backgroundColor: COLORS.primary[500],
    borderColor: COLORS.primary[500],
    color: '#FFFFFF',
    ':hover': {
        backgroundColor: COLORS.primary[400],
        borderColor: COLORS.primary[400],
        color: '#FFFFFF',
    },
});

export const postsGrid = style({
    display: 'grid',
    gap: SPACING.lg,
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
    gridTemplateColumns: '1fr',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    },
});

export const postCard = style({
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
});

export const postTitle = style({
    fontSize: 18,
    fontWeight: 600,
    color: '#111827',
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

export const postContent = style({
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 1.6,
    marginBottom: SPACING.md,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
});

export const tagContainer = style({
    display: 'flex',
    gap: SPACING.xs,
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
});

export const tag = style({
    padding: `${SPACING.xs / 2}px ${SPACING.sm}px`,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary[50],
    color: COLORS.primary[500],
    fontSize: 12,
    fontWeight: 500,
});

export const postMeta = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    color: '#9CA3AF',
});

export const metaLeft = style({
    display: 'flex',
    gap: SPACING.sm,
});

export const metaItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
});

export const emptyState = style({
    textAlign: 'center',
    padding: `${SPACING.xl * 2}px`,
    color: '#6B7280',
});

export const emptyTitle = style({
    fontSize: 20,
    fontWeight: 600,
    color: '#111827',
    marginBottom: SPACING.sm,
});

export const emptyDescription = style({
    fontSize: 14,
    marginBottom: SPACING.lg,
});

export const loadingState = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${SPACING.xl * 2}px`,
    color: '#6B7280',
});
