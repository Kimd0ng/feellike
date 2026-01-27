import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: 24,
    paddingBottom: 100,
    backgroundColor: '#F9FAFB',
});

export const backButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    padding: '8px 0',
    background: 'none',
    border: 'none',
    fontSize: 14,
    color: '#6B7280',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    ':hover': {
        color: '#111827',
    },
});

export const header = style({
    marginBottom: 32,
});

export const title = style({
    fontSize: 32,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 8,
});

export const subtitle = style({
    fontSize: 16,
    color: '#6B7280',
});

export const historyList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
});

export const historyItem = style({
    padding: 20,
});

export const itemHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
});

export const mood = style({
    fontSize: 20,
    fontWeight: 600,
    color: '#111827',
});

export const date = style({
    fontSize: 14,
    color: '#9CA3AF',
});

export const recommendationText = style({
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
});

export const platformTag = style({
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#FFF3CC',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 500,
    color: '#92400E',
});

export const emptyState = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 64,
    textAlign: 'center',
    color: '#9CA3AF',
});

export const emptyStateEmoji = style({
    fontSize: 64,
    marginBottom: 16,
});

export const emptyStateText = style({
    fontSize: 16,
    marginBottom: 24,
});

export const pagination = style({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    backgroundColor: 'rgba(249, 250, 251, 0.95)',
    backdropFilter: 'blur(8px)',
    borderTop: '1px solid #E5E7EB',
});

export const pageInfo = style({
    fontSize: 14,
    color: '#6B7280',
    fontWeight: 500,
});
