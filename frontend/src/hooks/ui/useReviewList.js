// src/hooks/ui/useReviewList.js
import { useEffect, useState } from "react";
import { getReviews } from "../../services/reviewService";

export default function useReviewList({ reload, ratingFilter, initialPageSize = 5, initialOrdering = "-created_at" }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [count, setCount] = useState(0);
  const [ordering, setOrdering] = useState(initialOrdering);
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");

  // ローディング・エラー状態
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // AbortControllerでキャンセル制御
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getReviews(
          page,
          pageSize,
          ordering,
          ageGroup,
          gender,
          ratingFilter,
          { signal: controller.signal } // axios側で対応可能
        );
        setReviews(data.results);
        setCount(data.count);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => controller.abort(); // コンポーネントアンマウント時にキャンセル
  }, [reload, page, pageSize, ordering, ageGroup, gender, ratingFilter]);

  return {
    reviews,
    page,
    pageSize,
    count,
    setPage,
    setPageSize,
    ordering,
    setOrdering,
    ageGroup,
    setAgeGroup,
    gender,
    setGender,
    loading,
    error,
  };
}