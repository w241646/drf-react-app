// src/components/review/ReviewContainer.jsx
import { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewListView from "./ReviewListView";
import { getReviews } from "../../services/reviewService";
import useStarRating from "../../hooks/ui/useStarRating";


export default function ReviewContainer() {
  const [reload, setReload] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // 星（★）毎の件数
  const [ratingCounts, setRatingCounts] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  // フィルタ
  const [ratingFilter, setRatingFilter] = useState(null);

  // ログイン状態を判定
  const isLoggedIn = !!localStorage.getItem("access");

  // 全レビューを取得して統計を計算
  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getReviews(1, 9999); // 全件取得
        setReviews(data.results);
        setTotalCount(data.count);

        if (data.results.length > 0) {
          const avg =
            data.results.reduce((sum, r) => sum + parseFloat(r.rating), 0) /
            data.results.length;
          setAvgRating(avg.toFixed(1));
        } else {
          setAvgRating(0);
        }

        // 星（★）毎の件数
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        data.results.forEach((r) => {
          const rating = parseInt(r.rating);
          if (counts[rating] !== undefined) counts[rating]++;
        });
        setRatingCounts(counts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();
  }, [reload]);

  // 平均評価の星描画（Hook）
  useStarRating([avgRating]);


  return (
    <div className="content-block card-list review grid grid-1">
      {/* 投稿フォーム部分 */}
      {isLoggedIn ? (
        <div><ReviewForm onSuccess={() => setReload(prev => !prev)} /></div>
      ) : (
        <div className="login-required-message">
          <p>レビューを投稿するにはログインしてください。</p>
        </div>
      )}

      {/* 統計情報（平均評価・総レビュー数） */}
      <div className="review-stats" style={{ marginTop: "50px", marginBottom: "20px" }}>
        <h4>レビュー総数：{totalCount}件</h4>
        <div
          className="rev-box"
          data-rating={avgRating}
          style={{ display: "inline-block" }}
        >
          <p className="stars" style={{ fontSize: "2em" }}></p>
        </div>
        {/* <span>（{avgRating}）</span> */}
      </div>

      {/* 星（★）毎の件数フィルタ */}
      <div className="rating-filter" style={{ marginBottom: "20px" }}>
        {Object.entries(ratingCounts).map(([star, count]) => (
          <button
            key={star}
            onClick={() => setRatingFilter(star)}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              cursor: "pointer",
              background: ratingFilter == star ? "#ffd700" : "#eee",
            }}
          >
            ★{star}：{count}件
          </button>
        ))}

        {ratingFilter && (
          <button onClick={() => setRatingFilter(null)} style={{ marginLeft: "20px" }}>
            フィルタ解除
          </button>
        )}
      </div>

      {/* レビュー一覧 */}
      <div id="Review" className="content-block card-list review grid grid-1">
          <ReviewListView reload={reload} ratingFilter={ratingFilter} />
      </div>
    </div>
  );
}