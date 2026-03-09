// src/hooks/ui/useScrollToTop.js
import { useEffect, useRef } from "react";

export function useScrollToTop(
  ref,
  deps = [],
  shouldScroll = false,
  headerHeight = 160
) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    // ★ 初回レンダーは絶対にスクロールさせない
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // ★ shouldScroll が false → 何もしない
    if (!shouldScroll) return;
    if (!ref.current) return;

    // ★ MutationObserver で DOM 更新後にスクロール
    const observer = new MutationObserver(() => {
      if (!ref.current) return;

      const y = ref.current.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: y - headerHeight,
        behavior: "smooth",
      });

      observer.disconnect();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, deps);
}



// import { useEffect, useRef } from "react";

// export function useScrollToTop(
//   ref,
//   deps = [],
//   shouldScroll = false,
//   headerHeight = 160
// ) {
//   const isFirst = useRef(true);

//   useEffect(() => {
//     if (isFirst.current) {
//       isFirst.current = false;
//       return;
//     }

//     if (!shouldScroll) return;
//     if (!ref.current) return;

//     // DOM変化を監視して、安定したらスクロール
//     const observer = new MutationObserver(() => {
//       if (!ref.current) return;

//       const y = ref.current.getBoundingClientRect().top + window.scrollY;

//       window.scrollTo({
//         top: y - headerHeight,
//         behavior: "smooth",
//       });

//       observer.disconnect(); // 一度だけ実行
//     });

//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });

//     return () => observer.disconnect();
//   }, deps);
// }



// import { useEffect, useRef } from "react";

// export function useScrollToTop(
//     ref,
//     deps = [],
//     shouldScroll = false,
//     headerHeight = 160
//   ) {
//   const isFirst = useRef(true);

//   useEffect(() => {
//     // 初回ロードは絶対にスクロールさせない
//     if (isFirst.current) {
//       isFirst.current = false;
//       return;
//     }

//     if (!shouldScroll) return;
//     if (!ref.current) return;

//     const timer = setTimeout(() => {
//       requestAnimationFrame(() => {
//         if (!ref.current) return;
//         const y = ref.current.getBoundingClientRect().top + window.scrollY;
//         window.scrollTo({
//           top: y - headerHeight,
//           behavior: "smooth",
//         });
//       });
//     }, 500);

//     return () => clearTimeout(timer);
//   }, deps);
// }



// import { useLayoutEffect, useRef } from "react";

// export function useScrollToTop(
//   ref,
//   deps = [],
//   shouldScroll = false,
//   headerHeight = 160
// ) {
//   const isFirst = useRef(true);

//   useLayoutEffect(() => {
//     // 初回ロードは絶対にスクロールさせない
//     if (isFirst.current) {
//       isFirst.current = false;
//       return;
//     }

//     if (!shouldScroll) return;
//     if (!ref.current) return;

//     setTimeout(() => {
//       requestAnimationFrame(() => {
//         if (!ref.current) return;
//         const y = ref.current.getBoundingClientRect().top + window.scrollY;
//         window.scrollTo({
//           top: y - headerHeight,
//           behavior: "smooth",
//         });
//       });
//     }, 0);
//   }, deps);
// }



// export function useScrollToTop(ref, deps = [], shouldScroll = false, headerHeight = 160) {
//   useLayoutEffect(() => {
//     if (!shouldScroll) return;  // ← ページネーション時だけ発火
//     if (!ref.current) return;

//     setTimeout(() => {
//       requestAnimationFrame(() => {
//         if (!ref.current) return;
//         const y = ref.current.getBoundingClientRect().top + window.scrollY;
//         window.scrollTo({
//           top: y - headerHeight,
//           behavior: "smooth",
//         });
//       });
//     }, 0);
//   }, deps);
// }



// import { useLayoutEffect } from "react";

// export function useScrollToTop(ref, deps = [], headerHeight = 160) {
//   useLayoutEffect(() => {
//     if (!ref.current) return;

//     setTimeout(() => {
//         const y = ref.current.getBoundingClientRect().top + window.scrollY;
//         window.scrollTo({
//           top: y - headerHeight,
//           behavior: "smooth",
//         });
//     }, 0);
//   }, deps);
// }



// import { useEffect } from "react";

// export function useScrollToTop(ref, deps = [], headerHeight = 160) {
//   useEffect(() => {
//     if (!ref.current) return;

//     const y = ref.current.getBoundingClientRect().top + window.scrollY;
//     window.scrollTo({
//       top: y - headerHeight,
//       behavior: "smooth",
//     });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, deps);
// }
