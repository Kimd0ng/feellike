/**
 * 날씨/위치 관련 타입 정의
 * @author Feel Economy Team
 */
import type { TWeather, TLocation } from '@feellike/api';

export type TLocationWeather = {
    location: TLocation;
    weather: TWeather;
};
