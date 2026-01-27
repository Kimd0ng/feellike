/**
 * 날씨/위치 관련 타입 정의
 * @author Feel Economy Team
 */

import type { TWeather } from '@feellike/api';

/**
 * 위치 정보 타입
 */
export type TLocation = {
    lat: number;
    lon: number;
    name: string;
};

/**
 * 위치와 날씨 정보를 합친 타입
 */
export type TLocationWeather = {
    location: TLocation;
    weather: TWeather;
};
