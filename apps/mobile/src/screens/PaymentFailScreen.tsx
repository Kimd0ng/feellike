import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@feellike/ui/native';
import type { RootStackScreenProps } from '../navigation/types';

/**
 * PaymentFailScreen 컴포넌트
 * 결제 실패 처리
 * @author Feel Economy Team
 */
export const PaymentFailScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'PaymentFail'>['navigation']>();

    const handleRetry = () => {
        navigation.navigate('Subscription');
    };

    const handleHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    return (
        <View style={styles.container}>
            <Card elevation="raised" style={styles.card}>
                <Text style={styles.icon}>😔</Text>
                <Text style={styles.title}>결제 실패</Text>
                <Text style={styles.description}>
                    결제 처리 중 문제가 발생했습니다.{'\n'}
                    다시 시도해주세요.
                </Text>
                <View style={styles.actions}>
                    <Button
                        variant="primary"
                        size="fullWidth"
                        onPress={handleRetry}
                    >
                        다시 시도하기
                    </Button>
                    <Button
                        variant="ghost"
                        size="fullWidth"
                        onPress={handleHome}
                    >
                        홈으로 돌아가기
                    </Button>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray[100],
        padding: SPACING.lg,
    },
    card: {
        width: '100%',
        padding: SPACING.xl,
        alignItems: 'center',
    },
    icon: {
        fontSize: 64,
        marginBottom: SPACING.lg,
    },
    title: {
        fontSize: FONT_SIZE.xxl,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.gray[900],
        marginBottom: SPACING.sm,
        textAlign: 'center',
    },
    description: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[600],
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: SPACING.xl,
    },
    actions: {
        width: '100%',
        gap: SPACING.md,
    },
});
