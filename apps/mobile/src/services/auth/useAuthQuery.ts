import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@feellike/api';

/**
 * Auth 쿼리 키 팩토리
 * @author Feel Economy Team
 */
export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
    session: () => [...authKeys.all, 'session'] as const,
};

/**
 * 현재 유저 정보 조회 쿼리
 * @author Feel Economy Team
 */
export const useGetCurrentUserQuery = () => {
    return useQuery({
        queryKey: authKeys.user(),
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 30, // 30분
        retry: false,
    });
};
