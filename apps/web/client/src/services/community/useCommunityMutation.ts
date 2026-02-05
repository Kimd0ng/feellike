/**
 * 커뮤니티 뮤테이션 훅
 * @author Feel Economy Team
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, deletePost, createComment, deleteComment, toggleLike } from './index';
import { communityKeys } from './useCommunityQuery';
import type { TCreatePostRequest, TCreateCommentRequest } from './types';

/**
 * 게시글 작성 뮤테이션
 * @author Feel Economy Team
 */
export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TCreatePostRequest) => await createPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: communityKeys.posts() });
        },
    });
};

/**
 * 게시글 삭제 뮤테이션
 * @author Feel Economy Team
 */
export const useDeletePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postId: string) => await deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: communityKeys.posts() });
        },
    });
};

/**
 * 댓글 작성 뮤테이션
 * @author Feel Economy Team
 */
export const useCreateCommentMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TCreateCommentRequest) => await createComment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: communityKeys.comments(postId) });
            queryClient.invalidateQueries({ queryKey: communityKeys.postDetail(postId) });
        },
    });
};

/**
 * 댓글 삭제 뮤테이션
 * @author Feel Economy Team
 */
export const useDeleteCommentMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (commentId: string) => await deleteComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: communityKeys.comments(postId) });
            queryClient.invalidateQueries({ queryKey: communityKeys.postDetail(postId) });
        },
    });
};

/**
 * 좋아요 토글 뮤테이션
 * @author Feel Economy Team
 */
export const useToggleLikeMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => await toggleLike(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: communityKeys.postDetail(postId) });
            queryClient.invalidateQueries({ queryKey: communityKeys.posts() });
        },
    });
};
