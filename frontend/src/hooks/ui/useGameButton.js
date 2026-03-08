// src/hooks/useGameButton.js
import { useEffect, useState } from "react";

export const useGameButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const gameSection = document.querySelector("#Game");
        if (!gameSection) return;
        const rect = gameSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setVisible(isVisible);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return visible;
};