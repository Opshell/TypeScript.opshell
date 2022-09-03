[Day03] - 牙牙學語Hello World !- tsconfig設定.md

![Day3 -Banner](https://ithelp.ithome.com.tw/upload/images/20220903/20109918d6a3eWnlKC.jpg)

# 牙牙學語的第一步
   > *如果不知道怎麼開始，*
   > *就來個Hello Wrold吧。*
   > *───────────────────────── By Opshell*

---
## 目標：使用TypeScript 做個Hello Wrold
   > 在複雜的專案中， Javascript 的問題是，無法確定他傳進來、丟出去的東西，
   > 例如：前陣子我在用Vue做一個無限遞迴的Menu，在邏輯有點複雜的情況，
   > 不夠明確的報錯，花了一段時間才發現資料的型別有錯誤。
   >
   > 在每個開發JS的角落利用console來判斷型別、追朔變數宣告來了解變數型別，
   > 中間無數的輾轉，連他自己都忘了自己是誰，你怎麼會記得呢?
   > TypeScript主要就是為了解決這些弱點來提升JS開發體驗而存在的，
   > 讓他記得自己是誰，提高我們coding的效率。
   > 上面講的可能有點模糊，我們做個簡單的例子來體會TypeScript的優勢：

---
## 過程：
- ### 開場先推廣~~(工商)~~ VS Code外掛 [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
   > 能在編譯前發現大部分問題，開發速度簡直Turbo 再Turbo。
   > 當然他也支援很多其他的語言，不只有TypeScript。

   ![Error Lens](https://ithelp.ithome.com.tw/upload/images/20220903/20109918ukMKslGamN.png)
   ![安裝Error Lens效果](https://ithelp.ithome.com.tw/upload/images/20220903/20109918p5664Jjdfs.png)

---
- ### TypeScript Say Hello
   #### 1. 新增專案資料夾 (typescript.opshell)
   #### 2. 在根目錄下新增 ts 資料夾
   #### 2. 新增一支檔案在ts資料夾裡：Hello.ts，內容如下)
   ```typescript
    function sayHello(name: string) {
        return 'Hello, ' + name;
    }

    const who = 'World';
    console.log(sayHello(who));
   ```

   #### 3. cd 到 Hello.ts 所在的資料夾下，編譯Hello.ts
   ```
    cd ts
    tsc hello.ts
   ```

   ![產生](https://ithelp.ithome.com.tw/upload/images/20220903/20109918KIuiCZmgbu.png)

   #### 4. 可以看到它產生了一個js

   ![產生Hello3.js](https://ithelp.ithome.com.tw/upload/images/20220903/20109918MhcZkzZdi3.png)

   #### 5. 這時候坑就出現了↓↓↓

   ![坑](https://ithelp.ithome.com.tw/upload/images/20220903/20109918DWhqkkXznT.png)

---
- ### ▲ 產生編譯後發現錯誤
   > 猜測是因為放在一起，宣告互相干擾了，
   > 設定tsconfig.json的輸出位置試試。
   #### 1. 產生tsconfig
   > 回到根目錄下執行 tsc --init
   ```
    cd ../
    tsc --init
   ```

   #### 2. 拿到預設json
   > 設定輸入資料夾與輸出資料夾(順便設定些有的沒的)

   ![tsconfig](https://ithelp.ithome.com.tw/upload/images/20220903/20109918Mi6cwZm4eZ.png)

   #### 3. 設定tsconfig後錯誤消失了，刪除Hello.js，重新編譯
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

    const who = 123;
    console.log(sayHello(who));
   ```

   ![型別錯誤提醒](https://ithelp.ithome.com.tw/upload/images/20220903/20109918aX6oACMETr.png)

   #### 5. 執行編譯
   ```
    tsc
   ```
   > 編譯提醒了，但還是能編譯成功。
   > js檔案還是還是會產生出來，這是ts的包容性。

---
## 小結：
   > 藉由 Hello Wrold 最直觀的感受到 TypeScript 的優勢，
   > 也學會了設定 tsconfig 還有很多的設定，可以慢慢研究。
   > 然後 [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) 真的很厲害，非常推薦安裝。

---
## 其他設定參考：
   > - [You can learn more about tsconfig at here](https://aka.ms/tsconfig)
   > - [中文版設定文章](https://iter01.com/469726.html)
   > - 當然看[原廠](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)最好
