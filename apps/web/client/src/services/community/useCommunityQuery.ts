/**
 * 커뮤니티 쿼리 훅
 * @author Feel Economy Team
 */
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getPostList, getPostDetail, getComments } from './index';
import type { TPostListFilter } from './types';

/**
 * 커뮤니티 쿼리 키 팩토리
 * @author Feel Economy Team
 */
export const communityKeys = {
    all: ['community'] as const,
    posts: () => [...communityKeys.all, 'posts'] as const,
    postList: (filter: TPostListFilter) => [...communityKeys.posts(), 'list', filter] as const,
    postDetail: (id: string) => [...communityKeys.posts(), 'detail', id] as const,
    comments: (postId: string) => [...communityKeys.all, 'comments', postId] as const,
};

/**
 * 게시글 목록 조회 훅
 * @author Feel Economy Team
 */
export const usePostListQuery = (filter: TPostListFilter = {}) => {
    return useQuery({
        queryKey: communityKeys.postList(filter),
        queryFn: () => getPostList(filter),
        placeholderData: keepPreviousData,
    });
};

/**
 * 게시글 상세 조회 훅
 * @author Feel Economy Team
 */
export const usePostDetailQuery = (postId: string) => {
    return useQuery({
        queryKey: communityKeys.postDetail(postId),
        queryFn: () => getPostDetail(postId),
        enabled: !!postId,
    });
};

/**
 * 댓글 목록 조회 훅
 * @author Feel Economy Team
 */
export const useCommentsQuery = (postId: string) => {
    return useQuery({
        queryKey: communityKeys.comments(postId),
        queryFn: () => getComments(postId),
        enabled: !!postId,
    });
};
