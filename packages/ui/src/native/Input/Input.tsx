import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    type TextInputProps,
    type ViewStyle,
} from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../shared';

export type InputSize = 'small' | 'medium' | 'large';

export type InputProps = TextInputProps & {
    label?: string;
    helperText?: string;
    errorText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    inputSize?: InputSize;
    containerStyle?: ViewStyle;
};

/**
 * Input 컴포넌트 (React Native)
 * 아이콘, 라벨, 에러 메시지를 지원하는 입력 필드
 * @author Feel Economy Team
 */
export const Input = ({
    label,
    helperText,
    errorText,
    leftIcon,
    rightIcon,
    inputSize = 'medium',
    containerStyle,
    style,
    ...props
}: InputProps) => {
    const hasError = Boolean(errorText);

    const inputStyle = [
        styles.input,
        styles[inputSize],
        leftIcon && styles.inputWithLeftIcon,
        rightIcon && styles.inputWithRightIcon,
        hasError && styles.inputError,
        style,
    ];

    return (
        <View style={containerStyle}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputWrapper}>
                {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
                <TextInput
                    style={inputStyle}
                    placeholderTextColor={COLORS.gray[400]}
                    {...props}
                />
                {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
            </View>
            {errorText && <Text style={styles.errorText}>{errorText}</Text>}
            {!errorText && helperText && (
                <Text style={styles.helperText}>{helperText}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray[300],
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[900],
    },
    inputError: {
        borderColor: COLORS.error.main,
    },
    inputWithLeftIcon: {
        paddingLeft: SPACING.xl + SPACING.md,
    },
    inputWithRightIcon: {
        paddingRight: SPACING.xl + SPACING.md,
    },

    // Sizes
    small: {
        height: 36,
        fontSize: FONT_SIZE.sm,
    },
    medium: {
        height: 44,
        fontSize: FONT_SIZE.md,
    },
    large: {
        height: 56,
        fontSize: FONT_SIZE.lg,
    },

    // Icons
    iconLeft: {
        position: 'absolute',
        left: SPACING.md,
        zIndex: 1,
    },
    iconRight: {
        position: 'absolute',
        right: SPACING.md,
        zIndex: 1,
    },

    // Labels and helpers
    label: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.gray[700],
        marginBottom: SPACING.xs,
    },
    helperText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.gray[500],
        marginTop: SPACING.xs,
    },
    errorText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.error.main,
        marginTop: SPACING.xs,
    },
});
