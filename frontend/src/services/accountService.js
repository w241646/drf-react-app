// src/services/accountService.js
import api from '../api';
import { ENDPOINTS } from '../config';
import { handleApiError } from './errorHandler';

// GET /api/me/　（ユーザー情報取得）
export const getMe = async () => {
    try {
        const res = await api.get(ENDPOINTS.ME);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// PATCH /api/me/　（ユーザー情報更新）
export const updateMe = async (data) => {
    try {
        const res = await api.patch(`${ENDPOINTS.ME}`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// DELETE /api/me/　（ユーザー削除）
export const deleteMe = async () => {
    try {
        await api.delete(`${ENDPOINTS.ME}`);
        return true;
    } catch (error) {
        handleApiError(error);
    }
};

// POST /api/me/change-password/　（パスワード変更）
export const changePassword = async (data) => {
    try {
        const res = await api.post(`${ENDPOINTS.ME}change-password/`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};