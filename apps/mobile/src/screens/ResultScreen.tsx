import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { Button, Card, COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@feellike/ui/native';
import { recommendationAtom, moodAtom } from '../store/atoms';
import { generateWebUrl } from '../utils/helpers';
import type { RootStackScreenProps } from '../navigation/types';

const PLATFORM_NAMES = {
    baemin: '배달의민족',
    youtube: '유튜브',
    coupang: '쿠팡',
};

const PLATFORM_EMOJIS = {
    baemin: '🍔',
    youtube: '📺',
    coupang: '🛒',
};

/**
 * ResultScreen 컴포넌트
 * AI 추천 결과 표시 및 플랫폼 이동
 * @author Feel Economy Team
 */
export const ResultScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'Result'>['navigation']>();
    const [recommendation, setRecommendation] = useAtom(recommendationAtom);
    const [, setMood] = useAtom(moodAtom);

    useEffect(() => {
        if (!recommendation) {
            navigation.replace('Home');
        }
    }, [recommendation, navigation]);

    if (!recommendation) {
        return null;
    }

    const handlePlatformOpen = async () => {
        try {
            // 딥링크로 앱 열기 시도
            const canOpen = await Linking.canOpenURL(recommendation.deepLink);

            if (canOpen) {
                await Linking.openURL(recommendation.deepLink);
            } else {
                // 앱이 없으면 웹 URL로 열기
                const webUrl = generateWebUrl(
                    recommendation.platform,
                    recommendation.searchKeyword
                );
                await Linking.openURL(webUrl);
            }
        } catch (error) {
            console.error('Failed to open platform:', error);
        }
    };

    const handleTryAgain = () => {
        setMood('');
        setRecommendation(null);
        navigation.replace('MoodInput');
    };

    const handleHome = () => {
        setMood('');
        setRecommendation(null);
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Card elevation="raised" style={styles.resultCard}>
                    <Text style={styles.theme}>{recommendation.theme}</Text>
                    <Text style={styles.reason}>{recommendation.reason}</Text>

                    <View style={styles.recommendationSection}>
                        <Text style={styles.recommendation}>
                            {recommendation.recommendation}
                        </Text>
                        <Text style={styles.platform}>
                            {PLATFORM_EMOJIS[recommendation.platform]}{' '}
                            {PLATFORM_NAMES[recommendation.platform]}에서 찾아보세요
                        </Text>
                    </View>

                    {/* 과거 컨텍스트 표시 (있을 경우) */}
                    {recommendation.pastContext && recommendation.pastContext.logs.length > 0 && (
                        <View style={styles.pastContextSection}>
                            <Text style={styles.pastContextTitle}>
                                비슷한 상황에서의 추천 기록
                            </Text>
                            {recommendation.pastContext.logs.slice(0, 2).map((log, index) => (
                                <Text key={index} style={styles.pastContextItem}>
                                    • {log.recommendation.recommendation}
                                </Text>
                            ))}
                        </View>
                    )}

                    <View style={styles.actions}>
                        <Button
                            variant="primary"
                            size="fullWidth"
                            onPress={handlePlatformOpen}
                            style={styles.platformButton}
                        >
                            {PLATFORM_NAMES[recommendation.platform]} 열기
                        </Button>

                        <View style={styles.secondaryActions}>
                            <Button
                                variant="outline"
                                size="medium"
                                onPress={handleHome}
                                style={styles.secondaryButton}
                            >
                                처음으로
                            </Button>
                            <Button
                                variant="ghost"
                                size="medium"
                                onPress={handleTryAgain}
                                style={styles.secondaryButton}
                            >
                                다시 입력하기
                            </Button>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray[900],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: SPACING.lg,
    },
    resultCard: {
        padding: SPACING.xl,
    },
    theme: {
        fontSize: FONT_SIZE.xxl,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.gray[900],
        marginBottom: SPACING.md,
    },
    reason: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[600],
        lineHeight: 24,
        marginBottom: SPACING.lg,
    },
    recommendationSection: {
        marginBottom: SPACING.xl,
    },
    recommendation: {
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.semibold,
        color: COLORS.gray[800],
        marginBottom: SPACING.sm,
    },
    platform: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[500],
    },
    pastContextSection: {
        backgroundColor: COLORS.gray[100],
        padding: SPACING.md,
        borderRadius: 8,
        marginBottom: SPACING.lg,
    },
    pastContextTitle: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.gray[600],
        marginBottom: SPACING.sm,
    },
    pastContextItem: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray[500],
        marginBottom: SPACING.xs,
    },
    actions: {
        gap: SPACING.md,
    },
    platformButton: {
        marginBottom: SPACING.sm,
    },
    secondaryActions: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    secondaryButton: {
        flex: 1,
    },
});
