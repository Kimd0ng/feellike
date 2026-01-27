import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase 클라이언트를 생성합니다
 * @param supabaseUrl - Supabase 프로젝트 URL
 * @param supabaseAnonKey - Supabase anon key
 * @returns Supabase 클라이언트 인스턴스
 * @author Feel Economy Team
 */
export function createSupabaseClient(
    supabaseUrl: string,
    supabaseAnonKey: string
): SupabaseClient {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            'Supabase credentials are required. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
        );
    }

    return createClient(supabaseUrl, supabaseAnonKey);
}

// 싱글톤 인스턴스를 저장하기 위한 변수
let supabaseInstance: SupabaseClient | null = null;

/**
 * Supabase 클라이언트를 초기화합니다
 * 앱 시작 시 한 번 호출해야 합니다
 * @param supabaseUrl - Supabase 프로젝트 URL
 * @param supabaseAnonKey - Supabase anon key
 */
export function initializeSupabase(supabaseUrl: string, supabaseAnonKey: string): void {
    if (supabaseInstance) {
        console.warn('Supabase client is already initialized');
        return;
    }
    supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Supabase 클라이언트 싱글톤 인스턴스를 가져옵니다
 * initializeSupabase()를 먼저 호출해야 합니다
 * @returns Supabase 클라이언트 인스턴스
 */
export function getSupabaseClient(): SupabaseClient {
    if (!supabaseInstance) {
        throw new Error(
            'Supabase client is not initialized. Call initializeSupabase() first with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
        );
    }

    return supabaseInstance;
}

/**
 * @deprecated Use getSupabaseClient() instead for lazy initialization
 * 하위 호환성을 위해 유지됩니다
 */
export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return getSupabaseClient()[prop as keyof SupabaseClient];
    }
});
