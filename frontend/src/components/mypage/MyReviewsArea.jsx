// src/components/mypage/MyReviewsArea.jsx
import React, { useEffect, useState, useRef } from "react";
import { getMyReviews, deleteReview } from "../../services/reviewService";
import ReviewEditForm from "./ReviewEditForm";
import { useScrollToTop } from "../../hooks/ui/useScrollToTop";
import { updateMe } from "../../services/accountService";
import "./styles/MyReviewsArea.css";


function MyReviewsArea() {
    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const pageSize = 3;
    const [count, setCount] = useState(0);

    const [editingReview, setEditingReview] = useState(null);

    const [isPaging, setIsPaging] = useState(false);
    const isFirstRender = useRef(true);
    const topRef = useRef(null);

    // レビュー取得
    const fetchMyReviews = async () => {
        try {
            const data = await getMyReviews(page, pageSize);
            setMyReviews(data?.results ?? []);
            setCount(data?.count ?? 0);
        } catch (err) {
            console.error("レビュー取得に失敗:", err);
            setMyReviews([]);
            setCount(0);
        } finally {
            setLoading(false);
        }
    };

    // 初回 + page 変更時
    useEffect(() => {
        setLoading(true);
        fetchMyReviews();
    }, [page]);

    // レビュー更新後に isPaging を戻す
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (isPaging) {
            setIsPaging(false);
        }
    }, [myReviews]);

    const totalPages = Math.ceil(count / pageSize);

    // ページ切り替え時にスクロールトップへ
    useScrollToTop(topRef, [myReviews, isPaging], isPaging && !isFirstRender.current);

    const handleDelete = async (id) => {
        const ok = window.confirm("このレビューを削除しますか？");
        if (!ok) return;

        try {
            const success = await deleteReview(id);
            if (success) {
                setMyReviews((prev) => prev.filter((review) => review.id !== id));

                // ★ 削除後にページ数を調整
                const newCount = count - 1;
                const newTotalPages = Math.ceil(newCount / pageSize);

                if (page > newTotalPages) {
                    setPage(newTotalPages || 1); // 0 にならないように
                } else {
                    // ページが変わらない場合は再取得
                    fetchMyReviews();
                }
                setCount(newCount);
            }
        } catch (error) {
            alert("削除に失敗しました。");
        }
    };


    return (
        <div className="my-reviews-area">
            <h3>あなたのレビュー一覧</h3>

            {loading ? (
                <p>レビュー読み込み中...</p>
            ) :(
                <>
                    <span ref={topRef}></span>

                    {myReviews.length === 0 ? (
                        <p className="empty">レビューはまだありません。</p>
                    ) : (
                        <ul>
                            {myReviews.map((review) => (
                                <li
                                    key={review.id}
                                    className={`my-review-item ${editingReview?.id === review.id ? "editing" : ""}`}
                                >
                                    {/* 編集中ではないときだけ元レビューを表示 */}
                                    {editingReview?.id !== review.id && (
                                        <>
                                            {/* タイトル */}
                                            <dl className="review-row">
                                                <dt>タイトル：</dt>
                                                <dd><strong>{review.title}</strong></dd>
                                            </dl>

                                            {/* 本文 */}
                                            <dl className="review-row">
                                                <dt>本文：</dt>
                                                <dd><p className="review-body">{review.body}</p></dd>
                                            </dl>

                                            {/* 評価 */}
                                            <dl className="review-row">
                                                <dt>評価：</dt>
                                                <dd><span className="review-rating">★ {review.rating}</span></dd>
                                            </dl>

                                            <div className="review-actions">
                                                <button
                                                    type="button"
                                                    className="btn-edit"
                                                    onClick={() => setEditingReview(review)}
                                                >
                                                    編集
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(review.id)}
                                                >
                                                    削除
                                                </button>
                                            </div>
                                        </>
                                    )}


                                    {/* 編集フォーム（編集中だけ表示） */}
                                    {editingReview?.id === review.id && (
                                        <ReviewEditForm
                                            review={editingReview}
                                            className="open"
                                            onClose={() => setEditingReview(null)}
                                            onUpdated={(updated) => {
                                                setMyReviews((prev) =>
                                                    prev.map((r) =>
                                                        r.id === updated.id ? updated : r
                                                    )
                                                );
                                                setEditingReview(null);
                                            }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* ページネーション */}
                    {totalPages > 1 && (
                        <div className="pagination" style={{ marginTop: "35px", textAlign: "center" }}>
                            <button
                                disabled={page <= 1}
                                onClick={() => {
                                    setIsPaging(true);
                                    setPage((p) => p - 1);
                                }}
                            >
                                前へ
                            </button>

                            <span style={{ margin: "0 10px" }}>
                                {page} / {totalPages}
                            </span>

                            <button
                                disabled={page >= totalPages}
                                onClick={() => {
                                    setIsPaging(true);
                                    setPage((p) => p + 1);
                                }}
                            >
                                次へ
                            </button>
                        </div>
                    )} 
                </>
            )}
        </div>
    );
}

export default MyReviewsArea;