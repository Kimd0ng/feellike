import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@feellike/ui';
import { useAuth } from '@/providers/AuthProvider';
import { usePostDetailQuery, useCommentsQuery } from '@/services/community/useCommunityQuery';
import {
    useToggleLikeMutation,
    useCreateCommentMutation,
    useDeletePostMutation,
    useDeleteCommentMutation,
} from '@/services/community/useCommunityMutation';
import {
    container,
    backButton,
    content,
    postCard,
    postHeader,
    postTitle,
    postMeta,
    postContent,
    tagContainer,
    tag,
    actionBar,
    likeButton,
    likeButtonActive,
    stats,
    statItem,
    deleteButton,
    commentsSection,
    commentsTitle,
    commentForm,
    commentInput,
    commentList,
    commentItem,
    commentHeader,
    commentAuthor,
    commentDate,
    commentContent,
    loginPrompt,
    loadingState,
    notFound,
} from './PostDetailPage.css';

/**
 * 날짜 포맷팅
 * @author Feel Economy Team
 */
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

/**
 * 게시글 상세 페이지
 * @author Feel Economy Team
 */
export const PostDetailPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [commentText, setCommentText] = useState('');

    const { data: post, isLoading: isLoadingPost } = usePostDetailQuery(postId || '');
    const { data: comments, isLoading: isLoadingComments } = useCommentsQuery(postId || '');

    const toggleLikeMutation = useToggleLikeMutation(postId || '');
    const createCommentMutation = useCreateCommentMutation(postId || '');
    const deletePostMutation = useDeletePostMutation();
    const deleteCommentMutation = useDeleteCommentMutation(postId || '');

    const handleBack = () => {
        navigate('/community');
    };

    const handleLike = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/community/${postId}` } });
            return;
        }
        toggleLikeMutation.mutate();
    };

    const handleCommentSubmit = () => {
        if (!commentText.trim() || !postId) return;

        createCommentMutation.mutate(
            { post_id: postId, content: commentText.trim() },
            {
                onSuccess: () => {
                    setCommentText('');
                },
            }
        );
    };

    const handleDeletePost = () => {
        if (!postId || !window.confirm('정말 삭제하시겠습니까?')) return;

        deletePostMutation.mutate(postId, {
            onSuccess: () => {
                navigate('/community');
            },
        });
    };

    const handleDeleteComment = (commentId: string) => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
        deleteCommentMutation.mutate(commentId);
    };

    if (isLoadingPost) {
        return (
            <div className={container}>
                <div className={loadingState}>게시글을 불러오는 중...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className={container}>
                <div className={notFound}>
                    <h2>게시글을 찾을 수 없습니다</h2>
                    <Button variant="ghost" onClick={handleBack}>
                        목록으로 돌아가기
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={container}>
            <button className={backButton} onClick={handleBack}>
                ← 목록으로
            </button>

            <div className={content}>
                <article className={postCard}>
                    <div className={postHeader}>
                        <div>
                            <h1 className={postTitle}>{post.title}</h1>
                            <div className={postMeta}>
                                <span>{post.user_email?.split('@')[0] || '익명'}</span>
                                <span>{formatDate(post.created_at)}</span>
                            </div>
                        </div>
                        {post.is_owner && (
                            <button className={deleteButton} onClick={handleDeletePost}>
                                삭제
                            </button>
                        )}
                    </div>

                    <div className={tagContainer}>
                        {post.mood && <span className={tag}>{post.mood}</span>}
                        {post.weather_condition && (
                            <span className={tag}>{post.weather_condition}</span>
                        )}
                        {post.recommendation_theme && (
                            <span className={tag}>{post.recommendation_theme}</span>
                        )}
                    </div>

                    <p className={postContent}>{post.content}</p>

                    <div className={actionBar}>
                        <button
                            className={`${likeButton} ${post.is_liked ? likeButtonActive : ''}`}
                            onClick={handleLike}
                            disabled={toggleLikeMutation.isPending}
                        >
                            {post.is_liked ? '❤️' : '🤍'} 좋아요 {post.likes_count}
                        </button>
                        <div className={stats}>
                            <span className={statItem}>👁️ {post.view_count}</span>
                            <span className={statItem}>💬 {post.comments_count}</span>
                        </div>
                    </div>
                </article>

                <section className={commentsSection}>
                    <h2 className={commentsTitle}>댓글 {comments?.length || 0}</h2>

                    {isAuthenticated ? (
                        <div className={commentForm}>
                            <textarea
                                className={commentInput}
                                placeholder="댓글을 작성해 주세요..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <Button
                                variant="primary"
                                size="medium"
                                onClick={handleCommentSubmit}
                                disabled={!commentText.trim() || createCommentMutation.isPending}
                            >
                                등록
                            </Button>
                        </div>
                    ) : (
                        <div className={loginPrompt}>
                            <p>댓글을 작성하려면 로그인이 필요합니다.</p>
                            <Button
                                variant="primary"
                                size="medium"
                                onClick={() => navigate('/login', { state: { from: `/community/${postId}` } })}
                                style={{ marginTop: 12 }}
                            >
                                로그인하기
                            </Button>
                        </div>
                    )}

                    {isLoadingComments ? (
                        <div className={loadingState}>댓글을 불러오는 중...</div>
                    ) : comments && comments.length > 0 ? (
                        <div className={commentList}>
                            {comments.map((comment) => (
                                <div key={comment.id} className={commentItem}>
                                    <div className={commentHeader}>
                                        <span className={commentAuthor}>
                                            {comment.user_email?.split('@')[0] || '익명'}
                                        </span>
                                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                            <span className={commentDate}>
                                                {formatDate(comment.created_at)}
                                            </span>
                                            {user?.id === comment.user_id && (
                                                <button
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#EF4444',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                >
                                                    삭제
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <p className={commentContent}>{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center', color: '#9CA3AF', padding: 24 }}>
                            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
};
