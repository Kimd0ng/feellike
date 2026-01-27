import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather, getLocationName } from '@feellike/api';
import type { TLocationWeather } from './types';

/**
 * 날씨/위치 쿼리 키 팩토리
 * @author Feel Economy Team
 */
export const weatherKeys = {
    all: ['weather'] as const,
    current: (lat: number, lon: number) => [...weatherKeys.all, 'current', lat, lon] as const,
};

/**
 * 현재 위치 좌표를 가져오는 함수 (Browser Geolocation API 사용)
 * 브라우저에서 자동으로 위치 권한 요청 팝업을 표시합니다.
 * @author Feel Economy Team
 */
const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('이 브라우저에서는 위치 서비스를 지원하지 않습니다.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error('위치 권한이 필요합니다.'));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error('위치 정보를 가져올 수 없습니다.'));
                        break;
                    case error.TIMEOUT:
                        reject(new Error('위치 정보 요청 시간이 초과되었습니다.'));
                        break;
                    default:
                        reject(new Error('위치 정보를 가져오는 중 오류가 발생했습니다.'));
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
};

/**
 * 위치와 날씨 정보를 함께 가져오는 함수
 */
const fetchLocationAndWeather = async (): Promise<TLocationWeather> => {
    const position = await getCurrentPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // 날씨와 위치명을 병렬로 조회
    const [weatherData, locationName] = await Promise.all([getCurrentWeather(lat, lon), getLocationName(lat, lon)]);

    if (!weatherData) {
        throw new Error('Failed to fetch weather data');
    }

    return {
        location: { lat, lon, name: locationName },
        weather: weatherData,
    };
};

/**
 * 현재 위치의 날씨 정보 조회 훅
 * - 10분간 캐시 유지 (staleTime)
 * - 30분간 캐시 보존 (gcTime)
 * @author Feel Economy Team
 */
export const useLocationWeatherQuery = () => {
    return useQuery({
        queryKey: weatherKeys.all,
        queryFn: fetchLocationAndWeather,
        staleTime: 10 * 60 * 1000, // 10분간 fresh 상태 유지
        gcTime: 30 * 60 * 1000, // 30분간 캐시 보존
        retry: 1,
        refetchOnWindowFocus: false, // 창 포커스 시 재조회 비활성화
    });
};
