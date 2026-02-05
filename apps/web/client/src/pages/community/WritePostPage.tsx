import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@feellike/ui';
import { useAtom } from 'jotai';
import { recommendationAtom, moodAtom, weatherAtom } from '@/store/atoms';
import { useCreatePostMutation } from '@/services/community/useCommunityMutation';
import {
    container,
    backButton,
    content,
    formCard,
    formTitle,
    formGroup,
    label,
    input,
    textarea,
    emotionSection,
    emotionTitle,
    emotionInfo,
    emotionTag,
    checkboxGroup,
    checkbox,
    checkboxLabel,
    actions,
    hint,
} from './WritePostPage.css';

/**
 * 게시글 작성 페이지
 * @author Feel Economy Team
 */
export const WritePostPage = () => {
    const navigate = useNavigate();
    const [recommendation] = useAtom(recommendationAtom);
    const [mood] = useAtom(moodAtom);
    const [weather] = useAtom(weatherAtom);

    const [title, setTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [useEmotionData, setUseEmotionData] = useState(true);

    const createPostMutation = useCreatePostMutation();

    const hasEmotionData = !!(recommendation || mood);

    const handleBack = () => {
        navigate('/community');
    };

    const handleSubmit = () => {
        if (!title.trim() || !postContent.trim()) {
            alert('제목과 내용을 모두 입력해 주세요.');
            return;
        }

        const postData = {
            title: title.trim(),
            content: postContent.trim(),
            ...(useEmotionData && hasEmotionData
                ? {
                    mood: mood || undefined,
                    weather_condition: weather?.condition || undefined,
                    recommendation_theme: recommendation?.theme || undefined,
                }
                : {}),
        };

        createPostMutation.mutate(postData, {
            onSuccess: (data) => {
                if (data) {
                    navigate(`/community/${data.id}`);
                } else {
                    navigate('/community');
                }
            },
            onError: () => {
                alert('게시글 작성에 실패했습니다. 다시 시도해 주세요.');
            },
        });
    };

    return (
        <div className={container}>
            <button className={backButton} onClick={handleBack}>
                ← 목록으로
            </button>

            <div className={content}>
                <div className={formCard}>
                    <h1 className={formTitle}>경험 공유하기</h1>

                    {hasEmotionData && (
                        <div className={emotionSection}>
                            <h2 className={emotionTitle}>🎯 최근 감정 분석 결과</h2>
                            <div className={emotionInfo}>
                                {mood && <span className={emotionTag}>기분: {mood}</span>}
                                {weather?.condition && (
                                    <span className={emotionTag}>
                                        날씨: {weather.description}
                                    </span>
                                )}
                                {recommendation?.theme && (
                                    <span className={emotionTag}>
                                        테마: {recommendation.theme}
                                    </span>
                                )}
                            </div>
                            <div className={checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="useEmotionData"
                                    className={checkbox}
                                    checked={useEmotionData}
                                    onChange={(e) => setUseEmotionData(e.target.checked)}
                                />
                                <label htmlFor="useEmotionData" className={checkboxLabel}>
                                    이 정보를 게시글에 포함하기
                                </label>
                            </div>
                        </div>
                    )}

                    <div className={formGroup}>
                        <label htmlFor="title" className={label}>
                            제목
                        </label>
                        <input
                            type="text"
                            id="title"
                            className={input}
                            placeholder="제목을 입력해 주세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                        />
                        <p className={hint}>{title.length}/100</p>
                    </div>

                    <div className={formGroup}>
                        <label htmlFor="content" className={label}>
                            내용
                        </label>
                        <textarea
                            id="content"
                            className={textarea}
                            placeholder="감정 분석 경험을 자유롭게 공유해 주세요.&#10;&#10;예시:&#10;- 오늘 기분이 우울해서 분석을 해봤는데...&#10;- 추천받은 OO가 정말 도움이 됐어요!&#10;- 비 오는 날 이런 걸 해보니 좋더라고요."
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            maxLength={5000}
                        />
                        <p className={hint}>{postContent.length}/5000</p>
                    </div>

                    <div className={actions}>
                        <Button variant="ghost" size="medium" onClick={handleBack}>
                            취소
                        </Button>
                        <Button
                            variant="primary"
                            size="medium"
                            onClick={handleSubmit}
                            disabled={
                                !title.trim() ||
                                !postContent.trim() ||
                                createPostMutation.isPending
                            }
                        >
                            {createPostMutation.isPending ? '게시 중...' : '게시하기'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
