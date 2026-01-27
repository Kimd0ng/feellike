import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
});

export const card = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
});

export const header = style({
    textAlign: 'center',
    marginBottom: 8,
});

export const title = style({
    fontSize: 28,
    fontWeight: 700,
    color: '#333',
    marginBottom: 8,
});

export const subtitle = style({
    fontSize: 14,
    color: '#666',
});

export const formSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
});

export const inputWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
});

export const label = style({
    fontSize: 14,
    fontWeight: 500,
    color: '#444',
});

export const input = style({
    padding: '14px 16px',
    fontSize: 16,
    border: '1px solid #e0e0e0',
    borderRadius: 12,
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
        borderColor: '#667eea',
    },
});

export const divider = style({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    color: '#999',
    fontSize: 14,
    '::before': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: '#e0e0e0',
    },
    '::after': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: '#e0e0e0',
    },
});

export const oauthSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
});

export const oauthButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: '14px 16px',
    fontSize: 15,
    fontWeight: 500,
    border: '1px solid #e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
        backgroundColor: '#f5f5f5',
        borderColor: '#ccc',
    },
});

export const googleButton = style([
    oauthButton,
    {
        color: '#333',
    },
]);

export const kakaoButton = style([
    oauthButton,
    {
        backgroundColor: '#FEE500',
        borderColor: '#FEE500',
        color: '#000',
        ':hover': {
            backgroundColor: '#FDDC3F',
            borderColor: '#FDDC3F',
        },
    },
]);

export const footer = style({
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
});

export const link = style({
    color: '#667eea',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
        textDecoration: 'underline',
    },
});

export const errorMessage = style({
    padding: 12,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
});
