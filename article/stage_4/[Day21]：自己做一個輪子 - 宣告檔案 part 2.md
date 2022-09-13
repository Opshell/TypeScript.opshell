![Day 07](https://ithelp.ithome.com.tw/upload/images/20220907/20109918KYTx5tuz9P.jpg)

# 自己做輪子
> *任何傻瓜都可以寫出電腦看得懂的程式，*
> *但好的程式設計師會寫出人也看得懂的。*
> *───────────────────────── By Kent Beck*

---
## 目標:檔案宣告
   > 今天我們要蓋網站，一般來說都不會自己造輪子，
   > 但是你要用別人的輪子，TypeScript看不懂，會哀哀叫。
   > 所以使用套件時，我們需要參考它的宣告檔案，
   > 才能獲得對應的程式碼自動完成、介面提示等功能。

---
## 過程
- ### 用大神的輪子
   > 一般我們透過 `import foo from 'foo'` 匯入一個 npm 套件，這是符合 `ES6 模組`規範的。
   > 在我們自己宣告套件型別前，可以看看需要先看看它的宣告檔案是否已經存在。

   > 套件的宣告檔案可能存在於兩個地方：
   > * 與該套件繫結在一起：
   >   package.json 中有 types 欄位，或者有一個 index.d.ts 宣告檔案。
   >   這種模式不需要額外安裝其他包，是最方便好用的。

   > * 釋出到`@types`裡。我們只需要嘗試安裝一下對應的`@types`包就知道是否存在該宣告檔案。
   >   安裝命令是：
   >   ```shell
   >    yarn add @types/foo -D。
   >   ```
   >   這種模式一般是由於套件的維護者沒有提供宣告檔案，所以由其他大神將宣告檔案共享到`@types`裡。
   > ※ 當然也可以在[這邊](https://www.typescriptlang.org/dt/search?search=)搜尋看看在。

---
- ### 自己做的輪子
   > 如果上面兩種方式都找不到輪子，那大概就要自己做了，
   > 由於是透過 `import` 匯入的模組，
   > 所以宣告檔案存放的位置也有一定的規則，
   > 一般有兩種方案：

   > * 建立一個 `node_modules/@types/foo/index.d.ts` 檔案，存放 foo 模組的宣告檔案。
   >   這種方式不需要額外的設定，但是 `node_modules` 不穩定，程式碼也沒有被儲存到儲存庫中，
   >   無法回溯，有不小心被刪除的風險，一般只用作臨時測試。

   > * 建立一個 `types` 目錄，專門用來管理自己寫的宣告檔案，將 foo 的宣告檔案放到 `types/foo.d.ts` 中。
   >   這種方式需要設定 `tsconfig.json` 裡，
   >   `paths` 、 `baseUrl`、`files`、`include` 和 `exclude` 等欄位。看需求：
   ```git
    /project
    ├── ts
    |  ├── index.ts
    |  └── types
    |       └── foo.d.ts
    └── tsconfig.json
   ```
   ![tsconfig.json](https://)

---
- ###
   > npm 套件的宣告檔案與全域變數的宣告檔案有很大區別。
   > 在 npm 套件的宣告檔案中，使用 declare 不再會宣告一個全域變數，
   > 而只會在當前檔案中宣告一個區域性變數。
   > 只有在宣告檔案中使用 export 匯出，然後在使用方 import 匯入後，
   > 才會應用到這些型別宣告。
   > export 的語法與普通的 ts 中的語法類似，區別僅在於宣告檔案中禁止定義具體的實現

   ---
   #### 1. export
   ```typescript
    // types/foo/index.d.ts
    export const name: string;
    export function getName(): string;
    export class Animal {
      constructor(name: string);
      sayHi(): string;
    }
    export enum Directions {
      Up,
      Down,
      Left,
      Right
    }
    export interface Options {
      data: any;
    }
   ```
   > 我們也可以使用 `declare` 先宣告多個變數，最後再用 export 一次性匯出。
   > namespace 等方式同理，上例的宣告檔案可以等價的改寫為
   ```typescript
    // types/foo/index.d.ts
    declare const name: string;
    declare function getName(): string;
    declare class Animal {
      constructor(name: string);
      sayHi(): string;
    }
    declare enum Directions {
      Up,
      Down,
      Left,
      Right
    }
    interface Options {
      data: any;
    }

    export { name, getName, Animal, Directions, Options };
   ```
   > 在 ES6 模組系統中，使用 export default 可以匯出一個預設值，
   > 使用方可以用 import foo from 'foo' 而不是 import { foo } from 'foo' 來匯入這個預設值。
   ```typescript
    export default function foo(): string;
   ```
   > ※ 注意，只有 function、class 和 interface 可以直接預設匯出，其他的變數需要先定義出來，再預設匯出。
   >    針對先宣告再預設匯出，我們一般會將匯出語句放在整個宣告檔案的最前面。

   > export =
   >　在 commonjs 規範中，我們用以下方式來匯出一個模組：


   ```typescript
    // 整體匯出
    module.exports = foo;
    // 單個匯出
    exports.bar = bar;
   ```
   > 在 ts 中，針對這種模組匯出，有多種方式可以匯入，第一種方式是 const ... = require：
   ```typescript
    // 整體匯入
    const foo = require('foo');
    // 單個匯入
    const bar = require('foo').bar;
   ```
   > 第二種方式是 import ... from，注意針對整體匯出，需要使用 import * as 來匯入：
   ```typescript
    // 整體匯入
    import * as foo from 'foo';
    // 單個匯入
    import { bar } from 'foo';
   ```
   > 第三種方式是 import ... require，這也是 ts 官方推薦的方式：
   ```typescript
    // 整體匯入
    import foo = require('foo');
    // 單個匯入
    import bar = foo.bar;
   ```
   > 對於這種使用 commonjs 規範的函式庫，假如要為它寫型別宣告檔案的話，就需要使用到 export = 這種語法了
   ```typescript
    // types/foo/index.d.ts
    export = foo;

    declare function foo(): string;
    declare namespace foo {
       const bar: number;
    }
   ```
   > 需要注意的是，上例中使用了 export = 之後，就不能再單個匯出 export { bar } 了。
   > 所以我們透過宣告合併，使用 declare namespace foo 來將 bar 合併到 foo 裡。
   > 準確地講，export = 不僅可以用在宣告檔案中，也可以用在普通的 ts 檔案中。
   > 實際上，import ... require 和 export = 都是 ts 為了相容 AMD 規範和 commonjs 規範而創立的新語法，
   > 由於並不常用也不推薦使用，所以這裡就不詳細介紹了，感興趣的可以看官方文件。
   > 由於很多第三方函式庫是 commonjs 規範的，所以宣告檔案也就不得不用到 export = 這種語法了。
   > 但是還是需要再強調下，相比與 export =，我們更推薦使用 ES6 標準的 export default 和 export。

   ```typescript
    // src/index.ts
    import { name, getName, Animal, Directions, Options } from 'foo';

    console.log(name);
    let myName = getName();
    let cat = new Animal('Tom');
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    let options: Options = {
      data: {
         name: 'foo'
      }
    };
   ```

---
## 小結
> 大概講了全域宣告，和使用大神做的型別檔之後，
> 在後面的使用上不再會一頭霧水，起碼知道在做什麼，
> 但是TS的型別檔水可是很深的，
> 各位可以參考延伸閱讀，講的簡單明瞭又詳細。

---
## 延伸閱讀
- ### will 保哥翻譯的[TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial/basics/declaration-files#quan-yu-bian-shu)
