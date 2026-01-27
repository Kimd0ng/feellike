import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Card, COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@feellike/ui/native';
import { useCreateSubscriptionMutation, subscriptionKeys } from '../services/subscription';
import { usageKeys } from '../services/usage';
import type { RootStackScreenProps } from '../navigation/types';

/**
 * PaymentSuccessScreen 컴포넌트
 * 결제 성공 후 처리
 * @author Feel Economy Team
 */
export const PaymentSuccessScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'PaymentSuccess'>['navigation']>();
    const route = useRoute<RootStackScreenProps<'PaymentSuccess'>['route']>();
    const { authKey, customerKey } = route.params || {};
    const queryClient = useQueryClient();

    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const createSubscriptionMutation = useCreateSubscriptionMutation();

    useEffect(() => {
        const processPayment = async () => {
            if (!authKey || !customerKey) {
                setError('결제 정보가 올바르지 않습니다.');
                setIsProcessing(false);
                return;
            }

            try {
                // TODO: Call backend API to issue billing key and process first payment
                // For now, create subscription with the provided keys
                await createSubscriptionMutation.mutateAsync({
                    billingKey: authKey,
                    customerKey: customerKey,
                });

                // 캐시 무효화
                queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
                queryClient.invalidateQueries({ queryKey: usageKeys.all });

                setIsProcessing(false);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : '결제 처리 중 오류가 발생했습니다.'
                );
                setIsProcessing(false);
            }
        };

        processPayment();
    }, [authKey, customerKey, createSubscriptionMutation, queryClient]);

    const handleHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    if (isProcessing) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={COLORS.primary[300]} />
                <Text style={styles.processingText}>결제를 처리하고 있어요...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Card elevation="raised" style={styles.card}>
                    <Text style={styles.errorIcon}>❌</Text>
                    <Text style={styles.title}>결제 처리 실패</Text>
                    <Text style={styles.description}>{error}</Text>
                    <Button
                        variant="primary"
                        size="fullWidth"
                        onPress={handleHome}
                    >
                        홈으로 돌아가기
                    </Button>
                </Card>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Card elevation="raised" style={styles.card}>
                <Text style={styles.successIcon}>🎉</Text>
                <Text style={styles.title}>구독 완료!</Text>
                <Text style={styles.description}>
                    프리미엄 플랜으로 업그레이드되었습니다.{'\n'}
                    이제 무제한으로 추천을 받아보세요!
                </Text>
                <Button
                    variant="primary"
                    size="fullWidth"
                    onPress={handleHome}
                >
                    시작하기
                </Button>
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
    processingText: {
        marginTop: SPACING.lg,
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[600],
    },
    successIcon: {
        fontSize: 64,
        marginBottom: SPACING.lg,
    },
    errorIcon: {
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
});
