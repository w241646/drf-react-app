// src/services/reviewService.js
import api from '../api';
import { ENDPOINTS } from '../config';
import { handleApiError } from './errorHandler';


// レビュー一覧取得（全体） GET（/api/reviews/）
export const getReviews = async (
    page = 1,
    pageSize = 5,
    ordering = "-created_at",
    ageGroup = "",
    gender = "",
    rating = null
) => {
    try {
        const params = {
            page: page,
            page_size: pageSize,
            ordering: ordering,
        }

        if (ageGroup === "null") {
            params["user__age__isnull"] = true;
        } else if (ageGroup) {
            params["user__age"] = ageGroup;
        }

        if (gender) params["user__gender"] = gender;

        if (rating) params["rating"] = rating;

        const url = `${ENDPOINTS.REVIEWS}`;
        const res = await api.get(url, { params });
        return res.data; // { count, next, previous, results }
    } catch (error) {
        handleApiError(error);
    }
};

// レビュー投稿 POST（/api/reviews/）
export const addReview = async (data) => {
    try {
        const res = await api.post(`${ENDPOINTS.REVIEWS}`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// レビュー更新 PUT（/api/reviews/{id}/）
export const updateReview = async (id, data) => {
    try {
        const res = await api.put(`${ENDPOINTS.REVIEWS}${id}/`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// レビュー削除（論理削除） DELETE（/api/reviews/{id}/）
export const deleteReview = async (id) => {
    try {
        await api.delete(`${ENDPOINTS.REVIEWS}${id}/`);
        return true; // 成功したら true を返す
    } catch (error) {
        handleApiError(error);
    }
};

// 自分のレビュー一覧取得 GET（/api/reviews/my/）
export const getMyReviews = async (page = 1, pageSize = 3) => {
    try {
        const res = await api.get(`${ENDPOINTS.REVIEWS}my/`, {
            params: {
                page: page,
                page_size: pageSize,
            },
        });
        return res.data; // { count, next, previous, results }
    } catch (error) {
        handleApiError(error);
        return {
            count: 0,
            results: [],
        };
    }
};

// 新着レビュー3件取得 GET（/api/reviews/?page_size=3&ordering=-created_at）
export const getLatestReviews = async () => {
    try {
        const res = await api.get(`${ENDPOINTS.REVIEWS}`, {
            params: {
                page: 1,
                page_size: 3,
                ordering: "-created_at",
            },
        });
        return res.data.results; // results のみ返す
    } catch (error) {
        handleApiError(error);
    }
};