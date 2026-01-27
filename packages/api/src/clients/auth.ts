import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { getSupabaseClient } from './supabase';
import type { TUser, TAuthSession, TOAuthProvider } from './auth.types';

/**
 * 현재 플랫폼이 네이티브 앱인지 확인합니다.
 * @author Feel Economy Team
 */
const isNativePlatform = (): boolean => {
    return Capacitor.isNativePlatform();
};

/**
 * OAuth 리다이렉트 URL을 가져옵니다.
 * 웹: window.location.origin
 * 앱: 커스텀 URL 스킴 (com.feellike.app://)
 * @author Feel Economy Team
 */
const getOAuthRedirectUrl = (): string => {
    if (isNativePlatform()) {
        return 'com.feellike.app://auth/callback';
    }
    return `${window.location.origin}/`;
};

/**
 * Supabase User를 TUser로 변환합니다.
 * @author Feel Economy Team
 */
const mapSupabaseUser = (supabaseUser: {
    id: string;
    email?: string;
    user_metadata?: Record<string, unknown>;
    app_metadata?: { provider?: string; providers?: string[] };
    identities?: Array<{ provider?: string }>;
    created_at?: string;
}): TUser => {
    // Provider 확인: app_metadata.provider > app_metadata.providers[0] > identities[0].provider
    const provider =
        supabaseUser.app_metadata?.provider ||
        supabaseUser.app_metadata?.providers?.[0] ||
        supabaseUser.identities?.[0]?.provider;

    const metadata = supabaseUser.user_metadata;

    // Google OAuth는 full_name, 일반 이메일 회원가입은 name 사용
    const name = (metadata?.['name'] || metadata?.['full_name']) as string | undefined;

    // Google OAuth는 picture, 일부는 avatar_url 사용
    const avatarUrl = (metadata?.['avatar_url'] || metadata?.['picture']) as string | undefined;

    return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name,
        avatarUrl,
        provider: provider === 'google' || provider === 'kakao' ? provider : 'email',
        createdAt: supabaseUser.created_at,
    };
};

/**
 * 이메일로 회원가입합니다.
 * @author Feel Economy Team
 */
export const signUpWithEmail = async (email: string, password: string, name?: string): Promise<TAuthSession | null> => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            },
        },
    });

    if (error) {
        console.error('Sign up error:', error);
        throw error;
    }

    if (!data.user || !data.session) {
        return null;
    }

    return {
        user: mapSupabaseUser(data.user),
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at || 0,
    };
};

/**
 * 이메일로 로그인합니다.
 * @author Feel Economy Team
 */
export const signInWithEmail = async (email: string, password: string): Promise<TAuthSession | null> => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Sign in error:', error);
        throw error;
    }

    if (!data.user || !data.session) {
        return null;
    }

    return {
        user: mapSupabaseUser(data.user),
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at || 0,
    };
};

/**
 * OAuth로 로그인합니다 (Google, Kakao).
 * 웹: 리다이렉트 방식
 * 앱: 인앱 브라우저를 열어 OAuth 진행 후 딥링크로 복귀
 * @author Feel Economy Team
 */
export const signInWithOAuth = async (provider: TOAuthProvider): Promise<void> => {
    const supabase = getSupabaseClient();
    const redirectTo = getOAuthRedirectUrl();

    if (isNativePlatform()) {
        // 네이티브 앱: OAuth URL을 직접 생성하여 인앱 브라우저로 열기
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo,
                skipBrowserRedirect: true, // 브라우저 자동 리다이렉트 방지
            },
        });

        if (error) {
            console.error(`OAuth sign in error (${provider}):`, error);
            throw error;
        }

        if (data?.url) {
            // 인앱 브라우저(Chrome Custom Tabs)로 OAuth URL 열기
            // toolbarColor를 지정하면 확실히 인앱 브라우저로 열림
            await Browser.open({
                url: data.url,
                toolbarColor: '#ffffff',
                presentationStyle: 'popover',
            });
        }
    } else {
        // 웹: 기존 리다이렉트 방식
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo,
            },
        });

        if (error) {
            console.error(`OAuth sign in error (${provider}):`, error);
            throw error;
        }
    }
};

/**
 * Google OAuth로 로그인합니다.
 * @author Feel Economy Team
 */
export const signInWithGoogle = async (): Promise<void> => {
    return signInWithOAuth('google');
};

/**
 * Kakao OAuth로 로그인합니다.
 * @author Feel Economy Team
 */
export const signInWithKakao = async (): Promise<void> => {
    return signInWithOAuth('kakao');
};

/**
 * 로그아웃합니다.
 * @author Feel Economy Team
 */
export const signOut = async (): Promise<void> => {
    const supabase = getSupabaseClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Sign out error:', error);
        throw error;
    }
};

/**
 * 현재 로그인한 유저를 가져옵니다.
 * @author Feel Economy Team
 */
export const getCurrentUser = async (): Promise<TUser | null> => {
    const supabase = getSupabaseClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        console.error('Get current user error:', error);
        return null;
    }

    if (!user) {
        return null;
    }

    return mapSupabaseUser(user);
};

/**
 * 현재 세션을 가져옵니다.
 * @author Feel Economy Team
 */
export const getCurrentSession = async (): Promise<TAuthSession | null> => {
    const supabase = getSupabaseClient();

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (error) {
        console.error('Get session error:', error);
        return null;
    }

    if (!session) {
        return null;
    }

    const user = await getCurrentUser();
    if (!user) {
        return null;
    }

    return {
        user,
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at || 0,
    };
};

/**
 * 인증 상태 변화를 구독합니다.
 * @author Feel Economy Team
 */
export const onAuthStateChange = (callback: (user: TUser | null) => void): (() => void) => {
    const supabase = getSupabaseClient();

    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
            callback(mapSupabaseUser(session.user));
        } else {
            callback(null);
        }
    });

    return () => subscription.unsubscribe();
};
