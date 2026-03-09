// src/components/reviews/ReviewListView.jsx
import { useEffect, useState, useRef } from "react";
import { getReviews } from "../../services/reviewService";
import { useScrollToTop } from "../../hooks/ui/useScrollToTop";
import { MEDIA_BASE_URL } from "../../config";
import ReviewItem from "./ReviewItem";


export default function ReviewListView({ reload, className, ratingFilter }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [count, setCount] = useState(0);
  const [ordering, setOrdering] = useState("-created_at");
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");
  const topRef = useRef(null);

  // const [isPaging, setIsPaging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // 初回レンダリング判定
  const isFirstRender = useRef(true);

  // useEffect(() => {
  //   setIsPaging(false);
  // }, []);

  // APIからレビュー取得
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getReviews(page, pageSize, ordering, ageGroup, gender, ratingFilter);
        setReviews(data.results);
        setCount(data.count);
        // setIsPaging(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [ratingFilter, reload, page, pageSize, ordering, ageGroup, gender]);

  // 初回はスクロール禁止
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     setIsPaging(false);
  //     return; // ← 初回はスクロールしない
  //   }

  //   if (isPaging) {
  //     setIsPaging(false);
  //   }
  // }, [reviews]); 
 
  // // ページ遷移時にページ先頭へ
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "auto" });
  // }, []);

  // // page が変わったら isPaging を false に戻す
  // useEffect(() => {
  //   if (isPaging) {
  //     setIsPaging(false);
  //   }
  // }, [reviews]);

  // // ratingFilter が変わったらスクロール対象にする
  // useEffect(() => {
  //   setIsPaging(true);
  // }, [ratingFilter]);

  // フィルター変更時にもスクロール対象にする
  useEffect(() => {
    // if (isFirstRender.current) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;   // ← これが重要
      return;
    }
    
    // setIsPaging(true);
    setHasInteracted(true);
    setPage(1); // フィルタ変更時は1ページ目に戻すのが自然
  }, [ratingFilter]);

  // ページ切り替え時に最初へスクロール（ヘッダー固定対応）（※初回は発火しない）
  const shouldScroll = hasInteracted;
  useScrollToTop(topRef, [reviews, shouldScroll], shouldScroll);
  // const shouldScroll = isPaging && !isFirstRender.current;
  // useScrollToTop(topRef, [reviews, isPaging], shouldScroll);
  // useScrollToTop(topRef, [reviews]);
  // useScrollToTop(topRef, [reviews, isPaging], isPaging);

  // アニメーション用 IntersectionObserver
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

  const totalPages = Math.max(1, Math.ceil(count / pageSize));


  return (
    <>
      {/* フィルターエリア */}
      <div className="filter-area">
        <label>絞り込み：</label>
        <ul className="flexBox" style={{ gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
          <li>
            <select
              value={pageSize}
              onChange={(e) => {
                setHasInteracted(true);
                // setIsPaging(true);
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={5}>5件</option>
              <option value={10}>10件</option>
              <option value={20}>20件</option>
              <option value={50}>50件</option>
            </select>
          </li>

          <li>
            <select
              value={ordering}
              onChange={(e) => {
                setHasInteracted(true);
                // setIsPaging(true);
                setOrdering(e.target.value);
                setPage(1);
              }}
            >
              <option value="-created_at">新着順</option>
              <option value="-rating">評価が高い順</option>
              <option value="rating">評価が低い順</option>
            </select>
          </li>

          <li>
            <select
              value={ageGroup}
              onChange={(e) => {
                setHasInteracted(true);
                // setIsPaging(true);
                setAgeGroup(e.target.value);
                setPage(1);
              }
            }>
              <option value="">すべて</option>
              <option value="10">10代</option>
              <option value="20">20代</option>
              <option value="30">30代</option>
              <option value="40">40代</option>
              <option value="50">50代以上</option>
              <option value="null">非公開</option>
            </select>
          </li>

          <li>
            <select
              value={gender}
              onChange={(e) => {
                setHasInteracted(true);
                // setIsPaging(true);
                setGender(e.target.value);
                setPage(1);
              }}
            >
              <option value="">すべて</option>
              <option value="男性">男性</option>
              <option value="女性">女性</option>
              <option value="その他">その他</option>
              <option value="none">非公開</option>
            </select>
          </li>
        </ul>
      </div>

      {/* レビュー一覧 */}
      <span ref={topRef}></span>
      {reviews.map((item, index) => (
        <div
          key={item.id}
          // ref={index === 0 ? topRef : null}
          className={`rev-box flexBox${className ? ` ${className}` : ""}`}
        >
          <ReviewItem item={item} />
        </div>
      ))}

      {/* ページネーション */}
      <div className="pagination" style={{ textAlign: "center" }}>
        <button
          disabled={page <= 1}
          onClick={() => {
            setHasInteracted(true);
            // setIsPaging(true);
            setPage((p) => p - 1);
            }}
          >
          前へ
        </button>
        
        <span style={{ margin: "0 1em" }}>{page} / {totalPages}</span>

        <button
          disabled={page >= totalPages}
          onClick={() => {
            setHasInteracted(true);
            // setIsPaging(true);
            setPage((p) => p + 1);
          }}
        >
          次へ
        </button>
        {/* <button disabled={page >= totalPages} onClick={() => {setIsPaging(true); setPage((p) => p + 1);}}>次へ</button> */}
      </div>
    </>
  );
}
