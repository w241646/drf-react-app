// src/components/review/ReviewContainer.jsx
import { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewListView from "./ReviewListView";
import { getReviews } from "../../services/reviewService";
import StarRating from "./StarRating";
import "./styles/ReviewContainer.css";


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

        // 星（★）毎の件数は常に全件から計算
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        data.results.forEach((r) => {
          const ratingNum = Number(r.rating);
          const star = Math.floor(ratingNum);
          if (star >= 1 && star <= 5) {
            counts[star]++;
          }
        });
        setRatingCounts(counts);
      } catch (err) {
        console.error("API通信に失敗しました", err);
      }
    }
    fetchStats();
  }, [reload]);


  return (
    <div className="content-block card-list review grid grid-1">
      {/* 投稿フォーム部分 */}
      {isLoggedIn ? (
        <div className="review-form-wrapper">
          <ReviewForm onSuccess={() => setReload(prev => !prev)} />
        </div>
      ) : (
        <div className="login-required-message">
          <p><i className="fas fa-info-circle"></i> レビューを投稿するにはログインしてください。</p>
        </div>
      )}

      <div className="flexBox review-stats-wrapper">
      {/* 統計情報（平均評価・総レビュー数） */}
        <div className="review-stats">
          <h4>レビュー総数：{totalCount}件</h4>
          <div className="rev-box">
            {/* ★表示をStarRatingコンポーネントに置き換え */}
            <StarRating rating={parseFloat(avgRating)} maxStars={5} />
          </div>
          {/* <span>（平均 {avgRating}）</span> */}
          <p>走りやすさや景観の美しさ、休憩スポットの充実度など、実際に走ったからこそ分かるポイントが反映されており、初めて訪れる方がルートの雰囲気をつかむ手がかりとして役立ちます。</p>
        </div>

        {/* 星（★）毎の件数フィルタ */}
        <ul className="rating-filter">
          {Object.entries(ratingCounts).map(([star, count]) => {
            const starNum = Number(star);
            // starの数だけ★を並べ、残りを☆で埋める
            const starsDisplay = "★".repeat(starNum) + "☆".repeat(5 - starNum);

            return (
              <li key={starNum}>
                <button
                  className={`rating-filter-btn ${ratingFilter === starNum ? "active" : ""}`}
                  onClick={() => setRatingFilter(starNum)}
                >
                  <span className="stars">{starsDisplay}</span>
                  <span className="count">（{count}）</span>
                </button>
              </li>
            );
          })}

          {ratingFilter && (
            <li>
              <button className="rating-reset-btn" onClick={() => setRatingFilter(null)}>
                フィルタ解除
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* レビュー一覧 */}
      <article id="Review" className="review-list-wrapper card-list review grid grid-1">
        <ReviewListView reload={reload} ratingFilter={ratingFilter} />
      </article>
    </div>
  );
}