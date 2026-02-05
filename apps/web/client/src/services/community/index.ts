/**
 * 커뮤니티 서비스 API 함수
 * @author Feel Economy Team
 */
import { supabase } from '@feellike/api';
import type {
    TCommunityPost,
    TComment,
    TCreatePostRequest,
    TCreateCommentRequest,
    TPostListFilter,
} from './types';

/**
 * 게시글 목록 조회
 * @author Feel Economy Team
 */
export const getPostList = async (filter: TPostListFilter = {}): Promise<TCommunityPost[]> => {
    const { mood, sortBy = 'latest', limit = 20, offset = 0 } = filter;

    const { data, error } = await supabase.rpc('get_community_posts', {
        page_limit: limit,
        page_offset: offset,
        filter_mood: mood || null,
        sort_by: sortBy,
    });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    return data || [];
};

/**
 * 게시글 상세 조회
 * @author Feel Economy Team
 */
export const getPostDetail = async (postId: string): Promise<TCommunityPost | null> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.rpc('get_post_detail', {
        target_post_id: postId,
        current_user_id: user?.id || null,
    });

    if (error) {
        console.error('Error fetching post detail:', error);
        return null;
    }

    return data?.[0] || null;
};

/**
 * 게시글 작성
 * @author Feel Economy Team
 */
export const createPost = async (request: TCreatePostRequest): Promise<TCommunityPost | null> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('community_posts')
        .insert({
            user_id: user.id,
            title: request.title,
            content: request.content,
            mood: request.mood,
            weather_condition: request.weather_condition,
            recommendation_theme: request.recommendation_theme,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating post:', error);
        throw error;
    }

    return data;
};

/**
 * 게시글 삭제
 * @author Feel Economy Team
 */
export const deletePost = async (postId: string): Promise<void> => {
    const { error } = await supabase.from('community_posts').delete().eq('id', postId);

    if (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

/**
 * 댓글 목록 조회
 * @author Feel Economy Team
 */
export const getComments = async (postId: string): Promise<TComment[]> => {
    const { data, error } = await supabase.rpc('get_post_comments', {
        target_post_id: postId,
    });

    if (error) {
        console.error('Error fetching comments:', error);
        return [];
    }

    return data || [];
};

/**
 * 댓글 작성
 * @author Feel Economy Team
 */
export const createComment = async (request: TCreateCommentRequest): Promise<TComment | null> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('community_comments')
        .insert({
            post_id: request.post_id,
            user_id: user.id,
            content: request.content,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating comment:', error);
        throw error;
    }

    return data;
};

/**
 * 댓글 삭제
 * @author Feel Economy Team
 */
export const deleteComment = async (commentId: string): Promise<void> => {
    const { error } = await supabase.from('community_comments').delete().eq('id', commentId);

    if (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

/**
 * 좋아요 토글
 * @author Feel Economy Team
 */
export const toggleLike = async (postId: string): Promise<boolean> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    // 기존 좋아요 확인
    const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

    if (existingLike) {
        // 좋아요 취소
        const { error } = await supabase.from('post_likes').delete().eq('id', existingLike.id);

        if (error) {
            console.error('Error removing like:', error);
            throw error;
        }

        return false;
    } else {
        // 좋아요 추가
        const { error } = await supabase.from('post_likes').insert({
            post_id: postId,
            user_id: user.id,
        });

        if (error) {
            console.error('Error adding like:', error);
            throw error;
        }

        return true;
    }
};

export * from './useCommunityQuery';
export * from './useCommunityMutation';
export * from './types';
