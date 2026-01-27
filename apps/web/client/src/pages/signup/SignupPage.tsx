import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@feellike/ui';
import { useSignUpMutation } from '@/services/auth/useAuthMutation';
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
    helperText,
    footer,
    link,
    errorMessage,
    successMessage,
} from './SignupPage.css';

/**
 * 회원가입 페이지
 * 이메일 회원가입 지원
 * @author Feel Economy Team
 */
export const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const { mutate: signUp, isPending } = useSignUpMutation();

    const validateForm = (): boolean => {
        if (!email || !password || !confirmPassword) {
            setError('모든 필드를 입력해주세요.');
            return false;
        }

        if (password.length < 6) {
            setError('비밀번호는 6자 이상이어야 합니다.');
            return false;
        }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('올바른 이메일 형식이 아닙니다.');
            return false;
        }

        return true;
    };

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        signUp(
            { email, password, ...(name ? { name } : {}) },
            {
                onSuccess: () => {
                    setSuccess(true);
                },
                onError: (err) => {
                    setError(
                        err instanceof Error
                            ? err.message
                            : '회원가입에 실패했습니다. 다시 시도해주세요.'
                    );
                },
            }
        );
    };

    if (success) {
        return (
            <div className={container}>
                <div className={card}>
                    <div className={header}>
                        <h1 className={title}>가입 완료! 🎉</h1>
                    </div>
                    <div className={successMessage}>
                        이메일로 인증 링크를 보내드렸습니다.
                        <br />
                        이메일을 확인해주세요.
                    </div>
                    <div className={footer}>
                        <Link to="/login" className={link}>
                            로그인 페이지로 이동
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={container}>
            <div className={card}>
                <div className={header}>
                    <h1 className={title}>회원가입</h1>
                    <p className={subtitle}>Feel Economy와 함께 감정 소비를 기록하세요</p>
                </div>

                {error && <div className={errorMessage}>{error}</div>}

                <form className={formSection} onSubmit={handleSignUp}>
                    <div className={inputWrapper}>
                        <label htmlFor="name" className={label}>
                            이름 (선택)
                        </label>
                        <input
                            id="name"
                            type="text"
                            className={input}
                            placeholder="홍길동"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                        />
                    </div>
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
                            placeholder="6자 이상"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        <span className={helperText}>6자 이상 입력해주세요</span>
                    </div>
                    <div className={inputWrapper}>
                        <label htmlFor="confirmPassword" className={label}>
                            비밀번호 확인
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className={input}
                            placeholder="비밀번호 다시 입력"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        disabled={isPending}
                    >
                        {isPending ? '가입 중...' : '회원가입'}
                    </Button>
                </form>

                <div className={footer}>
                    이미 계정이 있으신가요?{' '}
                    <Link to="/login" className={link}>
                        로그인
                    </Link>
                </div>
            </div>
        </div>
    );
};
