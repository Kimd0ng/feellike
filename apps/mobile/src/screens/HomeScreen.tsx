import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { Button, COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@feellike/ui/native';
import { weatherAtom, locationAtom } from '../store/atoms';
import { useAuth } from '../providers/AuthProvider';
import { useLocationWeather } from '../services/weather/useWeatherQuery';
import { useUsageCheckQuery } from '../services/usage';
import { getGreeting } from '../utils/helpers';
import type { RootStackScreenProps } from '../navigation/types';

/**
 * HomeScreen 컴포넌트
 * 날씨와 위치 정보를 표시하고 감정 입력으로 이동
 * @author Feel Economy Team
 */
export const HomeScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'Home'>['navigation']>();
    const { isAuthenticated, user } = useAuth();
    const [, setWeather] = useAtom(weatherAtom);
    const [, setLocation] = useAtom(locationAtom);

    const { data, isLoading, isError } = useLocationWeather();
    const { data: usageCheck } = useUsageCheckQuery();

    useEffect(() => {
        if (data) {
            setWeather(data.weather);
            setLocation(data.location);
        }
    }, [data, setWeather, setLocation]);

    const handleStart = () => {
        if (isAuthenticated) {
            navigation.navigate('MoodInput');
        } else {
            navigation.navigate('Login');
        }
    };

    const handleHistory = () => {
        navigation.navigate('History');
    };

    const handleSubscription = () => {
        navigation.navigate('Subscription');
    };

    return (
        <View style={styles.container}>
            {/* 상단 헤더 (로그인 시) */}
            {isAuthenticated && (
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.userName}>
                            {user?.name || user?.email?.split('@')[0] || '사용자'}님
                        </Text>
                        {usageCheck && !usageCheck.isPremium && (
                            <Text style={styles.usageText}>
                                오늘 남은 추천: {usageCheck.remainingUsage}회
                            </Text>
                        )}
                        {usageCheck?.isPremium && (
                            <Text style={styles.premiumBadge}>프리미엄 ✨</Text>
                        )}
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={handleHistory} style={styles.headerButton}>
                            <Text style={styles.headerButtonText}>📋</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubscription} style={styles.headerButton}>
                            <Text style={styles.headerButtonText}>💎</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={styles.content}>
                <Text style={styles.greeting}>{getGreeting()}</Text>

                {isLoading ? (
                    <View style={styles.weatherInfo}>
                        <ActivityIndicator size="large" color={COLORS.primary[300]} />
                        <Text style={styles.loadingText}>
                            위치와 날씨 정보를 가져오는 중...
                        </Text>
                    </View>
                ) : isError ? (
                    <View style={styles.weatherInfo}>
                        <Text style={styles.errorText}>
                            위치 정보를 가져올 수 없습니다
                        </Text>
                        <Text style={styles.errorSubText}>
                            위치 권한을 확인해주세요
                        </Text>
                    </View>
                ) : data ? (
                    <>
                        <View style={styles.weatherInfo}>
                            <Text style={styles.location}>📍 {data.location.name}</Text>
                            <Text style={styles.temperature}>
                                {Math.round(data.weather.temp)}°
                            </Text>
                            <Text style={styles.description}>
                                {data.weather.description}
                            </Text>
                        </View>

                        <Button
                            variant="primary"
                            size="fullWidth"
                            onPress={handleStart}
                            style={styles.ctaButton}
                        >
                            {isAuthenticated
                                ? '지금 내 기분은? 🎯'
                                : '로그인하고 시작하기 🔐'}
                        </Button>
                    </>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray[900],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.md,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.gray[800],
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonText: {
        fontSize: FONT_SIZE.lg,
    },
    userName: {
        fontSize: FONT_SIZE.md,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.white,
    },
    usageText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray[400],
        marginTop: SPACING.xs,
    },
    premiumBadge: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.primary[300],
        marginTop: SPACING.xs,
        fontWeight: FONT_WEIGHT.medium,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
    },
    greeting: {
        fontSize: FONT_SIZE.xxxl,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.white,
        marginBottom: SPACING.xl,
        textAlign: 'center',
    },
    weatherInfo: {
        alignItems: 'center',
        marginBottom: SPACING.xxl,
    },
    location: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.gray[400],
        marginBottom: SPACING.sm,
    },
    temperature: {
        fontSize: 72,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.white,
        marginBottom: SPACING.xs,
    },
    description: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.gray[300],
    },
    loadingText: {
        marginTop: SPACING.md,
        color: COLORS.gray[400],
        fontSize: FONT_SIZE.md,
    },
    errorText: {
        color: COLORS.error.main,
        fontSize: FONT_SIZE.md,
    },
    errorSubText: {
        color: COLORS.gray[400],
        fontSize: FONT_SIZE.sm,
        marginTop: SPACING.xs,
    },
    ctaButton: {
        marginTop: SPACING.xl,
    },
});
