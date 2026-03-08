// utils/pageMeta.js

export function setMetaTitle(pageTitle, isHome = false) {
  if (isHome) {
    // Home.jsx の場合
    document.title = `彩りの輪 ～Saitama Cycle Journey～`;
  } else {
    // それ以外は区切り線付きで追記
    document.title = `${pageTitle} | 彩りの輪 ～Saitama Cycle Journey～`;
  }
}

export function setMetaDescription(description) {
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute("content", description);
  }
}