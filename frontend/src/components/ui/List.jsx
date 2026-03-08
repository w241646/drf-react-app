// src/components/List.jsx
import { useEffect, useRef, useState } from "react";
import { useList } from "../../hooks/data/useList";

/**
 * 汎用リスト描画コンポーネント
 * @param {string} callback - JSONファイル名（例: "spot" → spot.json）
 * @param {number} loop - 表示件数（省略時は全件）
 * @param {string} containerId - コンテナの id 属性
 * @param {string} className - 追加のクラス（任意）
 */
export default function List({ callback, loop, containerId, className }) {
  const data = useList(callback, loop);
  const containerRef = useRef(null);

  // 初期表示件数を管理する state
  const initialCount = 3;
  const [visibleCount, setVisibleCount] = useState(initialCount);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("dl");
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview");
            observer.unobserve(entry.target); // 一度付与したら解除
          }
        });
      },
      { threshold: 0.01 }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [data, visibleCount]); // ← 表示件数が変わったら再監視

  // 「もっと見る」ボタンのクリック処理
  const showMore = () => {
    setVisibleCount(data.length);
  };

  return (
    <div
      className={`content-block row_list${className ? ` ${className}` : ""}`}
      id={containerId}
      ref={containerRef}
    >
      {data.slice(0, visibleCount).map((item, i) => (
        <dl key={i}>
          <dt>
            <b>{item.title}</b>
            {item.image && (
              <div className="image">
                <img src={item.image} alt={item.title} />
              </div>
            )}
            {item.tag && Array.isArray(item.tag) && (
              <ul className="tags">
                {item.tag.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            )}
          </dt>
          <dd>
            <p>{item.text}</p>
            {item.images && Array.isArray(item.images) && (
              <>
                <ul className="images">
                  {item.images.map((img, j) => (
                    <li key={j}>
                      <a
                        href={img}
                        data-lightbox={`gallery${i}`}
                        data-title={item.title}
                      >
                        <img src={img} alt={item.title} />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="annotation">※ 画像をクリック／タップで拡大</p>
              </>
            )}
          </dd>
        </dl>
      ))}

      {/* もっと見るボタン */}
      {visibleCount < data.length && (
        <button className="showMoreBtn" onClick={showMore}>
          もっと見る
        </button>
      )}
    </div>
  );
}