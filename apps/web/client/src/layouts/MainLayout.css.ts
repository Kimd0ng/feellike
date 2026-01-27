import { style } from '@vanilla-extract/css';
import { COLORS } from '@feellike/ui';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: COLORS.white,
});

export const content = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
});
