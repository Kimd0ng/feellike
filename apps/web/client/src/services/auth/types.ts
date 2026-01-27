/**
 * Auth 서비스 클라이언트 타입
 * @author Feel Economy Team
 */

export type TAuthError = {
    message: string;
    code?: string;
};

export type TLoginFormData = {
    email: string;
    password: string;
};

export type TSignUpFormData = {
    email: string;
    password: string;
    confirmPassword: string;
    name?: string | undefined;
};
