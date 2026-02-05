import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    backgroundColor: '#F9FAFB',
});

export const backButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.lg,
    color: COLORS.gray[600],
    fontSize: 14,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: 0,
    ':hover': {
        color: COLORS.primary[500],
    },
});

export const content = style({
    maxWidth: 800,
    width: '100%',
    margin: '0 auto',
});

export const postCard = style({
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: SPACING.lg,
});

export const postHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
});

export const postTitle = style({
    fontSize: 24,
    fontWeight: 700,
    color: '#111827',
    marginBottom: SPACING.sm,
});

export const postMeta = style({
    display: 'flex',
    gap: SPACING.md,
    fontSize: 14,
    color: '#9CA3AF',
});

export const postContent = style({
    fontSize: 16,
    color: '#374151',
    lineHeight: 1.8,
    marginBottom: SPACING.xl,
    whiteSpace: 'pre-wrap',
});

export const tagContainer = style({
    display: 'flex',
    gap: SPACING.sm,
    flexWrap: 'wrap',
    marginBottom: SPACING.xl,
});

export const tag = style({
    padding: `${SPACING.xs}px ${SPACING.md}px`,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary[50],
    color: COLORS.primary[500],
    fontSize: 14,
    fontWeight: 500,
});

export const actionBar = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.lg,
    borderTop: `1px solid ${COLORS.gray[200]}`,
});

export const likeButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.xs,
    padding: `${SPACING.sm}px ${SPACING.md}px`,
    borderRadius: RADIUS.lg,
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

export const likeButtonActive = style({
    backgroundColor: COLORS.primary[50],
    borderColor: COLORS.primary[400],
    color: COLORS.primary[500],
});

export const stats = style({
    display: 'flex',
    gap: SPACING.md,
    fontSize: 14,
    color: '#9CA3AF',
});

export const statItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
});

export const deleteButton = style({
    padding: `${SPACING.sm}px ${SPACING.md}px`,
    borderRadius: RADIUS.lg,
    border: `1px solid #EF4444`,
    backgroundColor: '#FFFFFF',
    color: '#EF4444',
    fontSize: 14,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
        backgroundColor: '#EF4444',
        color: '#FFFFFF',
    },
});

export const commentsSection = style({
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

export const commentsTitle = style({
    fontSize: 18,
    fontWeight: 600,
    color: '#111827',
    marginBottom: SPACING.lg,
});

export const commentForm = style({
    display: 'flex',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
});

export const commentInput = style({
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    border: `1px solid ${COLORS.gray[300]}`,
    fontSize: 14,
    resize: 'none',
    minHeight: 80,
    ':focus': {
        outline: 'none',
        borderColor: COLORS.primary[400],
    },
});

export const commentList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.lg,
});

export const commentItem = style({
    paddingBottom: SPACING.lg,
    borderBottom: `1px solid ${COLORS.gray[100]}`,
    selectors: {
        '&:last-child': {
            borderBottom: 'none',
            paddingBottom: 0,
        },
    },
});

export const commentHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
});

export const commentAuthor = style({
    fontSize: 14,
    fontWeight: 500,
    color: '#374151',
});

export const commentDate = style({
    fontSize: 12,
    color: '#9CA3AF',
});

export const commentContent = style({
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 1.6,
});

export const loginPrompt = style({
    textAlign: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.gray[50],
    borderRadius: RADIUS.lg,
});

export const loadingState = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${SPACING.xl * 2}px`,
    color: '#6B7280',
});

export const notFound = style({
    textAlign: 'center',
    padding: `${SPACING.xl * 2}px`,
    color: '#6B7280',
});
