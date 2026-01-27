import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@feellike/ui';
import { useEmotionHistoryQuery } from '@/services/history';
import { formatDate } from '@/utils/helpers';
import {
    container,
    backButton,
    header,
    title,
    subtitle,
    historyList,
    historyItem,
    itemHeader,
    mood,
    date,
    recommendationText,
    platformTag,
    emptyState,
    emptyStateEmoji,
    emptyStateText,
    pagination,
    pageInfo,
} from './HistoryPage.css';

const LIMIT = 5;

/**
 * 히스토리 페이지
 * 사용자의 감정 기록과 추천 내역 조회
 * @author Feel Economy Team
 */
export const HistoryPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { data: historyData, isLoading, isPlaceholderData } = useEmotionHistoryQuery(page, LIMIT);

    const handleGoBack = () => {
        navigate(-1);
    };

    const logs = historyData?.data || [];
    const count = historyData?.count || 0;
    const hasMore = page * LIMIT < count;

    const handlePrevPage = () => {
        setPage((old) => Math.max(old - 1, 1));
    };

    const handleNextPage = () => {
        if (!isPlaceholderData && hasMore) {
            setPage((old) => old + 1);
        }
    };

    if (isLoading) {
        return (
            <div className={container}>
                <button className={backButton} onClick={handleGoBack}>
                    ← 뒤로가기
                </button>
                <div className={header}>
                    <h1 className={title}>내 감정 기록</h1>
                    <p className={subtitle}>로딩 중...</p>
                </div>
            </div>
        );
    }

    if (!logs.length) {
        return (
            <div className={container}>
                <button className={backButton} onClick={handleGoBack}>
                    ← 뒤로가기
                </button>
                <div className={header}>
                    <h1 className={title}>내 감정 기록</h1>
                    <p className={subtitle}>그동안의 감정과 추천을 모아봤어요</p>
                </div>
                <div className={emptyState}>
                    <div className={emptyStateEmoji}>📝</div>
                    <p className={emptyStateText}>아직 기록된 감정이 없네요.</p>
                    <Button variant="primary" size="medium" onClick={() => navigate('/mood-input')}>
                        첫 기록 남기기
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={container}>
            <button className={backButton} onClick={handleGoBack}>
                ← 뒤로가기
            </button>
            <div className={header}>
                <h1 className={title}>내 감정 기록</h1>
                <p className={subtitle}>그동안의 감정과 추천을 모아봤어요</p>
            </div>

            <div className={historyList}>
                {logs.map((log) => (
                    <Card key={log.id} className={historyItem}>
                        <div className={itemHeader}>
                            <span className={mood}>{log.mood}</span>
                            <span className={date}>{formatDate(log.created_at)}</span>
                        </div>
                        <p className={recommendationText}>{log.recommendation.recommendation}</p>
                        <span className={platformTag}>{log.recommendation.platform}</span>
                    </Card>
                ))}
            </div>

            <div className={pagination}>
                <Button variant="outline" size="small" onClick={handlePrevPage} disabled={page === 1}>
                    이전
                </Button>
                <span className={pageInfo}>
                    {page} / {Math.max(1, Math.ceil(count / LIMIT))}
                </span>
                <Button
                    variant="outline"
                    size="small"
                    onClick={handleNextPage}
                    disabled={isPlaceholderData || !hasMore}
                >
                    다음
                </Button>
            </div>
        </div>
    );
};
