// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { login } from "../../services/authService";
import { getMe } from "../../services/accountService";
import formStyles from "./styles/Form.module.css";
import styles from "./styles/LoginForm.module.css";


function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // ← ログイン開始
        try {
            // 1. ログインしてトークンを保存
            await login(username, password);
            // 2. ユーザー情報を取得
            const user = await getMe();
            alert("ログインに成功しました！");
            // 3. 親コンポーネントに通知
            onLoginSuccess(user);
        } catch (err) {
            let message = err.detail || err.message || "ログインに失敗しました";

            // ★ 英語メッセージを日本語に変換
            if (message === "No active account found with the given credentials") {
                message = "ユーザー名またはパスワードが正しくありません";
            }

            setError(message);
        } finally {
            setLoading(false); // ← 成功/失敗後に必ず false に戻す
        }
    };

    return (
        <div>
            <img src="./img/wheel_icon.png" alt="Logo" className={formStyles.logo} />
            <h2 className={formStyles.title}>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading} // ← ローディング中は入力不可にする
                        placeholder="ユーザー名"
                        aria-label="ユーザー名"
                        className={formStyles.input}
                    />
                </div>
                <div>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="パスワード"
                        aria-label="パスワード"
                        className={formStyles.input}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={formStyles.togglePassword}
                    >
                        {showPassword ? "パスワード非表示" : "パスワード表示"}
                    </button>
                </div>
                <button type="submit" disabled={loading} className={`${formStyles.submitButton} ${styles.submitButton}`}>
                    {loading ? "ログイン中..." : "ログイン"}
                </button>
            </form> 
            {error && <p className={formStyles.error}>{error}</p>}
        </div>
    );
}

export default LoginForm;