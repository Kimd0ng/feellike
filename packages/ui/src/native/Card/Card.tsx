import React from 'react';
import { View, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../shared';

export type CardElevation = 'flat' | 'raised' | 'floating';

export type CardProps = ViewProps & {
    elevation?: CardElevation;
    glass?: boolean;
    children: React.ReactNode;
};

/**
 * Card 컴포넌트 (React Native)
 * 콘텐츠를 담는 카드 레이아웃
 * @author Feel Economy Team
 */
export const Card = ({
    elevation = 'raised',
    glass = false,
    children,
    style,
    ...props
}: CardProps) => {
    const cardStyle = [
        styles.base,
        styles[elevation],
        glass && styles.glass,
        style,
    ] as ViewStyle[];

    return (
        <View style={cardStyle} {...props}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
    },

    // Elevation
    flat: {
        shadowOpacity: 0,
        elevation: 0,
    },
    raised: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    floating: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8,
    },

    // Glass effect (simplified for RN)
    glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});
