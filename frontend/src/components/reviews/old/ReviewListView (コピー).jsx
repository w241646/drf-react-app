// src/components/review/ReviewListView.jsx
import { useEffect, useState, useRef } from "react";
import { getReviews } from "../../services/reviewService";
import useStarRating from "../../hooks/ui/useStarRating";
import { MEDIA_BASE_URL } from "../../config";

// ★ 星評価の DOM 操作（あなたのコードをそのまま流用）
// function renderRatings() {
//   const reviewBlocks = document.querySelectorAll(".rev-box");

//   reviewBlocks.forEach((block) => {
//     const rating = parseFloat(block.dataset.rating);
//     const starContainer = block.querySelector(".stars");

//     if (!starContainer || isNaN(rating)) return;

//     starContainer.innerHTML = "";
//     for (let i = 1; i <= 5; i++) {
//       const star = document.createElement("span");
//       if (rating >= i) {
//         star.textContent = "★";
//         star.classList.add("star", "filled-star");
//       } else if (rating >= i - 0.5) {
//         star.textContent = "☆";
//         star.classList.add("star", "half-star");
//       } else {
//         star.textContent = "☆";
//         star.classList.add("star", "empty-star");
//       }
//       starContainer.appendChild(star);
//     }

//     const score = document.createElement("span");
//     score.textContent = `（${rating}）`;
//     starContainer.appendChild(score);
//   });
// }

export default function ReviewList({ reload, className, ratingFilter }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [count, setCount] = useState(0);
  const [ordering, setOrdering] = useState("-created_at");
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");
  const topRef = useRef(null);

  // ★ API からレビュー取得（page + pageSize）
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getReviews(page, pageSize, ordering, ageGroup, gender, ratingFilter);
        setReviews(data.results);
        setCount(data.count);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [reload, page, pageSize, ordering, ageGroup, gender, ratingFilter]);

  // 星評価の DOM 操作（Hook）
  useStarRating([reviews]);

  // ページ切り替え時に最初のレビューへスクロール（ヘッダー分ずらす）
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        window.scrollBy({ top: -120, behavior: "smooth" });
      }, 300);
    }
  }, [reviews]);

  // 星評価＋アニメーション（あなたの元のコードを流用）
  useEffect(() => {
    const items = document.querySelectorAll(".rev-box");
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reviews]);

  const totalPages = Math.ceil(count / pageSize);


  return (
    <>
      {/* ★ ページサイズ切り替え */}
      <div className="page-size-selector">
        <label>表示件数：</label>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1); // ページサイズ変更時は1ページ目に戻す
          }}
        >
          <option value={5}>5件</option>
          <option value={10}>10件</option>
          <option value={20}>20件</option>
          <option value={50}>50件</option>
        </select>
      </div>

      <div className="">
        <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
          <option value="-created_at">新着順</option>
          <option value="-rating">評価が高い順</option>
          <option value="rating">評価が低い順</option>
        </select>

        <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
          <option value="">すべて</option>
          <option value="10">10代</option>
          <option value="20">20代</option>
          <option value="30">30代</option>
          <option value="40">40代</option>
          <option value="50">50代以上</option>
          <option value="null">非公開</option>
        </select>

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">すべて</option>
          <option value="男性">男性</option>
          <option value="女性">女性</option>
          <option value="その他">その他</option>
          <option value="none">非公開</option>
        </select>
      </div>

      {reviews.map((item, index) => (
        <div
          key={item.id}
          ref={index === 0 ? topRef : null}
          className={`rev-box flexBox${className ? ` ${className}` : ""}`}
          data-rating={item.rating}
        >
          {/* ★ ユーザーアイコン対応 */}
          {/* <figure className="faceicon"> */}
            <img
              src={
                item.user_icon
                  ? item.user_icon.startsWith("http")
                    ? item.user_icon
                    : MEDIA_BASE_URL + item.user_icon
                  : "/img/icon_cycle.png" // デフォルト画像
              }
              alt="ユーザーアイコン"
              style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ccc",
              }}
            />
          {/* </figure> */}


          {/* ★ ユーザー名 */}
          <p className="rev-name">
            {item.user_name} さん

          {/* ★ 年齢・性別（今回追加） */}
            <small className="rev-profile">
              (
              {item.user_age !== null
                ? `${item.user_age}代`
                : "非公開"}
              ・
              {item.user_gender && item.user_gender !== "none"
                ? item.user_gender
                : "非公開"}
              )
            </small>
          </p>

          {/* ★ 星評価 */}
          <p className="stars"></p>

          {/* ★ タイトル・本文 */}
          <b className="title">{item.title}</b>
          <p className="note">{item.body}</p>
        </div>
      ))}

      {/* ★ ページネーション */}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          前へ
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          次へ
        </button>
      </div>
    </>
  );
}