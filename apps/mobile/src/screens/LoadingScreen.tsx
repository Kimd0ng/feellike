import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@feellike/ui/native';
import { moodAtom, recommendationAtom, weatherAtom } from '../store/atoms';
import { useRecommendationMutation, UsageLimitExceededError } from '../services/recommendation';
import { useSaveEmotionLogMutation } from '../services/history';
import { getTimeOfDay } from '../utils/helpers';
import type { RootStackScreenProps } from '../navigation/types';

const LOADING_MESSAGES = [
    '기분을 분석하고 있어요... 🔍',
    '오늘 날씨도 고려하고 있어요... ☀️',
    '최적의 추천을 찾고 있어요... ✨',
    '거의 다 됐어요! 🎉',
];

/**
 * LoadingScreen 컴포넌트
 * AI 추천 결과를 기다리는 동안 로딩 표시
 * @author Feel Economy Team
 */
export const LoadingScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'Loading'>['navigation']>();
    const [mood] = useAtom(moodAtom);
    const [weather] = useAtom(weatherAtom);
    const [, setRecommendation] = useAtom(recommendationAtom);

    const [messageIndex, setMessageIndex] = React.useState(0);
    const spinValue = React.useRef(new Animated.Value(0)).current;

    const recommendationMutation = useRecommendationMutation();
    const saveEmotionLogMutation = useSaveEmotionLogMutation();

    // 스피너 애니메이션
    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    // 로딩 메시지 순환
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // AI 추천 요청
    useEffect(() => {
        const fetchRecommendation = async () => {
            if (!mood || !weather) {
                navigation.replace('Home');
                return;
            }

            try {
                const result = await recommendationMutation.mutateAsync({
                    mood,
                    weather: {
                        temp: weather.temp,
                        condition: weather.condition,
                        description: weather.description,
                    },
                    timeOfDay: getTimeOfDay(),
                });

                if (result) {
                    setRecommendation(result);

                    // 감정 로그 저장
                    await saveEmotionLogMutation.mutateAsync({
                        mood,
                        weather: {
                            temp: weather.temp,
                            condition: weather.condition,
                            description: weather.description,
                            icon: weather.icon,
                        },
                        recommendation: result,
                    });

                    navigation.replace('Result');
                }
            } catch (error) {
                console.error('Recommendation error:', error);
                
                if (error instanceof UsageLimitExceededError) {
                    // 사용량 제한 초과 시 구독 페이지로 이동
                    navigation.replace('Subscription');
                } else {
                    navigation.replace('Home');
                }
            }
        };

        fetchRecommendation();
    }, [mood, weather, setRecommendation, navigation, recommendationMutation, saveEmotionLogMutation]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.spinner, { transform: [{ rotate: spin }] }]}
            />
            <Text style={styles.message}>{LOADING_MESSAGES[messageIndex]}</Text>
            <Text style={styles.subMessage}>잠시만 기다려주세요</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray[900],
        padding: SPACING.lg,
    },
    spinner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 4,
        borderColor: COLORS.gray[700],
        borderTopColor: COLORS.primary[300],
        marginBottom: SPACING.xl,
    },
    message: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    },
    subMessage: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[400],
    },
});
