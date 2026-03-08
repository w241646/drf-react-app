import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useHamBtnMenu() {
  const location = useLocation();

  useEffect(() => {
    const btnMenu = document.querySelector(".btn_menu");
    const bg = document.querySelector(".bg");
    const hamNav = document.querySelector("#hamMenu nav");
    const mainTxt = document.querySelector(".mainVI .mVI_txt");
    const hamLinks = document.querySelectorAll(".ham_list a");

    if (!btnMenu || !bg || !hamNav) return;

    const closeMenu = () => {
      if (bg) bg.classList.remove("show");
      btnMenu.classList.remove("active");
      hamNav.classList.remove("open");
      if (mainTxt) mainTxt.style.display = "";
    };

    const handleBtnClick = () => {
      btnMenu.classList.toggle("active");
      if (bg) bg.classList.toggle("show");
      hamNav.classList.toggle("open");
      if (mainTxt) {
        mainTxt.style.display =
          mainTxt.style.display === "none" ? "" : "none";
      }
    };

    const handleHamLinkClick = () => closeMenu();
    const handleBgClick = () => closeMenu();

    btnMenu.addEventListener("click", handleBtnClick);
    hamLinks.forEach((link) =>
      link.addEventListener("click", handleHamLinkClick)
    );
    bg.addEventListener("click", handleBgClick);

    // クリーンアップ
    return () => {
      btnMenu.removeEventListener("click", handleBtnClick);
      hamLinks.forEach((link) =>
        link.removeEventListener("click", handleHamLinkClick)
      );
      bg.removeEventListener("click", handleBgClick);
    };
  }, []);

  // location が変わった時だけ閉じる
  useEffect(() => {
    const btnMenu = document.querySelector(".btn_menu");
    const bg = document.querySelector(".bg");
    const hamNav = document.querySelector("#hamMenu nav");
    const mainTxt = document.querySelector(".mainVI .mVI_txt");

    if (!btnMenu || !bg || !hamNav) return;

    if (bg) bg.classList.remove("show");
    btnMenu.classList.remove("active");
    hamNav.classList.remove("open");
    if (mainTxt) mainTxt.style.display = "";
  }, [location]);
}