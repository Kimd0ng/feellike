import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
});

export const content = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

