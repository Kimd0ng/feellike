import { style, keyframes } from '@vanilla-extract/css';

const pulse = keyframes({
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
});

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: 24,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
});

export const content = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
});

export const spinner = style({
    width: 80,
    height: 80,
    border: '8px solid rgba(255, 255, 255, 0.3)',
    borderTop: '8px solid #FFFFFF',
    borderRadius: '50%',
    animation: `${spin} 1s linear infinite`,
});

export const message = style({
    fontSize: 24,
    fontWeight: 600,
    color: '#FFFFFF',
    textAlign: 'center',
    animation: `${pulse} 2s ease-in-out infinite`,
});

export const submessage = style({
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
});
