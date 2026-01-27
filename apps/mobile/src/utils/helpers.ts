/**
 * 유틸리티 헬퍼 함수
 * @author Feel Economy Team
 */

/**
 * 시간대 가져오기
 * @author Feel Economy Team
 */
export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
};

/**
 * 시간대별 인사말
 * @author Feel Economy Team
 */
export const getGreeting = (): string => {
    const timeOfDay = getTimeOfDay();

    const greetings = {
        morning: '좋은 아침이에요 ☀️',
        afternoon: '좋은 오후에요 🌤️',
        evening: '좋은 저녁이에요 🌙',
        night: '편안한 밤 되세요 ✨',
    };

    return greetings[timeOfDay];
};

/**
 * 플랫폼별 딥링크 생성
 * @author Feel Economy Team
 */
export const generateDeepLink = (
    platform: 'baemin' | 'youtube' | 'coupang',
    searchKeyword: string
): string => {
    const encodedKeyword = encodeURIComponent(searchKeyword);

    const links = {
        baemin: `baemin://search?query=${encodedKeyword}`,
        youtube: `youtube://results?search_query=${encodedKeyword}`,
        coupang: `coupang://search?q=${encodedKeyword}`,
    };

    return links[platform];
};

/**
 * 플랫폼별 웹 URL (딥링크 실패 시 대체)
 * @author Feel Economy Team
 */
export const generateWebUrl = (
    platform: 'baemin' | 'youtube' | 'coupang',
    searchKeyword: string
): string => {
    const encodedKeyword = encodeURIComponent(searchKeyword);

    const urls = {
        baemin: `https://www.baemin.com/search?query=${encodedKeyword}`,
        youtube: `https://www.youtube.com/results?search_query=${encodedKeyword}`,
        coupang: `https://www.coupang.com/np/search?q=${encodedKeyword}`,
    };

    return urls[platform];
};

/**
 * 날짜 포맷팅
 * @author Feel Economy Team
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }).format(date);
};
