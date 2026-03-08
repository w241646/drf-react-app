// src/pages/MyPage.jsx
import React, { useEffect, useState } from "react";
import { setMetaTitle, setMetaDescription } from "../utils/pageMeta";
import { getMe, updateMe } from "../services/accountService";

import UserIconArea from "../components/mypage/UserIconArea.jsx"
import UserProfileArea from "../components/mypage/UserProfileArea.jsx";
import UserDeleteArea from "../components/mypage/UserDeleteArea.jsx"
import MyReviewsArea from "../components/mypage/MyReviewsArea.jsx"
import "../styles/MyPage.css";


function MyPage({ refreshUser }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) return;

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

            breadcrumbContainer.innerHTML =
                `<a href="index.html">Home</a> &gt; <span>${currentLabel}</span>`;
        };

        setTimeout(generateBreadcrumbs, 0);
    }, [user]);

    useEffect(() => {
        setMetaTitle("マイページ");
        setMetaDescription("マイページ");
    }, []);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/css/page.css";
        document.head.appendChild(link);

        return () => {
        document.head.removeChild(link); // ページを離れたら削除
        };
    }, []);
  
    useEffect(() => {
        getMe().then((data) => {
            const me = data;
            setUser(me);
        });
    }, []);

    if (!user) return <p>読み込み中...</p>;


    return (
        <div id="Page" className="page-00">

            <nav id="breadcrumb"></nav>

            <main>
                <div className="intro">
                    <h2>マイページ</h2>
                </div>

                <div className="mainCnt">
                    {/* アイコン表示・更新 */}
                    <UserIconArea user={user} setUser={setUser} />

                    {/* プロフィール表示・編集 */}
                    <UserProfileArea user={user} setUser={setUser} refreshUser={refreshUser} />

                    {/* アカウント削除 */}
                    <UserDeleteArea user={user} />

                    {/* レビュー一覧（更新・削除） */}
                    <MyReviewsArea />
                </div>
            </main>
        </div>
    );
}

export default MyPage;