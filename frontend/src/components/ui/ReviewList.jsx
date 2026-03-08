import { useEffect } from "react";
import { useReviewList } from "../../hooks/data/useReviewList";

// renderRatings
function renderRatings() {
  const reviewBlocks = document.querySelectorAll(".rev-box");

  reviewBlocks.forEach((block) => {
    const rating = parseFloat(block.dataset.rating);
    const starContainer = block.querySelector(".stars");

    if (!starContainer || isNaN(rating)) return;

    starContainer.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      if (rating >= i) {
        star.textContent = "★";
        star.classList.add("star", "filled-star");
      } else if (rating >= i - 0.5) {
        star.textContent = "☆";
        star.classList.add("star", "half-star");
      } else {
        star.textContent = "☆";
        star.classList.add("star", "empty-star");
      }
      starContainer.appendChild(star);
    }

    const score = document.createElement("span");
    score.textContent = `（${rating}）`;
    starContainer.appendChild(score);
  });
}


/**
 * レビューリスト描画コンポーネント
 * @param {string} callback - JSONファイル名（例: "reviews" → reviews.json）
 * @param {number} loop - 表示件数（省略時は全件）
 * @param {string} className - 追加クラス（任意）
 */
export default function ReviewList({ callback, loop, className }) {
  const { data, error } = useReviewList(callback, loop);

  useEffect(() => {
    renderRatings();

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
  }, [data]);

  if (error) return <div>エラー: {error}</div>;

  return (
    <>
      {data.map((item, i) =>
        item.note ? (
          <div
            key={i}
            className={`rev-box flexBox${className ? ` ${className}` : ""}`}
            data-rating={item.rate}
          >
            {item.img && (
              <figure className="faceicon">
                <img
                  className="img"
                  src={item.img}
                  alt={item.name || "サイクリスト"}
                />
              </figure>
            )}

            <p className="rev-name">
              {item.name ? item.name : "サイクリスト"} さん{" "}
              <small>({item.age}代・{item.gender})</small>
            </p>

            <p className="stars"></p>
            <b className="title">{item.title}</b>
            <p className="note">{item.note}</p>
          </div>
        ) : null
      )}
    </>
  );
}