# KH Studio - 受発注管理 PWA

![KH Studio](https://img.shields.io/badge/KH%20Studio-Order%20Management-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![PWA](https://img.shields.io/badge/PWA-Ready-green?style=flat-square)

KH Studioの受発注管理システムをProgressive Web App (PWA)として実装したモダンなウェブアプリケーションです。サイバーパンク調のデザインとスムーズなアニメーションが特徴です。

## ✨ 主な機能

### 🎨 ユーザーインターフェース
- **スプラッシュ画面**: 5秒間のアニメーション付きロゴ表示
- **認証システム**: ログイン/新規登録フォーム
- **ダッシュボード**: 受発注管理のメインインターフェース
- **レスポンシブデザイン**: デスクトップ・モバイル対応

### 🔐 認証機能
- ユーザー名/パスワード認証
- リアルタイムバリデーション（2文字以上/8文字以上）
- エラーメッセージ表示

### 📊 ダッシュボード機能
- **運用管理コンソール**: 受発注リスト表示エリア
- **統計カード**: 保留中の注文、在庫単位、アクティブクライアント数
- **ライブシステムログ**: リアルタイム更新のログ表示
- **ナビゲーションバー**: 設定とログアウト機能

### 🎭 ビジュアル効果
- **星空背景**: 160個の星がアニメーションする背景
- **サイバーパンクデザイン**: 青いアクセントカラー（#00e5ff）
- **スムーズな遷移**: Framer Motionを使用したアニメーション
- **アクセシビリティ対応**: 目に優しいソフトグレー背景

### 📱 PWA機能
- オフライン対応
- インストール可能
- 高速起動
- ネイティブアプリのような操作性

## 🏗️ アーキテクチャ

### 📐 レイヤー図

```
┌─────────────────────────────────────────────────┐
│          Presentation Layer (UI)                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Dashboard  │ Auth  │ Splash  │ Layout  │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│        Business Logic Layer                      │
│  ┌──────────────────────────────────────────┐  │
│  │  State Management  │  Validation Logic   │  │
│  │  Form Handling     │  Authentication     │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│     Technology Layer                            │
│  ┌──────────────────────────────────────────┐  │
│  │  Next.js  │  React  │  TypeScript        │  │
│  │  Tailwind │ Framer Motion                │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│    Infrastructure Layer                         │
│  ┌──────────────────────────────────────────┐  │
│  │  PWA Manifest  │  Service Worker         │  │
│  │  Static Assets │  Cache Storage          │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 🔄 データフロー図

```
User Input
    │
    ↓
┌─────────────────────┐
│   React Component   │ (page.tsx)
│   (State: Auth,     │
│    Dashboard)       │
└─────────────────────┘
    │
    ├─→ Authentication Flow
    │   ├─→ Validate Input
    │   ├─→ Update State
    │   └─→ Navigate to Dashboard
    │
    └─→ Dashboard Flow
        ├─→ Render Statistics Cards
        │   (Pending Orders, Inventory, Active Clients)
        │
        ├─→ Display Order Management Console
        │   └─→ Order List
        │
        └─→ Show Live System Logs
            └─→ Real-time Log Updates
                (Simulated in-memory)

    ↓
Browser Rendering
    │
    ├─→ Tailwind CSS Styling
    ├─→ Framer Motion Animation
    └─→ Responsive Layout

    ↓
PWA Features
    ├─→ Service Worker (Offline)
    ├─→ Cache Storage
    └─→ Installation Capability
```

### 📱 PWA アーキテクチャ図

```
┌──────────────────────────────────────────────────┐
│         PWA (Progressive Web App)                │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │  Next.js 14 Application                 │   │
│  │  ┌───────────────────────────────────┐ │   │
│  │  │  Pages & Components (React 18)    │ │   │
│  │  │  ├─ Splash                        │ │   │
│  │  │  ├─ Auth (Login/Register)         │ │   │
│  │  │  └─ Dashboard                     │ │   │
│  │  └───────────────────────────────────┘ │   │
│  └─────────────────────────────────────────┘   │
│                    ↕                            │
│  ┌─────────────────────────────────────────┐   │
│  │  Next PWA Configuration                 │   │
│  │  ├─ manifest.json (App Metadata)        │   │
│  │  ├─ Service Worker (Offline Support)    │   │
│  │  └─ Icons (Multiple Sizes)              │   │
│  └─────────────────────────────────────────┘   │
│                    ↕                            │
│  ┌─────────────────────────────────────────┐   │
│  │  Browser APIs                           │   │
│  │  ├─ Service Worker API                  │   │
│  │  ├─ Cache API                           │   │
│  │  ├─ IndexedDB                           │   │
│  │  └─ App Shell Model                     │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
├──────────────────────────────────────────────────┤
│  Installation Methods:                          │
│  • Chrome: Install Button (URL bar)             │
│  • Safari: Share → Add to Home Screen           │
│  • Firefox: Install Option                      │
│  • Android: Native Install Prompt               │
├──────────────────────────────────────────────────┤
│  Capabilities:                                  │
│  ✓ Offline Support      ✓ App-like Experience  │
│  ✓ Installable          ✓ Push Notifications   │
│  ✓ Fast Loading         ✓ HTTPS Secure         │
│  ✓ Responsive Design    ✓ Cross Platform       │
└──────────────────────────────────────────────────┘
```

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 14**: Reactフレームワーク
- **React 18**: UIライブラリ
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: ユーティリティファーストCSS

### アニメーション & UI
- **Framer Motion**: スムーズなアニメーション
- **Lucide React**: モダンなアイコンセット

### PWA & ビルド
- **Next PWA**: PWA機能提供
- **PostCSS & Autoprefixer**: CSS処理

### 開発・テスト
- **Playwright**: E2Eテスト
- **ESLint**: コード品質チェック

## 🚀 インストール方法

### 前提条件
- Node.js 18.0 以上
- npm または yarn

### インストール手順

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/your-username/kh-order-pwa.git
   cd kh-order-pwa
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

4. **ブラウザでアクセス**
   ```
   http://localhost:3000
   ```

## 📖 使用方法

### 基本操作
1. **アプリ起動**: スプラッシュ画面が5秒間表示されます
2. **認証**: ユーザー名（2文字以上）とパスワード（8文字以上）を入力
3. **ダッシュボード**: ログイン後に受発注管理画面が表示されます

### 主要画面
- **スプラッシュ**: KH Studioロゴとアニメーション
- **認証**: ログイン/新規登録フォーム
- **ダッシュボード**: 統計情報と管理コンソール

### PWAインストール
1. Chrome/Edgeの場合: アドレスバー右側のインストールアイコン
2. Safariの場合: 共有ボタン → "ホーム画面に追加"
3. Firefoxの場合: インストール可能なサイトとして表示

### スマートフォンでの使用方法

1. アプリをインストール

• ChromeやEdgeの場合：「ホーム画面に追加」ボタンからアプリをインストールします。

• Safariの場合：共有メニューから「ホーム画面に追加」を選択します。

2. アプリを起動

• ホーム画面にインストールされたアイコンをタップして起動します。

3. 操作

• ホーム画面のダッシュボード上で、受発注リストや統計情報を確認できます。

• メニューからアカウント設定やログアウトが行えます。


### PCでの使用方法

1. ブラウザでの利用

• http://localhost:3000 またはデプロイ済みの環境にアクセスします。

2. 操作例

• ログイン後、ダッシュボードで受発注リストの管理や、統計カードによるデータ確認を行ってください。

• サイドメニューから設定変更や追加操作が可能です。

3. インストール（PWAとして）

• ChromeやEdgeでインストールアイコンをクリック。デスクトップにアプリとして追加されます。

## 🧪 テスト方法

### 自動テスト実行
```bash
# E2Eテスト実行
node test.js
```

### テスト内容
- ✅ ページ読み込みテスト
- ✅ スプラッシュ画面表示
- ✅ 自動画面遷移
- ✅ フォーム入力・バリデーション
- ✅ ログイン機能
- ✅ 日本語表示確認
- ✅ 背景色適用確認
- ✅ レスポンシブデザイン

### 手動テスト
```bash
# 開発サーバー起動
npm run dev

# ブラウザで http://localhost:3000 にアクセス
```

## 🏗️ 開発方法

### プロジェクト構造
```
kh-order-pwa/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # メインページ
├── public/                 # 静的ファイル
│   ├── manifest.json      # PWAマニフェスト
│   └── icons/             # PWAアイコン
├── types/                  # TypeScript型定義
├── test.js                 # テストスクリプト
└── next.config.js         # Next.js設定
```

### 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番環境起動
npm run start

# コードチェック
npm run lint
```

### カスタマイズ
- **デザイン変更**: `app/globals.css` と Tailwind設定
- **機能追加**: `app/page.tsx` のコンポーネント編集
- **PWA設定**: `next.config.js` と `public/manifest.json`

## 🚀 デプロイ方法

### Vercel（推奨）
1. **Vercelアカウント作成**
2. **GitHub連携**
3. **プロジェクトインポート**
4. **自動デプロイ**

### Netlify
```bash
# ビルド設定
Build command: npm run build
Publish directory: .next
```

### 手動デプロイ
```bash
# ビルド
npm run build

# 静的ファイル生成（オプション）
npm run export
```

## 📋 システム要件

- **ブラウザ**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **OS**: Windows 10+, macOS 10.15+, Linux, Android, iOS
- **ストレージ**: 50MB以上（PWAキャッシュ用）
- **ネットワーク**: HTTPS必須（PWA対応）

## 🤝 貢献方法

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 ライセンス

このプロジェクトは MIT License の下で公開されています。

## 👨‍💻 開発者

**KH Studio Team**
- プロジェクト: 受発注管理 PWA
- バージョン: 0.1.0
- 最終更新: 2026年4月6日

## 📞 サポート

ご質問やフィードバックは以下の方法でお問い合わせください：
- GitHub Issues
- Email: support@khstudio.com

---

**KH Studio** - AI & App Engineering 🚀
