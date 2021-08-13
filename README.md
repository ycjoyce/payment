# 模擬付款流程網站
基於 React.js 建立的模擬付款流程網站，以 Redux 管理狀態，以 React Router 進行路由。UI 採用 Bootstrap 建立而成，並支援 RWD。

## 線上演示
[Demo](https://ycjoyce.github.io/payment/)

## 功能地圖
1. 整體架構
- 可以同步上方「目前步驟條」與下方「步驟內容」
- 可以顯示訂單資訊
- 手機版時，可以點擊訂單資訊按鈕，瀏覽詳細訂單資訊

2. 步驟一：選擇付款方式
- 可以點擊任一付款方式
- 可以點擊下一步，進入所選付款方式的表單填寫付款資訊

3. 步驟二：填寫付款資訊
- 可以依據上一步驟所選之付款方式，顯示不同的填寫付款資訊表單
- 可以點擊上一步，回到上一步驟選擇付款方式
- 可以點擊確認付款，驗證使用者填寫之資訊
    - 若全數欄位驗證通過，則前往下一步驟
    - 若驗證不通過，則驗證不通過的欄位顯示提醒
- 填寫信用卡號，可以自動跳換到下一格欄位
- 填寫信用卡號，可以判別信用卡廠牌

4. 步驟三：完成訂單頁面
- 可以依據上一步驟的付款方式，顯示不同的完成訂單頁面
- 若付款方式為超商付款，可以依據上一步驟所填寫之資訊，顯示付款超商及付款期限（送出表單後七天）
- 可以點擊返回首頁按鈕，返回第一步驟「選擇付款方式」

## 使用技術
- React.js
- Redux
- React Router
- Javascript (ES6+)
- SCSS
- Bootstrap
- ESLint (Airbnb)

## 應用介面
- 步驟一：選擇付款方式
![步驟一：選擇付款方式](https://i.imgur.com/z9uWkdL.png)

- 步驟二：填寫付款資訊
    - 信用卡/金融卡
![步驟二：填寫付款資訊-信用卡/金融卡](https://i.imgur.com/5g4JhRx.png)
    - 超商付款
![步驟二：填寫付款資訊-超商付款](https://i.imgur.com/PuO5kr3.png)
    - Web ATM
![步驟二：填寫付款資訊-Web ATM](https://i.imgur.com/7NNf04P.png)
    - 提示錯誤欄位
![步驟二：填寫付款資訊-提示錯誤欄位](https://i.imgur.com/DkZfglL.png)

- 步驟三：完成訂單頁面
    - 信用卡/金融卡、Web ATM
![步驟三：完成訂單頁面-信用卡/金融卡、Web ATM](https://i.imgur.com/cbGBTLm.png)
    - 超商付款
![步驟三：完成訂單頁面-超商付款](https://i.imgur.com/u4JCT2k.png)

## 聲明
- UI 設計圖稿來自 The F2E 2nd（設計師：edith.hsu）
- 本作品內圖片、內容等，純粹為個人練習使用，不做任何商業用途
