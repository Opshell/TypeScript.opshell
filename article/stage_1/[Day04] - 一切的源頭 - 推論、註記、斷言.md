![alt](https://)

# 所以說那個Type呢?
   > *既然要學習TypeScript*
   > *那Type就是它的醬汁*
   > *───────────────────────── By Opshell*

---
## 目標：初步了解TypeScript是如何Type的

---
## 過程：
- ### 三種主要的模式
   Title|型別推論|型別註記|型別斷言
   -------------|-------------|-------------|-------------
   英文|Inference|Annotation|Assertion
   模式|被動|主動|主動
   內容|自動推論資料型別|大多使用在初始化階段，例如宣告變數或函式參數等|手動指定、選擇一個值的型別
   後續內容會說|`Inference(推論)`|`Annotation(註記)`|`Assertion(斷言)`

   > 後面文章會總稱他們為Type法(TypeScript化的方式)

---
- ### 看一下他們大概的使用方式 (你告訴TS你要什麼)
   #### 1. `Inference(推論)` (TS猜你要什麼)
   ```JavaScript
    let year = 'Thirty';
    year = 30;
   ```
   > 這段程式在JavaScript完全不會有問題，
   > 但是在TS就會叫了
![alt](https://)
   > 在你宣告時，他會根據的預設的值猜你變數的型別。

---
   #### 2. `Annotation(註記)`
   > 像註解一樣，只是註解的方式變成冒號
   ```typescript
    // JavaScript code
    const plusThirty = function(num) {return num + 30;}

    // TypeScript code
    const typePlusThirty = function(num: number) {return num + 30;}
   ```
   > ※ 型別宣告後，就不能使用其他資料型別進行賦值，否則會報錯
   >    (當然還是會編譯成Js檔)
   >    有效預防錯誤、統一規格、提高可讀性，方便多人協作。


---
   #### 3. `Assertion(斷言)` (我說我要什麼)
   > 雖然有時候變數可能有多種型別，
   > 在需要的時候利用`Assertion(斷言)`，
   > 從多種型別中指定你要的型別。
   > ※ "斷言"有兩種寫法
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

---
   > 下面的例子就是用`Assertion(斷言)`選擇Type：
   ```JavaScript
    // 在JS中，這是很常見的使用方式
    const ops = {}
    ops.year = 30;
    ops.gender = 'man';
   ```
   ```typescript
    // 但是在TS中是會報錯的
    const ops = {}
    ops.year = 30; // Error: property 'year' does not exist on `{}`
    ops.gender = 'man'; // Error: property 'gender' does not exist on `{}`
   ```
   > ops 的型別推論是沒有任何屬性的物件，
   > 因此，不能在屬性上添加 year 或 gender，
   > 這時候透過型別斷言可以避免這個問題

   ``` typescript
    // 先利用 interface 建立一個類別
    // interface 是個原先JavaScript沒有的概念，
    // 對我來說 他有點像個模型，現在先有個印象就可以了，
    // 後面會詳細介紹。
    interface Human {
      year: number;
      gender: string;
    }

    const ops = {} as Human;
    // 或者是
    const ops = <Human>{}

    // 這時候就可以指定資料了
    ops.year = 30;
    ops.gender = 'man';
   ```

   > 這時候也許就會想了，那interface 能不能當作`Annotation(註記)`的型別呢?
   > 測試了一下發現他是會報錯的

   ``` typescript
    interface Human {
      year: number;
      gender: string;
    }
    const ops: Human = {};
   ```
![alt](https://)
   > 使用"型別註解"的方式宣告，需要完整的宣告完他的參數。
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
   > 大概有三種主要的方式與特性來宣告型別。
   > `Inference(推論)`、`Annotation(註記)`、`Assertion(斷言)`
   > 我覺得，這三種沒有誰比較好，在合理運用的情況下，他們可以相輔相成，
   > 有良好的coding體驗的情況下又不會增加太多負擔。
   > 在後面的筆記中，會越來越熟悉如何互相配合。
