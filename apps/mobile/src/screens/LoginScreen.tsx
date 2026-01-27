import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, RADIUS } from '@feellike/ui/native';
import {
    useLoginMutation,
    useGoogleLoginMutation,
    useKakaoLoginMutation,
} from '../services/auth';
import type { RootStackScreenProps } from '../navigation/types';

/**
 * LoginScreen 컴포넌트
 * 이메일/Google/Kakao 로그인 지원
 * @author Feel Economy Team
 */
export const LoginScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'Login'>['navigation']>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const loginMutation = useLoginMutation();
    const googleLoginMutation = useGoogleLoginMutation();
    const kakaoLoginMutation = useKakaoLoginMutation();

    const handleEmailLogin = async () => {
        if (!email || !password) {
            setError('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        setError(null);

        try {
            await loginMutation.mutateAsync({ email, password });
            navigation.navigate('Home');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : '로그인에 실패했습니다. 다시 시도해주세요.'
            );
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError(null);
            await googleLoginMutation.mutateAsync();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Google 로그인에 실패했습니다.'
            );
        }
    };

    const handleKakaoLogin = async () => {
        try {
            setError(null);
            await kakaoLoginMutation.mutateAsync();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Kakao 로그인에 실패했습니다.'
            );
        }
    };

    const isPending = loginMutation.isPending || googleLoginMutation.isPending || kakaoLoginMutation.isPending;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Card elevation="raised" style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>로그인</Text>
                        <Text style={styles.subtitle}>
                            Feel Economy에 오신 것을 환영합니다
                        </Text>
                    </View>

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={styles.formSection}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>이메일</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="your@email.com"
                                placeholderTextColor={COLORS.gray[400]}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoComplete="email"
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>비밀번호</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호 입력"
                                placeholderTextColor={COLORS.gray[400]}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoComplete="password"
                            />
                        </View>
                        <Button
                            variant="primary"
                            size="fullWidth"
                            onPress={handleEmailLogin}
                            loading={loginMutation.isPending}
                            disabled={isPending}
                        >
                            로그인
                        </Button>
                    </View>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>또는</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.oauthSection}>
                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={handleGoogleLogin}
                            disabled={isPending}
                        >
                            <Text style={styles.oauthButtonText}>
                                Google로 계속하기
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.kakaoButton}
                            onPress={handleKakaoLogin}
                            disabled={isPending}
                        >
                            <Text style={styles.kakaoButtonText}>
                                카카오로 계속하기
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>계정이 없으신가요? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Signup')}
                        >
                            <Text style={styles.link}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray[100],
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: SPACING.lg,
    },
    card: {
        padding: SPACING.xl,
    },
    header: {
        marginBottom: SPACING.lg,
    },
    title: {
        fontSize: FONT_SIZE.xxl,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.gray[900],
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[600],
    },
    errorContainer: {
        backgroundColor: COLORS.error.light,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.md,
    },
    errorText: {
        color: COLORS.error.dark,
        fontSize: FONT_SIZE.sm,
    },
    formSection: {
        gap: SPACING.md,
    },
    inputWrapper: {
        marginBottom: SPACING.sm,
    },
    label: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.gray[700],
        marginBottom: SPACING.xs,
    },
    input: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray[300],
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[900],
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.gray[300],
    },
    dividerText: {
        marginHorizontal: SPACING.md,
        color: COLORS.gray[500],
        fontSize: FONT_SIZE.sm,
    },
    oauthSection: {
        gap: SPACING.sm,
    },
    googleButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray[300],
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        alignItems: 'center',
    },
    oauthButtonText: {
        fontSize: FONT_SIZE.md,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.gray[700],
    },
    kakaoButton: {
        backgroundColor: '#FEE500',
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        alignItems: 'center',
    },
    kakaoButtonText: {
        fontSize: FONT_SIZE.md,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.black,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.lg,
    },
    footerText: {
        color: COLORS.gray[600],
        fontSize: FONT_SIZE.sm,
    },
    link: {
        color: COLORS.primary[400],
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
    },
});
