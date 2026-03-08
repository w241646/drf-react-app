// src/components/reviews/StarRating.jsx
import "./styles/StarRating.css";

export default function StarRating({ rating, maxStars = 5 }) {
  const stars = [];
  const numericRating = parseFloat(rating);

  for (let i = 1; i <= maxStars; i++) {
    let cls = "empty-star";
    let char = "☆";

    if (numericRating >= i) {
      cls = "filled-star";
      char = "★";
    } else if (numericRating >= i - 0.5) {
      cls = "half-star";
      char = "☆"; // 疑似要素で半分塗る
    }

    stars.push(
      <span key={i} className={`star ${cls}`}>
        {char}
      </span>
    );
  }

  return (
    <p className="stars" aria-label={`評価: ${rating} / ${maxStars}`}>
      {stars}
      <span className="rating-value">（{numericRating}）</span>
    </p>
  );
}