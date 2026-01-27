/**
 * 앱 환경 설정
 * react-native-config를 사용하여 .env 파일에서 환경 변수 로드
 * @author Feel Economy Team
 */

// react-native-config가 설치되어 있으면 사용, 없으면 fallback
let RNConfig: Record<string, string | undefined> = {};

try {
    // react-native-config 동적 import
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    RNConfig = require('react-native-config').default || {};
} catch {
    // react-native-config가 설치되지 않은 경우 빈 객체 사용
    console.warn('react-native-config not installed. Using fallback values.');
}

const Config = {
    // Supabase 설정
    SUPABASE_URL: RNConfig['SUPABASE_URL'] || 'https://your-project.supabase.co',
    SUPABASE_ANON_KEY: RNConfig['SUPABASE_ANON_KEY'] || 'your-anon-key',

    // 앱 딥링크 스키마
    APP_SCHEME: RNConfig['APP_SCHEME'] || 'com.feellike.app',

    // 토스페이먼츠
    TOSS_CLIENT_KEY: RNConfig['TOSS_CLIENT_KEY'] || '',

    // API 서버 URL
    API_URL: RNConfig['API_URL'] || 'https://api.feellike.app',
};

export default Config;
