// src/hooks/useLoadingControl.js
import { useEffect } from "react";

// export function useLoading() {
//   useEffect(() => {
//     const webStorage = () => {
//       const loading = document.querySelector(".loading");
//       const loadingAnimation = document.querySelector(".loading-animation");
//       if (!loading) return;

//       if (sessionStorage.getItem("access")) {
//         // 2回目以降アクセス時の処理
//         loading.classList.add("is-active");

//         // 少し待ってからフェードアウトアニメーションを開始
//         setTimeout(() => {
//           loading.classList.add("slide-up");
//         }, 1000); // 表示後1秒でアニメーション開始
//       } else {
//         // 初回アクセス時の処理
//         sessionStorage.setItem("access", "true"); // sessionStorageにデータを保存
//         if (loadingAnimation) loadingAnimation.classList.add("is-active"); // loadingアニメーションを表示

//         setTimeout(() => {
//           loading.classList.add("is-active");
//           if (loadingAnimation) loadingAnimation.classList.remove("is-active");

//           // ローディング表示後にフェードアウトアニメーションを開始
//           setTimeout(() => {
//             if (loadingAnimation) loadingAnimation.classList.add("slide-up");
//           }, 0);
//         }, 2000); // ローディングを表示する時間
//       }
//     };

//     webStorage();
//   }, []);
// }


export function useLoading() {
  useEffect(() => {
    const webStorage = () => {
      const loading = document.querySelector(".loading");
      const loadingAnimation = document.querySelector(".loading-animation");
      if (!loading) return;

      // 毎回初回アクセス時の処理を実行する
      if (loadingAnimation) loadingAnimation.classList.add("is-active"); // loadingアニメーションを表示

      setTimeout(() => {
        loading.classList.add("is-active");
        if (loadingAnimation) loadingAnimation.classList.remove("is-active");

        // ローディング表示後にフェードアウトアニメーションを開始
        setTimeout(() => {
          if (loadingAnimation) loadingAnimation.classList.add("slide-up");
        }, 0);
      }, 2000); // ローディングを表示する時間
    };

    webStorage();
  }, []);
}