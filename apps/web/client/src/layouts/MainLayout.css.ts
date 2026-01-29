import { style } from '@vanilla-extract/css';
import { COLORS } from '@feellike/ui';
import { media } from '../styles/media';

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
    width: '100%',
    '@media': {
        [media.desktop]: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
        },
    },
});
