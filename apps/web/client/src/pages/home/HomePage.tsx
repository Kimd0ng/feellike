import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { weatherAtom, locationAtom } from '@/store/atoms';
import { useAuth } from '@/providers/AuthProvider';
import { useLocationWeatherQuery } from '@/services/weather';
import { DashboardView } from './components/DashboardView';
import { LandingView } from './components/LandingView';

/**
 * HomePage 컴포넌트
 * 인증 상태에 따라 LandingView 또는 DashboardView를 렌더링
 * @author Feel Economy Team
 */
export const HomePage = () => {
    const { isAuthenticated } = useAuth();
    const [, setWeather] = useAtom(weatherAtom);
    const [, setLocation] = useAtom(locationAtom);

    // React Query로 위치/날씨 정보 관리 (캐시됨)
    // DashboardView에서 데이터를 활용할 수 있도록 상위에서 호출 유지
    const { data } = useLocationWeatherQuery();

    // React Query 데이터를 Jotai atom에 동기화
    useEffect(() => {
        if (data) {
            setWeather(data.weather);
            setLocation(data.location);
        }
    }, [data, setWeather, setLocation]);

    if (isAuthenticated) {
        return <DashboardView />;
    }

    return <LandingView />;
};
