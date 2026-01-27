import { supabase } from '@feellike/api';
import type { TRecommendation } from '@/store/atoms';

export type TEmotionLog = {
    id: string;
    user_id: string;
    mood: string;
    weather: {
        temp: number;
        condition: string;
        description: string;
        icon: string;
    };
    recommendation: TRecommendation;
    created_at: string;
};

/**
 * 감정 로그 저장
 * @author Feel Economy Team
 */
export const saveEmotionLog = async (
    log: Omit<TEmotionLog, 'id' | 'user_id' | 'created_at'>
): Promise<void> => {
    // 현재 로그인한 사용자 정보 가져오기
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.error('Error saving emotion log: User not authenticated');
        throw new Error('User not authenticated');
    }

    const { error } = await supabase.from('emotion_logs').insert({
        user_id: user.id,
        mood: log.mood,
        weather: log.weather,
        recommendation: log.recommendation,
    });

    if (error) {
        console.error('Error saving emotion log:', error);
        throw error;
    }
};

/**
 * 사용자의 감정 로그 조회 (페이지네이션 지원)
 * @author Feel Economy Team
 */
export const getEmotionHistory = async (page = 1, limit = 10): Promise<{ data: TEmotionLog[]; count: number }> => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from('emotion_logs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching emotion history:', error);
        return { data: [], count: 0 };
    }

    return { data: (data as TEmotionLog[]) || [], count: count || 0 };
};

/**
 * 감정 통계 조회
 * @author Feel Economy Team
 */
export const getEmotionStats = async (): Promise<
    Array<{
        mood: string;
        count: number;
        last_occurrence: string;
    }>
> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase.rpc('get_emotion_stats', {
        target_user_id: user.id,
    });

    if (error) {
        console.error('Error fetching emotion stats:', error);
        return [];
    }

    return data || [];
};

/**
 * 최근 로그 조회 (제한)
 * @author Feel Economy Team
 */
export const getRecentLogs = async (limit = 10): Promise<TEmotionLog[]> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase.rpc('get_recent_logs', {
        target_user_id: user.id,
        log_limit: limit,
    });

    if (error) {
        console.error('Error fetching recent logs:', error);
        return [];
    }

    return data || [];
};

/**
 * 유사한 과거 로그 조회
 * @author Feel Economy Team
 */
export const getSimilarPastLogs = async (
    mood: string,
    weatherCondition: string,
    limit = 3
): Promise<TEmotionLog[]> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase.rpc('get_similar_past_logs', {
        target_user_id: user.id,
        target_mood: mood,
        target_weather_condition: weatherCondition,
        log_limit: limit,
    });

    if (error) {
        console.error('Error fetching similar past logs:', error);
        return [];
    }

    return data || [];
};

/**
 * 로그 삭제
 * @author Feel Economy Team
 */
export const deleteEmotionLog = async (logId: string): Promise<void> => {
    const { error } = await supabase.from('emotion_logs').delete().eq('id', logId);

    if (error) {
        console.error('Error deleting emotion log:', error);
        throw error;
    }
};

export * from './useHistoryQuery';
export * from './useHistoryMutation';
