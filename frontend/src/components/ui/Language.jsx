import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // グローバル関数を定義（まだなければ）
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "ja",
            includedLanguages: "ja,en,zh-CN,ko",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };

      // Google翻訳スクリプトを動的に読み込む（1回だけ）
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div id="Lang">
      <p>LANGUAGE</p>
      <div id="google_translate_element" className="lang"></div>
    </div>
  );
}