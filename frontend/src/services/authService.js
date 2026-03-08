import api from '../api';
import { ENDPOINTS } from '../config';
import { handleApiError } from './errorHandler';

// ログイン
export const login = async (username, password) => {
    try {
        const res = await api.post(ENDPOINTS.TOKEN, { username, password });
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        return res.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data; // バリデーションエラーなどをそのまま返す
        }
        throw new Error('ログインに失敗しました');
    }
};

// トークン更新
export const refreshToken = async (refresh) => {
    try {
        const res = await api.post(ENDPOINTS.TOKEN_REFRESH, { refresh });
        localStorage.setItem('access', res.data.access);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// ログアウト
export const logout = async () => {
    try {
        const refresh = localStorage.getItem('refresh');
        if (refresh) {
            await api.post(ENDPOINTS.LOGOUT, { refresh });
        }
    } catch (error) {
        handleApiError(error);
    } finally {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }
};

// 新規登録
export const registerUser = async (username, email, password, gender = null, age = null) => {
    try {
        const res = await api.post(ENDPOINTS.REGISTER, {
            username,
            email,
            password,
            gender,
            age,
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};