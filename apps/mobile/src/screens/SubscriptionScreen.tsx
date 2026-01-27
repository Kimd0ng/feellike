import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Button, Card, COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, RADIUS } from '@feellike/ui/native';
import { useSubscriptionQuery, useSubscriptionPlanQuery, PREMIUM_PLAN } from '../services/subscription';
import { useUsageCheckQuery } from '../services/usage';
import Config from '../config';
import type { RootStackScreenProps } from '../navigation/types';

const PLANS = [
    {
        id: 'free',
        name: '무료',
        price: 0,
        features: ['하루 3회 추천', '기본 감정 분석', '히스토리 저장'],
    },
    {
        id: 'premium',
        name: '프리미엄',
        price: PREMIUM_PLAN.price,
        features: PREMIUM_PLAN.features,
    },
];

/**
 * SubscriptionScreen 컴포넌트
 * 구독 플랜 선택 및 결제
 * @author Feel Economy Team
 */
export const SubscriptionScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'Subscription'>['navigation']>();
    const [selectedPlan, setSelectedPlan] = useState('premium');
    const [isProcessing, setIsProcessing] = useState(false);

    const { data: subscription, isLoading: isLoadingSubscription } = useSubscriptionQuery();
    const { data: usageCheck, isLoading: isLoadingUsage } = useUsageCheckQuery();
    const { data: plan } = useSubscriptionPlanQuery();

    const isLoading = isLoadingSubscription || isLoadingUsage;
    const isPremium = subscription?.status === 'active' && subscription?.plan_type === 'premium';

    const handleSubscribe = async () => {
        if (selectedPlan === 'free') {
            navigation.goBack();
            return;
        }

        setIsProcessing(true);

        try {
            // 결제 페이지를 인앱 브라우저로 열기
            const successUrl = `${Config.APP_SCHEME}://payment/success`;
            const failUrl = `${Config.APP_SCHEME}://payment/fail`;

            // TODO: Implement actual payment URL generation from backend
            const paymentUrl = `https://payment.example.com?successUrl=${encodeURIComponent(successUrl)}&failUrl=${encodeURIComponent(failUrl)}`;

            if (await InAppBrowser.isAvailable()) {
                await InAppBrowser.open(paymentUrl, {
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: COLORS.primary[300],
                    preferredControlTintColor: COLORS.gray[900],
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'pageSheet',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                });
            }
        } catch (error) {
            console.error('Payment error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const formatPrice = (price: number) => {
        return price === 0 ? '무료' : `₩${price.toLocaleString()}/월`;
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary[300]} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>← 뒤로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>구독 플랜</Text>
            </View>

            {/* 현재 사용량 표시 */}
            {usageCheck && !usageCheck.isPremium && (
                <View style={styles.usageInfo}>
                    <Text style={styles.usageText}>
                        오늘 남은 무료 추천: {usageCheck.remainingUsage}회
                    </Text>
                </View>
            )}

            {/* 현재 구독 상태 표시 */}
            {isPremium && (
                <View style={styles.currentPlanBanner}>
                    <Text style={styles.currentPlanText}>
                        🎉 현재 프리미엄 구독 중입니다
                    </Text>
                </View>
            )}

            <View style={styles.content}>
                {PLANS.map((planItem) => (
                    <TouchableOpacity
                        key={planItem.id}
                        onPress={() => setSelectedPlan(planItem.id)}
                        activeOpacity={0.8}
                        disabled={isPremium}
                    >
                        <Card
                            elevation={selectedPlan === planItem.id ? 'raised' : 'flat'}
                            style={[
                                styles.planCard,
                                selectedPlan === planItem.id && styles.selectedPlan,
                                isPremium && planItem.id === 'premium' && styles.activePlan,
                            ]}
                        >
                            <View style={styles.planHeader}>
                                <Text style={styles.planName}>{planItem.name}</Text>
                                <Text style={styles.planPrice}>
                                    {formatPrice(planItem.price)}
                                </Text>
                            </View>

                            <View style={styles.features}>
                                {planItem.features.map((feature, index) => (
                                    <View key={index} style={styles.featureRow}>
                                        <Text style={styles.featureCheck}>✓</Text>
                                        <Text style={styles.featureText}>{feature}</Text>
                                    </View>
                                ))}
                            </View>

                            {selectedPlan === planItem.id && !isPremium && (
                                <View style={styles.selectedBadge}>
                                    <Text style={styles.selectedBadgeText}>선택됨</Text>
                                </View>
                            )}

                            {isPremium && planItem.id === 'premium' && (
                                <View style={styles.activeBadge}>
                                    <Text style={styles.activeBadgeText}>구독 중</Text>
                                </View>
                            )}
                        </Card>
                    </TouchableOpacity>
                ))}

                {!isPremium && (
                    <Button
                        variant="primary"
                        size="fullWidth"
                        onPress={handleSubscribe}
                        loading={isProcessing}
                        style={styles.subscribeButton}
                    >
                        {selectedPlan === 'free' ? '무료로 계속하기' : '프리미엄 구독하기'}
                    </Button>
                )}

                <Text style={styles.disclaimer}>
                    구독은 언제든 취소할 수 있으며, 다음 결제일 전까지 서비스를 이용할 수
                    있습니다.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray[100],
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray[100],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray[200],
    },
    backButton: {
        marginRight: SPACING.md,
    },
    backButtonText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.primary[400],
    },
    title: {
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.gray[900],
    },
    usageInfo: {
        backgroundColor: COLORS.warning.light,
        padding: SPACING.md,
        marginHorizontal: SPACING.lg,
        marginTop: SPACING.md,
        borderRadius: RADIUS.lg,
    },
    usageText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.warning.dark,
        textAlign: 'center',
    },
    currentPlanBanner: {
        backgroundColor: COLORS.success.light,
        padding: SPACING.md,
        marginHorizontal: SPACING.lg,
        marginTop: SPACING.md,
        borderRadius: RADIUS.lg,
    },
    currentPlanText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.success.dark,
        textAlign: 'center',
        fontWeight: FONT_WEIGHT.medium,
    },
    content: {
        padding: SPACING.lg,
    },
    planCard: {
        marginBottom: SPACING.md,
        padding: SPACING.lg,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedPlan: {
        borderColor: COLORS.primary[300],
    },
    activePlan: {
        borderColor: COLORS.success.main,
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    planName: {
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.gray[900],
    },
    planPrice: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.semibold,
        color: COLORS.primary[400],
    },
    features: {
        gap: SPACING.sm,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureCheck: {
        color: COLORS.success.main,
        marginRight: SPACING.sm,
        fontSize: FONT_SIZE.md,
    },
    featureText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[700],
    },
    selectedBadge: {
        position: 'absolute',
        top: SPACING.sm,
        right: SPACING.sm,
        backgroundColor: COLORS.primary[300],
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
    },
    selectedBadgeText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: FONT_WEIGHT.semibold,
        color: COLORS.gray[900],
    },
    activeBadge: {
        position: 'absolute',
        top: SPACING.sm,
        right: SPACING.sm,
        backgroundColor: COLORS.success.main,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
    },
    activeBadgeText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: FONT_WEIGHT.semibold,
        color: COLORS.white,
    },
    subscribeButton: {
        marginTop: SPACING.lg,
    },
    disclaimer: {
        marginTop: SPACING.md,
        fontSize: FONT_SIZE.xs,
        color: COLORS.gray[500],
        textAlign: 'center',
        lineHeight: 18,
    },
});
