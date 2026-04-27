---
date: 2026-04-24
tag: Next.js
slug: nextjs-personal-website-1
excerpt: 為什麼選 Next.js 建立個人網站，從建立專案到認識基本架構。
---
# 用 Next.js 打造個人品牌網站（一）：從建立專案到認識基本架構
 
## 為什麼選 Next.js？
 
這個網站的定位很簡單：一個個人品牌形象網站，目前只有四個頁面——**首頁、關於我、Blog、Projects**。
 
說實話，光就這個規模而言，用純 HTML + CSS 就可以做到一模一樣的效果（笑）。
 
但我的盤算是：**之後想擴充**。連接資料庫、加入互動功能、甚至做一個後台管理介面——這些需求讓我不想從零開始拼湊。一開始也考慮過用之前學過的 C# ASP.NET，但對一個個人小網站來說實在太重了，工程師就是要因地制宜，所以就去找了一個介於純靜態與全端框架之間的方案，最後選了 Next.js。
 
這也是這篇文章的由來。
 
---

首先，我們先簡單介紹一下 Next.js。

Next.js 是一個基於 React 的全端框架，其核心價值之一在於 Server-Side Rendering（SSR）。

---
## SSR（Server-Side Rendering）

SSR 的運作方式是：在使用者發送請求時，頁面會先在 Server 端完成資料取得與 HTML 組裝，再將完整的頁面回傳給瀏覽器。

這種機制帶來幾個重要優勢：

### 1. 降低前端請求負擔

由於資料已在 Server 端預先處理完成，瀏覽器不需要再發送多次 API 請求來組合頁面內容，因此能有效減少前端載入時的請求次數與延遲。

### 2. 簡化跨來源（CORS）問題

在 SSR 架構下，瀏覽器的請求只會發送到 Next.js 所提供的 Server，由 Server 再去與其他後端服務溝通。

換句話說：

- 瀏覽器 **只認識 Next.js Server**
- 不會直接存取其他後端服務

因此，原本前端常見的跨網域（CORS）問題會被大幅簡化，因為外部 API 的請求來源統一由 Server 控制。

### 3. 後端服務的安全與管理更集中

其他後端服務不需要直接面對來自不同瀏覽器的請求，只需要信任並允許 Next.js Server 的存取即可（例如透過 whitelist 或 internal network 控制）。

---
 
## 第一步：建立 Next.js 專案
 
先到 [Next.js 官網](https://nextjs.org) 確認最新的 CLI 指令，然後打開 PowerShell，切換到你要放專案的目錄：
 
```powershell
cd E:/project
```
 
接著執行建立指令，把 `[project-name]` 換成你自己的資料夾名稱：
 
```bash
npx create-next-app@latest [project-name]
```
 
以我自己為例，專案資料夾名稱是 `thechaoan`，所以是：
 
```bash
npx create-next-app@latest thechaoan
```
 
執行後，CLI 會問你幾個選項，大概像這樣：
 
```
Would you like to use TypeScript? › Yes
Would you like to use ESLint? › Yes
Would you like to use Tailwind CSS? › Yes
Would you like to use the `src/` directory? › No
Would you like to use App Router? › Yes
Would you like to customize the default import alias? › No
```
 
這部分沒有標準答案，根據個人習慣選擇就好。我自己有開啟 **TypeScript** 跟 **Tailwind CSS**。
 
建立完成後，進到專案資料夾：
 
```bash
cd thechaoan
```
 
---
 
## 第二步：啟動開發伺服器
 
進入專案資料夾後，執行以下指令啟動本地開發伺服器：
 
```bash
npm run dev
```
  
Next.js 預設跑在 **port 3000**，啟動後打開瀏覽器輸入：
 
```
http://localhost:3000
```
 
你會看到 Next.js 預設給你的首頁，那個頁面對應的就是 `app/page.tsx` 這個檔案。

```
app/
├── page.tsx      ← 首頁內容（對應 /）
├── layout.tsx    ← 全站共用外框
└── globals.css   ← 全域樣式
```
 
---
 
## 第三步：用 test 頁面理解路由邏輯
 
在開始規劃真正的頁面之前，我先建了一個 `test` 資料夾來搞清楚路由是怎麼運作的。
 
Next.js App Router 的路由規則只有一條：
 
> **在 `app/` 目錄下，每個資料夾就是一段 URL 路徑，資料夾裡的 `page.tsx` 就是那個路徑顯示的頁面。**
 
所以我在 `app/` 底下新增一個 `test/` 資料夾，裡面放一個 `page.tsx`，寫幾個字：
 
```tsx
// app/test/page.tsx
export default function Test() {
      return (
        <p>text</p>
    );
}
```
 
此時的結構長這樣：
 
```
app/
├── page.tsx
├── layout.tsx
├── globals.css
└── test/           ← 新增這個結構目錄
    └── page.tsx    ← 新增這個頁面檔案
```
 
存檔後，在瀏覽器輸入 `localhost:3000/test`，就能看到剛剛寫的內容了：
 
![[螢幕擷取畫面 2026-04-26 163414.png]]
 
就這樣，不需要任何額外設定，**資料夾名稱就是 URL**，非常直覺。
 
---

## 小結
 
這篇把建立專案到規劃架構的過程完整走了一遍：
 
1. `create-next-app` 建立專案
2. `npm run dev` 啟動伺服器，確認預設首頁
3. 用 `test/` 頁面實際理解 App Router 的路由邏輯

下一篇會介紹如何加入另外三個主要頁面資料夾，並規劃各頁`page.tsx`還有共用的`layout.tsx`。
