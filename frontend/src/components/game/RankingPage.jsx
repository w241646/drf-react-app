// src/components/game/RankingPage.jsx
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { getRanking } from "../../services/gameService";
import { useScrollToTop } from "../../hooks/ui/useScrollToTop";
// import { MEDIA_BASE_URL } from "../../config";


const RankingPage = forwardRef(({ embedded = false }, ref) => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [count, setCount] = useState(0);
  const topRef = useRef(null);

  // ページング中かどうか
  const [isPaging, setIsPaging] = useState(false);

  // 初回レンダリング判定
  const isFirstRender = useRef(true);

  // ★ ランキング取得関数
  const fetchRanking = async () => {
    try {
      const data = await getRanking(page, pageSize);

      setRanking(data.results);
      setCount(data.count);

    } catch (err) {
      console.error("ランキング取得に失敗:", err);
      setRanking([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  // 初回 & page 変更時
  useEffect(() => {
    setLoading(true);
    fetchRanking();
  }, [page]);

  // ★ 外部（Game.jsx）から reload() を呼べるようにする
  useImperativeHandle(ref, () => ({
    reload() {
      setLoading(true);
      fetchRanking();
    },
  }));

  // ranking が更新されたら isPaging を false に戻す（初回は除外）
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isPaging) {
      setIsPaging(false);
    }
  }, [ranking]);

  const totalPages = Math.ceil(count / pageSize);

  // ページ切り替え時に最初のランキングへスクロール（ヘッダー固定対応）
  useScrollToTop(topRef, [ranking, isPaging], isPaging && !isFirstRender.current);


  return (
    <div
      className="rankingPageScope"
      style={embedded ? styles.embeddedContainer : styles.pageContainer}
    >
      {!embedded && <h1 style={styles.title}>🏆 ランキング</h1>}

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <>
          <span ref={topRef}></span>

          <ul style={styles.list}>          
            {ranking.map((entry, index) => (
              <li
                key={entry.id}
                // ref={index === 0 ? topRef : null}
                style={styles.item}
              >
                <span style={styles.rank}>
                  {(page - 1) * pageSize + index + 1} 位
                </span>
                  

                <img
                  src={entry.user_icon_url}
                  alt="user icon"
                  style={styles.icon}
                />
                {/* <img
                  src={
                    entry.user_icon
                      ? entry.user_icon.startsWith("http")
                        ? entry.user_icon
                        : MEDIA_BASE_URL + entry.user_icon
                      : "/img/icon_cycle.png"
                  }
                  alt="user icon"
                  style={styles.icon}
                /> */}

                <span style={styles.name}>{entry.user}</span>
                <span style={styles.score}>{entry.score}</span>
              </li>
            ))}
          </ul>

          {/* ★ ページネーション */}
          <div className="pagination" style={{ marginTop: "35px" }}>
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
        </>
      )}
    </div>
  );
});

const styles = {
  pageContainer: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  embeddedContainer: {
    marginTop: "20px",
    // padding: "10px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    padding: "1.5em 12px",
    marginBottom: "8px",
    // background: "#f5f5f5",
    // borderRadius: "6px",
    borderBottom: "1px solid #ccc",
  },
  rank: {
    width: "50px",
    fontWeight: "bold",
  },
  icon: {
    width: "32px",
    height: "32px",
    marginBottom: "0",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    flex: 1,
    textAlign: "left",
  },
  score: {
    width: "100px",
    textAlign: "right",
    fontWeight: "bold",
  },
};

export default RankingPage;
