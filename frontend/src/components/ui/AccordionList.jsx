import { useState, useRef } from "react";
import { useAccordionList } from "../../hooks/data/useAccordionList";

/**
 * アコーディオンリスト描画コンポーネント
 * @param {string} callback - JSONファイル名（例: "faq" → faq.json）
 * @param {number} loop - 表示件数（省略時は全件）
 * @param {string} className - 追加クラス（任意）
 */
export default function AccordionList({ callback, loop, className }) {
  const { data, error } = useAccordionList(callback, loop);
  const [openIndex, setOpenIndex] = useState([]);
  const refs = useRef([]);

  if (error) return <div>エラー: {error}</div>;

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => {
      if (prev.includes(index)) {
        // すでに開いている → 閉じる
        return prev.filter((i) => i !== index);
      } else {
        // 開いていない → 開く
        return [...prev, index];
      }
    });
  };

  return (
    <>
      {/* ▼▼▼ アコーディオン用 CSS ▼▼▼ */}
      <style>{`
        #Trivia div + div {
          margin-top: 0;
        }
        .accordion-list .ac-child {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
          display: block;
          margin: 0;
          padding: 0 5% 0 10%;
        }
        .accordion-list .ac-child.open {
          padding-top: 2%;
          padding-bottom: 2%;
        }
        .accordion-list .ac-child p {
          padding: 0;
        }
        .accordion-list .ac-parent {
          cursor: pointer;
        }
      `}</style>
      {/* ▲▲▲ CSS ここまで ▲▲▲ */}

      <dl className={`accordion-list${className ? ` ${className}` : ""}`}>
        {data.map((item, i) =>
          item.title ? (
            <div key={i}>
              <dt
                className={`ac-parent${openIndex.includes(i) ? " open" : ""}`}
                onClick={() => toggleAccordion(i)}
              >
                <p>{item.title}</p>
              </dt>
              <dd
                ref={(el) => (refs.current[i] = el)}
                className={`ac-child${openIndex.includes(i) ? " open" : ""}`}
                style={{
                  maxHeight:
                    openIndex.includes(i)
                      ? refs.current[i]?.scrollHeight +  (refs.current[i] ? refs.current[i].offsetTop * 0 + 40 : 40) + "px"
                      : "0px",
                }}
              >
                <p>{item.text}</p>
              </dd>
            </div>
          ) : null
        )}
      </dl>
    </>
  );
}