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
import { useSignUpMutation } from '../services/auth';
import type { RootStackScreenProps } from '../navigation/types';

/**
 * SignupScreen 컴포넌트
 * 회원가입 페이지
 * @author Feel Economy Team
 */
export const SignupScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'Signup'>['navigation']>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const signUpMutation = useSignUpMutation();

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError('모든 필드를 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (password.length < 6) {
            setError('비밀번호는 6자 이상이어야 합니다.');
            return;
        }

        setError(null);

        try {
            await signUpMutation.mutateAsync({ email, password, name });
            navigation.navigate('Home');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : '회원가입에 실패했습니다. 다시 시도해주세요.'
            );
        }
    };

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
                        <Text style={styles.title}>회원가입</Text>
                        <Text style={styles.subtitle}>
                            Feel Economy와 함께 시작하세요
                        </Text>
                    </View>

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={styles.formSection}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>이름</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="홍길동"
                                placeholderTextColor={COLORS.gray[400]}
                                value={name}
                                onChangeText={setName}
                                autoComplete="name"
                            />
                        </View>
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
                                placeholder="6자 이상 입력"
                                placeholderTextColor={COLORS.gray[400]}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>비밀번호 확인</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호 재입력"
                                placeholderTextColor={COLORS.gray[400]}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>
                        <Button
                            variant="primary"
                            size="fullWidth"
                            onPress={handleSignup}
                            loading={signUpMutation.isPending}
                        >
                            가입하기
                        </Button>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>이미 계정이 있으신가요? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.link}>로그인</Text>
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
