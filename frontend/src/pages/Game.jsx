import { useEffect, useState, useRef } from "react";
import { setMetaTitle, setMetaDescription } from "../utils/pageMeta";

import { useSmoothAnchorScroll, usePageScroll } from "../hooks/ui/useAnchors.js";
import { useUnderLine } from "../hooks/ui/useUnderLine.js";
import { useAdjustFixedLangPosition } from "../hooks/ui/useAdjustFixedLangPosition.js";
import { useInViewClass, useInviewCardList, useInviewRowList } from "../hooks/ui/useInViewClass.js";
import { useBreadcrumb } from "../hooks/navigation/useBreadcrumb.js";
import { useGameButton } from "../hooks/ui/useGameButton.js";
import { addScore } from "../services/gameService";

import SnsShare from "../components/layout/SnsShare.jsx";
import RankingPage from "../components/game/RankingPage.jsx";


export default function Game() {
  const currentUrl = window.location.href;
  const rankingRef = useRef(null);

  // 各フック
  useSmoothAnchorScroll();
  usePageScroll();
  useUnderLine();
  useAdjustFixedLangPosition();
  useInViewClass();
  useInviewCardList();
  useInviewRowList();
  useBreadcrumb();
  const visible = useGameButton();

  useEffect(() => {
    setMetaTitle("自転車ゲーム");
    setMetaDescription("埼玉の特産品をキャッチしながら自転車で駆け抜ける爽快アクションゲーム！反射神経と判断力を駆使してハイスコアを狙え！遊びながら地元の魅力を再発見できる、子どもから大人まで楽しめるサイクル体験型コンテンツ。");
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
    window.addScoreToServer = addScore;
  }, []);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "./js/game.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script); // クリーンアップ
  //   };
  // }, []);
  useEffect(() => {
    import("../js/game.js").then(() => {
      console.log("game.js loaded");
    });
  }, []);

  useEffect(() => {
    window.refreshRanking = () => {
      if (rankingRef.current) {
        rankingRef.current.reload();
      }
    };
  }, []);


  return (
    <div id="Page" className="page-05">

      <nav id="breadcrumb"></nav>

      <main>
        <div className="floating_link fade-in"><a href="#Game" className={`${visible ? "slide-out" : "slide-in"}`}><i className="fas fa-gamepad"></i><p>GamePlay</p></a></div>

        {/* <!-- // intro // --> */}
        <div className="intro inview fadeIn_up">
          <h2><b id="txt_radius">埼玉特産アイテムをキャッチ</b>自転車ゲーム<span translate="no">Catch & Ride: Saitama’s Local Loot</span></h2>
          <figure><img src="./img/game_main.jpg" alt="自転車ゲーム" className="page-eyecatch trim" /></figure>
          <p className="read_txt">
            「埼玉の特産アイテム」を拾いながら、サイクリングでハイスコアを目指すゲーム！<br className="sp_none" /><span className="u_line">反射神経も学びもフル活用、遊びながら地元の魅力を再発見。</span><br />大人も子どもも夢中になる、疾走アクション体験！
          </p>
        </div>
        {/* <!-- // intro // --> */}

        {/* <!-- // mainCnt // --> */}
        <div className="mainCnt">
          {/* <!-- Sec01 --> */}
          <section id="Sec01" className="sec-scroll-point">
            <article className="inview fadeIn_up">
              <h3><span translate="no">Catch Treasures</span><b>走って拾って、<br className="pc_none" />埼玉再発見！</b></h3>
              <figure><img src="./img/game_01.jpg" alt="走って拾って、埼玉再発見" className="media-cover" /></figure>
              <div className="content-block">
                <p className="leadTxt clearfix">
                  埼玉の特産アイテムをキャッチしてスコアを稼ぐ、シンプルながら戦略性のあるアクションゲーム。プレイヤーは自転車を操作し、各アイテムを集めながら、ダメージを避けてライフを守ります。制限時間内に高得点を目指し、回復アイテムや時計で生存時間を延ばすことも可能。ハイスコア更新を狙うもよし、特産アイテムをコンプリートするもよし。反射神経と判断力が試される、爽快なキャッチゲームをお楽しみください！
                </p>
              </div>

              <div className="content-block">
                <dl className="talk">
                  <dt className="inview_re delay_a">
                    <div className="faceicon icon-a"></div>
                    <b>高得点を狙っちゃいますよ！！</b>
                  </dt>
                  <dd className="inview_re delay_b">
                    <div className="faceicon icon-b"></div>
                    <p>
                      ほほう！そなた、高得点を狙うとな？<br />よき心意気じゃ！その志、まことに勇ましく、我が王国の誉れと申せよう。ならば命ずる――ダメージを避け、アイテムを掴み、時を操り、栄光の頂を目指すがよい！スコアの頂点に名を刻みし者には、王より称賛と祝福を授けようぞ！<br />さあ、進め！我が勇者よ！
                    </p>
                  </dd>
                </dl>
              </div>
            </article>

            <div id="controls" className="content-block game-note inview fadeIn_up">
              <h4><i className="fas fa-gamepad"></i>ゲームの操作方法</h4>
              <ul>
                <li><strong>名前入力：</strong> プレーヤー名を入力すると、スコアと一緒にランキングに表示されます。</li>
                <li><strong translate="no">Game Start：</strong> ゲームを開始します。</li>
                <li><strong translate="no">Play Again：</strong> 再挑戦できます。</li>
                <li><strong>終了条件：</strong> 制限時間またはライフがゼロになると終了です。</li>
                <li><strong>操作方法（PC / スマホ）：</strong> 
                  <ul>
                    <li>
                      <img src="./img/game_bicycle.png" alt="自転車" />
                      <div className="flexBox item-text">
                        <span className="item-name">PC：「←」「→」キーで左右に移動します。</span>
                        <span className="item-name">スマホ：タッチで移動します。</span>
                      </div>
                    </li>
                  </ul>
                </li>
                <li><strong>アイテムをキャッチしてスコアアップ：</strong>
                  <ul>
                    <li>
                      <img src="./img/game_negi.png" alt="深谷ネギ" />
                      <div className="flexBox item-text">
                        <span className="item-name">深谷ネギ：+10点</span>
                        <small className="item-desc sp_none">埼玉県深谷市の特産・深谷ネギは、寒さが増す冬に甘みが際立つブランド野菜。白く太い根の部分は繊維が細かく、加熱するととろけるような柔らかさと濃厚な旨みが広がります。糖度は果物並みに高く、すき焼きや鍋料理に欠かせない存在として、地元はもちろん全国でも高い評価を受けています。</small>
                        <small className="item-desc pc_none" aria-hidden="true">深谷市の特産・深谷ネギは冬に甘みが増す高糖度の特産野菜で、鍋料理に人気。</small>
                      </div>
                    </li>
                    <li>
                      <img src="./img/game_senbei.png" alt="草加せんべい" />
                      <div className="flexBox item-text">
                        <span className="item-name">草加せんべい：+20点</span>
                        <small className="item-desc sp_none">埼玉県草加市の名物・草加せんべいは、うるち米を使った堅焼きの煎餅で、パリッとした食感と香ばしい醤油の風味が特徴。江戸時代、日光街道の宿場町として栄えた草加で誕生し、保存食としての団子を乾かして焼いたのが始まりとされています。</small>
                        <small className="item-desc pc_none" aria-hidden="true">草加せんべいは埼玉県草加市発祥の堅焼き煎餅で、パリッとした食感と醤油の香ばしさが特徴。</small>
                      </div>
                    </li>
                    <li>
                      <img src="./img/game_washi.png" alt="小川和紙" />
                      <div className="flexBox item-text">
                        <span className="item-name">小川和紙：+30点</span>
                        <small className="item-desc sp_none">埼玉県小川町の特産・小川和紙は、奈良時代から続く手漉き和紙。楮を原料に職人が一枚ずつ丁寧に漉き上げ、しなやかで温かみのある風合いが特徴です。ユネスコ無形文化遺産にも登録され、書道や工芸品など幅広く親しまれています。</small>
                        <small className="item-desc pc_none" aria-hidden="true">小川町の特産・小川和紙は、奈良時代から続く手漉きの和紙。ユネスコ無形文化遺産にも登録されています。</small>
                      </div>
                    </li>
                    <li>
                      <img src="./img/game_manju.png" alt="十万石饅頭" />
                      <div className="flexBox item-text">
                        <span className="item-name">十万石饅頭：+40点</span>
                        <small className="item-desc sp_none">埼玉県行田市の名物・十万石饅頭は、しっとりとした薯蕷（じょうよ）生地に、北海道産のこしあんを包んだ上品な和菓子。もちもちとした食感と、なめらかな甘さが特徴です。地元では「うまい、うますぎる！」のCMで知られ、埼玉県民に親しまれています。</small>
                        <small className="item-desc pc_none" aria-hidden="true">十万石饅頭は行田市名物の和菓子で、もちもち食感と滑らかな甘さが特徴。「うまい、うますぎる！」のCMで親しまれています。</small>
                      </div>
                    </li>
                    <li>
                      <img src="./img/game_bonsai.png" alt="大宮盆栽" />
                      <div className="flexBox item-text">
                        <span className="item-name">大宮盆栽：+50点</span>
                        <small className="item-desc sp_none">埼玉県さいたま市で育まれる大宮盆栽は、小さな鉢に自然の美を宿す、大宮盆栽村で受け継がれてきた伝統芸術。樹木の生命力と四季の移ろいを表現する繊細な技術が特徴で、国内外の愛好家から高い評価を受けています。「BONSAI」として世界中の盆栽ファンを魅了する、日本文化の象徴として、世界に誇れる芸術です。</small>
                        <small className="item-desc pc_none" aria-hidden="true">大宮盆栽はさいたま市の伝統芸術で、自然美と四季を表現する繊細な技術が特徴。世界中の盆栽ファンを魅了する日本文化の象徴です。</small>
                      </div>
                    </li>
                  </ul>
                </li>
                <li><strong>ダメージアイテム：</strong>
                  <ul>
                    <li>
                      <img src="./img/game_bomb.png" alt="爆弾" />
                      <div className="flexBox item-text">
                        <span className="item-name">爆弾：-15点、ライフ-1</span>
                      </div>
                    </li>
                  </ul>
                </li>
                <li><strong>回復・補助アイテム：</strong>
                  <ul>
                    <li>
                      <img src="./img/game_medkit.png" alt="救急箱" />
                      <div className="flexBox item-text">
                        <span className="item-name">救急箱：ライフ+1</span>
                      </div>
                    </li>
                    <li>
                      <img src="./img/game_hourglass.png" alt="砂時計" />
                      <div className="flexBox item-text">
                        <span className="item-name">砂時計：時間+10秒</span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div id="Game" className="content-block inview fadeIn_up">
              {/* <!-- ゲーム本体 --> */}
              <div style={{ position: "relative", width: "100%", maxWidth: "400px", margin: "auto" }}>
                <div className="playerName">
                  <label htmlFor="playerName"><i className="fas fa-pen"></i>名前（ランキングに表示されます）:</label>
                  <input type="text" id="playerName" placeholder="未入力なら「名無し」になります" />
                </div>
                <div className="game_frame"><canvas id="gameCanvas"></canvas></div>
                <button id="startButton" translate="no">Game Start</button>
                <button id="restartButton" translate="no" style={{ display: "none" }}>Play Again</button>
              </div>
            </div>

            <div id="Score" className="content-block game-note inview fadeIn_up">
              <div id="topScoresDisplay">
                <h4><i className="fas fa-trophy"></i>My Best Scores</h4>
                <ul id="topScoresList"></ul>
              </div>
            </div>
              
            <div className="content-block game-note inview fadeIn_up" style={{ maxWidth: "440px" }}>
              {/* ★ ランキングページへのリンクを追加 */}
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h4><i className="fas fa-trophy"></i> Top Players Ranking</h4>
                  {/* ★ サーバーランキング（埋め込み） */}
                  <RankingPage ref={rankingRef} embedded={true} />
              </div>
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