import { useEffect } from "react";

export function useShowMoreToList(initialCount = 4, maxAttempts = 60, intervalMs = 500) {
  useEffect(() => {
    const targetNodes = document.querySelectorAll(".moreList");

    targetNodes.forEach((targetNode) => {
      let attemptCount = 0;

      const checkAndSetup = () => {
        const dlElements = targetNode.querySelectorAll("dl");

        if (dlElements.length >= initialCount) {
          // 初期状態：initialCount未満は表示＆inview付与、それ以外は非表示＆inview除去
          dlElements.forEach((dl, i) => {
            if (i < initialCount) {
              dl.style.display = "";
              dl.classList.add("inview");
            } else {
              dl.style.display = "none";
              dl.classList.remove("inview");
            }
          });

          // ボタンが未生成なら追加
          if (!targetNode.querySelector(".showMoreBtn")) {
            const btn = document.createElement("button");
            btn.className = "showMoreBtn";
            btn.textContent = "もっと見る";

            btn.addEventListener("click", () => {
              const hiddenItems = Array.from(dlElements).slice(initialCount);
              hiddenItems.forEach((dl) => {
                dl.style.display = "block";
                dl.classList.remove("inview");
              });

              setTimeout(() => {
                hiddenItems.forEach((dl) => {
                  dl.classList.add("inview");
                });
              }, 50);

              btn.style.display = "none";
            });

            targetNode.appendChild(btn);
          }

          clearInterval(retryTimer);
        }

        attemptCount++;
        if (attemptCount >= maxAttempts) {
          clearInterval(retryTimer);
          console.warn("DL要素の生成が確認できませんでした");
        }
      };

      const retryTimer = setInterval(checkAndSetup, intervalMs);
    });
  }, [initialCount, maxAttempts, intervalMs]);
}