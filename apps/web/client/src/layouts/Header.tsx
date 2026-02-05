import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@feellike/ui';
import { useAuth } from '@/providers/AuthProvider';
import { UserMenu } from '@/components/UserMenu';
import { header, logo, nav, navLink, rightSection } from './Header.css';

export const Header = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <header className={header}>
            <Link to="/" className={logo}>
                FeelLike
            </Link>

            <nav className={nav}>
                <Link to="/community" className={navLink}>
                    커뮤니티
                </Link>
                {isAuthenticated && (
                    <>
                        <Link to="/analysis" className={navLink}>
                            분석
                        </Link>
                        <Link to="/history" className={navLink}>
                            기록
                        </Link>
                        <Link to="/subscription" className={navLink}>
                            구독
                        </Link>
                    </>
                )}
            </nav>

            <div className={rightSection}>
                {isAuthenticated ? (
                    <UserMenu />
                ) : (
                    <Button variant="primary" size="small" onClick={() => navigate('/login')}>
                        로그인
                    </Button>
                )}
            </div>
        </header>
    );
};
