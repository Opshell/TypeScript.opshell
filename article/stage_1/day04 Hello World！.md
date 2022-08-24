![alt](https://)

# 牙牙學語的第一步
> *如果不知道怎麼開始*
> *就來個Hello Wrold吧*
> *─────────────────────── By Opshell*
---
## 目標：使用TypeScript 做個Hello Wrold
   > #### 在複雜的專案中，
   > #### Javascript(接下來統稱JS) 帶給我的困擾是，我無法確定她傳進來的東西，
   > #### 例如：前陣子我在用Vue做一個無限遞迴的Menu，在邏輯有點複雜的情況，
   > #### 不夠明確的報錯，花了一段時間才發現接受的型別有錯誤。
   > #### 在每個開發JS的角落利用console來判斷型別、追朔變數宣告來了解變數型態，
   > #### 中間無數的輾轉，連他自己都忘了自己是誰，你怎麼會記得呢?
   > #### 為了讓她想起自己是誰，降低了我們coding的效率。
   > #### TypeScript(接下來統稱TS)主要就是為了解決這些弱點來提升JS開發體驗而存在的，
   > #### 上面講的可能有點模糊，我們做個簡單的例子來體會TypeScript的優勢：
---
## 過程：
- ### 安裝TypeScript(全域)
    > ```
    > npm install -g typescript
    > ```
    確認目前安裝的環境↓↓↓
    > ```
    > npm list -g --depath=0
    > ```
    > #### 如果安裝順利 結果會如下↓↓↓
    ![alt](https://)

- ### TypeScript Say Hello
    #### 1. 新增ts 資料夾
    #### 2. 新增一支檔案在ts資料夾裡：Hello.ts(內容如下)
    > ```typescript
    > function sayHello(name: string) {
    >     return 'Hello, ' + name;
    > }

    > const who = 'World';
    > console.log(sayHello(who));
    > ```

    #### 3. cd 到 Hello.ts 所在的資料夾下
    > ```typescript
    > cd ts
    > ```
    > 如下↓↓↓
    ![alt](https://)

    #### 4. 執行他
    > ```typescript
    > tsc hello.ts
    > ```

    #### 5. 可以看到它產生了一個js
    > ![alt](https://)
    #### 6. 這時候坑就出現了↓↓↓
    > ![alt](https://)

- ### ▲ 產生編譯後發現錯誤，(猜測是因為放在一起，宣告互相干擾了)，
  ###  設定tsconfig.json的輸出位置試試
    #### 1. 產生tsconfig
    > ```
    >  tsc --init
    > ```
    #### 2. 拿到預設json(其他設定參考)
    > 設定輸入資料夾與輸出資料夾↓↓↓(順便設定些有的沒的)
    > ![alt](https://)
    > [You can learn more about tsconfig at here](https://aka.ms/tsconfig)
    > [中文](https://iter01.com/469726.html)
    > 當然 看[原廠](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)最好

- ### 刪掉編譯後的重新編譯(設定tsconfig後錯誤消失了)
    > 設定了tsconfig.json之後，就可以直接使用tsc編譯了
    > 在根目錄下直接執行，也不需要cd ts了
    > ```
    > tsc
    > ```

- ### 將JavaScrip
    > ```TypeScript
    > function sayHello(name: string){
    > return 'Hello, ' + name;
    > }
    >
    > const who = 123;
    > console.log(sayHello(who));
    > ```

- ## 結果：
    > 試想上面的例子，
    > 如果龐大個10倍?20倍?
    > 一個功能被拆分重構後，複雜的邏輯，跨越多個檔案，
    > 當你想查看他的細部，增加功能，甚至重構他，
    > 不明確的型態，就像下面這張圖一樣，
    > 你確定，你要花多少時間去處理他?

    ![alt](https://)![alt](https://)
