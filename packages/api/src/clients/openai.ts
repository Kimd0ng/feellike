import { supabase, getSupabaseClient } from './supabase';

/**
 * OpenAI 추천 요청 타입
 */
export type TRecommendationRequest = {
    mood: string;
    weather: {
        temp: number;
        condition: string;
        description: string;
    };
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
};

/**
 * OpenAI 추천 응답 타입
 */
export type TRecommendationResponse = {
    theme: string;
    reason: string;
    recommendation: string;
    platform: 'baemin' | 'youtube' | 'coupang';
    searchKeyword: string;
};

/**
 * Supabase Edge Function을 통해 Ollama API 호출
 * API 키를 클라이언트에 노출하지 않음
 * 추후 OpenAI로 쉽게 전환 가능
 * @author Feel Economy Team
 */
export const getRecommendation = async (
    request: TRecommendationRequest
): Promise<TRecommendationResponse | null> => {
    try {
        // 디버깅: 세션 토큰 확인
        const client = getSupabaseClient();
        const { data: sessionData } = await client.auth.getSession();
        console.log('[DEBUG] Session exists:', !!sessionData.session);
        console.log('[DEBUG] Access token exists:', !!sessionData.session?.access_token);
        if (sessionData.session?.access_token) {
            console.log('[DEBUG] Token prefix:', sessionData.session.access_token.substring(0, 20) + '...');
        }

        console.log('[DEBUG] Calling supabase.functions.invoke...');
        console.log('[DEBUG] Request:', JSON.stringify(request));

        const { data, error } = await supabase.functions.invoke('ollama-recommendation', {
            body: request,
        });

        console.log('[DEBUG] invoke completed');
        console.log('[DEBUG] data:', data);
        console.log('[DEBUG] error:', error);

        if (error) {
            console.error('Ollama Edge Function Error:', error);
            throw new Error(error.message || 'Edge Function 호출 실패');
        }

        if (!data) {
            throw new Error('추천 결과가 없습니다');
        }

        console.log('[DEBUG] Returning data');
        return data as TRecommendationResponse;
    } catch (error) {
        console.error('Ollama API Error:', error);
        throw error;
    }
};

/**
 * 감정 텍스트 분석 (Ollama 사용)
 * 추후 OpenAI로 쉽게 전환 가능
 * @author Feel Economy Team
 */
export const analyzeEmotion = async (text: string): Promise<string | null> => {
    try {
        const { data, error } = await supabase.functions.invoke('ollama-emotion-analysis', {
            body: { text },
        });

        if (error) {
            console.error('Emotion Analysis Error:', error);
            return null;
        }

        return data.emotion as string;
    } catch (error) {
        console.error('Emotion Analysis Error:', error);
        return null;
    }
};
