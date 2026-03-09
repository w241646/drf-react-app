import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from './config';
import { refreshToken, logout } from './services/authService';

// 通常 API 用インスタンス（Axios インスタンス作成）
const api = axios.create({
  baseURL: API_BASE_URL,  // Django サーバー
  timeout: 5000,
  // withCredentials: true,  // Cookie 認証を使う場合
});

// リフレッシュ専用インスタンス
const refreshClient = axios.create({
  baseURL: API_BASE_URL,  // Django サーバー
  timeout: 5000,
});

// リクエスト前にアクセストークン付与
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


// レスポンスで 401 → 自動リフレッシュ + 502/504/ネットワーク時だけ 1回リトライ
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 502/503/504/ネットワークは 1 回だけ自動リトライ（コールドスタート対策）
    const status = error?.response?.status;
    const isNetwork = !error.response;
    const shouldWarmRetry =
      !originalRequest?._warmRetry && (isNetwork || status === 502 || status === 503 || status === 504);

    if (shouldWarmRetry) {
      originalRequest._warmRetry = true;
      await new Promise((r) => setTimeout(r, 1500));
      return api.request(originalRequest);
    }

    // ネットワークエラー（上記でリトライ済み）なら終了
    if (!error.response) {
      return Promise.reject(error);
    }

    // 401 はアクセストークンをリフレッシュ
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh');
      if (!refresh) {
        handleAuthError();
        return Promise.reject(error);
      }

      try {
        const res = await refreshClient.post(ENDPOINTS.TOKEN_REFRESH, { refresh });

        const newAccess = res.data.access;
        const newRefresh = res.data.refresh; // Rotation が有効なら返ってくる

        localStorage.setItem('access', newAccess);
        if (newRefresh) {
          localStorage.setItem('refresh', newRefresh);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        handleAuthError();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


// 認証エラー時の共通処理
function handleAuthError() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  // 必要ならログイン画面へ遷移
  // window.location.href = '/login';
}

export default api;
