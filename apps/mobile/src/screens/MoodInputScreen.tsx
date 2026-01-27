import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import {
    Button,
    EmotionButton,
    COLORS,
    SPACING,
    FONT_SIZE,
    FONT_WEIGHT,
    RADIUS,
} from '@feellike/ui/native';
import { moodAtom } from '../store/atoms';
import type { RootStackScreenProps } from '../navigation/types';

const EMOTIONS = [
    { emoji: '😊', label: '행복해', value: '행복함' },
    { emoji: '😢', label: '우울해', value: '우울함' },
    { emoji: '😴', label: '피곤해', value: '피곤함' },
    { emoji: '🔥', label: '짜릿해', value: '흥분됨' },
    { emoji: '😌', label: '차분해', value: '차분함' },
    { emoji: '😠', label: '화나', value: '화남' },
    { emoji: '😰', label: '불안해', value: '불안함' },
    { emoji: '🥳', label: '신나', value: '신남' },
];

/**
 * MoodInputScreen 컴포넌트
 * 사용자의 현재 감정을 선택하거나 입력
 * @author Feel Economy Team
 */
export const MoodInputScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'MoodInput'>['navigation']>();
    const [, setMood] = useAtom(moodAtom);
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [freeText, setFreeText] = useState('');

    const handleEmotionSelect = (emotionValue: string) => {
        setSelectedEmotion(emotionValue);
        setFreeText('');
    };

    const handleSubmit = () => {
        const finalMood = freeText || selectedEmotion;

        if (!finalMood) {
            // TODO: Show alert
            return;
        }

        setMood(finalMood);
        navigation.navigate('Loading');
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>지금 기분이 어떠세요?</Text>
                <Text style={styles.subtitle}>
                    감정을 선택하거나 자유롭게 표현해주세요
                </Text>
            </View>

            <View style={styles.emotionGrid}>
                {EMOTIONS.map((emotion) => (
                    <EmotionButton
                        key={emotion.value}
                        emoji={emotion.emoji}
                        label={emotion.label}
                        selected={selectedEmotion === emotion.value}
                        onPress={() => handleEmotionSelect(emotion.value)}
                        style={styles.emotionButton}
                    />
                ))}
            </View>

            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>또는</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={styles.freeTextSection}>
                <TextInput
                    style={styles.freeTextInput}
                    placeholder="지금 기분을 자유롭게 표현해보세요..."
                    placeholderTextColor={COLORS.gray[400]}
                    value={freeText}
                    onChangeText={(text) => {
                        setFreeText(text);
                        setSelectedEmotion('');
                    }}
                    multiline
                />
            </View>

            <View style={styles.actions}>
                <Button
                    variant="outline"
                    size="medium"
                    onPress={handleBack}
                    style={styles.backButton}
                >
                    돌아가기
                </Button>
                <Button
                    variant="primary"
                    size="large"
                    onPress={handleSubmit}
                    style={styles.submitButton}
                >
                    분석하기 ✨
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray[50],
    },
    content: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    header: {
        marginBottom: SPACING.xl,
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
    emotionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: SPACING.sm,
    },
    emotionButton: {
        width: '23%',
        marginBottom: SPACING.sm,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.xl,
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
    freeTextSection: {
        marginBottom: SPACING.xl,
    },
    freeTextInput: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray[300],
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[900],
        minHeight: 100,
        textAlignVertical: 'top',
    },
    actions: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    backButton: {
        flex: 1,
    },
    submitButton: {
        flex: 2,
    },
});
