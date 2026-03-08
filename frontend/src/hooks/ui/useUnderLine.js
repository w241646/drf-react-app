import { useEffect } from "react";

export function useUnderLine() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".u_line");
      if (!elements.length) return;

      const scroll = window.scrollY;
      const windowHeight = window.innerHeight;

      elements.forEach((el) => {
        const position = el.getBoundingClientRect().top + window.scrollY;
        if (scroll > position - windowHeight) {
          el.classList.add("animeLine");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    // 初回ロード時にも判定
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}