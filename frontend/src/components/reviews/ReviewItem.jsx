// src/components/reviews/ReviewItem.jsx
import { MEDIA_BASE_URL } from "../../config";
import StarRating from "./StarRating";
import "./styles/ReviewItem.css";


export default function ReviewItem({ item }) {

  const getAgeLabel = (age) => {
    if (age === null || age === undefined) return "非公開";
    if (age >= 50) return "50代以上";
    return `${age}代`;
  };

  // フォールバックテキストを定数化
  const AGE_LABEL = getAgeLabel(item.user_age);
  const GENDER_LABEL = item.user_gender && item.user_gender !== "none" ? item.user_gender : "非公開";

  // アイコンURLの決定ロジック
  const iconUrl = item.user_icon
    ? item.user_icon.startsWith("http")
      ? item.user_icon
      : MEDIA_BASE_URL + item.user_icon
    : "/img/icon_cycle.png";

  return (
    <div className="review-item">
      {/* ユーザーアイコン */}
      <img
        src={iconUrl}
        alt={`${item.user_name} さんのアイコン`}
        className="user-icon"
      />

      {/* ユーザー名とプロフィール */}
      <p className="rev-name">
        {item.user_name} さん
        <small className="rev-profile">
          ({AGE_LABEL}・{GENDER_LABEL})
        </small>
      </p>

      {/* 星評価 */}
      <StarRating rating={item.rating} />

      {/* タイトル・本文 */}
      <b className="title">{item.title}</b>
      <p className="note">{item.body}</p>
    </div>
  );
}