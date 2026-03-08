import Header from "./Header";
import Footer from "./Footer";
import Language from "../ui/Language";
import { Outlet } from "react-router-dom";

import React from "react";
import { useLanguageBarWatcher } from "../../hooks/ui/useLanguageBarWatcher";
import { usePageTop } from "../../hooks/ui/usePageTop";
import ScrollToTop from "../ui/ScrollToTop";


export default function Layout() {
    // 各フック
    useLanguageBarWatcher();
    usePageTop();
    
    return (
        <>
            <ScrollToTop />
            <style>{`
                #Home { background: #fff; margin-top: 0; }
                header h1.logo a span { font-size: 40%; }
            `}</style>

            <div id="header"><Header /></div>
            {/* 背景 */}
            <div className="bg" style={{ display: "none" }} />

            <Outlet />
            <div id="footer"><Footer /></div>
            <Language />

            {/* ページトップボタン */}
            <div id="PageTop">
                <a href="#">
                <i className="fa fa-chevron-up" />
                </a>
            </div>
        </>
    );
}