/**
 * 추천 서비스 타입 정의
 * @author Feel Economy Team
 */

export type TRecommendationRequest = {
    mood: string;
    weather: {
        temp: number;
        condition: string;
        description: string;
    };
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
};

export type TRecommendationResult = {
    theme: string;
    reason: string;
    recommendation: string;
    platform: 'baemin' | 'youtube' | 'coupang';
    searchKeyword: string;
    deepLink: string;
    pastContext?: {
        logs: Array<{
            recommendation: {
                recommendation: string;
            };
            created_at: string;
        }>;
    };
};
