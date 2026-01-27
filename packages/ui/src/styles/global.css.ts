import { globalStyle } from '@vanilla-extract/css';

/**
 * 전역 스타일
 * @author Feel Economy Team
 */

// Reset
globalStyle('*, *::before, *::after', {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
});

// HTML & Body
globalStyle('html', {
    fontSize: 16,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
});

globalStyle('body', {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Pretendard", "Noto Sans KR", sans-serif',
    lineHeight: 1.6,
    color: '#111827',
    backgroundColor: '#FFFFFF',
});

// Typography
globalStyle('h1, h2, h3, h4, h5, h6', {
    fontWeight: 700,
    lineHeight: 1.2,
});

globalStyle('p', {
    margin: 0,
});

globalStyle('a', {
    color: 'inherit',
    textDecoration: 'none',
});

globalStyle('button', {
    font: 'inherit',
    cursor: 'pointer',
});

globalStyle('input, textarea, select', {
    font: 'inherit',
});

// Scrollbar
globalStyle('::-webkit-scrollbar', {
    width: 8,
    height: 8,
});

globalStyle('::-webkit-scrollbar-track', {
    background: '#F3F4F6',
});

globalStyle('::-webkit-scrollbar-thumb', {
    background: '#9CA3AF',
    borderRadius: 4,
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
    background: '#6B7280',
});
