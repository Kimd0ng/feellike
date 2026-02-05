/**
 * 커뮤니티 서비스 타입 정의
 * @author Feel Economy Team
 */

/**
 * 커뮤니티 게시글 타입
 */
export type TCommunityPost = {
    id: string;
    user_id: string;
    user_email?: string;
    title: string;
    content: string;
    mood?: string;
    weather_condition?: string;
    recommendation_theme?: string;
    view_count: number;
    likes_count: number;
    comments_count: number;
    created_at: string;
    updated_at?: string;
    is_liked?: boolean;
    is_owner?: boolean;
};

/**
 * 댓글 타입
 */
export type TComment = {
    id: string;
    post_id: string;
    user_id: string;
    user_email?: string;
    content: string;
    created_at: string;
};

/**
 * 게시글 생성 요청 타입
 */
export type TCreatePostRequest = {
    title: string;
    content: string;
    mood?: string | undefined;
    weather_condition?: string | undefined;
    recommendation_theme?: string | undefined;
};

/**
 * 댓글 생성 요청 타입
 */
export type TCreateCommentRequest = {
    post_id: string;
    content: string;
};

/**
 * 게시글 목록 조회 필터 타입
 */
export type TPostListFilter = {
    mood?: string | undefined;
    sortBy?: 'latest' | 'popular';
    limit?: number;
    offset?: number;
};
