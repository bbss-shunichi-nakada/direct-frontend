# direct-spa-nuxt

このプロジェクトは Nuxt 3 + Tailwind CSS をベースとした SPA（シングルページアプリケーション）です。  
Docker を用いたローカル開発環境が整備されており、VSCode拡張機能やフォーマッターもバックエンドと統一されています。

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

## 🚀 起動方法

1. **Docker環境の起動**

```bash
docker-compose up --build
```

2. ブラウザで下記 URL にアクセス

```
http://localhost:3000
```

---

## 🧪 Thunder Client などでの接続確認

バックエンド側と接続してログイン機能などを確認するには：

- POST `http://localhost:3001/api/login`
- Body (JSON):

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

> ※ バックエンド側が別途起動している必要があります

---

## 💡 推奨 VSCode 拡張機能

`.vscode/extensions.json` に記載済み。自動的にインストールを提案されます。

---

## 🛠 その他

- `WORKDIR` やマウント方式はバックエンドと完全に統一
- `node_modules` はコンテナ内にのみ生成され、ホストには展開されません

---

## 🧼 注意点

- `frontend/README.md` は旧形式のため削除してください（ルートの `README.md` が最新です）