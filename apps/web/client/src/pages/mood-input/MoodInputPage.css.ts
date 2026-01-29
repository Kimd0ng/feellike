import { style } from '@vanilla-extract/css';
import { media } from '../../styles/media';

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
    textAlign: 'center', // Center align header on all screens
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

// New wrapper for desktop layout
export const contentWrapper = style({
    width: '100%',
    '@media': {
        [media.desktop]: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: 48,
            marginTop: 32,
        },
    },
});

export const emotionGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Mobile: 2 columns
    gap: 16,
    marginBottom: 32,
    '@media': {
        [media.tablet]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        [media.desktop]: {
            flex: 1,
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginBottom: 0,
        },
    },
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
    '@media': {
        [media.desktop]: {
            display: 'none', // Hide divider on desktop side-by-side
        },
    },
});

export const freeTextSection = style({
    marginBottom: 32,
    '@media': {
        [media.desktop]: {
            flex: 1,
            marginBottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
        },
    },
});

export const actions = style({
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
    marginTop: 'auto', // Push to bottom if space is available
    paddingTop: 32,
});
