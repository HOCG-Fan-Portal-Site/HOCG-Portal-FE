# HOCG カード検索システム フロントエンド

HOCGカード検索システムのフロントエンドプロジェクトです。最新のWeb技術を使用して開発されています。

## 技術スタック

- React 18
- TypeScript
- Material-UI (MUI)
- React Router
- Axios
- Vite

## 始め方

### 必要環境

- Node.js 18.0以上
- npmまたはyarnパッケージマネージャー

### インストール手順

1. リポジトリのクローン
```bash
git clone [your-repository-url]
cd hocg-portal-fe
```

2. 依存関係のインストール
```bash
npm install
# または
yarn install
```

3. 開発サーバーの起動
```bash
npm run dev
# または
yarn dev
```

4. プロダクションビルド
```bash
npm run build
# または
yarn build
```

## プロジェクト構造

```
hocg-portal-fe/
├── src/
│   ├── components/     # 再利用可能なコンポーネント
│   ├── pages/         # ページコンポーネント
│   ├── types/         # TypeScript型定義
│   ├── services/      # APIサービス
│   └── utils/         # ユーティリティ関数
├── public/            # 静的リソース
└── dist/             # ビルド出力ディレクトリ
```

## 主な機能

- カード情報の検索
- カード詳細情報の表示
- レスポンシブデザイン

## 開発ガイド

- `npm run lint` でコード品質チェック
- `npm run preview` でプロダクションビルドのプレビュー

## コントリビューション

Pull RequestやIssueの作成を歓迎します。

## ライセンス

[ライセンス情報]
