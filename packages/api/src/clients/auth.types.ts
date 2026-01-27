/**
 * 사용자 정보 타입
 * @author Feel Economy Team
 */
export type TUser = {
    id: string;
    email: string;
    name?: string | undefined;
    avatarUrl?: string | undefined;
    provider: 'email' | 'google' | 'kakao';
    createdAt?: string | undefined;
};

/**
 * 인증 세션 타입
 * @author Feel Economy Team
 */
export type TAuthSession = {
    user: TUser;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
};

/**
 * 인증 상태 타입
 * @author Feel Economy Team
 */
export type TAuthState = {
    user: TUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
};

/**
 * 로그인 요청 타입
 * @author Feel Economy Team
 */
export type TLoginRequest = {
    email: string;
    password: string;
};

/**
 * 회원가입 요청 타입
 * @author Feel Economy Team
 */
export type TSignUpRequest = {
    email: string;
    password: string;
    name?: string;
};

/**
 * OAuth 프로바이더 타입
 * @author Feel Economy Team
 */
export type TOAuthProvider = 'google' | 'kakao';
