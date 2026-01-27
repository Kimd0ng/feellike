import { atom } from 'jotai';
import type { TWeather } from '@feellike/api';

/**
 * 현재 선택된 감정
 */
export const moodAtom = atom<string>('');

/**
 * 현재 날씨 정보
 */
export const weatherAtom = atom<TWeather | null>(null);

/**
 * 현재 위치 정보
 */
export const locationAtom = atom<{ lat: number; lon: number; name: string } | null>(null);

/**
 * 추천 결과
 */
export type TRecommendation = {
    theme: string;
    reason: string;
    recommendation: string;
    platform: 'baemin' | 'youtube' | 'coupang';
    searchKeyword: string;
    deepLink: string;
    pastContext?: {
        logs: Array<{
            recommendation: {
                recommendation: string;
            };
            created_at: string;
        }>;
    };
};

export const recommendationAtom = atom<TRecommendation | null>(null);
