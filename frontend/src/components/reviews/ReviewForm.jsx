// src/components/review/ReviewForm.jsx
import { useState } from "react";
import { addReview } from "../../services/reviewService";
import "./styles/ReviewForm.css";


export default function ReviewForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5.0);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await addReview({ title, body, rating });

      // フォーム初期化
      setTitle("");
      setBody("");
      setRating(5.0);

      // 親コンポーネントに「投稿成功」を通知
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError("投稿に失敗しました。ログイン状態を確認してください。");
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4>レビューを投稿する</h4>

      {error && <p className="error">{error}</p>}

      <label>
        タイトル
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        本文
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>

      <label>
        評価（1.0〜5.0）
        <input
          type="number"
          step="0.1"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          required
        />
      </label>

      <button type="submit">投稿する</button>
    </form>
  );
}
