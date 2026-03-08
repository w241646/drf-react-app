# Node.js の公式イメージ（軽量版）
FROM node:18-alpine

# 作業ディレクトリ
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクト全体をコピー
COPY . .

# Vite の本番ビルド
RUN npm run build

# nginx で配信するために dist を出力するだけ
# （このイメージはビルド専用）
# サーバー機能(serve)をインストールして、3000番ポートで配信開始！
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
