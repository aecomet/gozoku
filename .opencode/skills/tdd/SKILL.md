---
name: tdd
description: gozoku の TDD 実装ワークフロー。テストを先に書き、最小限のコードで通過させ、リファクタリングするサイクルを厳守する。
---

# TDD for gozoku

## 基本サイクル

1. **RED**: 失敗するテストを書く。テストだけが仕様である。
2. **GREEN**: テストを通す最小限のコードを書く。汎用性や美しさは不要。
3. **REFACTOR**: テストが通っている状態を維持しながらコードを改善する。

## プロジェクト概要

Vue 3 + Leaflet 製マップアプリ。茨城県の最強の男「Gozoku」に関する情報を発信。

```
src/
├── main.ts                 # アプリケーションエントリ
├── App.vue                 # ルートコンポーネント
├── assets/
│   ├── audio/              # BGM, SE
│   ├── public/             # ファビコン・OGP画像
│   ├── styles.scss         # グローバルスタイル
│   └── year/               # 年別アーカイブ
├── components/             # 共通コンポーネント
│   ├── BackgroundElements.vue
│   ├── ClanBadge.vue
│   ├── PageFooter.vue
│   ├── PageHeader.vue
│   └── Toolbar.vue
├── libraries/              # ユーティリティ・プラグイン設定
│   ├── leaflet.ts          # Leaflet マップ設定
│   ├── router.ts           # Vue Router 設定
│   └── useAudioPlayer.ts   # オーディオ再生 composable
├── types/                  # TypeScript 型定義
│   ├── AudioPlayerResource.ts
│   ├── Library.ts
│   ├── Member.ts
│   └── Schedule.ts
└── views/                  # ルートページ
    ├── Home.vue
    ├── Library.vue
    ├── NotFound.vue
    └── Schedule.vue
```

## 技術スタック

| カテゴリ       | ツール                                                     |
| -------------- | ---------------------------------------------------------- |
| フレームワーク | Vue 3 (Composition API, `<script setup>`)                  |
| マップ         | Leaflet 2 + `@maxel01/vue-leaflet`                         |
| ルーティング   | Vue Router 5                                               |
| ビルド         | Vite 8 + vite-ssg 28                                       |
| 言語           | TypeScript 6 (strict)                                      |
| パスエイリアス | `@/*` → `./src/*`                                          |
| スタイル       | SCSS (Sass, modern-compiler)                               |
| フォーマッター | Prettier 3 (printWidth 120, singleQuote, no trailingComma) |
| Git hooks      | Lefthook 2 (pre-commit: format check)                      |
| コミット       | Conventional Commits                                       |
| CI/CD          | GitHub Actions (build → Pages deploy → Docker)             |
| パッケージ管理 | pnpm                                                       |

## テスト環境（推奨セットアップ）

テストフレームワーク未導入のため、以下のセットアップを推奨：

```sh
pnpm add -D vitest @vue/test-utils happy-dom
```

### vitest 設定例（`vitest.config.ts`）

```ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  test: {
    environment: 'happy-dom',
    globals: true
  }
});
```

### npm scripts 追加例

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

## テスト配置

```
__tests__/
├── unit/                     # 単位テスト
│   ├── components/           # コンポーネントのテスト
│   │   ├── ClanBadge.test.ts
│   │   └── PageHeader.test.ts
│   └── libraries/            # ユーティリティのテスト
│       ├── useAudioPlayer.test.ts
│       └── leaflet.test.ts
├── integration/              # 統合テスト（画面遷移・マップ相互作用）
└── vitest.config.ts          # Vitest 設定
```

## テスト記法

- `describe` / `test` / `expect`（vitest, globals: true）
- `vi.fn()` でモック、`vi.spyOn()` でスパイ
- `@/...` alias で import（`import { foo } from '@/components/...'`）
- 1テスト = 1アサーションが理想。複数アサーションする場合はテスト名に理由を明記
- `.test.ts` 拡張子で記述
- ESLint 未導入のため、Prettier のフォーマットのみ遵守する

## テストパターン

### Vue コンポーネントのレンダリングテスト

```ts
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PageHeader from '@/components/PageHeader.vue';

describe('PageHeader', () => {
  test('renders app title', () => {
    const wrapper = mount(PageHeader);
    expect(wrapper.text()).toContain('Gozoku');
  });
});
```

### Vue Router を含むテスト

```ts
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/libraries/router';
import Home from '@/views/Home.vue';

describe('Home', () => {
  test('renders home page title', async () => {
    const router = createRouter({ history: createWebHistory(), routes });
    router.push('/');
    await router.isReady();

    const wrapper = mount(Home, {
      global: { plugins: [router] }
    });
    expect(wrapper.find('h1').exists()).toBe(true);
  });
});
```

### Leaflet コンポーネントを含むテスト

Leaflet はブラウザ API（`document`, `window`）に依存するため、`happy-dom` では不完全な場合がある。その場合は `jsdom` の使用を検討するか、Leaflet の初期化処理をモックする。

```ts
import { describe, expect, test, vi } from 'vitest';

// Leaflet ライブラリのモック例
vi.mock('leaflet', () => ({
  map: vi.fn(() => ({ setView: vi.fn(), remove: vi.fn() })),
  tileLayer: vi.fn(() => ({ addTo: vi.fn() }))
}));

describe('leaflet utilities', () => {
  test('initializes map with correct center', () => {
    const L = require('leaflet');
    const initMap = () => L.map('map').setView([36.34, 140.45], 10);
    initMap();
    expect(L.map).toHaveBeenCalledWith('map');
  });
});
```

### Composable のテスト（useAudioPlayer）

```ts
import { describe, expect, test } from 'vitest';

describe('useAudioPlayer', () => {
  test('starts paused', () => {
    const { isPlaying } = useAudioPlayer();
    expect(isPlaying.value).toBe(false);
  });
});
```

## 実装のルール

- GREEN フェーズでは **テストが通る最小限** を書く。余計なロジックを追加しない。
- REFACTOR フェーズでのみ、重複の除去・命名の改善・抽象化を行う。
- 一度に複数のテストを書かない。1テスト → 1実装 → リファクタリング のサイクルを守る。
- 全てのテストが常に GREEN である状態を保つ。
- Composition API + `<script setup>` をデフォルトとする。
- Leaflet を用いるテストは、ブラウザ API 依存をモックして分離する。
- コンポーネントのスタイル検証より、振る舞いの検証を優先する。

## コミットメッセージ

プロジェクトの規約に従い Conventional Commits を使用する。

```
test(component): add PageHeader render test
feat(component): implement PageHeader with navigation
refactor(component): split Toolbar into sub-components
```

## プッシュ前の自己同期

`git push` する前に、この SKILL.md 自身とドキュメント群を最新のコードベースに合わせて更新する。

### 同期チェックリスト

1. **SKILL.md のプロジェクト構成を実物と照合**
   - `src/` 以下の実際のファイル一覧と「プロジェクト概要」セクションが一致しているか確認
   - 追加・削除・移動があれば更新する

2. **テストパターンを実装と照合**
   - 新しいコンポーネントや機能が増えていればサンプルコードを追加
   - 使われていない型や関数のパターンは削除

3. **プロジェクトドキュメントを更新**
   - `docs/architecture.md` — ディレクトリ構造・API・ビルド設定が実態に合っているか
   - `README.md` — セットアップ手順や特徴が最新か
   - `.github/copilot-instructions.md` — コーディング規約が最新か

4. **テスト・ビルドの通過確認**

   ```sh
   pnpm test
   pnpm build
   ```

5. **この SKILL.md 自身も更新内容を反映する**
   （`.opencode/skills/tdd/SKILL.md` に配置。プロジェクトと一緒にコミットされる）
