import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import type { PropsWithChildren } from 'react';

export type ProtectedRouteProps = PropsWithChildren<{
    redirectTo?: string;
}>;

/**
 * 인증이 필요한 라우트를 보호하는 래퍼 컴포넌트
 * 비로그인 시 로그인 페이지로 리다이렉트
 * @author Feel Economy Team
 */
export const ProtectedRoute = ({
    children,
    redirectTo = '/login',
}: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <p>로딩 중...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        // 현재 경로를 state로 저장하여 로그인 후 돌아올 수 있도록 함
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
