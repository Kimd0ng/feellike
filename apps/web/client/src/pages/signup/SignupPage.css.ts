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

export const inputError = style({
    borderColor: '#dc2626',
});

export const helperText = style({
    fontSize: 12,
    color: '#999',
});

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

export const successMessage = style({
    padding: 16,
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    color: '#16a34a',
    fontSize: 14,
    textAlign: 'center',
});
