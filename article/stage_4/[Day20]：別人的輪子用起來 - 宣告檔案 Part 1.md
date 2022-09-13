![Day 07](https://ithelp.ithome.com.tw/upload/images/20220907/20109918KYTx5tuz9P.jpg)

# 認識來自TypeScript的新朋友
   > *別人的輪子用起來*
   > *等等這輪子的大小好像怪怪的...*
   > *───────────────────── By Opshell*

---
## 目標:檔案宣告
   > 今天我們要蓋網站，一般來說都不會自己造輪子，
   > 但是你要用別人的輪子，TypeScript看不懂，會哀哀叫。
   > 所以使用套件時，我們需要宣告他的型別，
   > 才能獲得對應的程式碼自動完成、介面提示等功能。

https://www.796t.com/article.php?id=304880

---
- ## 過程
* ### `declare(全域宣告)`
   > 最常用到的套件大概就是`jQuery`了，
   > 一般使用都是這樣：
   ```javascript
    $(function(){ /** 巴拉巴拉... */});
   ```
   > 但是 TypeScript 看不懂 $ 或 jQuery阿

   ![jQuery 錯誤](https://ithelp.ithome.com.tw/upload/images/20220913/20109918yZCi2KU8i0.png)
   > 這時候就可以用`declare(全域宣告)`把'$'宣告成全域變數，
   > 和一般的JavaScript一樣，只是在前面加上`declare`，
   > 而特性也差不多`let`、`var` 是變數`const`是常數：
   ```typescript
    declare const $: (selector: any) => any;

    $(function () { /** 巴拉巴拉... */ });
   ```
   ![宣告全域變數](https://ithelp.ithome.com.tw/upload/images/20220913/20109918MH0uHJ9bfs.png)
   > ※ `declare(宣告全域)` 並沒有真的定義一個變數或方法，
   >    只是定義了全域變數 $ 的型別，只會用在`TypeScript`的檢查，在編譯後不會存在。
   > ※ 由於上面的特性，所以`declare(全域宣告)`並不能實作任何具體的功能，否則會報錯。

   > declare 可以用的包括 `function`、`class`、`enum`、`namespace`等。
   > 而`declare(全域宣告)`中有一些比較特別的是：

   #### 1. `declare namespace`宣告(含有子屬性的)全域性物件。
   > 以前沒有`ES6 module`的時候 TS 提供的模組化方案，
   > 現在有了`ES6 module`後改稱為 `TS namespace(命名空間)` 來使用，
   > 由於`ES6 module`的普及，現在幾乎不使用`TS namespace(命名空間)`來做模組化，
   > 但是還是很常拿來全域宣告成物件，因為它可以包含很多子屬性，使用上很方便：
   ```typescript
    declare namespace Member {
      interface Info {
         title: string;
         age: number;
      }

      function getSummary(title: string, age: number): string;
    }
   ```
   > 以此類推，上面提到的各種`declare(宣告全域)`都可以放進來用，要省略掉declare。
   > ※ 巢狀命名空間
   >    如果裡面有更深的層級會變成這樣：
   ```typescript
    declare namespace Member {
      interface Info {
         title: string;
         age: number;
      }

      namespace Team {
         function getTeam(): Array<string>;
      }

      function getSummary(title: string, age: number): string;
    }
   ```
   ---
   #### 2. interface 和 type

   ---
   #### 3. 宣告合併


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
* ### 撰寫宣告檔案
   > 當你用的套件太冷門，或是你自己想造個萬星輪子，
   > 你就需要自己做宣告檔案了，
   > 詳細寫一個宣告檔案，也是一件不簡單的事情，
   > 大概會有以下幾種情境和對應做法：

   #### 1. 全域變數：
   > 透過 `<script>標籤` 引入第三方套件，注入全域變數
   全域變數是最簡單的一種場景，之前舉的例子就是透過 <script> 標籤引入 jQuery，注入全域變數 $ 和 jQuery。
   使用全域變數的宣告檔案時，如果是以 npm install @types/xxx --save-dev 安裝的，則不需要任何配置。如
   果是將宣告檔案直接存放於當前專案中，則建議和其他原始碼一起放到 src 目錄下（或者對應的原始碼目錄下）：
   ```git
   /project
   ├── src
   |  ├── index.ts
   |  └── jQuery.d.ts
   └── tsconfig.json
   ```
   如果沒有生效，可以檢查下 tsconfig.json 中的 files、include 和 exclude 配置，確保其包含了 jQuery.d.ts 檔案。
   > 大概有下面幾種方式：
   >    * declare var 宣告全域變數
   >    * declare function 宣告全域方法
   >    * declare class 宣告全域類別
   >    * declare enum 宣告全域列舉型別
   >    * declare namespace 宣告（含有子屬性的）全域物件
   >    * interface 和 type 宣告全域型別

   #### 1-1 declare var


   #### 1-2 declare function
   > declare function 用來定義全域函式的型別。jQuery 其實就是一個函式，所以也可以用 function 來定義：
   > 在函式型別的宣告語句中，函式過載也是支援的
   ```typescript
    declare function jQuery(selector: string): any;
    declare function jQuery(domReadyCallback: () => any): any;
   ```

   #### 1-3 declare class
   > 當全域變數是一個類別的時候，我們用 declare class 來定義它的型別：
   ```typescript
    declare class Animal {
      name: string;
      constructor(name: string);
      sayHi(): string;
    }
   ```
   > 同樣的，declare class 語句也只能用來定義型別，不能用來定義具體的實現，比如定義 sayHi 方法的具體實現則會報錯：

   #### 1-3 declare enum
   > 使用 declare enum 定義的列舉型別也稱作外部列舉（Ambient Enums），舉例如下：
   > 與其他全域變數的型別宣告一致，declare enum 僅用來定義型別，而不是具體的值。
   > Directions.d.ts 僅僅會用於編譯時的檢查，宣告檔案裡的內容在編譯結果中會被刪除。它編譯結果是：

   > 其中 Directions 是由第三方函式庫定義好的全域變數。




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
