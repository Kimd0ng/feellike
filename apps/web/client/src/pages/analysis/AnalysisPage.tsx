import { useMemo } from 'react';
import { useEmotionHistoryQuery } from '@/services/history';
import {
    container,
    header,
    title,
    subtitle,
    chartSection,
    chartTitle,
    barChart,
    barRow,
    barLabel,
    barTrack,
    barFill,
    barValue,
    keywordSection,
    keywordTag,
} from './AnalysisPage.css';

export const AnalysisPage = () => {
    // Fetch enough history to generate meaningful stats
    const { data: historyData } = useEmotionHistoryQuery(1, 50);
    const logs = historyData?.data || [];

    const stats = useMemo(() => {
        const moodCounts: Record<string, number> = {};
        let total = 0;

        logs.forEach((log) => {
            moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
            total++;
        });

        // Convert to array and sort by count desc
        return Object.entries(moodCounts)
            .map(([mood, count]) => ({ mood, count, percentage: total > 0 ? (count / total) * 100 : 0 }))
            .sort((a, b) => b.count - a.count);
    }, [logs]);

    return (
        <div className={container}>
            <div className={header}>
                <h1 className={title}>감정 분석 리포트 📊</h1>
                <p className={subtitle}>최근 {logs.length}개의 기록을 분석했습니다.</p>
            </div>

            <section className={chartSection}>
                <h2 className={chartTitle}>감정 분포</h2>
                <div className={barChart}>
                    {stats.map((stat) => (
                        <div key={stat.mood} className={barRow}>
                            <span className={barLabel}>{stat.mood}</span>
                            <div className={barTrack}>
                                <div
                                    className={barFill}
                                    style={{ width: `${stat.percentage}%` }}
                                />
                            </div>
                            <span className={barValue}>{stat.count}회</span>
                        </div>
                    ))}
                    {stats.length === 0 && <p style={{ color: '#999', textAlign: 'center' }}>데이터가 충분하지 않습니다.</p>}
                </div>
            </section>

            <section className={chartSection}>
                <h2 className={chartTitle}>최근 기록된 감정 태그</h2>
                <div className={keywordSection}>
                    {stats.map((stat) => (
                        <span key={stat.mood} className={keywordTag}>
                            #{stat.mood}
                        </span>
                    ))}
                    {stats.length === 0 && <p style={{ color: '#999' }}>데이터가 없습니다.</p>}
                </div>
            </section>
        </div>
    );
};
