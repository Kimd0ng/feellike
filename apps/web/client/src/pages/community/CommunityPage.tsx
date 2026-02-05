import { useNavigate } from 'react-router-dom';
import { Button } from '@feellike/ui';
import { useAuth } from '@/providers/AuthProvider';
import { usePostListQuery } from '@/services/community/useCommunityQuery';
import { useState } from 'react';
import {
    container,
    header,
    title,
    writeButton,
    filterSection,
    filterButton,
    filterButtonActive,
    postsGrid,
    postCard,
    postTitle,
    postContent,
    tagContainer,
    tag,
    postMeta,
    metaLeft,
    metaItem,
    emptyState,
    emptyTitle,
    emptyDescription,
    loadingState,
} from './CommunityPage.css';
import type { TPostListFilter } from '@/services/community/types';

const MOOD_FILTERS = [
    { value: '', label: '전체' },
    { value: '행복함', label: '😊 행복함' },
    { value: '우울함', label: '😢 우울함' },
    { value: '불안함', label: '😰 불안함' },
    { value: '피곤함', label: '😴 피곤함' },
    { value: '짜증남', label: '😤 짜증남' },
];

const SORT_OPTIONS = [
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' },
] as const;

/**
 * 날짜 포맷팅
 * @author Feel Economy Team
 */
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diff / (1000 * 60));
            return diffMinutes <= 0 ? '방금 전' : `${diffMinutes}분 전`;
        }
        return `${diffHours}시간 전`;
    } else if (diffDays === 1) {
        return '어제';
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
};

/**
 * 커뮤니티 메인 페이지
 * @author Feel Economy Team
 */
export const CommunityPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [filter, setFilter] = useState<TPostListFilter>({
        sortBy: 'latest',
        mood: undefined,
    });

    const { data: posts, isLoading } = usePostListQuery(filter);

    const handleFilterChange = (mood: string) => {
        setFilter((prev) => ({
            ...prev,
            mood: mood || undefined,
        }));
    };

    const handleSortChange = (sortBy: 'latest' | 'popular') => {
        setFilter((prev) => ({
            ...prev,
            sortBy,
        }));
    };

    const handleWriteClick = () => {
        if (isAuthenticated) {
            navigate('/community/write');
        } else {
            navigate('/login', { state: { from: '/community/write' } });
        }
    };

    const handlePostClick = (postId: string) => {
        navigate(`/community/${postId}`);
    };

    return (
        <div className={container}>
            <div className={header}>
                <h1 className={title}>커뮤니티</h1>
                <Button
                    variant="primary"
                    size="medium"
                    className={writeButton}
                    onClick={handleWriteClick}
                >
                    ✏️ 글쓰기
                </Button>
            </div>

            <div className={filterSection}>
                {MOOD_FILTERS.map((mood) => (
                    <button
                        key={mood.value}
                        className={`${filterButton} ${filter.mood === (mood.value || undefined) ||
                                (!filter.mood && mood.value === '')
                                ? filterButtonActive
                                : ''
                            }`}
                        onClick={() => handleFilterChange(mood.value)}
                    >
                        {mood.label}
                    </button>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                    {SORT_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            className={`${filterButton} ${filter.sortBy === option.value ? filterButtonActive : ''
                                }`}
                            onClick={() => handleSortChange(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className={loadingState}>게시글을 불러오는 중...</div>
            ) : posts && posts.length > 0 ? (
                <div className={postsGrid}>
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className={postCard}
                            onClick={() => handlePostClick(post.id)}
                        >
                            <h2 className={postTitle}>{post.title}</h2>
                            <p className={postContent}>{post.content}</p>

                            <div className={tagContainer}>
                                {post.mood && <span className={tag}>{post.mood}</span>}
                                {post.weather_condition && (
                                    <span className={tag}>{post.weather_condition}</span>
                                )}
                                {post.recommendation_theme && (
                                    <span className={tag}>{post.recommendation_theme}</span>
                                )}
                            </div>

                            <div className={postMeta}>
                                <div className={metaLeft}>
                                    <span className={metaItem}>
                                        👁️ {post.view_count}
                                    </span>
                                    <span className={metaItem}>
                                        ❤️ {post.likes_count}
                                    </span>
                                    <span className={metaItem}>
                                        💬 {post.comments_count}
                                    </span>
                                </div>
                                <span>{formatDate(post.created_at)}</span>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className={emptyState}>
                    <h2 className={emptyTitle}>아직 게시글이 없습니다</h2>
                    <p className={emptyDescription}>
                        첫 번째로 감정 분석 경험을 공유해 보세요!
                    </p>
                    <Button variant="primary" size="medium" onClick={handleWriteClick}>
                        ✏️ 첫 글 작성하기
                    </Button>
                </div>
            )}
        </div>
    );
};
