// src/services/gameService.js
import api from '../api';
import { ENDPOINTS } from '../config';
import { handleApiError } from './errorHandler';

// スコア一覧取得 GET（/api/scores/）
export const getScores = async () => {
    try {
        const res = await api.get(`${ENDPOINTS.SCORES}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// スコア投稿 POST（/api/scores/）
export const addScore = async (data) => {
    try {
        const res = await api.post(`${ENDPOINTS.SCORES}`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// スコア更新 PUT（/api/scores/{id}/）
export const updateScore = async (id, data) => {
    try {
        const res = await api.put(`${ENDPOINTS.SCORES}${id}/`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// スコア削除 DELETE（/api/scores/{id}/）
export const deleteScore = async (id) => {
    try {
        await api.delete(`${ENDPOINTS.SCORES}${id}/`);
        return true; // 成功したら true を返す
    } catch (error) {
        handleApiError(error);
    }
};

// ランキング取得 GET（/api/scores/ranking/）
export const getRanking = async (page = 1, pageSize = 5) => {
  try {
    const res = await api.get(
      `${ENDPOINTS.SCORES}ranking/?page=${page}&page_size=${pageSize}`
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};