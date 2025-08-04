# direct-spa-nuxt

このプロジェクトは Nuxt 3 + Tailwind CSS をベースとした SPA（シングルページアプリケーション）です。  
AWS EC2 上でも開発・運用できるように整備されています。VSCode 拡張機能やフォーマッターもバックエンドと統一されています。

---

## 📦 構成

```
direct-spa-nuxt/
├── frontend/           # Nuxt アプリケーション本体
├── .vscode/            # エディタ設定（共通化）
├── .prettierrc         # Prettier 設定（JSON形式）
├── docker-compose.yml  # 開発用 Docker コンポーズファイル
```

---

## 🚀 起動方法（EC2 上での開発・運用）

### 1. 依存パッケージのインストール

```bash
cd /home/ec2-user/direct-spa-nuxt
npm install
```

---

### 2. 環境変数ファイル（.env）の確認・作成

- 必要に応じて `.env` ファイルを作成し、API エンドポイントなどを設定してください。

---

### 3. 開発サーバーの起動・管理（pm2 利用）

```bash
# pm2が未インストールの場合
npm install -g pm2

# Nuxt開発サーバー起動（ポート例: 3000）
pm2 start npm --name "direct-frontend-dev" -- run dev

# サーバー再起動
pm2 restart direct-frontend-dev

# サーバー停止
pm2 stop direct-frontend-dev

# pm2プロセス一覧
pm2 ls

# EC2再起動時も自動起動する設定
pm2 startup
pm2 save
```

---

### 4. 本番ビルド・本番サーバー起動（必要に応じて）

```bash
# ビルド
npm run build

# 本番サーバー起動（pm2管理）
pm2 start npm --name "direct-nuxt-prod" -- run start
```

---

### 5. アクセス方法

- ブラウザで `http://<EC2のパブリックIP>:3000` にアクセス
- セキュリティグループで 3000 番ポートのインバウンド許可が必要です

---

## 🧪 API 接続確認方法

Thunder Client などの VSCode 拡張はリモート環境では利用できません。  
**curl** や **Postman**、または **REST Client 拡張** などを利用して API の動作確認を行ってください。

例: curl でログイン API をテスト

```bash
curl -X POST http://<EC2のパブリックIP>:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

> ※ バックエンド側が別途起動している必要があります

---

## 💡 推奨 VSCode 拡張機能

`.vscode/extensions.json` に記載済み。自動的にインストールを提案されます。

---

## 🛠 その他

- `WORKDIR` やマウント方式はバックエンドと完全に統一
- `node_modules` はコンテナ内または EC2 上にのみ生成され、ホストには展開されません

---

## 🧼 注意点

- `frontend/README.md` は旧形式のため削除してください（ルートの `README.md` が最新です）

---

## 🔧 よくあるトラブル

| 症状                     | 対応                                      |
| ------------------------ | ----------------------------------------- |
| サーバーが起動しない     | pm2 のログや`npm install`の実行を確認     |
| ポートにアクセスできない | セキュリティグループの設定を確認          |
| .env が反映されない      | サーバー再起動、.env ファイルのパスを確認 |

---

何か問題があればお気軽にご相談
