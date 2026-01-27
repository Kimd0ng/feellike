import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, RADIUS } from '@feellike/ui/native';
import { useEmotionHistoryQuery } from '../services/history';
import { formatDate } from '../utils/helpers';
import type { TEmotionLog } from '../services/history/types';
import type { RootStackScreenProps } from '../navigation/types';

const PLATFORM_EMOJIS: Record<string, string> = {
    baemin: '🍔',
    youtube: '📺',
    coupang: '🛒',
};

const ITEMS_PER_PAGE = 10;

/**
 * HistoryScreen 컴포넌트
 * 추천 히스토리 목록 표시
 * @author Feel Economy Team
 */
export const HistoryScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<'History'>['navigation']>();
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useEmotionHistoryQuery(page, ITEMS_PER_PAGE);

    const historyData = data?.data ?? [];
    const totalCount = data?.count ?? 0;
    const hasMore = historyData.length < totalCount;

    const handleLoadMore = () => {
        if (hasMore && !isLoading) {
            setPage((prev) => prev + 1);
        }
    };

    const renderItem = ({ item }: { item: TEmotionLog }) => (
        <Card elevation="flat" style={styles.historyItem}>
            <View style={styles.itemHeader}>
                <Text style={styles.date}>{formatDate(item.created_at)}</Text>
                <Text style={styles.platformEmoji}>
                    {PLATFORM_EMOJIS[item.recommendation.platform]}
                </Text>
            </View>
            <Text style={styles.mood}>기분: {item.mood}</Text>
            <Text style={styles.recommendation}>
                추천: {item.recommendation.recommendation}
            </Text>
            <Text style={styles.theme}>{item.recommendation.theme}</Text>
        </Card>
    );

    const renderFooter = () => {
        if (!hasMore) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={COLORS.primary[300]} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>← 뒤로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>추천 히스토리</Text>
            </View>

            {isLoading && page === 1 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary[300]} />
                </View>
            ) : isError ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>데이터를 불러올 수 없어요</Text>
                    <Text style={styles.emptySubText}>
                        잠시 후 다시 시도해주세요
                    </Text>
                </View>
            ) : historyData.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>아직 추천 기록이 없어요</Text>
                    <Text style={styles.emptySubText}>
                        첫 번째 추천을 받아보세요!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={historyData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    emptyText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.gray[600],
        marginBottom: SPACING.xs,
    },
    emptySubText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[400],
    },
    listContent: {
        padding: SPACING.lg,
        gap: SPACING.md,
    },
    historyItem: {
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.gray[200],
        borderRadius: RADIUS.lg,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    date: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray[500],
    },
    platformEmoji: {
        fontSize: FONT_SIZE.lg,
    },
    mood: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray[700],
        marginBottom: SPACING.xs,
    },
    recommendation: {
        fontSize: FONT_SIZE.md,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.gray[900],
        marginBottom: SPACING.xs,
    },
    theme: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray[500],
        fontStyle: 'italic',
    },
    footerLoader: {
        paddingVertical: SPACING.lg,
        alignItems: 'center',
    },
});
