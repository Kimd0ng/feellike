import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { HomePage } from './pages/home/HomePage';
import { MoodInputPage } from './pages/mood-input/MoodInputPage';
import { LoadingPage } from './pages/loading/LoadingPage';
import { ResultPage } from './pages/result/ResultPage';
import { HistoryPage } from './pages/history/HistoryPage';
import { LoginPage } from './pages/login/LoginPage';
import { SignupPage } from './pages/signup/SignupPage';
import { SubscriptionPage } from './pages/subscription/SubscriptionPage';
import { PaymentSuccessPage, PaymentFailPage } from './pages/payment';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';
import { AboutPage } from './pages/about/AboutPage';
import { AnalysisPage } from './pages/analysis/AnalysisPage';
import { PrivacyPage, TermsPage, ContactPage } from './pages/legal';
import {
    GuidePage,
    WeatherDepression,
    Productivity,
    SleepQuality,
    AnxietyCare,
} from './pages/guide';
import { FaqPage } from './pages/faq';
import { CommunityPage, PostDetailPage, WritePostPage } from './pages/community';

/**
 * App 컴포넌트
 * 메인 라우터 설정
 * @author Feel Economy Team
 */
export const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/guide" element={<GuidePage />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route
                            path="/guide/weather-depression"
                            element={<WeatherDepression />}
                        />
                        <Route
                            path="/guide/productivity"
                            element={<Productivity />}
                        />
                        <Route
                            path="/guide/sleep-quality"
                            element={<SleepQuality />}
                        />
                        <Route
                            path="/guide/anxiety-care"
                            element={<AnxietyCare />}
                        />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/mood-input" element={<MoodInputPage />} />
                        <Route path="/loading" element={<LoadingPage />} />
                        <Route path="/result" element={<ResultPage />} />
                        {/* 커뮤니티 라우트 - 목록/상세는 비로그인도 접근 가능 */}
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/community/:postId" element={<PostDetailPage />} />
                        <Route
                            path="/community/write"
                            element={
                                <ProtectedRoute>
                                    <WritePostPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/analysis"
                            element={
                                <ProtectedRoute>
                                    <AnalysisPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/history"
                            element={
                                <ProtectedRoute>
                                    <HistoryPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/subscription"
                            element={
                                <ProtectedRoute>
                                    <SubscriptionPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/payment/success"
                            element={
                                <ProtectedRoute>
                                    <PaymentSuccessPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/payment/fail"
                            element={
                                <ProtectedRoute>
                                    <PaymentFailPage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};
