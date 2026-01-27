import { useQuery } from '@tanstack/react-query';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';
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
 * Android 위치 권한 요청
 */
const requestAndroidPermission = async (): Promise<boolean> => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: '위치 권한 요청',
                message: '날씨 정보를 가져오기 위해 위치 권한이 필요합니다.',
                buttonNeutral: '나중에',
                buttonNegative: '거부',
                buttonPositive: '허용',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
        return false;
    }
};

/**
 * 현재 위치 좌표를 가져오는 함수
 * @author Feel Economy Team
 */
const getCurrentPosition = (): Promise<Geolocation.GeoPosition> => {
    return new Promise(async (resolve, reject) => {
        // Android에서 권한 요청
        if (Platform.OS === 'android') {
            const hasPermission = await requestAndroidPermission();
            if (!hasPermission) {
                reject(new Error('위치 권한이 필요합니다.'));
                return;
            }
        }

        Geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => {
                switch (error.code) {
                    case 1:
                        reject(new Error('위치 권한이 필요합니다.'));
                        break;
                    case 2:
                        reject(new Error('위치 정보를 가져올 수 없습니다.'));
                        break;
                    case 3:
                        reject(new Error('위치 정보 요청 시간이 초과되었습니다.'));
                        break;
                    default:
                        reject(new Error('위치 정보를 가져오는 중 오류가 발생했습니다.'));
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
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
    const [weatherData, locationName] = await Promise.all([
        getCurrentWeather(lat, lon),
        getLocationName(lat, lon),
    ]);

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
 * @author Feel Economy Team
 */
export const useLocationWeather = () => {
    return useQuery({
        queryKey: weatherKeys.all,
        queryFn: fetchLocationAndWeather,
        staleTime: 10 * 60 * 1000, // 10분간 fresh 상태 유지
        gcTime: 30 * 60 * 1000, // 30분간 캐시 보존
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
