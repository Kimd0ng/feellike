import { supabase } from './supabase';

/**
 * 날씨 정보 타입
 */
export type TWeather = {
    temp: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
    description: string;
    icon: string;
};

/**
 * 위치 정보로 날씨 조회
 * Supabase Edge Function을 통해 Weather API 호출
 * @author Feel Economy Team
 */
export const getCurrentWeather = async (
    lat: number,
    lon: number
): Promise<TWeather | null> => {
    try {
        const { data, error } = await supabase.functions.invoke('weather-proxy', {
            body: { lat, lon },
        });

        if (error) {
            console.error('Weather API Error:', error);
            return null;
        }

        return data as TWeather;
    } catch (error) {
        console.error('Weather API Error:', error);
        return null;
    }
};

/**
 * 좌표를 도시명으로 변환 (Reverse Geocoding)
 * @author Feel Economy Team
 */
export const getLocationName = async (
    lat: number,
    lon: number
): Promise<string> => {
    try {
        const { data, error } = await supabase.functions.invoke('geocoding-proxy', {
            body: { lat, lon },
        });

        if (error) {
            console.error('Geocoding Error:', error);
            return '알 수 없는 위치';
        }

        return data.location as string;
    } catch (error) {
        console.error('Geocoding Error:', error);
        return '알 수 없는 위치';
    }
};
