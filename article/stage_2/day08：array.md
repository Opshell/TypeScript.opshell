![alt](https://)

# 我變 我變 我變變變
> *任何傻瓜都可以寫出電腦看得懂的程式，*
> *但好的程式設計師會寫出人也看得懂的。*
> *───────────────────────── By Kent Beck*

---
## 目標: [Array](https://ithelp.ithome.com.tw/articles/10270427)

---
## 過程：
   - ### - Array
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
   >   - 宣告空陣列：為了避免 `any`
   >   - 需求不定型別：使用`Union(聯集)` 註記

   > ※ 不過會使用TypeScript 很大一部份的原因也是為了提高程式碼的可讀性，
   >    所以一般況還是會使用`Annotation(註記)`法。

---
   #### 3. Array Generic(泛型陣列)
   > 語法：`變數: Array<型別> = []`
   ```typescript
    const team: Array<string> = [ 'Opshell', 'Bear', 'Egg', 'Patty' ];
   ```

   > ※ `Generic(泛型)`是個比較龐大的主題，今天就先混個臉熟。
---
   #### 4. interface (介面)
   > 使用 `interface(介面)` 來描述陣列的形狀，
   ```typescript
    // iFaceStringArray 表示：
    // 只要索引的型別是字串時，
    // 那麼值的型別必須是字串。
    interface iFaceStringArray {
        [index: string]: string;
    }
    const team: iFaceStringArray = ['Opshell', 'Bear', 'Patty', 'Egg' ];
   ```
   ※　雖然 `interface(介面)` 也可以用來描述陣列，
      但是我們一般不會這麼做，因為這種方式比前面的方式麻煩。
      不過有一種情況例外，用它來表示類別陣列。

   ※  `interface(介面)` 也是個複雜的主題，混個臉熟、混個臉熟。

## 小結：
   > 學習完陣列的宣告方式，
   > 除了複習到平常常用的`Annotation(註記)`、`Inference(推論)`外，
   > 對於也很常用的`Union(聯集)` 也越來越熟練，
   > 也提高了閃避`any`的技術，
   > 也和一些後來的花俏技術論了臉熟。
   > 算是蠻有收穫的一天。
