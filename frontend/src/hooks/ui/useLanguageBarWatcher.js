// src/hooks/useLanguageBarWatcher.js
import { useEffect } from "react";

export const useLanguageBarWatcher = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const headerTag = document.querySelector("#header header");
      const buttonMenu = document.querySelector("#header .btn_menu");
      const floatingLink = document.querySelector(".floating_link a");

      const bars = document.querySelectorAll("div.skiptranslate");
      let active = false;
      for (const bar of bars) {
        const iframe = bar.querySelector("iframe.skiptranslate");
        if (iframe && bar.getAttribute("style") === "") {
          active = true;
        }
      }

      if (active) {
        if (headerTag) headerTag.style.top = "40px";
        if (buttonMenu) buttonMenu.style.top = "50px";
        if (floatingLink) floatingLink.style.top = "15%";
      } else {
        if (headerTag) headerTag.style.top = "";
        if (buttonMenu) buttonMenu.style.top = "";
        if (floatingLink) floatingLink.style.top = "";
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
};