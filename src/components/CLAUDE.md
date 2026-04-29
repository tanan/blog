# `src/components` 実装ルール

このディレクトリは UI コンポーネントを配置する場所です。再利用可能な「見た目と振る舞いの単位」を置き、ドメイン知識（ユーザー、記事、カテゴリ等）からは独立させます。

## ディレクトリ構成

1 コンポーネント = 1 フォルダ。ファイルを役割ごとに分割します。

```
src/components/
└── <ComponentName>/
    ├── index.tsx           # コンポーネント本体（export 入口）
    ├── type.tsx            # Props / 関連型定義
    ├── hooks.ts            # ロジック（state, effect, イベントハンドラ）
    └── index.stories.tsx   # Storybook ストーリー
```

### 各ファイルの責務

| ファイル | 役割 | 備考 |
| --- | --- | --- |
| `index.tsx` | JSX とレイアウト、`type.tsx` の Props を受け取り `hooks.ts` のロジックを利用して描画する | ロジックは持たず「見た目」に専念。default export ではなく **named export** を使う |
| `type.tsx` | コンポーネントの Props 型、内部で扱うドメイン非依存な型 | `export type Props = { ... }` を基本形に。React の型（`ReactNode` 等）が必要なため拡張子は `.tsx` |
| `hooks.ts` | `useState` / `useEffect` / 派生値計算 / イベントハンドラ等のロジック | `useXxx` の命名規則に従う。1 ファイルに複数フックを置いてよい |
| `index.stories.tsx` | Storybook の Story 定義 | バリエーション（default / loading / error / disabled 等）を網羅する |

## 命名規則

- **コンポーネント名・フォルダ名はドメイン非依存**にする。
  - ✅ `Card`, `List`, `Avatar`, `Badge`, `Modal`, `TagChip`
  - ❌ `ArticleCard`, `UserAvatar`, `CategoryBadge`
- ドメインに紐づく組み合わせは `src/components` ではなく、ページ側（`src/routes/...`）または別途用意するドメイン層で合成する。
- フォルダ名・コンポーネント名は **PascalCase**。
- フックは **camelCase** で `use` から始める（例: `useDisclosure`）。
- Props 型は `Props` を基本とし、外部公開時は `<ComponentName>Props` として再 export してもよい。

## 実装方針

- **見た目とロジックの分離**: `index.tsx` は受け取った props と `hooks.ts` の戻り値を JSX に流し込むだけ。条件分岐や副作用は `hooks.ts` に寄せる。
- **副作用は最小限**: ネットワーク取得や永続化は components 層では行わない。呼び出し側から関数や値として受け取る。
- **スタイル**: 現時点で UI フレームワークは未導入。導入時はこのドキュメントを更新する。
- **アクセシビリティ**: ボタンや入力には適切な要素・`aria-*` を付け、Story にもキーボード操作可能な状態を含める。

## ファイルテンプレート

### `type.tsx`

```tsx
import type { ReactNode } from "react";

export type Props = {
	children: ReactNode;
};
```

### `hooks.ts`

```ts
import { useState } from "react";

export function useDisclosure(initial = false) {
	const [open, setOpen] = useState(initial);
	return {
		open,
		toggle: () => setOpen((v) => !v),
		close: () => setOpen(false),
	};
}
```

### `index.tsx`

```tsx
import type { Props } from "./type";

export function ComponentName({ children }: Props) {
	return <div>{children}</div>;
}
```

### `index.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./index";

const meta: Meta<typeof ComponentName> = {
	title: "Components/ComponentName",
	component: ComponentName,
};

export default meta;

type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
	args: {
		children: "content",
	},
};
```

## Storybook について

- バージョン: `storybook` / `@storybook/react-vite` v10（`devDependencies` に追加済み）
- 設定ファイル: `/.storybook/main.ts`（stories パターン・framework 設定・`viteFinal` で `tanstack*` プラグインを除外）, `/.storybook/preview.ts`（グローバルパラメータ）
- 対象パターン: `src/components/**/*.stories.@(ts|tsx)`
- 起動: `bun run storybook`（http://localhost:6006）
- 静的ビルド: `bun run build-storybook`
- TanStack Start プラグインは Storybook の Vite ビルドに不要なため `viteFinal` 内で除外している。新しい Vite プラグインを `vite.config.ts` に追加する際、Storybook 側にも必要なものは `viteFinal` の除外条件を見直すこと。

## 追加・変更時のチェックリスト

- [ ] フォルダ名・コンポーネント名がドメイン非依存
- [ ] `index.tsx` / `type.tsx` / `hooks.ts` / `index.stories.tsx` の 4 ファイルが揃っている（不要な場合は理由を PR/コミットメッセージに残す）
- [ ] `index.tsx` にロジックが漏れていない
- [ ] Story に主要バリエーションが含まれている
- [ ] `bun run check` が通る
