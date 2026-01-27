import { atom } from 'jotai';
import type { TRecommendation, TWeather, TLocation } from '@feellike/api';

/**
 * Jotai Atoms
 * 앱 전역 상태 관리
 * @author Feel Economy Team
 */

/**
 * 사용자가 입력한 기분
 */
export const moodAtom = atom<string>('');

/**
 * AI 추천 결과
 */
export const recommendationAtom = atom<TRecommendation | null>(null);

/**
 * 현재 날씨 정보
 */
export const weatherAtom = atom<TWeather | null>(null);

/**
 * 현재 위치 정보
 */
export const locationAtom = atom<TLocation | null>(null);
