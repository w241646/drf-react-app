import { useEffect } from "react";

export function useAdjustFixedLangPosition() {
  useEffect(() => {
    const adjustFixedLangPosition = () => {
      const footer = document.querySelector("footer");
      const fixedElement = document.querySelector("#Lang");
      if (!footer || !fixedElement) return;

      const footerTop = footer.getBoundingClientRect().top;
      if (footerTop < window.innerHeight) {
        fixedElement.classList.add("hidden");
      } else {
        fixedElement.classList.remove("hidden");
      }
    };

    // スマホサイズのみでイベント登録
    if (window.innerWidth <= 600) {
      window.addEventListener("scroll", adjustFixedLangPosition);
      // 初回チェック
      adjustFixedLangPosition();
    }

    // クリーンアップ
    return () => {
      window.removeEventListener("scroll", adjustFixedLangPosition);
    };
  }, []);
}