import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
    getEmotionHistory,
    getEmotionStats,
    getRecentLogs,
    getSimilarPastLogs,
} from './index';

/**
 * 히스토리 쿼리 키 팩토리
 * @author Feel Economy Team
 */
export const historyKeys = {
    all: ['history'] as const,
    list: (page: number, limit: number) => [...historyKeys.all, 'list', page, limit] as const,
    stats: () => [...historyKeys.all, 'stats'] as const,
    recent: (limit: number) => [...historyKeys.all, 'recent', limit] as const,
    similar: (mood: string, weatherCondition: string) =>
        [...historyKeys.all, 'similar', mood, weatherCondition] as const,
};

/**
 * 감정 히스토리 조회 훅 (페이지네이션)
 * @author Feel Economy Team
 */
export const useEmotionHistoryQuery = (page: number, limit: number) => {
    return useQuery({
        queryKey: historyKeys.list(page, limit),
        queryFn: () => getEmotionHistory(page, limit),
        placeholderData: keepPreviousData,
    });
};

/**
 * 감정 통계 조회 훅
 * @author Feel Economy Team
 */
export const useEmotionStatsQuery = () => {
    return useQuery({
        queryKey: historyKeys.stats(),
        queryFn: getEmotionStats,
    });
};

/**
 * 최근 로그 조회 훅
 * @author Feel Economy Team
 */
export const useRecentLogsQuery = (limit = 10) => {
    return useQuery({
        queryKey: historyKeys.recent(limit),
        queryFn: () => getRecentLogs(limit),
    });
};

/**
 * 유사한 과거 로그 조회 훅
 * @author Feel Economy Team
 */
export const useSimilarPastLogsQuery = (
    mood: string | null,
    weatherCondition: string | null
) => {
    return useQuery({
        queryKey: historyKeys.similar(mood || '', weatherCondition || ''),
        queryFn: () => getSimilarPastLogs(mood!, weatherCondition!),
        enabled: !!mood && !!weatherCondition,
    });
};
