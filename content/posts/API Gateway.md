---
up: "[[AWS_MAP]]"
date: 2025-11-02
---
![[Screenshot 2025-10-28 141819 1.png]]
- API Gateway
	- Develop：管理
		- Routes：API的結構
		- Authorization：安全性
		- Integration：後端連線服務


# Develop
## Routes
在API Gateway中用來對應HTTP請求的路經及方法

| 方法     | 路徑            | 說明      |
| ------ | ------------- | ------- |
| GET    | `/users`      | 取得使用者列表 |
| POST   | `/users`      | 新增使用者   |
| GET    | `/users/{id}` | 取得特定使用者 |
| DELETE | `/users/{id}` | 刪除使用者   |
![[Screenshot 2025-10-28 141930.png]]

## Authorization
用來控制經授權使用者來呼叫Routes，AWS有多種授權方式，我們這邊使用的是Cognito JWT Token 驗證。
也可以用AWS IAM或是連結Lambda做客製化驗證。
可以增加驗證需求，這邊使用的是Cognito幫我們做驗證。
![[Screenshot 2025-10-28 141954.png]]
![[Screenshot 2025-10-28 142122.png]]


## Integration（整合）
當有人呼叫Route時，把請求轉發。
我們這邊使用Lambda Function，把請求轉發到一個Lambda函式做執行（Serverless後端）。
![[Screenshot 2025-10-28 141953.png]]

## 流程邏輯
使用者 → API Gateway
          ↓
        (1) Routes       ← 判斷呼叫哪個 API 路徑與方法
          ↓
        (2) Authorization← 檢查這個使用者是否有權呼叫
          ↓
        (3) Integration  ← 呼叫對應的後端（Lambda、HTTP...）
          ↓
        回傳結果 → 使用者

