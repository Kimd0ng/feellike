import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { container, content } from './MainLayout.css';

export const MainLayout = () => {
    return (
        <div className={container}>
            <Header />
            <main className={content}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
