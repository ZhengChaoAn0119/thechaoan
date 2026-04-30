# thechaoan — 個人品牌網站

個人作品集與技術部落格，以 Next.js App Router 建構，支援繁體中文與英文雙語，部署於 Google Cloud Run。

---

## 技術架構

| 類別 | 技術 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 前端 | React 19、Tailwind CSS v4、Lucide React |
| 內容管理 | Contentlayer2、Markdown (.md) |
| 語法高亮 | rehype-pretty-code + Shiki (one-dark-pro 主題) |
| 國際化 | 自製 i18n（繁體中文 / English） |
| 套件管理 | pnpm |
| 容器化 | Docker (multi-stage build) |
| CI/CD | Google Cloud Build |
| 雲端部署 | Google Cloud Run（asia-east1）|
| 內容儲存 | Google Cloud Storage (`thechaoan-md-bucket`) |

---

## 功能特色

- **雙語支援**：繁體中文（預設）與英文，路由以 `[locale]` 分段切換
- **部落格**：Markdown 文章由 GCS 同步至建置環境，支援 Obsidian wiki 圖片語法（`![[filename.png]]`）
- **自動 CI/CD**：GCS 內容變更 → Pub/Sub → Cloud Build → Artifact Registry → Cloud Run 全自動部署
- **Standalone 輸出**：Docker 映像僅打包執行所需最小檔案

---

## 目錄結構

```
thechaoan/
├── content/
│   ├── posts/          # Markdown 文章（由 GCS 同步）
│   └── images/         # 部落格圖片（由 GCS 同步）
├── public/             # 靜態資源（avatar、icon 等）
├── src/
│   ├── app/
│   │   ├── [locale]/   # 多語系路由（en / zh-TW）
│   │   │   ├── blog/       # 文章列表與詳細頁
│   │   │   ├── projects/   # 作品集
│   │   │   └── aboutme/    # 關於我
│   │   ├── components/ # 共用元件
│   │   └── globals.css
│   └── lib/
│       ├── data.ts     # 內容資料整合
│       ├── i18n.ts     # 國際化工具
│       └── messages/   # en.json、zh-TW.json
├── contentlayer.config.ts
├── next.config.ts      # 本地開發（Turbopack + Contentlayer）
├── next.config.js      # Cloud Run 部署（standalone output）
├── Dockerfile
└── cloudbuild.yaml
```

---

## 內容管理

文章與圖片以 GCS 為唯一來源：

| GCS 路徑 | 本地路徑 | 說明 |
|----------|----------|------|
| `gs://thechaoan-md-bucket/posts/` | `content/posts/` | Markdown 文章 |
| `gs://thechaoan-md-bucket/images/` | `content/images/` | 部落格圖片 |

圖片在 Docker 建置時會複製至 `public/images/`，由 Next.js 以 `/images/filename` 對外提供服務。


## CI/CD 流程

```
上傳 .md / 圖片至 GCS
        ↓
  Pub/Sub 通知
        ↓
  Cloud Build 觸發
        ↓
  gsutil rsync（同步 posts + images）
        ↓
  docker build（多階段建置）
        ↓
  推送至 Artifact Registry
        ↓
  gcloud run deploy（asia-east1）
```

Cloud Build 設定檔：[`cloudbuild.yaml`](./cloudbuild.yaml)

---

## 設定說明

| 檔案 | 用途 |
|------|------|
| `next.config.ts` | 本地開發，啟用 Turbopack 與 Contentlayer |
| `next.config.js` | Cloud Run 部署，輸出 standalone 模式 |

> 兩個設定檔並存是刻意設計，請勿合併或刪除任一檔案。
