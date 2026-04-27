---
date: 2026-04-25
tag: Next.js
slug: nextjs-personal-website-2
excerpt: Next.js 各 Page 與 Layout 的實作流程說明。
---
# 用 Next.js 打造個人品牌網站（二）：各Page 與 Layout 實作流程

## 第一步：建立頁面結構（Page）

首先先創建三個資料夾跟`page.tsx`，結構會長這樣。

```
app/
├── aboutme/
│   └── page.tsx    ← 新增的資料夾跟page頁
├── blog/
│   └── page.tsx    ← 新增的資料夾跟page頁
├── projects/
│   └── page.tsx    ← 新增的資料夾跟page頁
├── favicon.ico
├── globals.css
├── layout.tsx      ← 共同外框
└── page.tsx        ← 首頁
```

這裡的規則是：

> 在 Next.js 中，「資料夾名稱 = 路由」

對應關係如下：

- `/` → `app/page.tsx`
- `/about` → `app/about/page.tsx`
- `/blog` → `app/blog/page.tsx`
- `/projects` → `app/projects/page.tsx`

完成這一步後，你已經有一個基本可導航的網站。

---

## 第二步：建立全域 Layout

### 什麼是 Layout

當 `layout.tsx` 放在 `app/` 目錄下時：

> 所有 `page.tsx` 都會自動被包在這個 Layout 裡

這代表：

- 切換頁面時，Header / Footer 不會重新載入
- 網站整體視覺結構保持一致
- 可以集中管理共用 UI

同時也帶來一個重要優勢：

> 修改 Layout = 全站同步更新

這個概念類似於 ASP.NET Web Forms 的 [[HTML TO ASPX|Master Page]]，用來統一所有頁面的結構。

---

`layout.tsx`的基本結構

- `header`：共用導覽區
- `main`：頁面內容由 `{children}` 注入
- `footer`：頁尾資訊

``` TypeScript
export default function RootLayout({ children }) {  
	return (
		<html>
			<body>
				<header>Header</header>
				<main>{children}</main>
				<footer>Footer</footer>
			</body>
		</html>
	);
}
```

---

### `layout.tsx` 的內容

![[螢幕擷取畫面 2026-04-26 181229.png]]

中間`<main>{children}</main>`則是負責串接`layout.tsx`與`page.tsx`的關鍵。

我的 Header 分成兩個層次：
- 上層：品牌與功能區
	- 左側：頭像 icon（點擊回首頁）
	- 中間：網站名稱（連回首頁）
	- 右側：外部連結及語系切換
- 下層：頁面導覽列

結構簡化為：

``` TypeScript
<header>
	<div className="top-bar">
		<div>Avatar</div>
		<div>Site Name</div>
		<div>Link/Language</div>
	</div>
	
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/blog">Blog</a>
		<a href="/projects">Projects</a>
	</nav>
</header>
```

![[螢幕擷取畫面 2026-04-26 182433.png]]


---

## 第三步：建立 Page 內容

首頁 page 對應：
```
/ → app/page.tsx
```

我首頁規劃三個區塊：

- 大看板（Hero Section）
- 最新 Blog 文章
- 最新 Projects

``` TypeScript
export default function HomePage() {  
  return (  
    <>  
      <section>Hero</section>  
      <section>Latest Blog</section>  
      <section>Latest Projects</section>  
    </>  
  );  
}
```

這些內容會自動被放入 Layout 的 `<main>` 中。

![[螢幕擷取畫面 2026-04-26 191045.png]]

---

Blog／Projects
這兩個頁面主要是資料列表，使用相同的渲染模式：

```TypeScript
<Suspense>
	<ContentGrid items={posts}/>
</Suspense>
```

- `Suspense`：處理非同步資料載入
- `ContentGrid`：負責顯示文章

![[螢幕擷取畫面 2026-04-26 191217.png]]
![[螢幕擷取畫面 2026-04-26 191318.png]]

---

## 小結

目前完成的階段：
1. 建立基於 Next.js 的基本路由結構（Page）
2. 實作全站共用外框（Layout），並統一 Header / Navigation / Footer
3. 理解 `{children}` 在 Layout 與 Page 之間的串接方式

下一篇將會進一步說明：

- `ContentGrid` 的設計與用途
- `/app/[locale]` 的語系路由實作
- `components/`、`hooks/`、`lib/`、`public/` 的專案分層設計

這些內容會是從「基本網站」邁向「工程化專案」的重要關鍵。

