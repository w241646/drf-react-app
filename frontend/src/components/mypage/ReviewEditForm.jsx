// src/components/mypage/ReviewEditForm.jsx
import React, { useState } from "react";
import { updateReview } from "../../services/reviewService";
import "./styles/ReviewEditForm.css";


function ReviewEditForm({ review, onClose, onUpdated, className = "" }) {
    const [title, setTitle] = useState(review.title);
    const [body, setBody] = useState(review.body);
    const [rating, setRating] = useState(review.rating);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { title, body, rating };

        const updated = await updateReview(review.id, data);
        if (updated) {
            onUpdated(updated);
            onClose();
        }
    };

    return (
        <div className={`review-edit-form ${className}`}>
            <h4>レビュー編集</h4>

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>タイトル</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>本文</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>評価</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-save">
                    更新する
                </button>

                <button
                    type="button"
                    className="btn-cancel"
                    onClick={onClose}
                >
                    キャンセル
                </button>
            </form>
        </div>
    );
}

export default ReviewEditForm;