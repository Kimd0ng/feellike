import { Link } from 'react-router-dom';
import { footer, links, link } from './Footer.css';

export const Footer = () => {
    return (
        <footer className={footer}>
            <div className={links}>
                <Link to="/about" className={link}>서비스 소개</Link>
                <a href="#" className={link}>이용약관</a>
                <a href="#" className={link}>개인정보처리방침</a>
                <a href="#" className={link}>고객센터</a>
            </div>
            <p>© 2026 FeelLike. All rights reserved.</p>
        </footer>
    );
};
