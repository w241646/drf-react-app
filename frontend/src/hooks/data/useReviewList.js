// src/hooks/useReviewList.js
import { useEffect, useState } from "react";

/**
 * 外部 JSON を読み込んでレビュー配列を返すカスタムフック
 * @param {string} callback - JSONファイル名（例: "reviews" → reviews.json）
 * @param {number} loop - 表示件数（省略時は全件）
 */
export function useReviewList(callback, loop) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!callback) return;

    fetch(`/js/json/${callback}.json`)
      .then((res) => res.json())
      .then((json) => {
        const len = json.length;
        const displayNum = loop || len;
        setData(json.slice(0, displayNum));
      })
      .catch((err) => {
        console.error("ロード失敗:", err);
        setError(err.message);
      });
  }, [callback, loop]);

  return { data, error };
}