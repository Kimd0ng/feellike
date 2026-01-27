export type TEmotionLog = {
    id: string;
    user_id: string;
    mood: string;
    weather: {
        temp: number;
        condition: string;
        description: string;
        icon: string;
    };
    recommendation: {
        theme: string;
        reason: string;
        recommendation: string;
        platform: 'baemin' | 'youtube' | 'coupang';
        searchKeyword: string;
        deepLink: string;
    };
    created_at: string;
};

export type TEmotionStats = {
    mood: string;
    count: number;
    last_occurrence: string;
};
