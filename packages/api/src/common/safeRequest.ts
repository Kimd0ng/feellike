import { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios';

/**
 * API 응답 타입
 */
export type TApiResponse<T> = {
    status: number;
    code: number;
    message: string;
    result: T;
};

/**
 * 안전한 GET 요청
 * @author Feel Economy Team
 */
export const get = async <T>(
    instance: AxiosInstance,
    url: string
): Promise<T | null> => {
    try {
        const response: AxiosResponse<TApiResponse<T>> = await instance.get(url);
        return response.data.result;
    } catch (error) {
        handleError(error as AxiosError);
        return null;
    }
};

/**
 * 안전한 POST 요청
 * @author Feel Economy Team
 */
export const post = async <T = void>(
    instance: AxiosInstance,
    url: string,
    data?: unknown
): Promise<T | null> => {
    try {
        const response: AxiosResponse<TApiResponse<T>> = await instance.post(url, data);
        return response.data.result;
    } catch (error) {
        handleError(error as AxiosError);
        return null;
    }
};

/**
 * 안전한 PATCH 요청
 * @author Feel Economy Team
 */
export const patch = async <T = void>(
    instance: AxiosInstance,
    url: string,
    data?: unknown
): Promise<T | null> => {
    try {
        const response: AxiosResponse<TApiResponse<T>> = await instance.patch(url, data);
        return response.data.result;
    } catch (error) {
        handleError(error as AxiosError);
        return null;
    }
};

/**
 * 안전한 DELETE 요청
 * @author Feel Economy Team
 */
export const deleteRequest = async <T = void>(
    instance: AxiosInstance,
    url: string
): Promise<T | null> => {
    try {
        const response: AxiosResponse<TApiResponse<T>> = await instance.delete(url);
        return response.data.result;
    } catch (error) {
        handleError(error as AxiosError);
        return null;
    }
};

/**
 * 에러 처리 함수
 */
const handleError = (error: AxiosError): void => {
    if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
        console.error('Network Error:', error.message);
    } else {
        console.error('Error:', error.message);
    }
};

export const safeRequest = {
    get,
    post,
    patch,
    delete: deleteRequest,
};
