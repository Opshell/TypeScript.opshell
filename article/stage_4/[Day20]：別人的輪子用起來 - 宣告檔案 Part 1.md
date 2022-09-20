![Day20 banner](https://ithelp.ithome.com.tw/upload/images/20220920/2010991892ajT5Gdpw.jpg)

# 用別人的輪子
   > *別人的輪子用起來*
   > *等等這輪子的規格好像怪怪的...*
   > *───────────────────── By Opshell*

---
## 目標:檔案宣告
   > 今天我們要蓋網站，一般來說都會使用很多套件，不常自己造輪子，
   > 但是你要用別人的輪子，TypeScript看不懂，會哀哀叫。
   > 所以使用套件時，我們需要宣告他的型別(說明書)，
   > 才能獲得對應的程式碼自動完成、介面提示等功能。

---
## 過程
- ### 用大神的說明書
   > 一般我們配合`ES6 模組`規範，用`import foo from 'foo'` 匯入一個npm套件，
   > 在宣告套件型別前，可以看看需要先看看它的`宣告檔案`是否已經存在。
   > 什麼是`宣告檔案`? 你可以想像成輪子的使用說明書，
   > 你要把說明書給TS，他才看得懂：

   > 套件的`宣告檔案`可能存在於兩個地方：
   > 1. 與該套件繫結在一起：
   >    `package.json`中有`types`欄位，或者有一個`index.d.ts`檔案。
   >    這種模式不需要額外設定或安裝其他東西，是最方便的。

   > 2. 釋出到`@types`裡。我們可以嘗試安裝一下對應的`@types`包，
   >    或者在[這邊](https://www.typescriptlang.org/dt/search?search=)搜尋看看，就知道是否存在該宣告檔案。
   >    安裝命令是：
   ```shell
    yarn add @types/foo -D。
   ```
   > 這種模式一般是由於套件的維護者沒有提供`宣告檔案`，
   > 所以由其他大神將`宣告檔案`共享到`@types`裡。

   > ※ 當然也可以找到野生的說明書，可以直接下載來用，
   >   但是套件一多會很亂，所以還是推薦使用`@types`來管理。

---
- ### 自己做`宣告檔案(說明書)`
   > 如果上面兩種方式都找不到輪子，那大概就要自己做了，
   > 自己幫套件做型別宣告有幾種方式，
   > 先來講解做說明書會用到的大概語法：

- #### 1. `declare(全域宣告)`
   > 用常用到的`jQuery`來做說明，
   > 一般在JS使用都是這樣：
   ```javascript
    $(function(){ /** 巴拉巴拉... */});
   ```
   > 但是 TypeScript 看不懂 $ 或 jQuery阿

   ![jQuery 錯誤](https://ithelp.ithome.com.tw/upload/images/20220913/20109918yZCi2KU8i0.png)
   > 這時候就可以用`declare(全域宣告)`把'$'宣告成全域變數，
   > 和一般的JavaScrip需告變數一樣，只是在前面加上`declare`，
   > 而特性也差不多，`let`、`var`是變數`const`是常數：
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

   * 1-1. `declare namespace`宣告(含有子屬性的)全域性物件。
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

    // 使用長這樣 namespace名稱 + 子屬性名稱
    let Opshell: Member.Info = { title: 'Opshell', age: 30 };
   ```

   ---
   * 1-2. interface 和 type
   > 除了`declare(宣告全域)`的變數之外，可能有一些型別我們也希望能全域使用。
   > 在型別宣告中，我們可以直接使用`interface`或`type`來宣告一個全域的介面或型別：
   ```typescript
    interface AjaxSettings {
      method?: 'GET' | 'POST'
      data?: any;
    }

    declare namespace jQuery {
      function ajax(url: string, settings?: AjaxSettings): void;
    }
   ```
   > `type`用法和`interface`差不多，這邊就不細說囉。
   > ※ 不過全域的`interface`和`type`容易有命名衝突的問題，
   >    所以更好的做法是放進`namespace(命名空間)`裡面處理：
   ```typescript
    declare namespace jQuery {
      interface AjaxSettings {
         method?: 'GET' | 'POST'
         data?: any;
      }

      function ajax(url: string, settings?: AjaxSettings): void;
    }
   ```

   ---
   * 1-3. 宣告合併
   > 當你在`declare(全域宣告)`型別時，重複的名稱並不會產生衝突，
   > 而是會合併起來：
   ```typescript
    declare function jQuery(selector: string): any;
    declare namespace jQuery {
      function ajax(url: string, settings?: any): void;
    }

    jQuery('#foo');
    jQuery.ajax('/api/get_something');
   ```

---
- #### 2. 宣告檔案
   > 一般我們會把`宣告語句`單獨放到`.d.ts`的檔案裡面，
   > 所以`.d.ts`就是所謂的`宣告檔案`：

   ```typescript
    // ts/types/jQuery.d.ts
    declare const $: (selector: any) => any;
    declare function jQuery(selector: string): any;
    declare namespace jQuery {
      function ajax(url: string, settings?: any): void;
    }
   ```
   > TS 會解析專案中所有的 `*.ts` 檔案，當然也包含以`.d.ts`結尾的檔案。
   > 所以將 jQuery.d.ts 放到專案裡(和.ts檔放在一起)，
   > 所有`*.ts`檔案就都可以獲得 jQuery 的型別定義了。
   > 如果無法解析，那麼可以檢查 `tsconfig.json` 裡，
   > `files`、`include`和`exclude`的設定，是否包含了 jQuery.d.ts 的所在目錄。
   > 像 Ops 習慣把 `.d.ts` 檔案塞在一起，就需要像下面這樣設定一下`tsconfig.json`。
   ```
    /project
    ├── ts
    |  ├── index.ts
    |  └── types
    |       └── jQuery.d.ts
    └── tsconfig.json
   ```
   ![宣告檔案編譯](https://ithelp.ithome.com.tw/upload/images/20220913/20109918pp3TaemvsZ.png)

---
## 小結：
> 宣告的用意就是和TS介紹這些他不認識的人(套件)
> 這些人有什麼專長、特點，
> 介紹的越詳細，TS遇到他的時候就注意更多細節，
> 所以一些功能很複雜的套件，使用大老們處理好的，
> 省事到極點，`說明書`還是用別人的方便省力，
> 但總有自己做`輪子(套件)`的時候，這時候要附上`說明書`，
> 明天的Prat 2 就來學學怎麼做個輪子使用說明書~
