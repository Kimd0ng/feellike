import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useLogoutMutation } from '@/services/auth/useAuthMutation';
import {
    container,
    trigger,
    avatar,
    avatarImage,
    dropdown,
    menuItem,
    menuItemDanger,
    userInfo,
    userName,
    userEmail,
} from './UserMenu.css';

export type UserMenuProps = {
    className?: string;
};

/**
 * 사용자 메뉴 드롭다운
 * 프로필, 기록, 로그아웃 메뉴 제공
 * @author Feel Economy Team
 */
export const UserMenu = ({ className }: UserMenuProps) => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { mutate: logout } = useLogoutMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // avatarUrl이 변경되면 imageError 초기화
    useEffect(() => {
        setImageError(false);
    }, [user?.avatarUrl]);

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 비로그인 상태일 때는 아무것도 렌더링하지 않음
    // 로그인 버튼은 이제 메인 CTA 버튼에 통합됨
    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = () => {
        setIsOpen(false);
        logout(undefined, {
            onSuccess: () => navigate('/', { replace: true }),
        });
    };

    const handleNavigate = (path: string) => {
        setIsOpen(false);
        navigate(path);
    };

    const displayName = user?.name || user?.email?.split('@')[0] || '사용자';
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div ref={containerRef} className={`${container} ${className || ''}`}>
            <button className={trigger} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-haspopup="true">
                <div className={avatar}>
                    {user?.avatarUrl && !imageError ? (
                        <img
                            src={user.avatarUrl}
                            alt={displayName}
                            className={avatarImage}
                            onError={() => setImageError(true)}
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        initial
                    )}
                </div>
            </button>

            {isOpen && (
                <div className={dropdown}>
                    <div className={userInfo}>
                        <div className={userName}>{displayName}</div>
                        <div className={userEmail}>{user?.email}</div>
                    </div>
                    <button className={menuItem} onClick={() => handleNavigate('/history')}>
                        📝 내 기록
                    </button>
                    <button className={menuItem} onClick={() => handleNavigate('/subscription')}>
                        ⭐ 구독 관리
                    </button>
                    <button className={menuItemDanger} onClick={handleLogout}>
                        🚪 로그아웃
                    </button>
                </div>
            )}
        </div>
    );
};
