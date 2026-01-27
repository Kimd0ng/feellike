import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * 네비게이션 타입 정의
 * @author Feel Economy Team
 */

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
    MoodInput: undefined;
    Loading: undefined;
    Result: undefined;
    History: undefined;
    Subscription: undefined;
    PaymentSuccess: {
        authKey?: string;
        customerKey?: string;
    };
    PaymentFail: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
