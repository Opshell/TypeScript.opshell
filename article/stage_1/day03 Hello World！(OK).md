![alt](https://)

# 牙牙學語的第一步
> *如果不知道怎麼開始，*
> *就來個Hello Wrold吧。*
> *───────────────────────── By Opshell*

---
## 目標：使用TypeScript 做個Hello Wrold
   > #### 在複雜的專案中，
   > #### Javascript帶給我的困擾是，我無法確定她傳進來的東西，
   > #### 例如：前陣子我在用Vue做一個無限遞迴的Menu，在邏輯有點複雜的情況，
   > #### 不夠明確的報錯，花了一段時間才發現接受的型別有錯誤。
   > #### 在每個開發JS的角落利用console來判斷型別、追朔變數宣告來了解變數型態，
   > #### 中間無數的輾轉，連他自己都忘了自己是誰，你怎麼會記得呢?
   > #### TypeScript主要就是為了解決這些弱點來提升JS開發體驗而存在的，
   > #### 讓她記得自己是誰，提高我們coding的效率。
   > #### 上面講的可能有點模糊，我們做個簡單的例子來體會TypeScript的優勢：

---
## 過程：
- ### TypeScript Say Hello
   #### 1. 新增ts 資料夾
   #### 2. 新增一支檔案在ts資料夾裡：Hello.ts(內容如下)
   ```typescript
    function sayHello(name: string) {
        return 'Hello, ' + name;
    }

    const who = 'World';
    console.log(sayHello(who));
   ```

   #### 3. cd 到 Hello.ts 所在的資料夾下
   ```typescript
    cd ts
   ```
   如下↓↓↓
![alt](https://)

   #### 4. 執行他
   ```typescript
    tsc hello.ts
   ```

   #### 5. 可以看到它產生了一個js
![alt](https://)

   #### 6. 這時候坑就出現了↓↓↓
![alt](https://)

- ### ▲ 產生編譯後發現錯誤
   > 猜測是因為放在一起，宣告互相干擾了，
   > 設定tsconfig.json的輸出位置試試。
   #### 1. 產生tsconfig
   ```
    tsc --init
   ```

   #### 2. 拿到預設json
   > 設定輸入資料夾與輸出資料夾↓↓↓(順便設定些有的沒的)
![alt](https://)

   #### 3. 刪掉編譯後的重新編譯(設定tsconfig後錯誤消失了)
   > 設定了tsconfig.json之後，就可以直接使用tsc編譯了
   > 在根目錄下直接執行，也不需要cd ts了
   ```
    tsc
   ```

   #### 4. 將程式碼改成↓↓↓
   ```TypeScript
    function sayHello(name: string){
      return 'Hello, ' + name;
    }

    console.log(sayHello(123));
   ```
![alt](https://)

   #### 5. 執行編譯
   ```
    tsc
   ```
   > 編譯提醒了，但還是能編譯成功。
![alt](https://)

- ### ※ 如果有安裝 [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
   > 更早就能發現問題
![alt](https://)

---
## 小結：
   > 藉由Hello Wrold 最直觀的感受到 TypeScript 的優勢，
   > 也學會了設定 tsconfig 還有很多的設定，可以慢慢研究。

---
## 其他設定參考：
   > - [You can learn more about tsconfig at here](https://aka.ms/tsconfig)
   > - [中文](https://iter01.com/469726.html)
   > - 當然看[原廠](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)最好
