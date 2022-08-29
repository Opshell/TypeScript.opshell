![alt](https://)

# 我變 我變 我變變變
> *任何傻瓜都可以寫出電腦看得懂的程式，*
> *但好的程式設計師會寫出人也看得懂的。*
> *───────────────────────── By Kent Beck*
![alt](https://)

---，。

## 目標: [Array](https://ithelp.ithome.com.tw/articles/10270427)
   > 首先我們可以先想想如何讓型別轉換這件事被複用，
   > 我們不妨把想法簡單化，就是建立一個 function 把 A 型態轉換成 B 型態，
   > 而這時候就必須要利用 TypeScript 中的 `Generics 泛型`這個技巧了。

   > 泛型（Generics）是指在定義function、interfaces或class的時候，
   > 不預先指定具體的型別而在使用的時候再指定型別的一種特性。
---

## 過程：
   ### - Array
   > 在 TypeScript 中， 有四種方式可以來定義陣列型別

   #### 1. Array Inference(推論)
   > 當你宣告陣列，內容為同型別的元素時，
   > TypeScript會自動`Inference(推論)`，
   > 將他們當 `T[]` 來推論。
   > 語法：`變數 = []`(像一般JS般的宣告)
   ```typescript
    // TS "推論" team 為 string[] 型別。
    const team = [ 'Opshell', 'Bear', 'Egg', 'Patty' ];
   ```

   > 那會有人問啦，如果我是混合型態的陣列呢?
   ```typescript
    const team = [ 0, 'Opshell', 'Bear', 233 ];
   ```
   > ※ 這時候TS會聰明的成 `Union Type(聯型別集)` (string | number)[] 喔。

---
   #### 2. Array Annotation(註記)
   > 語法：`變數: 型別[] = []`
   ```typescript
    // string[] 表示此陣列型別只允許字串
    const team: string = [ 'Opshell', 'Bear', 'Egg', 'Patty' ];

    // 將team 註記為 Union Type Array
    let team: (string | null)[] = [];
   ```
   > ※ 一般情況來說，TS的`Inference(推論)`會準確的推論使用者的需求，
   >    只有為了下面的情況會比較積極的`Annotation(註記)`：
   >   - 宣告空陣列：為了避免 Any
   >   - 需求不定型別：使用`Union(聯集)` 註記

   > ※ 不過會使用TypeScript 很大一部份的原因也是為了提高程式碼的可讀性，
   >    所以一般況還是會使用`Annotation(註記)`法。

---
   #### 3. Array Generic (泛型陣列)
   > 語法：`變數: Array<型別> = []`
   ```typescript
    const team: Array<string> = [ 'Opshell', 'Bear', 'Egg', 'Patty' ];
   ```

   > ※ 泛型是個比較龐大的主題，今天就先混個臉熟。
---
   #### 4. interface (介面)
   > 使用 interface 來描述陣列的形狀，
   ```typescript
    // iFaceStringArray 表示：
    // 只要索引的型別是字串時，
    // 那麼值的型別必須是字串。
    interface iFaceStringArray {
        [index: string]: string;
    }
    const team: iFaceStringArray = ['Opshell', 'Bear', 'Patty', 'Egg' ];
   ```
   ※　雖然 interface 也可以用來描述陣列，
      但是我們一般不會這麼做，因為這種方式比前面的方式麻煩。
      不過有一種情況例外，用它來表示類別陣列。

   ※  interface 也是個複雜的主題，混個臉熟、混個臉熟。

## 小結：
   > 學習完陣列的宣告方式，
   > 除了複習到平常常用的`Annotation(註記)`、`Inference(推論)`外，
   > 對於也很常用的`Union(聯集)` 也越來越熟練，
   > 也提高了閃避`any`的技術，
   > 也和一些後來的花俏技術論了臉熟。
   > 算是蠻有收穫的一天。

---
   ### - Function
   #### 1. Parameter Type Annotations 參數型別註釋
   > 在參數後面添加`:資料型別`來定義這個 function 接受什麼型別的參數。
   ```typescript
    function member(name: string) {
        console.log("Hello, " + name.toUpperCase() + "!!");
    }
   ```
   #### 2. Return Type Annotations 返回值型別註釋
   > 語法：`(參數): 要返回的型別`。
   ```typescript
    function member(name: string): string {
        return `Hello ${name}`;
    }
   ```

   ### 2. Arrow Function 箭頭函式
   ```typescript
    let member = (name: string): string => `Hello ${name}`;
   ```

   ### 3. Anonymous Functions 匿名函式
   > 在 TypeScript 中使用匿名函數時， 他會自動去推斷參數型別。我們來看看例子：
   ```typescript
    const names = ["Alice", "Bob", "Eve"];
    // TypeScript 會自動names這個變數是字串陣列，
    // 帶入的參數為字串。
    names.forEach( (s) => {
        console.log(s.toUpperCase());
    });
   ```
---
## 小結：
   > 學習完所謂的列舉，
   > 會發現原生的JavaScript Object
   > 就能簡易的實現大部分的功能，
   > Enum最主要的差別就是提高了他的可讀性，
   > 更易於管理。
