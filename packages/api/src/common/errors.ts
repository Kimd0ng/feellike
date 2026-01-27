/**
 * API 에러 클래스
 * @author Feel Economy Team
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public code?: number
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * 네트워크 에러 클래스
 * @author Feel Economy Team
 */
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}
