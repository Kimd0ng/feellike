import { style, keyframes } from '@vanilla-extract/css';

const fadeIn = keyframes({
    from: { opacity: 0, transform: 'translateY(-8px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
});

export const container = style({
    position: 'relative',
});

export const trigger = style({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: 24,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export const avatar = style({
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: '#667eea',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 600,
    overflow: 'hidden',
});

export const avatarImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const dropdown = style({
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 8,
    minWidth: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
    animation: `${fadeIn} 0.2s ease`,
    zIndex: 1000,
});

export const menuItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    padding: '14px 16px',
    fontSize: 15,
    color: '#333',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
    textAlign: 'left',
    ':hover': {
        backgroundColor: '#f5f5f5',
    },
});

export const menuItemDanger = style([
    menuItem,
    {
        color: '#dc2626',
    },
]);

export const divider = style({
    height: 1,
    backgroundColor: '#e5e5e5',
    margin: '4px 0',
});

export const userInfo = style({
    padding: '16px',
    borderBottom: '1px solid #e5e5e5',
});

export const userName = style({
    fontSize: 15,
    fontWeight: 600,
    color: '#333',
    marginBottom: 4,
});

export const userEmail = style({
    fontSize: 13,
    color: '#666',
});

export const loginButton = style({
    padding: '10px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#667eea',
    border: 'none',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
        backgroundColor: '#fff',
    },
});
