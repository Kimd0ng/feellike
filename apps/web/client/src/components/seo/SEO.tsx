import { Helmet } from 'react-helmet-async';

type SEOProps = {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
};

/**
 * SEO 컴포넌트
 * 페이지별 메타 태그를 동적으로 설정합니다.
 * @author Feel Economy Team
 */
export const SEO = ({
    title,
    description = '날씨와 감정의 미묘한 관계를 탐구하는 웰니스 파트너, FeelLike입니다.',
    image = '/og-image.png', // 기본 OG 이미지 (추후 추가 필요)
    url = typeof window !== 'undefined' ? window.location.href : '',
    keywords = '날씨, 감정, 우울, 기분 전환, 웰니스, 멘탈케어',
}: SEOProps) => {
    const siteTitle = 'FeelLike - 날씨와 감정';
    const fullTitle = `${title} | ${siteTitle}`;

    return (
        <Helmet>
            {/* 기본 메타 태그 */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Viewport & Charset은 index.html에 있지만 중복 보강 */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};
