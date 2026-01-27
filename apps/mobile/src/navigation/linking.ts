import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from './types';
import Config from '../config';

/**
 * 딥링크 설정
 * @author Feel Economy Team
 */
export const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [
        `${Config.APP_SCHEME}://`,
        'https://feellike.app',
    ],
    config: {
        screens: {
            Home: '',
            Login: 'login',
            Signup: 'signup',
            MoodInput: 'mood-input',
            Loading: 'loading',
            Result: 'result',
            History: 'history',
            Subscription: 'subscription',
            PaymentSuccess: {
                path: 'payment/success',
                parse: {
                    authKey: (authKey: string) => authKey,
                    customerKey: (customerKey: string) => customerKey,
                },
            },
            PaymentFail: 'payment/fail',
        },
    },
};
