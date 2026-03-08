import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    // // --- jQuery inview.js ---
    // const scriptInview = document.createElement("script");
    // scriptInview.src = "/js/jquery.inview.js"; // public/js に置く
    // document.body.appendChild(scriptInview);

    // // --- scroll-hint CSS/JS ---
    // const scrollHintCss = document.createElement("link");
    // scrollHintCss.rel = "stylesheet";
    // scrollHintCss.href = "https://unpkg.com/scroll-hint@latest/css/scroll-hint.css";
    // document.head.appendChild(scrollHintCss);

    // const scrollHintJs = document.createElement("script");
    // scrollHintJs.src = "https://unpkg.com/scroll-hint@latest/js/scroll-hint.min.js";
    // document.body.appendChild(scrollHintJs);

    // // --- lightbox2 CSS/JS ---
    // const lightboxCss = document.createElement("link");
    // lightboxCss.rel = "stylesheet";
    // lightboxCss.href = "https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/css/lightbox.min.css";
    // document.head.appendChild(lightboxCss);

    // const lightboxJs = document.createElement("script");
    // lightboxJs.src = "https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/js/lightbox.min.js";
    // document.body.appendChild(lightboxJs);

    // // --- sub.js ---
    // const scriptSub = document.createElement("script");
    // scriptSub.src = "/js/sub.js"; // public/js に置く
    // scriptSub.defer = true;
    // document.body.appendChild(scriptSub);
  }, []);

  return (
    <footer>
      <p className="copy" translate="no">
        &copy; 2025 IrodorinoWa All Rights Reserved.
      </p>
    </footer>
  );
}