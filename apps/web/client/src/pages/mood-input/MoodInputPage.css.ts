import { style } from '@vanilla-extract/css';

export const container = style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: 24,
    backgroundColor: '#F9FAFB',
});

export const header = style({
    marginTop: 48,
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

export const emotionGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: 16,
    marginBottom: 32,
});

export const divider = style({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
    color: '#9CA3AF',
    fontSize: 14,
    '::before': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    '::after': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
});

export const freeTextSection = style({
    marginBottom: 32,
});

export const actions = style({
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
});
