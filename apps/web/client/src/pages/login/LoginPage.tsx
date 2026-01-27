import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@feellike/ui';
import { signInWithGoogle, signInWithKakao } from '@feellike/api';
import { useLoginMutation } from '@/services/auth/useAuthMutation';
import {
    container,
    card,
    header,
    title,
    subtitle,
    formSection,
    inputWrapper,
    label,
    input,
    divider,
    oauthSection,
    googleButton,
    kakaoButton,
    footer,
    link,
    errorMessage,
} from './LoginPage.css';

/**
 * 로그인 페이지
 * 이메일/Google/Kakao 로그인 지원
 * @author Feel Economy Team
 */
export const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { mutate: login, isPending } = useLoginMutation();

    // 로그인 후 원래 가려던 페이지로 리다이렉트
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        login(
            { email, password },
            {
                onSuccess: () => {
                    navigate(from, { replace: true });
                },
                onError: (err) => {
                    setError(
                        err instanceof Error
                            ? err.message
                            : '로그인에 실패했습니다. 다시 시도해주세요.'
                    );
                },
            }
        );
    };

    const handleGoogleLogin = async () => {
        try {
            setError(null);
            await signInWithGoogle();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Google 로그인에 실패했습니다.'
            );
        }
    };

    const handleKakaoLogin = async () => {
        try {
            setError(null);
            await signInWithKakao();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Kakao 로그인에 실패했습니다.'
            );
        }
    };

    return (
        <div className={container}>
            <div className={card}>
                <div className={header}>
                    <h1 className={title}>로그인</h1>
                    <p className={subtitle}>Feel Economy에 오신 것을 환영합니다</p>
                </div>

                {error && <div className={errorMessage}>{error}</div>}

                <form className={formSection} onSubmit={handleEmailLogin}>
                    <div className={inputWrapper}>
                        <label htmlFor="email" className={label}>
                            이메일
                        </label>
                        <input
                            id="email"
                            type="email"
                            className={input}
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className={inputWrapper}>
                        <label htmlFor="password" className={label}>
                            비밀번호
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={input}
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        disabled={isPending}
                    >
                        {isPending ? '로그인 중...' : '로그인'}
                    </Button>
                </form>

                <div className={divider}>또는</div>

                <div className={oauthSection}>
                    <button
                        type="button"
                        className={googleButton}
                        onClick={handleGoogleLogin}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Google로 계속하기
                    </button>
                    <button
                        type="button"
                        className={kakaoButton}
                        onClick={handleKakaoLogin}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path
                                fill="#000"
                                d="M12 3c5.8 0 10.5 3.58 10.5 8 0 4.42-4.7 8-10.5 8-1.07 0-2.11-.12-3.08-.34l-3.96 2.67c-.33.22-.76-.08-.66-.46l.93-3.57C2.86 15.77 1.5 13.5 1.5 11c0-4.42 4.7-8 10.5-8z"
                            />
                        </svg>
                        카카오로 계속하기
                    </button>
                </div>

                <div className={footer}>
                    계정이 없으신가요?{' '}
                    <Link to="/signup" className={link}>
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    );
};
