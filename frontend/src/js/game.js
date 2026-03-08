// JavaScript Document

async function saveScoreToServer(finalScore) {
  try {
    if (window.addScoreToServer) {
      await window.addScoreToServer({ score: finalScore });
    }
  } catch (err) {
    console.error("[DEBUG] スコア保存に失敗:", err);
  }
}

// async function saveScoreToServer(finalScore) {
//   const token = localStorage.getItem("access");
//   console.log("[DEBUG] access token:", token);

//   try {
//     const res = await fetch("http://localhost:8000/api/scores/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": token ? "Bearer " + token : ""
//       },
//       body: JSON.stringify({ score: finalScore })
//     });

//     console.log("[DEBUG] /api/scores/ status:", res.status);

//     const text = await res.text();
//     console.log("[DEBUG] /api/scores/ response body:", text);

//   } catch (err) {
//     console.error("[DEBUG] スコア保存リクエスト自体が失敗:", err);
//   }
// }

// async function saveScoreToServer(finalScore) {
//   try {
//     await fetch("/api/scores/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("access")
//       },
//       body: JSON.stringify({ score: finalScore })
//     });
//   } catch (err) {
//     console.error("スコア保存に失敗:", err);
//   }
// }

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 画像読み込み
const useImages = true; // ← true にすると画像表示に切り替わる

const bicycleImg = new Image();
bicycleImg.src = "./img/game_bicycle.png";
const bgImg = new Image();
bgImg.src = "./img/game_background.png";

const itemImages = {
  negi: new Image(),
  senbei: new Image(),
  washi: new Image(),
  manju: new Image(),
  bonsai: new Image(),
  bomb: new Image(),
  medkit: new Image(),
  clock: new Image()
};
itemImages.negi.src = "./img/game_negi.png";
itemImages.senbei.src = "./img/game_senbei.png";
itemImages.washi.src = "./img/game_washi.png";
itemImages.manju.src = "./img/game_manju.png";
itemImages.bonsai.src = "./img/game_bonsai.png";
itemImages.bomb.src = "./img/game_bomb.png";
itemImages.medkit.src = "./img/game_medkit.png";
itemImages.clock.src = "./img/game_hourglass.png";

// ゲーム設定
const timeLimit = 30;
let timeLeft = timeLimit;
let timerInterval;
let gameStarted = false;
let score = 0;
let topScores = JSON.parse(localStorage.getItem("topScores")) || [];
let highScore = localStorage.getItem("highScore") || 0;
let bombCount = 0;
const maxBombs = 5;
let life = 5;
let damageFlash = false;
let flashTimer = 0;
let lastTime = performance.now();
let bgY = 0;
let bgSpeed = 350; // 背景・アイテムスピード
const itemMarginWidth = 15;

// スコアの設定
let useClearScore = false; 
let clearScore = 500;

// プレイヤー設定
let bicycle = {
  x: 180,
  y: canvas.height - 60,
  width: 40,
  height: 40,
  speed: 5,
};

// アイテム設定
const itemTypes = {
  negi: { color: "green", score: 10 },
  senbei: { color: "yellow", score: 20 },
  washi: { color: "white", score: 30 },
  manju: { color: "brown", score: 40 },
  bonsai: { color: "gold", score: 50 },
  bomb: { color: "red", score: -15 },
  medkit: { color: "pink", score: 0, heal: 1 },
  clock: { color: "cyan", score: 0, timeBoost: 10 },
};

const itemWeights = {
  negi: 2,
  senbei: 2,
  washi: 2,
  manju: 1,
  bonsai: 0.9,
  bomb: 17,
  medkit: 0.8,
  clock: 0.8,
};

function getRandomItemType() {
  const pool = [];
  for (let type in itemWeights) {
    const count = Math.floor(itemWeights[type] * 10);
    for (let i = 0; i < count; i++) {
      pool.push(type);
    }
  }
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

let items = Array.from({ length: 5 }, () => ({
  x: itemMarginWidth + Math.random() * (canvas.width - 30 - itemMarginWidth * 2),
  y: Math.random() * -600,
  type: getRandomItemType()
}));

let keys = {};
let scorePopups = [];

// ゲーム開始
document.getElementById("startButton").addEventListener("click", () => {
  startGame();
});

// ゲーム再開
document.getElementById("restartButton").addEventListener("click", () => {
  resetGame();
  startGame();
});

// タッチ操作
canvas.addEventListener("touchstart", handleTouch);
canvas.addEventListener("touchmove", handleTouch);

function handleTouch(e) {
  if (!gameStarted) return;
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  const moveMargin = 15;
  let newX = touchX - bicycle.width / 2;
  bicycle.x = Math.max(moveMargin, Math.min(canvas.width - bicycle.width - moveMargin, newX));
  e.preventDefault();
}

// キーボード操作
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// HUD描画
function drawHUD() {
  // タイマー表示
  ctx.fillStyle = "black";
  ctx.font = "20px sans-serif";
  ctx.fillText("Time: " + timeLeft + "s", canvas.width - 120, 30);

  // スコア表示
  ctx.fillText("Score: " + score, 10, 30);
  ctx.font = "16px sans-serif";
  ctx.fillText("High Score: " + highScore, 10, 60);

  // ライフ表示（ハートアイコン）
  for (let i = 0; i < life; i++) {
    const x = canvas.width - 140 + i * 30;
    const y = 50;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.arc(x - 5, y, 5, Math.PI, 0, false);
    ctx.arc(x + 5, y, 5, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();
  }

  // TOP3のスコア表示
/*
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText("Top Scores:", 10, 90);
  topScores.slice(0, 3).forEach((entry, i) => {
    const name = entry.name || "名無し";
    const score = entry.score ?? 0;
    ctx.fillText(`${i + 1}. 🧑 ${name} - ⭐ ${score}`, 10, 110 + i * 20);
  });
*/
}

// ゲーム背景スクロール
function drawBackground(deltaTime) {
  const scrollSpeed = bgSpeed;
  bgY += scrollSpeed * deltaTime;
  bgY %= canvas.height;

  // 2枚分描画してループさせる
  ctx.drawImage(bgImg, 0, bgY - canvas.height, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, bgY, canvas.width, canvas.height);
}

// ゲームループ
function gameLoop(currentTime) {
  if (!gameStarted) return;

  const deltaTime = (currentTime - lastTime) / 1000; // 秒単位
  lastTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

   // 背景描画をここに追加
  drawBackground(deltaTime);

  // 自機描画（ダメージ時は赤く点滅）
  if (useImages) {
    ctx.drawImage(bicycleImg, bicycle.x, bicycle.y, bicycle.width, bicycle.height);
  } else {
    if (damageFlash && flashTimer > 0) {
      ctx.fillStyle = "red";
      flashTimer--;
      if (flashTimer === 0) damageFlash = false;
    } else {
      ctx.fillStyle = "blue";
    }
    ctx.fillRect(bicycle.x, bicycle.y, bicycle.width, bicycle.height);
  }

  // 自転車移動
  const moveSpeed = bicycle.speed * 60; // bicycle.speed は「フレームベース」なので60FPS換算
  const moveMargin = 15;
  if (keys["ArrowLeft"]) bicycle.x = Math.max(moveMargin, bicycle.x - moveSpeed * deltaTime);
  if (keys["ArrowRight"]) bicycle.x = Math.min(canvas.width - bicycle.width - moveMargin, bicycle.x + moveSpeed * deltaTime);

  // アイテム処理
  const itemSpeed = bgSpeed;
  items.forEach(item => {
    item.y += itemSpeed * deltaTime;

    if (useImages) {
      const img = itemImages[item.type];
      if (img.complete) {
        ctx.drawImage(img, item.x, item.y, 30, 30);
      } else {
        // 読み込み前は色で代用
        ctx.fillStyle = itemTypes[item.type].color;
        ctx.fillRect(item.x, item.y, 30, 30);
      }
    } else {
      ctx.fillStyle = itemTypes[item.type].color;
      ctx.fillRect(item.x, item.y, 30, 30);
    }

    // 衝突判定
    if (
      bicycle.x < item.x + 30 &&
      bicycle.x + bicycle.width > item.x &&
      bicycle.y < item.y + 30 &&
      bicycle.y + bicycle.height > item.y
    ) {
      score += itemTypes[item.type].score;

      const itemScore = itemTypes[item.type].score;
      score += itemScore;

      // 0点と爆弾以外のときだけ黒ポップアップを表示
      if (itemScore !== 0 && item.type !== "bomb") {
        // 通常得点ポップアップ（黒）
        scorePopups.push({
          x: item.x,
          y: item.y,
          text: (itemScore >= 0 ? "+" : "") + itemScore,
          alpha: 1.0,
          color: "black"
        });
      }

      // スコア保持
/*
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
*/

      // 爆弾処理
      if (item.type === "bomb") {
        bombCount++;
        life--;
        damageFlash = true;
        flashTimer = 10;

        // 爆弾ポップアップ（濃い赤）
        scorePopups.push({
          x: item.x,
          y: item.y,
          text: "-15💔",
          alpha: 1.0,
          color: "darkred"
        });

        if (life <= 0) {
          endGame("Game Over !");
          return;
        }
      }

      // 回復処理（ポップアップ（赤））
      if (item.type === "medkit") {
        if (life < 5) {
          life++;
          scorePopups.push({
            x: item.x,
            y: item.y,
            text: "+1❤️",
            alpha: 1.0,
            color: "red"
          });
        } else {
          // ライフ満タンでもポップアップ表示（灰色などで）
          scorePopups.push({
            x: item.x,
            y: item.y,
            text: "❤️MAX",
            alpha: 1.0,
            color: "gray"
          });
        }
      }

      // 時間追加処理（ポップアップ（青））
      if (item.type === "clock") {
        timeLeft += itemTypes[item.type].timeBoost;
        scorePopups.push({
          x: item.x,
          y: item.y,
          text: "+" + itemTypes[item.type].timeBoost + "s⏳",
          alpha: 1.0,
          color: "blue"
        });
      }

      // アイテム再生成
      const newType = getRandomItemType();
      item.y = -40;
      item.x = Math.random() * (canvas.width - 30 - itemMarginWidth * 2);
      item.type = newType;
    }

    // 画面外に出たら再生成
    if (item.y > canvas.height) {
      resetItem(item);
    }
  });

  // 得点ポップアップ描画
  scorePopups.forEach(popup => {
    ctx.fillStyle = `rgba(${getRGB(popup.color)}, ${popup.alpha})`;
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(popup.text, popup.x, popup.y);
    popup.y -= 1;
    popup.alpha -= 0.02;
  });

  // 消えたポップアップを削除
  scorePopups = scorePopups.filter(p => p.alpha > 0);

   // 最後にHUDを描画（最前面に表示される）
  drawHUD();

  // クリア判定
  if (useClearScore && score >= clearScore) {
    endGame("Congratulations!");
    return;
  }

  requestAnimationFrame(gameLoop);
}

// 色名 → RGB変換関数
function getRGB(colorName) {
  const colors = {
    black: "0,0,0",
    red: "255,0,0",
    blue: "0,0,255",
    darkred: "139,0,0",
    gray: "128,128,128",
  };
  return colors[colorName] || "0,0,0";
}

// アイテム再生成
function resetItem(item) {
  item.y = -40;
  item.x = itemMarginWidth + Math.random() * (canvas.width - 30 - itemMarginWidth * 2);
  item.type = getRandomItemType();
}

// TOP3更新関数
function updateTopScores(newScore, playerName) {
  topScores.push({
    name: playerName || "名無し",
    score: newScore || 0,
  });
  topScores.sort((a, b) => b.score - a.score);
  topScores.slice(3);
  localStorage.setItem("topScores", JSON.stringify(topScores));

  console.log("保存されるTOPスコア:", topScores);
}

// TOP3表示処理関数
function displayTopScores() {
  const list = document.getElementById("topScoresList");
  list.innerHTML = "";

  topScores.slice(0, 3).forEach((entry, index) => {
    const name = entry.name || "名無し";
    const score = (entry.score ?? 0).toLocaleString();
    const li = document.createElement("li");
    li.classList.add("flexBox", "ranking-item");
    li.innerHTML = `
      <span class="rank">${index + 1}.</span>
      <span class="name">${name}</span>
      <span class="score">${score}</span>
    `;
    list.appendChild(li);
  });
}

// ゲーム開始処理
function startGame() {
  gameStarted = true;
  score = 0;
  bombCount = 0;
  timeLeft = timeLimit;
  lastTime = performance.now();
  document.getElementById("startButton").style.display = "none";
  document.getElementById("restartButton").style.display = "none";
  resizeCanvas();
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame("Time's up !");
    }
  }, 1000);
  requestAnimationFrame(gameLoop);
}

// ゲームリセット処理
function resetGame() {
  score = 0;
  bombCount = 0;
  bicycle.x = 180;
  life = 5;
  items = Array.from({ length: 5 }, () => ({
    x: Math.random() * (canvas.width - 30),
    y: Math.random() * -600,
    type: getRandomItemType()
  }));
}

// ゲーム終了処理
function endGame(message) {
  gameStarted = false;
  clearInterval(timerInterval);

  // サーバーにスコア送信（React 側サービス経由）
  saveScoreToServer(score);

  const playerName = document.getElementById("playerName").value.trim();

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }

  updateTopScores(score, playerName);
  displayTopScores();

  ctx.fillStyle = "black";
  ctx.font = "bold 30px sans-serif";
  const textWidth = ctx.measureText(message).width;
  const x = (canvas.width - textWidth) / 2;
  const y = canvas.height / 2;
  ctx.fillText(message, x, y);

  // React 側 RankingPage に再読み込みを依頼
  if (window.refreshRanking) {
    window.refreshRanking();
  }
  document.getElementById("restartButton").style.display = "block";
}

// キャンバスサイズ調整
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  bicycle.x = (canvas.width - bicycle.width) / 2;
  bicycle.y = canvas.height - bicycle.height - 60;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
displayTopScores();