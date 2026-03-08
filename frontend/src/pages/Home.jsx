// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { setMetaTitle } from "../utils/pageMeta";

import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { useLoading } from "../hooks/ui/useLoadingControl.js";
import useResponsiveStyle from "../hooks/ui/useResponsiveStyle.js";
import useInfiniteSlider from "../hooks/ui/useInfiniteSlider.js";
import { useSmoothAnchorScroll } from "../hooks/ui/useAnchors.js";
import { useUnderLine } from "../hooks/ui/useUnderLine.js";
import { useAdjustFixedLangPosition } from "../hooks/ui/useAdjustFixedLangPosition.js";
import { useInViewClass, useInviewCardList, useInviewRowList } from "../hooks/ui/useInViewClass.js";

import SnsShare from "../components/layout/SnsShare.jsx";
import { getLatestReviews } from "../services/reviewService";
import "../styles/Home.css";


export default function Home() {
  const currentUrl = window.location.href;

  // 各フック
  useLoading();
  useResponsiveStyle();
  useInfiniteSlider();
  useSmoothAnchorScroll();
  useUnderLine();
  useAdjustFixedLangPosition();
  useInViewClass();
  useInviewCardList();
  useInviewRowList();

  // ★ 新着レビュー state
  const [latestReviews, setLatestReviews] = useState([]);

  useEffect(() => {
    setMetaTitle("", true);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/index.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); // ページを離れたら削除
    };
  }, []);

  // ★ 新着レビュー取得
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const data = await getLatestReviews();
        setLatestReviews(data);
      } catch (e) {
        console.error("新着レビュー取得失敗", e);
      }
    };
    fetchLatest();
  }, []);


  return (
    <div id="Home">

      {/* ローディング */}
      <div className="loading">
        <div className="loading-animation">
          <img src="./img/wheel_icon.png" />
          <p translate="no"><i>彩りの輪</i><span>Saitama Cycle Journey</span></p>
        </div>
      </div>

      {/* // mainVI // */}
      <section className="mainVI">
        <div className="mVoverlay">
          <div className="mVI_txt">
            <p>
              <b>彩りの輪と走る、<br />さいたま自転車物語</b>
              <span translate="no">Ride with Saitama's Colors</span>
            </p>
          </div>

          <div className="mVI_icon">
            <ul className="flexBox">
              <li><Link to="/origin"><i className="fas fa-bicycle"></i><p><span translate="no">Bicycle Culture</span><small>自転車文化</small></p></Link></li>
              <li><Link to="/cycling-road"><i className="fas fa-road"></i><p><span translate="no">Cycling Road</span><small>サイクリングロード</small></p></Link></li>
              <li><Link to="/saitama-criterium"><i className="fas fa-trophy"></i><p><span translate="no">Cycle Event</span><small>サイクルイベント</small></p></Link></li>
            </ul>
          </div>
        </div>

        {/* <!-- Swiper --> */}
        {/* <div className="swiper mySwiper masked-area">
          <div className="bg-layer"></div>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="./img/main_01.jpg" alt="メインビジュアル | 自転車" />
            </div>
            <div className="swiper-slide">
              <img src="./img/main_02.jpg" alt="メインビジュアル | 交通標識" />
            </div>
            <div className="swiper-slide">
              <img src="./img/main_03.jpg" alt="メインビジュアル | 自転車" />
            </div>
            <div className="swiper-slide">
              <img src="./img/main_04.jpg" alt="メインビジュアル | 自転車" />
            </div>
          </div>
        </div> */}

        {/* Swiper React版 */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={3000}
          autoplay={{ delay: 4000 }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          className="mySwiper masked-area"
        >
          <div className="bg-layer"></div>
          <SwiperSlide className="swiper-slide">
            <img src="/img/main_01.jpg" alt="メインビジュアル | 自転車" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/img/main_02.jpg" alt="メインビジュアル | 交通標識" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/img/main_03.jpg" alt="メインビジュアル | 自転車" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src="/img/main_04.jpg" alt="メインビジュアル | 自転車" />
          </SwiperSlide>
        </Swiper>

      </section>
      {/* // mainVI // */}

      {/* ページ内ナビ */}
      <nav className="page__nav">
        <ul className="flexBox">
          <li><a href="#Sec01">知られざる魅力</a></li>
          <li><a href="#Sec02">学びと遊び</a></li>
        </ul>
      </nav>
    
      {/* メインコンテンツ */}
      <main>
        {/* イントロ */}
        <div className="intro inview fadeIn_up">
          <div className="bicycle-illust stay">
            <img src="/img/illust_bicycle_01.png" alt="自転車のイラスト" />
            <img src="/img/illust_bicycle_02.png" alt="自転車のイラスト" />
          </div>

          <h2><b>彩りの輪の旅</b>ペダルで巡る<br className="pc_none" />さいたま再発見！<span translate="no">Saitama on Two Wheels</span></h2>
          <p className="read_txt">
            埼玉の自転車文化、サイクリングロード、イベント、<br className="sp_none" />
            マナー、雑学などを網羅した情報サイト。<br className="sp_none" />
            <span className="u_line">「自転車文化の源流」「利根川・江戸川サイクリングロード」<br className="sp_none" />「ツール・ド・フランス さいたまクリテリウム」</span>など、<br className="sp_none" />
            「自転車王国・埼玉」の知られざる魅力を再発見！
          </p>

          {/* infinite-slider */}
          <div className="infinite-slider">
            <ul className="slider-track" id="sliderTrack">
              <li><img src="./img/origin_main.jpg" alt="自転車文化の源流「埼玉」 | レトロ自転車" /></li>
              <li><img src="./img/origin_01.jpg" alt="自転車文化の源流「埼玉」 | 陸船車イラスト" /></li>
              <li><img src="./img/cycling_main.jpg" alt="日本最長の川沿いサイクリングロード | サイクリングロード" /></li>
              <li><img src="./img/cycling_01.jpg" alt="日本最長の川沿いサイクリングロード | サイクリングロード" /></li>
              <li><img src="./img/criterium_main.jpg" alt="さいたまクリテリウム | 自転車レース" /></li>
              <li><img src="./img/criterium_01.jpg" alt="さいたまクリテリウム | 自転車レース" /></li>
              <li><img src="./img/trivia_main.jpg" alt="自転車豆知識 | 路面標示" /></li>
              <li><img src="./img/trivia_01.jpg" alt="自転車豆知識 | 路面標示" /></li>
              <li><img src="./img/game_main.jpg" alt="自転車ゲーム | 自転車のタイヤ" /></li>
              <li><img src="./img/game_01.jpg" alt="自転車ゲーム | ゲームセンター外観" /></li>
            </ul>
          </div>

          <div className="content-block">
            <dl className="talk">
              <dt className="inview_re delay_a">
                <div className="faceicon icon-a"></div>
                <b>埼玉の自転車文化の歴史や魅力、取り組みを教えてください。</b>
              </dt>
              <dd className="inview_re delay_b">
                <div className="faceicon icon-b"></div>
                <p>
                  ほほう、そなたも我が王国「自転車王国・埼玉」に興味を持ったか。よきことじゃ。<br />
                  この地はな、古より人と風が共に歩んできた、自転車文化の豊穣なる里よ。さいたま市を中心に、道、祭り、心――すべてが自転車とともに息づいておる。<br />
                  さあ、わしが語るは、知られざる魅力の数々。耳を傾けてくれい。
                </p>
              </dd>
            </dl>
          </div>

          {/* // 新着レビューエリア（イントロ直下） // */}
          <section className="latest-reviews inview fadeIn_up">
            <h2>みんなの声<span>サイクリングロードレビュー</span></h2>

            {latestReviews.length === 0 ? (
              <p>レビューがまだありません。</p>
            ) : (
              <ul className="latest-review-list">
                {latestReviews.map((review) => (
                  <li key={review.id} className="latest-review-item">
                    <b>
                      {review.title.length > 20
                        ? review.title.slice(0, 20) + "..."
                        : review.title}
                    </b>

                    <p className="rating"><span>★</span> {review.rating}</p>

                    <p className="body">
                      {review.body.length > 45
                        ? review.body.slice(0, 45) + "..."
                        : review.body}
                    </p>

                    {/* <Link to={`/cycling-road#Sec03`} className="detail-link">
                      詳細を見る
                    </Link> */}
                  </li>
                ))}
              </ul>
            )}

            <div className="more-link">
              <Link to="/cycling-road#Sec03" className="detail-link">その他のレビューはこちら</Link>
            </div>
          </section>
        </div>

        <div className="mainCnt">
          {/* セクション01 */}
          <section id="Sec01" className="sec-scroll-point">
            <article className="inview fadeIn_up">
              <h3>
                <span>自転車王国・埼玉</span>
                <b>知られざる魅力</b>
              </h3>
              <div className="overview content-block grid grid-2">
                <p>
                  風を切る爽快感と景色との一体感が味わえる埼玉県は、自転車の魅力を満喫できる“自転車王国”として注目を集めています。
                </p>
                <figure>
                  <img src="/img/illust_japan.svg" alt="日本地図" />
                </figure>
              </div>
            </article>

            <article id="TopMainList" className="card-list grid grid-3">
              <div className="flexBox">
                <Link to="/origin">
                  <h4><span translate="no">Bicycle Culture</span><b>自転車文化の源流<br />「陸船車<small>（りくせんしゃ）</small>」</b></h4>
                  <img src="./img/origin_01.jpg" alt="自転車文化の源流「埼玉」 | 陸船車イラスト" />
                  <p>自転車文化にゆかりある埼玉。自転車の歴史に触れ、ただの移動手段を超えた物語が待っています。</p>
                </Link>
              </div>
              <div className="flexBox">
                <Link to="/cycling-road">
                  <h4><span translate="no">Cycling Road</span><b>日本最長の川沿い<br />サイクリングロード</b></h4>
                  <img src="./img/cycling_main.jpg" alt="日本最長の川沿いサイクリングロード | サイクリングロード" />
                  <p>関東屈指の絶景ルート、利根川・江戸川サイクリングロード。自然と街並みを駆け抜ける爽快な旅へ。</p>
                </Link>
              </div>
              <div className="flexBox">
                <Link to="/saitama-criterium">
                  <h4><span translate="no">Cycle Event</span><b>ツール・ド・フランス<br />さいたまクリテリウム</b></h4>
                  <img src="./img/criterium_main.jpg" alt="さいたまクリテリウム | 自転車レース" />
                  <p>さいたまが沸く！ツール・ド・フランスの熱狂が街を包み、世界のトップライダーが駆け抜ける一日。</p>
                </Link>
              </div>
            </article>
          </section>

          {/* セクション02 */}
          <section id="Sec02" className="sec-scroll-point">
            <article className="inview fadeIn_up">
              <div id="TopSubList" className="card-list grid grid-2">
                <div>
                  <Link to="/trivia">
                    <ul className="grid grid-2">
                      <li className="ttlicon"><p>自転車豆知識</p></li>
                      <li>
                        <h4><b>自転車豆知識</b></h4>
                        <p>埼玉の自転車豆知識や、乗るときの基本ルールをまとめた豆知識集。知れば、自転車ライフがもっと快適で楽しくなる！</p>
                      </li>
                    </ul>
                  </Link>
                </div>
                <div>
                  <Link to="/game">
                    <ul className="grid grid-2">
                      <li className="ttlicon"><p>自転車ゲーム</p></li>
                      <li>
                        <h4><b>自転車ゲーム</b></h4>
                        <p>「埼玉の特産アイテム」を拾いながら、ハイスコアを目指すゲーム！遊びながら地元の魅力を再発見。</p>
                      </li>
                    </ul>
                  </Link>
                </div>
              </div>
            </article>
          </section>

          {/* 自転車イラスト */}
          <div className="bicycle-illust move">
            <img src="/img/illust_bicycle_03.png" alt="自転車のイラスト" />
          </div>

          {/* SNS共有エリア */}
          <SnsShare url={currentUrl} />
          {/* <div className="snsArea sec-scroll-point">
            <div className="inview fadeIn_up">
              <b>SHARE</b>
              <ul className="flexBox">
                <li>
                  <a href="https://www.facebook.com/share.php?u={URL}" rel="nofollow noopener" target="_blank">
                    <i className="fab fa-facebook-square" />
                  </a>
                </li>
                <li>
                  <a href="http://twitter.com/share?url=[URL]" rel="nofollow noopener" target="_blank">
                    <img src="/img/logo-white.png" className="x_icon" alt="X" />
                  </a>
                </li>
                <li>
                  <a href="https://line.me/R/msg/text/?{URL}" target="_blank" rel="nofollow noopener">
                    <i className="fab fa-line" />
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}