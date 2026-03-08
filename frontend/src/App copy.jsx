// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import { useEffect, useState } from 'react';
// import { getReviews } from './services/reviewService';

// function App() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getReviews()
//       .then(data => setReviews(data))
//       .catch(err => {
//         console.error(err);
//         setReviews(null);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div>
//       <h1>Game Reviews</h1>
//       <ul>
//         {loading ? (
//           <li>Loading...</li>
//         ) : reviews === null ? (
//           <li>Failed to load reviews</li>
//         ) : reviews.length > 0 ? (
//           reviews.map(r => (
//             <li key={r.id}>
//               <strong>Rating:</strong> {r.rating} <br />
//               <strong>Comment:</strong> {r.comment}
//             </li>
//           ))
//         ) : (
//           <li>No reviews yet</li>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;




// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Origin from "./pages/Origin";
import CyclingRoad from "./pages/CyclingRoad";
import SaitamaCriterium from "./pages/SaitamaCriterium";
import Trivia from "./pages/Trivia";
import Game from "./pages/Game";
import MyPage from "./pages/MyPage";

// import $ from 'jquery';
import 'lightbox2/dist/css/lightbox.min.css';
import 'lightbox2/dist/js/lightbox.min.js';

import ScrollToTop from "./components/ui/ScrollToTop";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

import { getMe } from "./services/accountService";
import { logout } from "./services/authService";

import styles from "./styles/App.module.css";


function App() {
  // state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);

  // 初期化：ログイン情報確認
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      getMe()
        .then((data) =>  setUser(data))
        .catch(err => {
          console.error("ユーザー情報取得に失敗:", err);
          setUser(null);
        });
    }
  }, []);

  // storage イベントで他タブのログアウトを検知
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'access' && !event.newValue) {
        // トークンが削除されたらログアウト状態にする
        setUser(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // ログイン成功時の処理
  const handleLoginSuccess = async () => {
    // console.log("ログイン成功時のユーザーデータ:", userData);
    // setUser(userData);
    // setIsLoginOpen(false);
    const me = await getMe();
    // console.log(me);
    setUser(me);
    setIsLoginOpen(false);
  };

  // 新規登録成功時
  const handleSignupSuccess = async () => {
    const me = await getMe();
    setUser(me);
    setIsSignupOpen(false);
  }

  // ログアウト処理
  const handleLogout = async () => {
    await logout();                 // トークン削除 & サーバー側ログアウト
    setUser(null);                  // state をクリア
    if (window.location.pathname === "/mypage") {
      window.location.href = "/";   // ★ マイページにいるときだけ TOP へ遷移
    }
  };

  // ユーザー情報更新
  const refreshUser = async () => {
    const me = await getMe();
    setUser(me);
  }


  return (
    <BrowserRouter>
      <ScrollToTop />
        <div>
          {/* ログイン・新規登録ボタンを配置 */}
          { !user ? (
            <div style={loginFloat}>
              <button 
                style={loginButtonStyle} 
                onClick={() => setIsLoginOpen(true)}
              >
                ログイン
              </button>

              <button 
                style={{ ...loginButtonStyle, backgroundColor: "#28a745", marginLeft: "10px" }}
                onClick={() => setIsSignupOpen(true)}
              >
                新規登録
              </button>
            </div>
          ) : (
            <div style={loginFloat}>
              <p style={{ margin: "10px" }}>ようこそ、<b>{user.username}</b>さん！</p>
              <button onClick={() => window.location.href = "/mypage"} style={{ marginRight: "10px" }}>
                マイページ
              </button>
              <button onClick={handleLogout} style={logoutButtonStyle}>
                ログアウト
              </button>
            </div>
          ) }

          {/* ログインモーダル */}
          {isLoginOpen && (
            <div style={modalOverlayStyle}>
              <div style={modalContentStyle}>
                <button style={closeButtonStyle} onClick={() => setIsLoginOpen(false)}>×</button>
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              </div>
            </div>
          )}

          {/* 新規登録モーダル */}
          {isSignupOpen && (
            <div style={modalOverlayStyle}>
              <div style={modalContentStyle}>
                <button style={closeButtonStyle} onClick={() => setIsSignupOpen(false)}>×</button>
                <RegisterForm onRegisterSuccess={handleSignupSuccess} />
              </div>
            </div>
          )}

          {/* ルーティング*/}
          <Routes>
            {/* Layout を親ルートに設定 */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/origin" element={<Origin />} />
              <Route path="/cycling-road" element={<CyclingRoad />} />
              <Route path="/saitama-criterium" element={<SaitamaCriterium />} />
              <Route path="/trivia" element={<Trivia />} />
              <Route path="/game" element={<Game />} />

              {/* マイページ */}
              <Route path="/mypage" element={<MyPage refreshUser={refreshUser} />} />              
              {/* 404 ページ */}
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

// ★ モーダル用スタイル
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99999, // ← 最前面に
};
const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
  position: "relative",
  zIndex: 100000, // ← コンテンツもさらに前面に
};
const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "transparent",
  fontSize: "20px",
  cursor: "pointer",
};
const loginFloat = {
  position: "fixed",   // 画面に固定
  top: "120px",         // 上から 10px
  right: "calc((100vw - 1200px) / 2 - 20px)",
  zIndex: 9999,        // 最前面に表示
  padding: "8px 16px",
  backgroundColor: "#fff",
  border: "1px solid #eee",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  // border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
const loginButtonStyle = {
  // position: "fixed",   // 画面に固定
  // top: "120px",         // 上から 10px
  // right: "calc((100vw - 1200px) / 2 - 20px)",
  // zIndex: 9999,        // 最前面に表示
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
const logoutButtonStyle = {
  marginLeft: "10px",
  padding: "6px 12px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default App;