---
date: 2026-04-26
tag: Next.js
slug: nextjs-personal-website-3
excerpt: 支撐網站運作的資料夾結構與各功能設計說明。
---
# 用 Next.js 打造個人品牌網站（三）：各功能的設計與資料夾結構

前兩篇把 Next.js 專案建起來、完成了 layout 和各頁面的基本架構。這篇要說明的是這些頁面「背後」的東西——那些支撐整個網站運作的資料夾與功能檔案，以及它們各自為什麼會出現。
 
先看一下目前完整的專案結構：
 
```
專案根目錄/
├── content/              ← 文章與作品的 Markdown 內容
├── public/               ← 靜態資源（圖片等）
├── lib/                  ← 資料處理、工具函式
│   ├── data.ts
│   ├── i18n.ts
│   └── messages/
│       ├── en.json
│       └── zh-TW.json
└── src/
    └── app/
        ├── components/   ← 可重複使用的 UI 元件
        │   ├── NavLink.tsx
        │   ├── LanguageSwitch.tsx
        │   ├── FilterBar.tsx
        │   ├── ContentCard.tsx
        │   ├── ContentGrid.tsx
        │   └── tech.ts
        └── hooks/        ← 自訂 React Hook
            └── useDebounce.ts
```
 
![[螢幕擷取畫面 2026-04-27 150519.png]]
 
接下來從最簡單的資料夾開始，一個一個說明它們的用途。

---
 
## content/ 與 public/：靜態資源放這裡
 
這兩個資料夾的角色最單純。
 
**`content/`** 用來存放我所有文章和作品介紹的 Markdown 檔案（`.md`）。寫一篇新文章，就是在這裡新增一個 `.md` 檔，不需要動到任何程式碼。
 
**`public/`** 用來存放靜態資源，主要是圖片。Next.js 建立專案時預設就會有這個資料夾，裡面會有它自帶的一些示範圖片，我後來又加入了自己的頭像和其他用到的圖片。
 
放在 `public/` 的檔案可以直接用根路徑存取，例如 `public/avatar.png` 在網頁裡就是 `/avatar.png`，不需要寫完整路徑。

![[螢幕擷取畫面 2026-04-26 192939.png]]
 
---

 
## components/：可重複使用的 UI 元件
 
`components/` 資料夾的出現，起因是我需要一個**能偵測目前所在頁面的導覽列連結**。
 
### NavLink.tsx
 
我希望導覽列的連結能根據目前所在頁面改變樣式，比如說在 Blog 頁面時，導覽列的「Blog」字樣要特別標示出來，讓訪客清楚知道自己在哪裡。
 
這個功能需要用到 Next.js 的 `usePathname()` 這個 hook 來取得目前的 URL，再根據比對結果決定要套用哪個 CSS class。因為這段邏輯在四個頁面都會重複用到，所以獨立抽成一個 `NavLink` 元件。
 
![[螢幕擷取畫面 2026-04-27 151101.png]]
![[螢幕擷取畫面 2026-04-27 151113.png]]
 
---
 
### tech.ts
 
這個嚴格來說不是元件，而是一份**資料檔**，用來存放「關於我」頁面裡的技能清單。
 
把這份資料另外拉出來，是不想讓 `aboutme/page.tsx` 裡面夾雜一大串技能資料，讓頁面程式碼的閱讀難度變高。把資料跟頁面邏輯分開，維護起來也更清楚。
 
![[螢幕擷取畫面 2026-04-27 151253.png]]
 
---
 
### FilterBar.tsx
 
FilterBar 是 Blog 和 Projects 頁面最上方那條篩選列，包含 **Latest**、**Top** 這兩個排序選項，以及一個 **Search** 搜尋框。
 
![[螢幕擷取畫面 2026-04-27 151418.png]]
 
說到 Search，就要提到 `hooks/` 裡面的 `useDebounce.ts`。
 
---
 
## hooks/：自訂的 React 邏輯
 
### useDebounce.ts
 
使用者在搜尋框輸入文字時，如果每打一個字就立刻觸發一次查詢，伺服器會在極短時間內收到大量請求，造成不必要的效能浪費。
 
**Debounce** 的概念就是加一個延遲：使用者停止輸入一段時間後（例如 300ms），才真正觸發查詢。這樣不管使用者打得多快，實際發出的請求數量都會大幅減少。
 
```ts
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';
 
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
 
    return () => clearTimeout(timer);
  }, [value, delay]);
 
  return debouncedValue;
}
```
 
`FilterBar` 的搜尋框就是透過這個 hook 處理輸入，讓搜尋行為更流暢、不浪費資源。
 
---
 

### ContentCard.tsx 與 ContentGrid.tsx
 
Blog 和 Projects 頁面的列表，全部用**卡片**的方式呈現，這兩個元件就是負責卡片的樣式與排列邏輯。
 
**`ContentCard.tsx`** 定義的是單張卡片的外觀——標題、摘要、日期、標籤等資訊的版面配置與 CSS 樣式。
 
**`ContentGrid.tsx`** 則負責排列邏輯：接收 `FilterBar` 選擇的條件（排序方式、搜尋關鍵字），過濾並排列卡片的顯示順序。
 
因為 Blog 和 Projects 的顯示方式完全相同，兩個頁面共用同一套元件，只是傳入的資料來源不同。
 
![[螢幕擷取畫面 2026-04-26 191318 1.png]]
 
---
 

## lib/i18n.ts 與 messages/：多語系支援
 
做完卡片功能之後，我發現一個問題：網站上的文字都是硬寫在程式碼裡的，沒辦法根據語言切換內容。於是加入了 i18n（internationalization，多語系）的機制。
 
**`lib/i18n.ts`** 定義了網站支援哪些語言，以及預設語言是哪個。這也是為什麼四個主要頁面最後都移到了 `app/[locale]/` 這個資料夾底下——`[locale]` 是動態路由，代表語言代碼，例如 `/en/blog` 或 `/zh-TW/blog`，i18n.ts 會根據目前選擇的語言決定 URL 要用哪個前綴。
 
**`lib/messages/`** 裡面的 JSON 檔案則存放所有需要翻譯的文字。切換語言時，頁面上的文字就從對應的 JSON 檔取值替換：
 
```json
// lib/messages/zh-TW.json
{
  "nav": {
    "blog": "文章",
    "projects": "開發作品",
    "about": "關於我"
  }
}
```
 
```json
// lib/messages/en.json
{
  "nav": {
    "blog": "Blog",
    "projects": "Projects",
    "about": "About"
  }
}
```
 
**`components/LanguageSwitch.tsx`** 則是導覽列右上角的語系切換按鈕，負責切換時的視覺狀態與互動樣式。
 
![[螢幕擷取畫面 2026-04-27 151546.png]]
![[螢幕擷取畫面 2026-04-27 151557.png]]
 
---
 
## lib/data.ts：資料的統一出入口
 
最後是 `lib/data.ts`，這是整個網站的**資料中心**。
 
它負責兩件事：
 
1. **讀取 `content/` 裡的 Markdown 檔案**，解析出標題、日期、標籤、摘要等 frontmatter 資訊
2. **提供資料給 `ContentCard`**，讓卡片知道要顯示哪些文章和作品
搭配 `contentlayer.config.ts`，Markdown 檔案在 build 時會被解析成結構化的資料，`data.ts` 再把這些資料提供給需要的頁面和元件使用。整條路徑是：
 
```
content/posts/*.md
    → contentlayer.config.ts 解析
        → lib/data.ts 取得結構化資料
            → ContentCard.tsx 顯示卡片
```
 
![[螢幕擷取畫面 2026-04-27 152430.png]]
 
---
 
## 小結
 
這篇把整個專案的檔案構成說完了：
 
1. **`content/` 和 `public/`** 是靜態資源的家，文章放 `content/`，圖片放 `public/`
2. **`components/`** 收納所有可重複使用的 UI 元件，每個元件的出現都有對應的實際需求
3. **`hooks/useDebounce.ts`** 替搜尋功能加上延遲，避免不必要的重複請求
4. **`lib/i18n.ts` 和 `messages/`** 讓網站支援多語系，`[locale]` 動態路由是實現的關鍵
5. **`lib/data.ts`** 是資料的統一出入口，串接 Markdown 內容與前端元件

下一篇進入 **Docker 與部署**——把這個網站打包成容器，部署到真實的伺服器上。