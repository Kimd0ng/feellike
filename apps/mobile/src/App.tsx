import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initializeSupabase } from '@feellike/api';
import { COLORS } from '@feellike/ui/native';
import { AuthProvider } from './providers/AuthProvider';
import { RootNavigator } from './navigation/RootNavigator';
import { linking } from './navigation/linking';
import Config from './config';
import 'react-native-url-polyfill/auto';

// Supabase 클라이언트 초기화
initializeSupabase(Config.SUPABASE_URL, Config.SUPABASE_ANON_KEY);

// TanStack Query 클라이언트 설정
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5분
            gcTime: 1000 * 60 * 30, // 30분
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

/**
 * App 컴포넌트
 * 메인 네비게이션 설정
 * @author Feel Economy Team
 */
export const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.white}
            />
            <QueryClientProvider client={queryClient}>
                <NavigationContainer linking={linking}>
                    <AuthProvider>
                        <RootNavigator />
                    </AuthProvider>
                </NavigationContainer>
            </QueryClientProvider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});
