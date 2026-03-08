import { useEffect, useRef } from "react";

export function usePageTop() {
  const isFirst = useRef(true);

  useEffect(() => {
    const topBtn = document.getElementById("PageTop");
    if (!topBtn) return;

    let showFlag = false;
    topBtn.style.bottom = "-135px";

    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > 300) {
        if (!showFlag) {
          showFlag = true;
          topBtn.style.transition = "bottom 0.2s";
          topBtn.style.bottom = "10px";
        }
      } else {
        if (showFlag) {
          showFlag = false;
          topBtn.style.transition = "bottom 0.2s";
          topBtn.style.bottom = "-135px";
        }
      }
    };

    const handleClickTop = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    topBtn.addEventListener("click", handleClickTop);
    window.addEventListener("scroll", handleScroll);

    // ページ内リンクのスムーズスクロール
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    const handleAnchorClick = (e) => {
      if (isFirst.current) return;

      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      const target =
        href === "#" || href === "" ? document.documentElement : document.querySelector(href);
      if (!target) return;
      const position = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: position, behavior: "smooth" });
    };
    anchorLinks.forEach((link) =>
      link.addEventListener("click", handleAnchorClick)
    );

    // // 初回チェック
    // handleScroll();

    // ★ 初回レンダリング終了後にフラグを false にする
    setTimeout(() => {
        isFirst.current = false;
    }, 0);

    return () => {
      topBtn.removeEventListener("click", handleClickTop);
      window.removeEventListener("scroll", handleScroll);
      anchorLinks.forEach((link) =>
        link.removeEventListener("click", handleAnchorClick)
      );
    };
  }, []);
}