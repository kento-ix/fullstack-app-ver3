# ベースイメージとしてNode.jsを使用
FROM node:18-alpine

# アプリケーションの作業ディレクトリを指定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json yarn.lock* package-lock.json* ./

# 依存関係をインストール
RUN yarn install --frozen-lockfile

# ソースコードをコピー
COPY . .

# Reactアプリケーションをビルド
RUN yarn build

# コンテナが起動するポートを指定
EXPOSE 3000

# アプリケーションを起動
CMD ["yarn", "start"]
