import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    type TouchableOpacityProps,
    type ViewStyle,
} from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../shared';

export type EmotionButtonProps = TouchableOpacityProps & {
    emoji: string;
    label: string;
    selected?: boolean;
};

/**
 * EmotionButton 컴포넌트 (React Native)
 * 감정 선택용 버튼 (이모지 + 라벨)
 * @author Feel Economy Team
 */
export const EmotionButton = ({
    emoji,
    label,
    selected = false,
    style,
    ...props
}: EmotionButtonProps) => {
    const buttonStyle = [
        styles.base,
        selected && styles.selected,
        style,
    ] as ViewStyle[];

    return (
        <TouchableOpacity style={buttonStyle} activeOpacity={0.7} {...props}>
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={[styles.label, selected && styles.labelSelected]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        padding: SPACING.md,
        minWidth: 80,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    selected: {
        borderColor: COLORS.primary[300],
        backgroundColor: COLORS.primary[50],
    },
    emoji: {
        fontSize: 32,
        marginBottom: SPACING.xs,
    },
    label: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.gray[600],
    },
    labelSelected: {
        color: COLORS.gray[900],
        fontWeight: FONT_WEIGHT.semibold,
    },
});
