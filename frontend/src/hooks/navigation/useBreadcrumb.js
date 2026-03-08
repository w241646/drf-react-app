import { useEffect } from "react";

export function useBreadcrumb() {
  useEffect(() => {
    const breadcrumbContainer = document.getElementById("breadcrumb");
    if (!breadcrumbContainer) return;

    const getFileName = (path) => {
      const fileName = path.split("/").pop();
      return decodeURIComponent(fileName.replace(".html", ""));
    };

    const getMainTextFromH2 = () => {
      const h2 = document.querySelector("h2");
      if (!h2) return null;

      const textParts = Array.from(h2.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent.trim())
        .filter((text) => text.length > 0);

      return textParts[1] || textParts[0] || null;
    };

    const generateBreadcrumbs = () => {
      const path = window.location.pathname;
      const currentFile = getFileName(path);
      if (currentFile === "index") return;

      const currentLabel =
        getMainTextFromH2() || getFileName(path) || "現在地";

      const breadcrumbHTML = `<a href="index.html">Home</a> &gt; <span>${currentLabel}</span>`;
      breadcrumbContainer.innerHTML = breadcrumbHTML;
    };

    // DOM が準備できたら実行
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", generateBreadcrumbs);
    } else {
      setTimeout(generateBreadcrumbs, 100);
    }

    // クリーンアップ
    return () => {
      document.removeEventListener("DOMContentLoaded", generateBreadcrumbs);
    };
  }, []);
}