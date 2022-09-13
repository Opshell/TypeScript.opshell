![Day 07](https://ithelp.ithome.com.tw/upload/images/20220907/20109918KYTx5tuz9P.jpg)

# 認識來自TypeScript的新朋友
   > *別人的輪子用起來*
   > *等等這輪子的大小好像怪怪的...*
   > *───────────────────── By Opshell*

---
## 目標:檔案宣告
   > 今天我們要蓋網站，一般來說都不會自己造輪子，
   > 但是你要用別人的輪子，TypeScript看不懂，會哀哀叫。
   > 所以使用套件時，我們需要參考它的宣告檔案，
   > 才能獲得對應的程式碼自動完成、介面提示等功能。

- ### 新語法索引
   > - 宣告
   >    * [declare var 宣告全域變數](#declare_var)
   >    * [declare function 宣告全域方法](#declare_function)
   >    * [declare class 宣告全域類別]()
   >    * [declare enum 宣告全域列舉型別]()
   >    * [declare namespace 宣告（含有子屬性的）全域物件]()
   >    * [interface 和 type 宣告全域型別]()
   > - 匯入、匯出
   >    * [export 匯出變數](/#)
   >    * [export namespace 匯出（含有子屬性的）物件]()
   >    * [export default ES6 預設匯出]()
   >    * [export = commonjs 匯出模組]()
   >    * [export as namespace UMD 函式庫宣告全域變數]()
   > - 擴充
   >    * [declare global 擴充套件全域變數]()
   >    * [declare module 擴充套件模組]()
   > - 其他
   >    * [/// <reference /> 三斜線指令]()

---
- ## 宣告
* ### 宣告語句：
   #### 1. `declare var(宣告全域變數)`
   > 最常用到的套件大概就是JQuery了，
   > 一般使用都是這樣：
   ```javascript
    $(function(){ /** 巴拉巴拉... */});
   ```
   > 但是 TypeScript 看不懂 $ 或 jQuery阿
   ![jQuery 錯誤](https://ithelp.ithome.com.tw/upload/images/20220913/20109918yZCi2KU8i0.png)

   > 這時候就可以用`declare var(宣告全域變數)`把'$'宣告成全域變數：
   ```typescript
    declare var $: (selector: any) => any;

    $(function () { /** 巴拉巴拉... */ });
   ```
   ![宣告全域變數](https://ithelp.ithome.com.tw/upload/images/20220913/20109918MH0uHJ9bfs.png)

   > ※ `declare var(宣告全域變數)` 並沒有真的定義一個變數，
   >    只是定義了全域變數 $ 的型別，僅僅會用於TS的檢查，在編譯後不會存在。

---
* ### 宣告檔案
   > 一般我們會把`宣告語句`單獨放到`.d.ts`的檔案裡面，
   > 所以`.d.ts`就是所謂的宣告檔案：

   ```typescript
    // ts/.d.ts/jQuery.d.ts

    declare var $: (selector: any) => any;
    declare var jQuery: (selector: any) => any;
   ```
   > TS 會解析專案中所有的 *.ts 檔案，當然也包含以 .d.ts 結尾的檔案。
   > 所以將 jQuery.d.ts 放到專案裡，
   > 所有 *.ts 檔案就都可以獲得 jQuery 的型別定義了。
   ```git
    /project
    ├── ts
    |  ├── index.ts
    |  └── .d.ts
    |       └── jQuery.d.ts
    └── tsconfig.json
   ```
   > 如果無法解析，那麼可以檢查 `tsconfig.json` 裡的 `files`、`include` 和 `exclude` 設定，
   > 確保包含了 jQuery.d.ts 檔案。
   > 像 Ops 習慣把 .d.ts 檔案塞在一起，就需要像下面這樣設定一下`tsconfig.json`。

   ![宣告檔案編譯](https://ithelp.ithome.com.tw/upload/images/20220913/20109918pp3TaemvsZ.png)

---
* ### 第三方套件宣告
   > 當然這種常用的套件，社群裡的大佬都幫我們處理好了，
   > 當然是大神的輪子用起來，直接下載用沒問題，
   > 但是用的套件一多總是很亂，
   > 推薦用@types 統一管理套件的宣告檔案：
   ```shell
    yarn add @types/jquery -D
   ```

   > 當然你可以在[這邊](https://www.typescriptlang.org/dt/search?search=)找找看你需要的輪子有沒有大神處理好了

---
* ###
   > 當你用的套件太冷門，或是你自己想造個萬星輪子，
   > 你就需要自己做宣告檔案了，
   > 詳細寫一個宣告檔案，也是一件不簡單的事情，
   > 大概會有以下幾種情境和對應做法：

   #### 1. 全域變數：
   > 透過 `<script>標籤` 引入第三方套件，注入全域變數
   > 大概有下面幾種方式：
   >    * declare var 宣告全域變數
   >    * declare function 宣告全域方法
   >    * declare class 宣告全域類別
   >    * declare enum 宣告全域列舉型別
   >    * declare namespace 宣告（含有子屬性的）全域物件
   >    * interface 和 type 宣告全域型別



