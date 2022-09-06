![Day 04-2](https://ithelp.ithome.com.tw/upload/images/20220904/20109918zYSZIgGEC9.jpg)

# 所以說那個Type呢?
   > *Jump有死、火、海*
   > *Type有推、註、言*
   > *───────────────────────── By Opshell*

---
## 目標：初步了解TypeScript是如何Type的
   > [TypeScript]((https://www.typescriptlang.org/))：
   > TypeScript adds additional syntax to JavaScript
   > to support a tighter integration
   > with your editor. Catch errors early in your editor.

   > 翻譯來大概就是：TypeScript 透過增加一些東西來擴展 JavaScript。
   > 增加了什麼? `Types(型別)`、`ECMAScript標準`的實作及擴展等。
   > 整個TypeScript的重點幾乎都在於如何定義程式碼的`Types(型別)`，
   > 那我們開頭先來講講TypeScript定義`Types(型別)`的三種主要概念。

---
## 過程：
- ### 三種主要的模式
   Title|型別推論|型別註記|型別斷言
   -------------|-------------|-------------|-------------
   英文|Inference|Annotation|Assertion
   模式|被動|主動|主動
   內容|自動推論資料型別|大多使用在初始化階段，例如宣告變數、函式參數等|手動指定、選擇一個值的型別
   後續內容會說|`Inference(推論)`|`Annotation(註記)`|`Assertion(斷言)`

   > ※ 後面文章會總稱他們為Type法(Type化的方式)

---
- ### 看一下他們大概的使用方式 (你告訴TS你要什麼)
   #### 1. `Inference(推論)` (TS猜你要什麼)
   ```JavaScript
    let year = 'Thirty';
    year = 30;
   ```
   > 這段程式在JavaScript完全不會有問題，
   > 但是在TS就會叫了

   ![型別錯誤](https://ithelp.ithome.com.tw/upload/images/20220904/20109918vtdUQv0lq6.png)
   > 在你宣告時，他會根據的預設的值猜你變數的型別。

   #### 2. `Annotation(註記)`
   > 像註解一樣，只是註解的方式變成冒號
   ```javascript
    // JavaScript code
    const plusThirty = function(num) {return num + 30;}
   ```
   ```typescript
    // TypeScript code
    const typePlusThirty = function(num: number) {return num + 30;}
   ```
   > ※ 型別宣告後，就不能使用其他型別進行賦值，
   >    否則會報錯(當然還是會編譯成Js檔)，
   >    有效預防錯誤、統一規格、提高可讀性，方便多人協作。

   #### 3. `Assertion(斷言)` (我說我要什麼)
   > 雖然有時候變數可能有多種型別，
   > 在需要的時候利用`Assertion(斷言)`，
   > 從多種型別中指定你要的型別。
   > ※ `Assertion(斷言)`有兩種寫法
   ```typescript
    // 第一種 <型別>值
    let say: any = 'Hello';
    let helloCode = <string>say;
   ```
   ```typescript
   // 第二種 值 as 型別
    let say: any = 'Hello';
    let helloCode = say as string;
   ```
   > ※ 兩種效果相同，若是開發`React`專案使用`JSX`語法時只能用第二種

   > 下面的例子就是用`Assertion(斷言)`選擇Type：
   ```JavaScript
    // 在JS中，這是很常見的使用方式
    const ops = {}
    ops.age = 30;
    ops.gender = 'man';
   ```
   ```typescript
    // 但是在TS中是會報錯的
    const ops = {}
    ops.age = 30; // Error: property 'year' does not exist on `{}`
    ops.gender = 'man'; // Error: property 'gender' does not exist on `{}`
   ```
   > ops 的`Inference(推論)`是沒有任何屬性的物件，
   > 因此，不能在屬性上添加 age 或 gender，
   > 這時候透過`Assertion(斷言)`可以避免這個問題

   ``` typescript
    // 先建立一個 Interface(介面)
    // Interface(介面) 是個原先JavaScript沒有的概念，
    // 對我來說 他有點像個模型，現在先有個印象就可以了，
    // 後面會詳細介紹。
    interface IMember {
      age: number;
      gender: string;
    }

    const ops = {} as Member;
    // 或者是
    const ops = <Member>{}

    // 這時候就可以指定資料了
    ops.year = 30;
    ops.gender = 'man';
   ```
   > 這時候也許就會想了，那`Interface(介面)`能不能當作`Annotation(註記)`的型別呢?
   > 測試了一下發現他是會報錯的

   ``` typescript
    interface IMember {
      age: number;
      gender: string;
    }
    const ops: IMember = {};
   ```
   ![註記物件錯誤](https://ithelp.ithome.com.tw/upload/images/20220904/20109918mXGRZq1bGM.png)
   > 使用`Annotation(註記)`的方式宣告，需要完整的宣告完他的參數。
   > 可以是一種叫做`excess property checking(額外檢查)`的機制，
   > 他會比對每個 Key，解法後面會再提到喔~
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
   > 今天的小例子，應該對TypeScript的型別化方式有一定的了解，
   > 大概有三種主要的方式與特性來宣告型別。
   > `Inference(推論)`、`Annotation(註記)`、`Assertion(斷言)`
   > 我覺得，這三種沒有誰比較好，在合理運用的情況下，他們可以相輔相成，
   > 有良好的coding體驗的情況下又不會增加太多負擔。
   > 在後面的筆記中，會越來越熟悉如何互相配合。
