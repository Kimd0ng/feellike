import { Link } from 'react-router-dom';
import { footer, links, link } from './Footer.css';

export const Footer = () => {
    return (
        <footer className={footer}>
            <div className={links}>
                <Link to="/about" className={link}>서비스 소개</Link>
                <Link to="/guide" className={link}>가이드</Link>
                <Link to="/faq" className={link}>FAQ</Link>
                <Link to="/terms" className={link}>이용약관</Link>
                <Link to="/privacy" className={link}>개인정보처리방침</Link>
                <Link to="/contact" className={link}>고객센터</Link>
            </div>
            <p>© 2026 FeelLike. All rights reserved. | contact@feellike.app</p>
        </footer>
    );
};
