![alt](https://)

# 所以說那個Type呢?
> *既然要學習TypeScript*
> *那Type就是它的醬汁*
> *───────────────────────── By Opshell*
---

## 目標：初步了解TypeScript的Type概念

## 過程：
- ### 三種主要的模式
    Title|型別註解|型別推論|型別斷言
    -------------|-------------|-------------|-------------
    英文|annotation|Inference|Assertion
    模式|主動|被動|主動
    內容|大多使用在初始化階段，例如宣告變數或函式參數等|自動推論資料型別的機制|通常用於接收外部參數，需明確指定資料型別
---
- ### 看一下他們大概的使用方式
    1. #### 型別註記 (像註解一樣，只是註解的方式變成冒號↓↓↓
    ```JavaScript
    // JavaScript code
    const plusThirty = function(num) {return num + 30;}
    ```
    ```typescript
    // TypeScript code
    const plusThirty = function(num: number) {return num + 30;}
    ```
    > ※型別宣告後，就不能使用其他資料型別進行賦值，否則會報錯
    >   (當然還是會編譯成Js檔)
    >  有效預防錯誤、統一規格、提高可讀性，方便多人協作。
    ---

    2. #### 型別推論 (TS猜你要什麼)
    ```JavaScript
    let year = 'Thirty';
    year = 30;
    ```
    > 這段程式在JavaScript完全不會有問題
    > 但是在TS就會叫了，像這樣↓↓↓
    ![alt](https://)
    > 這是TS的被動防護機制
    > 在你宣告時，他會猜你的變數型別
    ---

    3. #### 型別斷言 (我說我要什麼)
    > 雖然在一般情況下都會利用"型別註解"讓Ts不要用"型別推論"陰到你
    > 但是可能在一些情況下還是會有推論的情況產生，
    > 就會需要利用"型別斷言"來整救你了。
    > ※ "斷言"有兩種寫法
    ```typescript
    // 第一種 <型別>值
    let say:any = 'Hello';
    let helloCode = <string> say;
    ```
    ```typescript
    // 第二種 值 as 型別
    let say:any = 'Hello';
    let helloCode = say as string;
    ```
    > ※ 兩種效果相同，若是開發React專案使用JSX語法時只能用第二種
    ---
    > 下面的例子就是用"斷言"覆蓋"推論"：
    ```JavaScript
    // 在JS中，這是很常見的使用方式
    const ops = {}
    ops.year = 30;
    ops.gender = 'man';
    ```
    ```typescript
    // 但是在TS中是會報錯的
    const ops = {}
    ops.year = 30; // Error: property 'bar' does not exist on `{}`
    ops.gender = 'man'; // Error: property 'bar' does not exist on `{}`
    /** ops 的型別推論是沒有任何屬性的物件，
     *  因此，不能在屬性上添加 year 或 gender，
     *  這時候透過型別斷言可以避免這個問題↓↓↓
     */
    // 先利用 interface 建立一個類別
    interface Human {
        year: number;
        gender: string;
    }

    const ops = {} as Human;
    // 或者是
    const ops = <Human> {}

    // 這時候就可以指定資料了
    ops.year = 30;
    ops.gender = 'man';
    ```
    > 這時候也許就會想了，那interface 能不能當作"型別註解"的型別呢?
    > 測試了一下發現他是會報錯的
    ``` typescript
    interface Human {
        year: number;
        gender: string;
    }
    const ops: Human = {};
    ```
    ![alt](https://)
    > 使用"型別註解"的方式宣告，需要完整的宣告完他的參數。↓↓↓
    ``` typescript
    interface Human {
        year: number;
        gender: string;
    }
    const ops: Human = {
        year: 30,
        gender: 'man'
    };
    ```
---
## 小結：
   > 今天的小例子，應該對TypeScript的型別使用方式有一定的了解，
   > ~~也對她使用上出現的麻煩有了感受~~
   > 大概有三種主要的方式與特性來宣告型別。
   > 註解 ~~一開始就講好~~、推論 ~~TS猜~~、斷言 ~~我說了算~~

---
# 章節小結：
   > 第一章結的內容就到這邊
   > 相信大家對TypeScript是什麼、有什麼用、為什麼要用、該怎麼用
   > 都有了一定的認知，
   > 也有可能會覺得好像真的不是很難，
   > 但事情不是我們想的這麼簡單，一坑還有一坑坑，
   > 在後續的幾天，會用例子和大家一起學習，
   > 希望會對它的有更多的認知~~到底有甚麼用~~。
   > 我們明天見~!
