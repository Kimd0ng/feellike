import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    type TouchableOpacityProps,
    type ViewStyle,
    type TextStyle,
} from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../shared';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large' | 'fullWidth';

export type ButtonProps = TouchableOpacityProps & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    children: React.ReactNode;
};

/**
 * Button 컴포넌트 (React Native)
 * 다양한 variant와 size를 지원하는 버튼
 * @author Feel Economy Team
 */
export const Button = ({
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled,
    children,
    style,
    ...props
}: ButtonProps) => {
    const buttonStyle = [
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
    ] as ViewStyle[];

    const textStyle = [
        styles.text,
        styles[`${variant}Text` as keyof typeof styles],
        styles[`${size}Text` as keyof typeof styles],
        disabled && styles.disabledText,
    ] as TextStyle[];

    return (
        <TouchableOpacity
            style={buttonStyle}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? COLORS.gray[900] : COLORS.primary[300]}
                    size="small"
                />
            ) : (
                <Text style={textStyle}>{children}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RADIUS.lg,
        flexDirection: 'row',
    },
    text: {
        fontWeight: FONT_WEIGHT.semibold,
    },

    // Variants
    primary: {
        backgroundColor: COLORS.primary[300],
    },
    secondary: {
        backgroundColor: COLORS.gray[200],
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.gray[300],
    },
    ghost: {
        backgroundColor: 'transparent',
    },

    // Variant Text
    primaryText: {
        color: COLORS.gray[900],
    },
    secondaryText: {
        color: COLORS.gray[700],
    },
    outlineText: {
        color: COLORS.gray[700],
    },
    ghostText: {
        color: COLORS.gray[600],
    },

    // Sizes
    small: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.md,
        height: 36,
    },
    medium: {
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        height: 44,
    },
    large: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        height: 56,
    },
    fullWidth: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        height: 56,
        width: '100%',
    },

    // Size Text
    smallText: {
        fontSize: FONT_SIZE.sm,
    },
    mediumText: {
        fontSize: FONT_SIZE.md,
    },
    largeText: {
        fontSize: FONT_SIZE.lg,
    },
    fullWidthText: {
        fontSize: FONT_SIZE.lg,
    },

    // States
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.7,
    },
});
