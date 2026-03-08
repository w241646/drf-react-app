// src/components/Auth/RegisterForm.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import zxcvbn from "zxcvbn";
import { registerUser, login } from "../../services/authService";

import formStyles from "./styles/Form.module.css";
import styles from "./styles/RegisterForm.module.css";


// バリデーションスキーマ
const schema = yup.object().shape({
  username: yup
    .string()
    .required("ユーザー名が入力されていません")
    .min(3, "ユーザー名は3文字以上で入力してください"),
  email: yup
    .string()
    .required("メールアドレスが入力されていません")
    .email("正しいメールアドレスを入力してください"),
  password: yup
    .string()
    .required("パスワードが入力されていません")
    .min(8, "パスワードは8文字以上で入力してください")
    .test(
      "strong-password",
      "パスワードが弱すぎます（英大文字・記号などを含めてください）",
      (value) => {
        const result = zxcvbn(value || "");
        return result.score >= 3;
      }
    ),
});

function RegisterForm({ onRegisterSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const strengthLabel = ["非常に弱い", "弱い", "普通", "強い", "非常に強い"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      // 新規登録
      await registerUser(
        data.username,
        data.email,
        data.password,
        data.gender || null,
        data.age || null
      );

      // ★ ここでユーザーに通知
      alert("登録が完了しました！ログインします。");

      // 自動ログイン
      await login(data.username, data.password);

      // 親コンポーネントへ通知
      onRegisterSuccess();
      reset();
    } catch (err) {
      console.error(err);

      // Django のエラーを優先して表示
      if (err && typeof err === "object" && !(err instanceof Error)) {
        const message = Object.values(err)
          .flat()
          .filter((msg) => typeof msg === "string")
          .join("\n");
        if (message) {
          alert(message);
          return;
        }
      }

      // 通信エラーなど
      if (err instanceof Error && err.message) {
        alert(err.message);
      } else {
        alert("登録に失敗しました");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <img src="./img/wheel_icon.png" alt="Logo" className={formStyles.logo} />
      <h2 className={formStyles.title}>新規登録</h2>

      {/* ユーザー名 */}
      <div>
        <input
          {...register("username")}
          placeholder="ユーザー名"
          aria-label="ユーザー名"
          className={formStyles.input}
        />
        {errors.username && <p className="caution">{errors.username.message}</p>}
      </div>

      {/* メール */}
      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="メールアドレス"
          aria-label="メールアドレス"
          className={formStyles.input}
        />
        {errors.email && <p className="caution">{errors.email.message}</p>}
      </div>

      {/* パスワード */}
      <div>
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="パスワード"
          aria-label="パスワード"
          autoComplete="new-password"
          className={formStyles.input}
          onChange={(e) => {
            const value = e.target.value;
            const result = zxcvbn(value || "");
            setPasswordStrength(result.score);
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={formStyles.togglePassword}
        >
          {showPassword ? "非表示" : "表示"}
        </button>

        {errors.password && <p className="caution">{errors.password.message}</p>}

        {/* 強度表示 */}
        {passwordStrength !== null && (
          <p
            className={`${styles.strength} ${
              passwordStrength < 3 ? styles.weak : styles.strong
            }`}
          >
            パスワード強度：{strengthLabel[passwordStrength]}
          </p>
        )}
      </div>

      {/* 性別（任意） */}
      <div className={styles.radioGroup}>
        <label>性別（任意）</label>
        <div className={styles.radioOptions}>
          <label><input type="radio" value="none" {...register("gender")} /> 非公開</label>
          <label><input type="radio" value="男性" {...register("gender")} /> 男性</label>
          <label><input type="radio" value="女性" {...register("gender")} /> 女性</label>
          <label><input type="radio" value="その他" {...register("gender")} /> その他</label>
        </div>
      </div>

      {/* 年齢（任意） */}
      <div className={styles.radioGroup}>
        <label>年齢（任意）</label>
        <div className={styles.radioOptions}>
          <label><input type="radio" value="" {...register("age")} /> 非公開</label>
          <label><input type="radio" value="10" {...register("age")} /> 10代</label>
          <label><input type="radio" value="20" {...register("age")} /> 20代</label>
          <label><input type="radio" value="30" {...register("age")} /> 30代</label>
          <label><input type="radio" value="40" {...register("age")} /> 40代</label>
          <label><input type="radio" value="50" {...register("age")} /> 50代以上</label>
        </div>
      </div>

      <button type="submit" className={`${formStyles.submitButton} ${styles.submitButton}`}>登録</button>
    </form>
  );
}

export default RegisterForm;