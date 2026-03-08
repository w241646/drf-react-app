import { useEffect, useLayoutEffect  } from "react";
import { setMetaTitle, setMetaDescription } from "../utils/pageMeta";
import { useLocation } from "react-router-dom";

import { useSmoothAnchorScroll, usePageScroll } from "../hooks/ui/useAnchors.js";
import { useUnderLine } from "../hooks/ui/useUnderLine.js";
import { useAdjustFixedLangPosition } from "../hooks/ui/useAdjustFixedLangPosition.js";
import { useInViewClass, useInviewCardList, useInviewRowList } from "../hooks/ui/useInViewClass.js";
import { useBreadcrumb } from "../hooks/navigation/useBreadcrumb.js";
import List from "../components/ui/List";
// import ReviewList from "../components/ui/ReviewList";
import ReviewContainer from "../components/reviews/ReviewContainer.jsx";
import SnsShare from "../components/layout/SnsShare.jsx";


function useForceScrollTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // hash がある場合はアンカー移動を優先するため TOP 強制を無効化
    if (hash) return;

    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    });
  }, [pathname, hash]);
}

export default function CyclingRoad() {
  const currentUrl = window.location.href;

  // 各フック
  useForceScrollTop();
  usePageScroll();
  useUnderLine();
  useAdjustFixedLangPosition();
  useInViewClass();
  useInviewCardList();
  useInviewRowList();
  useBreadcrumb();
  // useSmoothAnchorScroll();

  useEffect(() => {
    setMetaTitle("日本最長の川沿いサイクリングロード");
    setMetaDescription("利根川・江戸川サイクリングロードは全長約170km。日本最長の川沿いルートで絶景と自然美を満喫。初心者からベテランまで楽しめる関東の魅力満載の快適ライド。");
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

  // Sec03 直リンク判定
  const { hash } = useLocation();
  const isSec03Hash = hash === "#Sec03";

  // アンカー移動（スクロール位置調整のみ）
  useEffect(() => {
    if (!hash) return;

    // 描画完了を待つ
    setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 80; // ヘッダー分調整
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 500);
  }, [hash]);

  // useEffect(() => {
  //   const scripts = [
  //     "/js/review.rating.js",
  //     // "/js/json_list.js",
  //     // "/js/json_rev-list.js",
  //     // "/js/more_list.js"
  //   ];

  //   Promise.all(
  //     scripts.map(src =>
  //       new Promise(resolve => {
  //         const s = document.createElement("script");
  //         s.src = src;
  //         s.onload = resolve;
  //         document.body.appendChild(s);
  //       })
  //     )
  //   ).then(() => {
  //     // 全部読み込まれた後に呼び出す
  //     // if (typeof window.list === "function") {
  //     //   window.list("spot", "#Spot");
  //     // }
  //     // if (typeof window.review_list === "function") {
  //     //   window.review_list("review", "#Review");
  //     // }
  //   });

  //   // クリーンアップ
  //   return () => {
  //     scripts.forEach(src => {
  //       const el = document.querySelector(`script[src="${src}"]`);
  //       if (el) el.remove();
  //     });
  //   };
  // }, []);


  return (
    <div id="Page" className="page-02">

      <nav id="breadcrumb"></nav>

      <nav className="anchors">
        <div className="prev hov weak"><p className="hideText">前へ</p></div>
        <ul>
          <li className="content01 hov hideText selected">サイクリングロード</li>
          <li className="content02 hov hideText">おすすめスポット</li>
          <li className="content03 hov hideText">みんなの声</li>
        </ul>
        <div className="next hov"><p className="hideText">次へ</p></div>
      </nav>

      <main>
        {/* <!-- // intro // --> */}
        <div className="intro inview fadeIn_up">
          <h2><b id="txt_radius">日本一の絶景旅</b>日本最長の川沿い<br />サイクリングロード<span translate="no">Japan’s Longest Riverside Cycling Route</span></h2>
          <figure><img src="./img/cycling_main.jpg" alt="サイクリングロード" className="page-eyecatch trim" /></figure>
          <p className="read_txt">
            <span className="u_line">群馬・埼玉・千葉・東京を結ぶ利根川・江戸川サイクリングロードは、サイクリストの楽園。</span><br className="sp_none" />関東の大地を貫く壮大な川の流れに沿って、自然美と街並みが織りなす絶景の中を自由に駆け抜けよう。<br className="sp_none" />初心者もベテランも、風を切るたびに心躍る魅力が詰まった極上のサイクリングルートです！
          </p>

          <div className="movie_area">
            <div className="movie_frame">
              <div className="movie_wrap">
                <iframe src="https://www.youtube.com/embed/Srh6-hrXOVo?mute=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
              <h3><span>川沿いを走る</span><b>利根川・江戸川<br className="pc_none" />サイクリングロード</b></h3>
              <figure className="content-block cr_map">
                <a href="./pdf/edogawa_tonegawa20_a.pdf" target="_blank" rel="noopener noreferrer">
                  <img src="./img/edogawa_tonegawa20_a.jpg" alt="「利根川・江戸川サイクリングロードマップ（青）」表面 - 江戸川" className="media-cover" />
                  <ul><li><span className="pdf">「利根川・江戸川サイクリングロードマップ（青）」表面 - 江戸川（PDF：8,469KB）</span></li></ul>
                </a>
                <a href="./pdf/edogawa_tonegawa20_b.pdf" target="_blank" rel="noopener noreferrer">
                  <img src="./img/edogawa_tonegawa20_b.jpg" alt="「利根川・江戸川サイクリングロードマップ（青）」裏面 - 利根川" className="media-cover" />
                  <ul><li><span className="pdf">「利根川・江戸川サイクリングロードマップ（青）」裏面 - 利根川（PDF：6,647KB）</span></li></ul>
                </a>
              </figure>

              <div className="content-block">
                <p className="leadTxt clearfix">
                  利根川・江戸川サイクリングロードは、群馬・埼玉・千葉・東京の4都県をまたぐ、日本最長級の川沿いサイクリングルートです。<br />
                  利根川と江戸川の堤防沿いに整備されたこの道は、群馬県渋川市と千葉県浦安市を結ぶ最長で約170kmに及び、関東平野を縦断する壮大なロングライドが楽しめます。<br />
                  信号が少なく、車の通行もほとんどないため、初心者からベテランまで快適に走行できるのが魅力です。<br /><br />
                  埼玉県内では春日部市や吉川市などを通り、田園風景と都市の景観が交錯する多彩な表情が楽しめます。<br />
                  江戸川サイクリングロードは東京都江戸川区から千葉県野田市まで続き、江戸川の穏やかな流れに沿って走る心地よいルートです。<br /><br />
                  一方、利根川サイクリングロードは群馬県から埼玉県北部を経て千葉県へと続き、関宿城や渡良瀬遊水地などの名所も点在しています。沿道には道の駅や公園、鉄道駅も多く、輪行にも便利です。<br /><br />
                  自然、歴史、地域の魅力を感じながら、川とともに走る贅沢な時間が味わえるルートです。
                </p>
              </div>

              <div className="content-block">
                <dl className="talk">
                  <dt className="inview_re delay_a">
                    <div className="faceicon icon-a"></div>
                    <b>「利根川・江戸川サイクリングロード」は、そんなにすごいサイクリングロードなのですか？</b>
                  </dt>
                  <dd className="inview_re delay_b">
                    <div className="faceicon icon-b"></div>
                    <p>
                      「利根川・江戸川サイクリングロード」ってのはな、群馬から千葉まで川沿いを走れる、関東屈指の長距離コースなんじゃよ。<br />
                      利根川と江戸川を合わせると、全長170キロ以上にもなって、日本一の長さとも言われておる。<br />
                      景色もよくて走りごたえも抜群、自転車で関東を旅するには、これ以上の道はないくらい魅力が詰まっておるんじゃ。<br />
                      風を感じながら走れば、心も晴れやかになるぞ！
                    </p>
                  </dd>
                </dl>
              </div>

              <div className="content-block source">
                <h5>出典</h5>
                <ul>
                  <li><a href="https://www.pref.saitama.lg.jp/a1006/gurutto/saikuru.html" target="_blank" rel="noopener noreferrer">サイクリングロードマップ - 埼玉県</a><i className="fas fa-external-link-alt"></i></li>
                </ul>
              </div>
            </article>
          </section>

          {/* <!-- Sec02 --> */}
          <section id="Sec02" className="sec-scroll-point content02-section">
            <article className="inview fadeIn_up">
              <h3><span translate="no">Recommended Spots</span><b>ひと休みスポット</b></h3>
              <figure><img src="./img/cycling_01.jpg" alt="魅力の寄り道スポット集" className="media-cover" /></figure>
              <div className="content-block">
                <p className="leadTxt clearfix">
                  関東屈指のロングライドコースの「利根川・江戸川サイクリングロード」。<br />
                  そんなサイクリングロード沿いに点在する“立ち寄りたくなるおすすめスポット”を厳選してご紹介。<br />
                  休憩にぴったりな公園や、地元グルメが楽しめるお店、絶景ポイントなど、走るだけじゃない楽しみ方を見つけてみませんか？
                </p>
              </div>
            </article>

            <div id="Spot" className="content-block row_list moreList">
              <dl>
                <dt>
                  <b>CAFE TO HEN（三郷市）</b>
                  <ul className="tags">
                    <li>江戸川サイクリングロード</li>
                    <li>水元公園</li>
                    <li>ロードバイク</li>
                    <li>カフェ巡り</li>
                  </ul>
                </dt>
                <dd><p>江戸川サイクリングロードのサイクリストにとって、まさにオアシスのような存在。水元公園にもほど近く、サイクリングの途中に立ち寄るのにぴったりな、おしゃれで居心地の良いカフェです。店の前にはバイクラックが設置されており、ロードバイクはもちろん、スタンドのない自転車でも安心して停められます。店内はブラウンを基調とした温かみのある空間で、ゆったりとした時間が流れています。本棚にはさまざまなジャンルの本が並び、コーヒーを片手に読書を楽しむこともできます。さらに、本棚にはロードバイクやサイクルグッズがディスプレイされていて、サイクリスト心をくすぐる“シャレオツ”な演出も魅力のひとつです。</p></dd>
              </dl>
            </div>
            <List callback="spot" containerId="Spot" />
          </section>

          {/* <!-- Sec03 --> */}
          <section id="Sec03" className="sec-scroll-point content03-section">
            {/* <article className="inview fadeIn_up"> */}
            <article className={
              isSec03Hash
                ? "fadeIn_up is-show"
                : "inview fadeIn_up"                
              }
            >
              <h3><span translate="no">Cyclist Review</span><b>みんなの声</b></h3>
              <figure><img src="./img/cycling_02.jpg" alt="みんなの声" className="media-cover" /></figure>
              <div className="content-block">
                <p className="leadTxt clearfix">
                  自然と都市の両方を楽しめるサイクリングコースとして人気の「利根川・江戸川サイクリングロード」。広々とした河川敷、季節ごとに表情を変える風景、そして信号の少ない快適な道のりは、初心者からベテランライダーまで多くのサイクリストを魅了しています。今回は、実際にこのルートを走ったユーザーのリアルな声をもとに、走行感・景観・休憩スポット・アクセスの良さなどを詳しくご紹介。週末のライド計画や新しいサイクリングスポットを探している方は、ぜひ参考にしてみてください！
                </p>
              </div>
              {/* <div id="Review" className="content-block card-list review grid grid-2">
                <div className="rev-box flexBox" data-rating="4.2">
                  <figure className="faceicon"><img src="img/icon_cycle.png" alt="アイコン" /></figure>
                  <p className="rev-name">さいくりすと さん<small>(10代・男性)</small></p>
                  <p className="stars"></p>
                  <b className="title">気持ちよすぎ！川沿いをスイスイ走るロングライド</b>
                  <p className="note">都心からアクセスしやすく、信号も少ない快適なロングライドが楽しめるコースでした。川沿いの風景は開放感があり、特に早朝や夕方の時間帯は空と水面が美しく、走っていてとても気持ちが良かったです。路面も比較的整備されていて、初心者でも安心して走れる印象。ただ、一部区間では舗装が荒れていたり、休憩ポイントが少ない場所もあったので、事前のルート確認は必須です。全体としては、自然と都市のバランスが絶妙な、走りごたえのあるサイクリングロードでした。</p>
                </div>

                <ReviewList callback="review" loop={10} containerId="reviewList" />                
              </div> */}
              {/* レビュー機能 */}
              <div id="Review" className="content-block">
                <ReviewContainer />
              </div>
            </article>
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