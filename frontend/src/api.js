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

// レスポンスで 401 → 自動リフレッシュ
api.interceptors.response.use(
  (response) => response,
  async error => {
    const originalRequest = error.config;

    // ネットワークエラーなどはそのまま返す
    if (!error.response) {
      return Promise.reject(error);
    }

    // 401 かつ まだリトライしていない場合のみ処理
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh');
      if (!refresh) {
        handleAuthError();
        return Promise.reject(error);
      }

      try {
        // refreshClient を使う（無限ループ防止）
        const res = await refreshClient.post(ENDPOINTS.TOKEN_REFRESH, {refresh});

        const newAccess = res.data.access;
        const newRefresh = res.data.refresh; // Roatation が有効なら返ってくる

        // 新しいトークンを保存
        localStorage.setItem('access', newAccess);
        if (newRefresh) {
          localStorage.setItem('refresh', newRefresh);
        }

        // 元のリクエストに新しいアクセストークンを付与して再試行
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        // リフレッシュ失敗 → 強制ログアウト
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