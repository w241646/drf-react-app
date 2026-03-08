// src/hooks/useList.js
import { useEffect, useState } from "react";

/**
 * 外部 JSON を読み込んで配列データを返すカスタムフック
 * @param {string} callback - JSONファイル名（例: "spot" → spot.json）
 * @param {number} loop - 表示件数（省略時は全件）
 */
export function useList(callback, loop) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!callback) return; // 引数未指定なら何もしない

    fetch(`/js/json/${callback}.json`)
      .then((res) => res.json())
      .then((json) => {
        const len = json.length;
        const displayNum = loop || len;
        setData(json.slice(0, displayNum));
      })
      .catch((err) => {
        console.error("ロード失敗:", err);
      });
  }, [callback, loop]);

  return data;
}