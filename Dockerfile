# ベースイメージ
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# 開発サーバー起動をデフォルトコマンドに設定
CMD ["npm", "run", "dev"]
