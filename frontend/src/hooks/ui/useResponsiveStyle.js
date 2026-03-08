// src/hooks/useResponsiveStyles.js
import { useEffect } from "react";

export default function useResponsiveStyles() {
  useEffect(() => {
    const applyResponsiveStyles = () => {
      const width = window.innerWidth;

      const minWidth = 300;
      const maxWidth = 1920;
      const normalized = Math.min(Math.max((width - minWidth) / (maxWidth - minWidth), 0), 1);

      const contentMinWidth = 300;
      const contentMaxWidth = 1350;
      const contentWidth = contentMinWidth + (contentMaxWidth - contentMinWidth) * normalized;

      const target = document.querySelector(".mainVI");
      if (target) {
        target.style.setProperty("--after-width", `${contentWidth}px`);
      }
    };

    applyResponsiveStyles();
    window.addEventListener("resize", applyResponsiveStyles);
    return () => window.removeEventListener("resize", applyResponsiveStyles);
  }, []);
}