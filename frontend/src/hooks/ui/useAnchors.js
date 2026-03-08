import { useEffect } from "react";

export function useSmoothAnchorScroll() {
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      if (!href) return;

      const targetId = href === "#" || href === "" ? "html" : href.replace("#", "");
      const target =
        targetId === "html"
          ? document.documentElement
          : document.getElementById(targetId);

      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 70; // オフセット70px
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleClick);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleClick);
      });
    };
  }, []);
}


export function usePageScroll() {
  useEffect(() => {
    let isFirst = true; // ← 初回ロード判定

    const anchorsNav = document.querySelector(".anchors");
    const navItems = document.querySelectorAll(".anchors li");
    const mainArea = document.querySelector("main");
    const mainTop =
      mainArea?.getBoundingClientRect().top + window.scrollY || 0;
    const prevBtn = document.querySelector(".anchors .prev");
    const nextBtn = document.querySelector(".anchors .next");

    // 選択状態を更新する関数
    function updateSelectedNav() {
      if (isFirst) return; // ← 初回ロードでは実行しない

      let currentSection = null;
      document.querySelectorAll("main section").forEach((section) => {
        const offsetTop =
          section.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = offsetTop + section.offsetHeight;
        const buffer = 500;
        if (
          window.scrollY >= offsetTop - buffer &&
          window.scrollY < sectionBottom - buffer
        ) {
          currentSection = section;
        }
      });

      if (currentSection) {
        const sectionClass = [...currentSection.classList].find((cls) =>
          cls.endsWith("-section")
        );
        if (sectionClass) {
          const targetClass = sectionClass.replace("-section", "");
          navItems.forEach((li) => {
            li.classList.remove("selected");
            if (li.classList.contains(targetClass)) {
              li.classList.add("selected");
            }
          });

          // 前後ボタンの表示制御
          const current = document.querySelector(".anchors li.selected");
          const prev = current?.previousElementSibling;
          const next = current?.nextElementSibling;

          if (prev && prev.tagName === "LI") {
            prevBtn.style.visibility = "visible";
            prevBtn.style.pointerEvents = "auto";
          } else {
            prevBtn.style.visibility = "hidden";
            prevBtn.style.pointerEvents = "none";
          }

          if (next && next.tagName === "LI") {
            nextBtn.style.visibility = "visible";
            nextBtn.style.pointerEvents = "auto";
          } else {
            nextBtn.style.visibility = "hidden";
            nextBtn.style.pointerEvents = "none";
          }
        }
      }
    }

    // スクロールイベントでナビ固定と選択状態を更新
    const handleScroll = () => {
      if (anchorsNav) {
        if (window.scrollY >= mainTop) {
          anchorsNav.classList.add("fixed");
        } else {
          anchorsNav.classList.remove("fixed");
        }
      }
      updateSelectedNav();
    };

    window.addEventListener("scroll", handleScroll);

    // 初回ロード終了
    setTimeout(() => {
      isFirst = false;
    }, 300);

    // ページ内スクロール（クリック時）
    navItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        const targetClass = item.classList[0];
        const targetSection = document.querySelector(
          `.${targetClass}-section`
        );
        if (targetSection) {
          const offsetTop =
            targetSection.getBoundingClientRect().top + window.scrollY;
          const adjust = index % 2 === 1 ? 250 : 100;
          window.scrollTo({
            top: offsetTop - adjust,
            behavior: "smooth",
          });
          setTimeout(updateSelectedNav, 700);
        }
      });
    });

    // 「前へ」ボタン
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const current = document.querySelector(".anchors li.selected");
        const prev = current?.previousElementSibling;
        if (prev && prev.tagName === "LI") {
          const targetClass = prev.classList[0];
          const targetSection = document.querySelector(
            `.${targetClass}-section`
          );
          if (targetSection) {
            const offsetTop =
              targetSection.getBoundingClientRect().top + window.scrollY;
            const index = Array.from(navItems).indexOf(prev);
            const adjust = index % 2 === 1 ? 250 : 100;
            window.scrollTo({
              top: offsetTop - adjust,
              behavior: "smooth",
            });
            setTimeout(updateSelectedNav, 700);
          }
        }
      });
    }

    // 「次へ」ボタン
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const current = document.querySelector(".anchors li.selected");
        const next = current?.nextElementSibling;
        if (next && next.tagName === "LI") {
          const targetClass = next.classList[0];
          const targetSection = document.querySelector(
            `.${targetClass}-section`
          );
          if (targetSection) {
            const offsetTop =
              targetSection.getBoundingClientRect().top + window.scrollY;
            const index = Array.from(navItems).indexOf(next);
            const adjust = index % 2 === 1 ? 250 : 100;
            window.scrollTo({
              top: offsetTop - adjust,
              behavior: "smooth",
            });
            setTimeout(updateSelectedNav, 700);
          }
        }
      });
    }

    // クリーンアップ
    return () => {
      window.removeEventListener("scroll", handleScroll);
      navItems.forEach((item) => {
        item.replaceWith(item.cloneNode(true)); // イベントリスナーを削除
      });
      if (prevBtn) prevBtn.replaceWith(prevBtn.cloneNode(true));
      if (nextBtn) nextBtn.replaceWith(nextBtn.cloneNode(true));
    };
  }, []);
}