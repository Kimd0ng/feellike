import { style } from '@vanilla-extract/css';
import { COLORS, SPACING, RADIUS } from '@feellike/ui';
import { media } from '../../styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: SPACING.lg,
    backgroundColor: '#F9FAFB',
});

export const content = style({
    maxWidth: 600,
    width: '100%',
    '@media': {
        [media.desktop]: {
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: SPACING.xl,
        },
    },
});

export const resultCard = style({
    padding: `${SPACING.xl}px !important`,
    marginBottom: SPACING.lg,
    borderRadius: `${RADIUS.xl}px !important`,
    '@media': {
        [media.desktop]: {
            flex: 2,
            marginBottom: 0,
        },
    },
});

export const theme = style({
    fontSize: 28,
    fontWeight: 700,
    color: '#111827',
    marginBottom: SPACING.xl,
    textAlign: 'center',
});

export const sectionLabel = style({
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.primary[500],
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
});

export const reasonBox = style({
    backgroundColor: '#F3F4F6',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
});

export const reason = style({
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 1.6,
});

export const solutionBox = style({
    backgroundColor: COLORS.primary[50],
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    border: `1px solid ${COLORS.primary[200]}`,
});

export const recommendation = style({
    fontSize: 20,
    fontWeight: 700,
    color: '#111827',
    marginBottom: SPACING.xs,
});

export const platform = style({
    fontSize: 14,
    color: '#6B7280',
});

export const actions = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
});

export const platformButton = style({
    width: '100%',
});

export const secondaryActions = style({
    display: 'flex',
    gap: 12,
    marginTop: 16,
});

export const pastLogsContainer = style({
    marginTop: 24,
    opacity: 0.9,
    '@media': {
        [media.desktop]: {
            flex: 1,
            marginTop: 0,
            position: 'sticky',
            top: 24,
        },
    },
});

export const pastLogsLabel = style({
    fontSize: 14,
    color: '#6B7280', // Changed from white to gray as background is light now? 
    // Wait, original code had white color for text, but background was likely not dark? 
    // Container has bg #F9FAFB. So white text would be invisible. 
    // Ah, maybe the user had a dark theme or I missed something. 
    // The previous inline style was: color: '#fff'. 
    // But container bg is #F9FAFB (light gray). 
    // Let's assume the inline style was wrong or intended for a dark card background within the light page.
    // Looking at the inline style for the card: background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)'.
    // This suggests it might be overlaying something dark, or it was just hard-coded for a different theme.
    // Given the rest of the page uses standard colors, I will use standard text colors here.
    marginBottom: 12,
});

export const pastLogsCard = style({
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
});

export const pastLogItem = style({
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
    selectors: {
        '&:last-child': {
            marginBottom: 0,
        },
    },
});
