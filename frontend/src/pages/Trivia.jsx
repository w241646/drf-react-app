import { useEffect } from "react";
import { setMetaTitle, setMetaDescription } from "../utils/pageMeta";

import { useSmoothAnchorScroll, usePageScroll } from "../hooks/ui/useAnchors.js";
import { useUnderLine } from "../hooks/ui/useUnderLine.js";
import { useAdjustFixedLangPosition } from "../hooks/ui/useAdjustFixedLangPosition.js";
import { useInViewClass, useInviewCardList, useInviewRowList } from "../hooks/ui/useInViewClass.js";
import { useBreadcrumb } from "../hooks/navigation/useBreadcrumb.js";
import List from "../components/ui/List";
import AccordionList from "../components/ui/AccordionList";

import SnsShare from "../components/layout/SnsShare.jsx";


export default function Trivia() {
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
    setMetaTitle("自転車豆知識");
    setMetaDescription("自転車に乗るときの基本ルールから、ブレーキの種類、サドルの高さの重要性など、安全で楽しい自転車利用に役立つ豆知識を紹介。知れば納得、走れば快適！");
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
    <div id="Page" className="page-04">

      <nav id="breadcrumb"></nav>

      <nav className="anchors">
        <div className="prev hov weak"><p className="hideText">前へ</p></div>
        <ul>
          <li className="content01 hov hideText selected">埼玉の自転車豆知識</li>
          <li className="content02 hov hideText">自転車安全利用五則</li>
          <li className="content03 hov hideText">自転車の豆知識集</li>
        </ul>
        <div className="next hov"><p className="hideText">次へ</p></div>
      </nav>

      <main>
        {/* <!-- // intro // --> */}
        <div className="intro inview fadeIn_up">
          <h2><b id="txt_radius">知ればもっと乗りたくなる！</b>自転車豆知識<span translate="no">From Wheels to Wonders: Fun Bike Trivia</span></h2>
          <figure><img src="./img/trivia_main.jpg" alt="自転車豆知識" className="page-eyecatch trim" /></figure>
          <p className="read_txt">
            <span className="u_line">埼玉の自転車豆知識から、自転車に乗るときの基本ルールや、<br className="sp_none" />「ブレーキってどんな種類があるの？」「サドルの高さって重要？」など、<br className="sp_none" />自転車の安全利用が身につく豆知識集。</span><br />知れば、あなたの自転車ライフはもっと快適で楽しくなる！
          </p>
        </div>
        {/* <!-- // intro // --> */}

        {/* <!-- // mainCnt // --> */}
        <div className="mainCnt">
          {/* <!-- Sec01 --> */}
          <section id="Sec01" className="sec-scroll-point content01-section">
            <article className="inview fadeIn_up">
              <h3><span translate="no">Cycling Trivia from Saitama</span><b>埼玉の自転車豆知識</b></h3>
              <figure><img src="./img/trivia_01.jpg" alt="埼玉の自転車豆知識" className="media-cover" /></figure>
              <div className="content-block">
                <p className="leadTxt clearfix">
                  埼玉県は、自然豊かなサイクリングロードや歴史ある街並み、そして自転車文化が根付いた地域です。このセクションでは、埼玉を舞台にした自転車にまつわる豆知識を紹介します。初心者からベテランまで楽しめるスポットや、地元ならではの情報を通じて、もっと自転車が好きになるはず！
                </p>
              </div>

              <div className="content-block">
                <dl className="talk">
                  <dt className="inview_re delay_a">
                    <div className="faceicon icon-a"></div>
                    <b>埼玉の自転車についてもっと知りたいです。</b>
                  </dt>
                  <dd className="inview_re delay_b">
                    <div className="faceicon icon-b"></div>
                    <p>
                      よかろう！埼玉にはの、自転車にまつわる事柄がようけ詰まっておる。<br />
                      その魅力は一言では語り尽くせぬほどじゃが、ここではその一端を紹介して参ろうぞ。<br />
                      走る楽しみ、観る興奮、そして触れる喜び――埼玉には、自転車を通して心躍る瞬間があふれておるんじゃ。
                    </p>
                  </dd>
                </dl>
              </div>
            </article>

            <div id="Trivia" className="content-block row_list moreList">
              <dl>
                <dt>
                  <b>荒川サイクリングロードは埼玉の自転車天国</b>
                  <ul className="tags">
                    <li>埼玉サイクリング</li>
                    <li>サイクリストの聖地</li>
                    <li>秋ヶ瀬公園</li>
                    <li>榎本牧場</li>
                  </ul>
                </dt>
                <dd><p>都心から埼玉へと続く全長80km以上のルート。信号が少なく、快適に走れる人気スポット。埼玉区間では「秋ヶ瀬公園」「榎本牧場」など、サイクリスト向けの休憩スポットが点在。特に榎本牧場は、サイクルラック完備＆ジェラートが絶品で、ライダーの聖地的存在。</p></dd>
              </dl>
            </div>
            <List callback="trivia" containerId="Trivia" />
          </section>

          {/* <!-- Sec02 --> */}
          <section id="Sec02" className="sec-scroll-point content02-section">
            <article className="inview fadeIn_up">
              <h3><span translate="no">Basic Rules of Cycling</span><b>「自転車安全利用五則」</b></h3>
              <figure><img src="./img/trivia_02.jpg" alt="自転車安全利用五則" className="media-cover" /></figure>
              <div className="content-block">
                <p className="leadTxt clearfix">
                  近年、健康志向の高まりや環境への配慮から、自転車の利用が広がりを見せており、通勤や通学、買い物、レジャーなど、日常のさまざまな場面で活用される自転車は、手軽で快適な移動手段として多くの人に親しまれています。<br />
                  「自転車安全利用五則（令和4年改定）」は、自転車利用者が安全に走行するための基本ルールとして、全国的に啓発されています。<br /><br className="pc_none" />
                  自転車を安全に利用するためには、交通ルールを正しく理解し、周囲への配慮を忘れないことが大切です。<br />
                  また、歩行者や車の運転者も自転車の特性を知り、互いに思いやりを持って行動することで、誰もが安心して過ごせる街づくりにつながります。自転車のある暮らしを、より豊かで快適なものにしていきましょう。
                </p>
              </div>

              <div className="content-block">
                <dl className="talk">
                  <dt className="inview_re delay_a">
                    <div className="faceicon icon-a"></div>
                    <b>「自転車安全利用五則」についても教えてください。</b>
                  </dt>
                  <dd className="inview_re delay_b">
                    <div className="faceicon icon-b"></div>
                    <p>
                      よい心がけじゃ！自転車に乗る者ならば、「自転車安全利用五則」は必ず胸に刻んでおかねばならん、大切な原則じゃ。<br />
                      これは、己の身を守るだけでなく、まわりの人々との調和を保つための心得でもあるんじゃよ。<br />
                      心して知り、日々の走りに活かすがよい。それこそが、真の自転車乗りの道じゃ。
                    </p>
                  </dd>
                </dl>
              </div>
            </article>

            <div className="content-block row_list">
              <dl>
                <dt><h4>車道が原則、左側を通行<small>（歩道は例外、歩行者を優先）</small></h4></dt>
                <dd>
                  <p>自転車は軽車両として扱われるため、原則として車道を通行し、必ず左側を走行します。歩道は例外的に通行が認められていますが、歩行者が最優先です。歩道を走る際はスピードを落とし、車道寄りを徐行することが大切です。ルールを守ることで、事故を防ぎ、安全な通行が可能になります。</p>
                  <div className="point_area">
                    <b>POINT</b>
                    <ul className="flexBox">
                      <li>車道が原則、歩道は例外</li>
                      <li>車道では左側を走る</li>
                      <li>歩道では歩行者が優先</li>
                      <li>歩道を走るときはゆっくり車道寄りを走る</li>
                    </ul>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt><h4>交差点では信号と一時停止を守って、安全確認</h4></dt>
                <dd>
                  <p>自転車で交差点を通行する際は、信号を守り、一時停止の標識がある場所では必ず止まりましょう。左右の安全をしっかり確認し、歩行者や車の動きに注意を払うことが大切です。交差点は事故が起こりやすい場所なので、焦らず慎重な行動を心がけ、安全な通行を徹底しましょう。</p>
                  <div className="point_area">
                    <b>POINT</b>
                    <ul className="flexBox">
                      <li>信号を守る</li>
                      <li>一時停止を守る</li>
                      <li>曲がる前・渡る前に左右をよく確認</li>
                      <li>歩行者や車に注意して安全に通行</li>
                    </ul>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt><h4>夜間はライトを点灯</h4></dt>
                <dd>
                  <p>自転車で夜間に走行する際は、必ずライトを点灯しましょう。ライトは前方を照らすだけでなく、自分の存在を周囲に知らせる重要な役割があります。無灯火は交通違反であり、事故の原因にもなります。反射材や明るい服装も効果的です。暗い道でも安全に走るために、ライトの点検と使用を忘れずに。</p>
                  <div className="point_area">
                    <b>POINT</b>
                    <ul className="flexBox">
                      <li>夜はライトを必ず点ける</li>
                      <li>自分の存在を周囲に知らせるため</li>
                      <li>無灯火は違反＆とても危険！</li>
                    </ul>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt><h4>飲酒運転は禁止</h4></dt>
                <dd>
                  <p>自転車でも飲酒運転は法律で禁止されています。お酒を飲むと判断力や注意力が低下し、事故のリスクが高まります。自転車は手軽な乗り物ですが、運転には責任が伴います。飲酒後は絶対に乗らず、代わりの交通手段を利用しましょう。自分の命と他人の安全を守るためにも、飲酒運転は絶対にやめましょう。</p>
                  <div className="point_area">
                    <b>POINT</b>
                    <ul className="flexBox">
                      <li>飲酒運転は禁止</li>
                      <li>お酒を飲んだら自転車に乗らない</li>
                      <li>事故やケガの危険が高まる</li>
                      <li>法律違反になることもある！</li>
                    </ul>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt><h4>ヘルメットを着用</h4></dt>
                <dd>
                  <p>自転車に乗る際は、頭部を守るためにヘルメットを着用しましょう。特に子どもは転倒や事故の際に重傷を負いやすく、ヘルメットの着用が命を守ることにつながります。大人も積極的にかぶることで、安全意識が高まり、周囲への良い影響にもなります。自転車は便利でも油断禁物。ヘルメットで安心をプラスしましょう。</p>
                  <div className="point_area">
                    <b>POINT</b>
                    <ul className="flexBox">
                      <li>自転車に乗るときはヘルメットをかぶる</li>
                      <li>特に子どもは着用がすすめられている</li>
                      <li>頭を守って、命を守る</li>
                      <li>転倒や事故のときに効果大！</li>
                    </ul>
                  </div>
                </dd>
              </dl>
            </div>
          </section>

          {/* <!-- Sec03 --> */}
          <section id="Sec03" className="sec-scroll-point content03-section">
            <article className="inview fadeIn_up">
              <h3><span translate="no">Fun Bike Trivia</span><b>自転車の豆知識集</b></h3>
              <figure><img src="./img/trivia_03.jpg" alt="自転車の豆知識集" className="media-cover" /></figure>
              <div className="content-block">
                <p className="leadTxt clearfix">
                  自転車は、ただの移動手段ではありません。風を切って走る爽快感、健康への効果、環境へのやさしさなど、魅力がたくさん詰まっています。そんな自転車の世界には、知っていると役立つ豆知識が満載。歴史や構造、メンテナンスのコツ、交通ルールまで、ちょっとした知識があなたのサイクリングライフをもっと豊かにしてくれます。
                </p>
              </div>

              <div className="content-block">
                <dl className="talk">
                  <dt className="inview_re delay_a">
                    <div className="faceicon icon-a"></div>
                    <b>もっともっと詳しくなりたいです！他に豆知識などについても教えてください。</b>
                  </dt>
                  <dd className="inview_re delay_b">
                    <div className="faceicon icon-b"></div>
                    <p>
                      ほほう、その向学心、まことに立派じゃ！<br />
                      自転車の道を極めるには、ただ乗るだけでは足りぬ。知って、感じて、深めてこそ、真の楽しみが見えてくるというものじゃ。<br />
                      ではの、ここにいくつか豆知識を授けようぞ。心して聞くがよい！
                    </p>
                  </dd>
                </dl>
              </div>
            </article>

            <div className="content-block">
              <ul className="TriviaNavi flexBox">
                <li><a href="#Trivia01">歴史・文化</a></li>
                <li><a href="#Trivia02">メンテナンス</a></li>
                <li><a href="#Trivia03">安全・マナー・法律</a></li>
                <li><a href="#Trivia04">エンタメ</a></li>
              </ul>
            </div>

            <div className="content-block" id="Trivia">
              <div id="Trivia01" className="row_list">
                <dl>
                  <dt><b>歴史・文化</b></dt>
                  <dd><dl id="Trivia01_list" className="ac">
                    <AccordionList callback="bikeTrivia01" loop={5} />
                  </dl></dd>
                </dl>
              </div>

              <div id="Trivia02" className="row_list">
                <dl>
                  <dt><b>メンテナンス</b></dt>
                  <dd><dl id="Trivia02_list" className="ac">
                    <AccordionList callback="bikeTrivia02" loop={5} />
                  </dl></dd>
                </dl>
              </div>

              <div id="Trivia03" className="row_list">
                <dl>
                  <dt><b>安全・マナー・法律</b></dt>
                  <dd><dl id="Trivia03_list" className="ac">
                    <AccordionList callback="bikeTrivia03" loop={5} />
                  </dl></dd>
                </dl>
              </div>

              <div id="Trivia04" className="row_list">
                <dl>
                  <dt><b>エンタメ</b></dt>
                  <dd><dl id="Trivia04_list" className="ac">
                    <AccordionList callback="bikeTrivia04" loop={5} />
                  </dl></dd>
                </dl>
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