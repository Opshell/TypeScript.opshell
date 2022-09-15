![Day 07](https://ithelp.ithome.com.tw/upload/images/20220907/20109918KYTx5tuz9P.jpg)

# 自己做輪子
> *任何傻瓜都可以寫出電腦看得懂的程式，*
> *但好的程式設計師會寫出人也看得懂的。*
> *───────────────────────── By Kent Beck*

---
## 目標：檔案宣告
   > 昨天學會了怎麼`全域宣告`然後做成`宣告檔案`，
   > 但當今天你做的`說明書`想要讓別人使用時，
   > 還是要遵守一些規則，讓其他人能順利使用，
   > 今天來講講這些規範。

---
## 過程
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

- ### npm 套件匯入、匯出
   > npm 套件的宣告檔案與全域變數的宣告檔案有很大區別。
   > 在 npm 套件的宣告檔案中，使用`declare`不再會宣告一個全域變數，
   > 而只會在當前檔案中宣告一個區域性變數。
   > 只有在宣告檔案中使用 `export` 匯出，然後在使用`import`匯入後，
   > 才會應用到這些型別宣告。
   > ※ 宣告檔案中無法實作功能，只能定義型別。

   ---
   #### 1. export
   > `export`的語法與普通的TS中的語法類似。
   ```typescript
    // types/member/index.d.ts
    export const title: string;
    export function getTitle(): string;
    export class summary {
      constructor(title: string);
      sayHello(): string;
    }
    export enum team { Opshell, Bear, Patty }
    export interface Options {
      data: any;
    }
   ```
   > 而使用上：
   ```typescript
    // ts/index.ts
    import { title, getTitle, summary, team, Options } from 'member';

    console.log(title);
    let myName = getTitle();
    let Opshell = new summary('Opshell');
    let team = [ team.Opshell, team.Bear, team.Patty ];
    let options: Options = {
      data: {
         age: 30
      }
    };
   ```
   > 我們也可以使用`declare`先宣告多個變數，最後再用`export`一次性匯出。
   > `namespace`等方式同理，上例的宣告檔案可以等價的改為：
   ```typescript
    // types/foo/index.d.ts
    export { name, getName, Animal, Directions, Options };

    declare const title: string;
    declare function getTitle(): string;
    declare class summary {
      constructor(title: string);
      sayHello(): string;
    }
    declare enum Team { Opshell, Bear, Patty }
    interface Options {
      data: any;
    }
   ```
   > 在`ES6 module`模組系統中，使用`export default`可以匯出一個預設值，
   > 使用方可以用 import foo from 'foo' 而不是 import { foo } from 'foo' 來匯入這個預設值。
   ```typescript
    export default function foo(): string;
   ```
   > ※ 注意，只有`function`、`class`和`interface`可以直接預設匯出，
   >    其他的變數需要先用`declare`定義出來，再預設匯出。
   > ※ 針對先宣告再預設匯出，我們一般會將匯出語句放在整個宣告檔案的最前面。

   #### 2. export =
   > 在`commonjs規範`中，我們用以下方式來匯出一個模組：
   ```typescript
    // 整體匯出
    module.exports = foo;
    // 單個匯出
    exports.bar = bar;
   ```
   > 在TS中，針對`commonjs規範`的模組匯出，有多種方式可以匯入：

   * 2-1 `const ... = require`：
   ```typescript
    // 整體匯入
    const foo = require('foo');
    // 單個匯入
    const bar = require('foo').bar;
   ```

   * 2-2 `import ... from`：
   > ※ 整體匯出，需要使用 import * as 來匯入：
   ```typescript
    // 整體匯入
    import * as foo from 'foo';
    // 單個匯入
    import { bar } from 'foo';
   ```

   * 2-3 import ... require，這也是TS官方推薦的方式：
   ```typescript
    // 整體匯入
    import foo = require('foo');
    // 單個匯入
    import bar = foo.bar;
   ```
   > 對於使用`commonjs規範`的套件，假如要為它寫`宣告檔案`的話，就需要使用到 `export =` 這種語法了
   ```typescript
    // types/foo/index.d.ts
    export = foo;

    declare function foo(): string;
    declare namespace foo {
      const bar: number;
    }
   ```
   > ※ 上例中使用了 export = 之後，就不能再單個匯出 export { bar } 了。
   >    所以我們透過宣告合併特性，使用 `declare namespace` 來將 bar 合併到 foo 裡。
   > ※ export = 不僅可以用在宣告檔案中，也可以用在普通的TS檔案中。
   >    實際上，import ... require 和 export = 都是TS為了相容 `AMD規範`和 `commonjs規範`而創立的新語法，
   >    但不常、也不推薦使用，所以就不詳細介紹了，感興趣的可以看官方文件。
   >    但是很多第三方套件是`commonjs規範`，所以宣告檔案也就不得不用到 `export =` 這種語法了。
   > ※ 題外話Ops更偏好 `ES6 module`標準的 `export default` 和 `export`。

---
## 小結
> 今天講了皮毛的`import`與`export`，
> 大概只學到了稍微看得懂大神在做什模的程度
> 但是TS的型別檔水可是很深的，
> 各位可以參考延伸閱讀，講的簡單明瞭又詳細。

---
## 延伸閱讀
- ### will 保哥翻譯的[TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial/basics/declaration-files#quan-yu-bian-shu)
