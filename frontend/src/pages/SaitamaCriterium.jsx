import { useEffect } from "react";
import { setMetaTitle, setMetaDescription } from "../utils/pageMeta";

import { useSmoothAnchorScroll, usePageScroll } from "../hooks/ui/useAnchors.js";
import { useUnderLine } from "../hooks/ui/useUnderLine.js";
import { useAdjustFixedLangPosition } from "../hooks/ui/useAdjustFixedLangPosition.js";
import { useInViewClass, useInviewCardList, useInviewRowList } from "../hooks/ui/useInViewClass.js";
import { useBreadcrumb } from "../hooks/navigation/useBreadcrumb.js";
import List from "../components/ui/List";

import SnsShare from "../components/layout/SnsShare.jsx";


export default function SaitamaCriterium() {
  const currentUrl = window.location.href;

  // 各フック
  useSmoothAnchorScroll();
  usePageScroll();
  useUnderLine();
  useAdjustFixedLangPosition();
  useInViewClass();
  useInviewCardList();
  useInviewRowList();
  useBreadcrumb();

  useEffect(() => {
    setMetaTitle("ツール・ド・フランス さいたまクリテリウム");
    setMetaDescription("世界トップ選手が集う自転車レース、ツール・ド・フランス さいたまクリテリウム。街が熱狂する一日を体感しよう！");
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

  return (
    <div id="Page" className="page-03">

      <nav id="breadcrumb"></nav>

      <nav className="anchors">
        <div className="prev hov weak"><p className="hideText">前へ</p></div>
        <ul>
          <li className="content01 hov hideText selected">さいたまクリテリウム</li>
          <li className="content02 hov hideText">観戦ガイド</li>
          <li className="content03 hov hideText">過去のレース結果</li>
        </ul>
        <div className="next hov"><p className="hideText">次へ</p></div>
      </nav>

      <main>
        {/* <!-- // intro // --> */}
        <div className="intro inview fadeIn_up">
          <h2><b id="txt_radius">街が熱狂するサイクルイベント</b>ツール・ド・フランス<br />さいたまクリテリウム<span translate="no">Tour de France: Saitama Criterium</span></h2>
          <figure><img src="./img/criterium_main.jpg" alt="さいたまクリテリウム" className="page-eyecatch trim" /></figure>
          <p className="read_txt">
            <span className="u_line">世界最大級の自転車レース「ツール・ド・フランス」が、ここさいたまの街を彩る！</span><br className="sp_none" />トップ選手の疾走を間近で体感できるチャンスに、街全体がサイクリングフェスへと変貌。<br className="sp_none" />走る人も見る人も、誰もが熱狂する一日。さいたまが、自転車の聖地になる瞬間を見逃すな！
          </p>

          <div className="movie_area">
            <div className="movie_frame">
              <div className="movie_wrap">
                <iframe src="https://www.youtube.com/embed/e4xLBUk_hKo?mute=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- // intro // --> */}

        {/* <!-- // mainCnt // --> */}
        <div className="mainCnt">
          {/* <!-- Sec01 --> */}
          <section id="Sec01" className="sec-scroll-point content01-section">
            <article className="inview fadeIn_up">
              <h3><span>大会概要</span><b>ツール・ド・フランス<br />さいたまクリテリウム<br className="pc_none" />とは？</b></h3>
              <figure><img src="./img/criterium_01.jpg" alt="ツール・ド・フランス さいたまクリテリウム" className="media-cover" /></figure>
              <div className="content-block">
                <p className="leadTxt clearfix">
                  毎年秋に埼玉県さいたま市で開催される「ツール・ド・フランス さいたまクリテリウム」は、世界最高峰の自転車ロードレース「ツール・ド・フランス」の名を冠した公式イベントで、大会は「クリテリウム」と呼ばれる形式で行われ、都市部に設けられた短い周回コースを何度も走ることで、スピード感と迫力ある展開が特徴です。観客は選手たちの走りを間近で見ることができ、まるで街中がスタジアムのような一体感に包まれます。<br /><br className="pc_none" />
                  この大会には、ツール・ド・フランス本戦で活躍したトップ選手たちが多数参加し、日本国内ではなかなか見られない世界レベルのレースを体感できます。また、レース以外にもファンゾーンやステージイベント、キッズ向け体験などが充実しており、家族連れや初心者でも楽しめる工夫がされています。さいたま市の都市景観と自転車スポーツが融合したこのイベントは、スポーツの魅力を広く伝えるとともに、地域の活性化にも貢献しています。
                </p>
              </div>

              <div className="content-block">
                <dl className="talk">
                  <dt className="inview_re delay_a">
                    <div className="faceicon icon-a"></div>
                    <b>「ツール・ド・フランス」って、埼玉でもやっているのですか？</b>
                  </dt>
                  <dd className="inview_re delay_b">
                    <div className="faceicon icon-b"></div>
                    <p>
                      「ツール・ド・フランス」ってのはな、世界的な自転車レースなんじゃが、埼玉でもその名を冠した「さいたまクリテリウム」が開かれておるんじゃよ。<br />
                      埼玉は自転車の普及率が高くて、関連企業も多い“自転車王国”として知られておるからなんじゃ。<br />
                      街中を走るレースは迫力満点で、体験イベントや地元のうまいもんも楽しめる。<br />
                      自転車好きなら、一度は訪れてみるとええぞ。心がワクワクすること間違いなしじゃ！
                    </p>
                  </dd>
                </dl>
              </div>

              <a href="https://saitama-criterium.jp/" target="_blank" rel="noopener noreferrer" className="btn linkBtn">大会公式HP<i className="fas fa-external-link-alt ex-link"></i></a>
            </article>
          </section>

          {/* <!-- Sec02 --> */}
          <section id="Sec02" className="sec-scroll-point content02-section">
            <article className="inview fadeIn_up">
              <h3><span translate="no">Spectator Guide</span><b>観戦ガイド</b></h3>
              <figure><img src="./img/criterium_02.jpg" alt="観戦ガイド" className="media-cover" /></figure>
              <div className="content-block">
                <p className="leadTxt clearfix">
                  世界最大の自転車レース「ツール・ド・フランス」のスター選手たちが、毎年秋にさいたま新都心を疾走する――<br />
                  それが「ツール・ド・フランスさいたまクリテリウム」。2013年に始まり、2024年には記念すべき第10回大会を迎える。<br /><br />
                  ツール・ド・フランスは1903年に誕生。フランス一周という壮大な挑戦から始まり、ピレネーやアルプス山脈を越える過酷なコースで知られる。そんな伝統ある大会の名を冠した唯一のレースが、さいたまクリテリウム。<br />
                  毎年、ツールで活躍した選手が来日し、欧州のロードレース文化を日本に届ける。看板や小道具も本場から持ち込まれ、世界190カ国に中継される国際的イベントです。<br /><br />
                  2024年大会では、初めてさいたまスーパーアリーナのメインアリーナを通過するコースを採用。<br />
                  これまで以上に華やかで、観客の熱気に包まれること間違いなし。今年も世界のトップ選手たちが、さいたまの街を熱くする。
                </p>
              </div>
            </article>
          
            <div id="Guide" className="content-block row_list moreList">
              <dl>
                <dt>
                  <b>大会の歴史・見どころ</b>
                  <ul className="tags">
                    <li>ツール・ド・フランス</li>
                    <li>さいたまクリテリウム</li>
                    <li>自転車レース</li>
                  </ul>
                </dt>
                <dd><p>世界最大にして最高峰の自転車レース、ツール・ド・フランスが100回目の開催を実現した2013年、世界で初めて「ツール・ド・フランスの名を冠した大会」として始まったのがツール・ド・フランスさいたまクリテリウム。</p></dd>
              </dl>
              <dl>
                <dt>
                  <b>クリテリウムとは</b>
                  <ul className="tags">
                    <li>クリテリウム</li>
                    <li>都市型レース</li>
                    <li>短距離の周回コース</li>
                  </ul>
                </dt>
                <dd><p>クリテリウムは、短距離の周回コースで行われる自転車ロードレースです。1周1〜3km程度のコースを複数周回し、スピードやコーナリング技術が求められます。観客が選手の走りを間近で楽しめるため、都市部での開催も多く人気があります。</p></dd>
              </dl>
            </div>
            <List callback="guide" containerId="Guide" />
          </section>

          {/* <!-- Sec03 --> */}
          <section id="Sec03" className="sec-scroll-point content03-section">
            <article className="inview fadeIn_up">
              <h3><span>The Race</span><b>過去のレース結果</b></h3>
              <figure><img src="./img/criterium_03.jpg" alt="過去のレース結果" className="media-cover" /></figure>
              <div className="content-block">
                <p className="leadTxt clearfix">
                  さいたまの街を駆け抜ける世界のトップライダーたち。沿道には多くの観客が集まり、選手たちの熱い走りに声援を送り、街全体が一体となってレースを盛り上げます。ツール・ド・フランス さいたまクリテリウムは、地域とスポーツが融合する特別な一日です。ここでは、過去の大会結果を通して、その興奮と感動を振り返ります。
                </p>
              </div>
            </article>
      
            <div className="content-block card-list grid grid-3">
              <div className="flexBox">
                <h4>2024</h4>
                <img src="./img/result-2024.jpg" alt="2024 優勝 ビニヤム・ギルマイ" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">Biniam GIRMAY</span><rt>ビニヤム・ギルマイ</rt></ruby></p>
                <p></p>
              </div>
              <div className="flexBox">
                <h4>2023</h4>
                <img src="./img/result-2023.jpg" alt="2023 優勝 タデイ・ポガチャル" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">Tadej POGAČAR</span><rt>タデイ・ポガチャル</rt></ruby></p>
                <p></p>
              </div>
              <div className="flexBox">
                <h4>2022</h4>
                <img src="./img/result-2022.jpg" alt="2022 優勝 ヤスパー・フィリプセン" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">Jasper PHILIPSEN</span><rt>ヤスパー・フィリプセン</rt></ruby></p>
                <p></p>
              </div>
              <div className="flexBox">
                <h4>2019</h4>
                <img src="./img/result-2019.jpg" alt="2019 優勝 新城 幸也" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">Yukiya ARASHIRO</span><rt>幸也 新城</rt></ruby></p>
                <p></p>
              </div>
              <div className="flexBox">
                <h4>2018</h4>
                <img src="./img/result-2018.jpg" alt="2018 優勝 アレハンドロ・バルベルデ" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">Alejandro VALVERDE</span><rt>アレハンドロ・バルベルデ</rt></ruby></p>
                <p></p>
              </div>
              <div className="flexBox">
                <h4>2017</h4>
                <img src="./img/result-2017.jpg" alt="2017 優勝 マーク・カヴェンディッシュ" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">Mark CAVENDISH</span><rt>マーク・カヴェンディッシュ</rt></ruby></p>
                <p></p>
              </div>
              <div className="flexBox">
                <h4>2016</h4>
                <img src="./img/result-2016.jpg" alt="2016 優勝 ペーター・サガン" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">Peter SAGAN</span><rt>ペーター・サガン</rt></ruby></p>
                <p></p>
              </div>
              <div className="flexBox">
                <h4>2015</h4>
                <img src="./img/result-2015.jpg" alt="2015 優勝 ジョン・デゲンコルブ" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">John DEGENKOLB</span><rt>ジョン・デゲンコルブ</rt></ruby></p>
                <p></p>
              </div>
              <div className="flexBox">
                <h4>2014</h4>
                <img src="./img/result-2014.jpg" alt="2014 優勝 マルセル・キッテル" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">Marcel KITTEL</span><rt>マルセル・キッテル</rt></ruby></p>
                <p></p>
              </div>
              <div className="flexBox">
                <h4>2013</h4>
                <img src="./img/result-2013.jpg" alt="2013 優勝 クリストファー・フルーム" />
                <p><b>優勝</b>：<small>クリテリウムメインレース</small></p>
                <p><ruby><span translate="no">Christopher FROOME</span><rt>クリストファー・フルーム</rt></ruby></p>
                <p></p>
              </div>
            </div>

            <div className="content-block source">
              <h5>出典</h5>
              <ul>
                <li><a href="https://saitama-criterium.jp/2025/race/result/" target="_blank" rel="noopener noreferrer">過去のレース結果 - ツール・ド・フランスさいたまクリテリウム</a><i className="fas fa-external-link-alt"></i></li>
              </ul>
            </div>
          </section>

          {/* <!-- snsArea --> */}
          <SnsShare url={currentUrl} />

          {/* <div className="snsArea sec-scroll-point">
            <div className="inview fadeIn_up">
              <b>SHARE</b>
              <ul className="flexBox">
                <li><a href="https://www.facebook.com/share.php?u={URL}" rel="nofollow noopener" target="_blank"><i className="fab fa-facebook-square"></i></a></li>
                <li><a href="http://twitter.com/share?url=[URL]" rel="nofollow noopener" target="_blank"><img src="./img/logo-white.png" className="x_icon" /></a></li>
                <li><a href="https://line.me/R/msg/text/?{URL}" target="_blank" rel="nofollow noopener"><i className="fab fa-line"></i></a></li>
              </ul>
            </div>
          </div> */}

        </div>
        {/* <!-- // mainCnt // --> */}
      </main>

    </div>
  );
}