# Architecture

## 概要

Gozoku は Vue 3 + Vite で構築された静的サイトです。茨城県最強の男たちを紹介するウェブサイトで、GitHub Pages にデプロイされています。

## 技術スタック

| カテゴリ | ライブラリ・ツール |
|---|---|
| フレームワーク | Vue 3 |
| UIコンポーネント | Vuetify 4 |
| ルーティング | Vue Router 5 |
| 地図 | Leaflet 2 + @maxel01/vue-leaflet |
| アイコン | Font Awesome 7 |
| ビルドツール | Vite 8 |
| 言語 | TypeScript |
| スタイル | SCSS (Sass) |
| パッケージマネージャ | pnpm |

## ディレクトリ構成

```
gozoku/
├── src/
│   ├── App.vue               # ルートコンポーネント
│   ├── main.ts               # アプリエントリーポイント
│   ├── assets/
│   │   ├── public/           # 静的アセット (favicon, logo, 404.html)
│   │   ├── styles.scss       # グローバルスタイル
│   │   └── year/             # 年別アーカイブデータ
│   │       ├── 2022/summer/  # 2022年夏大会アーカイブ
│   │       ├── 2022/winter/  # 2022年冬大会アーカイブ
│   │       └── 2026/spring/  # 2026年春大会アーカイブ
│   ├── components/
│   │   ├── BackgroundElements.vue  # 背景装飾
│   │   ├── ClanBadge.vue           # クランバッジ
│   │   ├── PageFooter.vue          # フッター
│   │   ├── PageHeader.vue          # ヘッダー
│   │   └── Toolbar.vue             # ナビゲーションツールバー
│   ├── libraries/
│   │   ├── leaflet.ts        # Leaflet 初期化・設定
│   │   ├── router.ts         # Vue Router 設定
│   │   ├── useAudioPlayer.ts # オーディオプレーヤー Composable
│   │   └── vuetify.ts        # Vuetify 初期化・設定
│   ├── types/
│   │   ├── AudioPlayerResource.ts  # オーディオリソース型定義
│   │   ├── Library.ts              # ライブラリ型定義
│   │   ├── Member.ts               # メンバー型定義
│   │   ├── RouterLink.ts           # ルーターリンク型定義
│   │   └── Schedule.ts             # スケジュール型定義
│   └── views/
│       ├── Home.vue          # ホーム画面
│       ├── Library.vue       # ライブラリ画面
│       ├── NotFound.vue      # 404画面
│       └── Schedule.vue      # スケジュール画面
├── docs/
│   └── architecture.md       # 本ドキュメント
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot 設定
├── Dockerfile                # Docker イメージ定義
├── index.html                # HTMLエントリーポイント
├── vite.config.ts            # Vite 設定
├── tsconfig.json             # TypeScript 設定
└── package.json              # パッケージ定義
```

## ルーティング

| パス | ビュー | 説明 |
|---|---|---|
| `/` | Home.vue | ホーム画面 |
| `/schedule` | Schedule.vue | スケジュール画面 |
| `/library` | Library.vue | ライブラリ画面 |
| `/*` | NotFound.vue | 404画面 |

ベースパスは `/gozoku/` で、GitHub Pages のリポジトリ名に対応しています。

## ビルド・デプロイ

```
pnpm run build
```

- 出力先: `build/` ディレクトリ
- ベースURL: `/gozoku/`
- チャンクファイル: `vendor.[hash].js`

### Docker

```sh
docker run -p 8888:80 --rm ghcr.io/aecomet/gozoku
```
