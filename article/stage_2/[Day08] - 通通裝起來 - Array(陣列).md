![alt](https://)

# 這個那個不要，剩下的通通裝起來。
> *數到三：0、1、2、3*
> *Array index 從 0 開始無誤*
> *───────────────────────── By Kent Beck*

---
## 目標: Array Type 法
   > 在 TypeScript 中， 大約有四種方式可以來定義`陣列`型別

---
## 過程：
   - ### 1. Array Inference(推論)
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
   > ※ 這時候TS會聰明的`Inference(推論)`成 `Union Type(聯型別集)` (string | number)[] 喔。

   > 這時候就要提到一個原先JavaScript不存在的概念`Tuple(元組)`
   > `Array(數組)`放型別相同的，而`Tuple(元組)`則是放不同的。
   > 而使用上面的例子：
   ```typescript
    const team: [ number, string, string, number ] = [ 0, 'Opshell', 'Bear', 233 ];
    const team2: [ number, string, string, number ] = [ 1, 'Patty', 'Egg', 7351 ];
   ```
   > 是`Tuple(元組)`的`Annotation(註記)`方式，
   > 但是這種方式在資料多點的時候麻煩到炸阿...
   > 簡單點的方法是利用`Type Alias(別名)`的技巧：
   > 語法 `type 別名: 型別`;
   ```typescript
    type teamTuple = [ number, string, string?, number? ];

    const team: teamTuple = [ 0, 'Opshell', 'Bear', 233 ];
    const team2: teamTuple = [ 1, 'Patty' ];
   ```
   > 如果再宣告型別後面加`?`即表示可選參數喔~
   > 那`Array(數組)`和`Tuple(元組)`有哪些差異呢?

   型別|`Array(數組)`|`Tuple(元組)`
   -------------|-------------|-------------
   註記方式| (number | string) | [ number, string, string, number]
   限制| 只要型別一樣即可 | 順序必須和宣告的吻合，且不能多

   > 不過使用元組的機會非常少，至少Ops是這樣認為的，
   > 基本上當你塞進去的資料型別不一樣，那大部分都是有意義的，
   > 這時候使用`Object(物件)`或者是`Interfaces(介面)`不是更清楚和方便呼叫嗎@"@?

---
   - ### 2. Array Annotation(註記)
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
   - ### 3. Array Generic(泛型陣列)
   > 語法：`變數: Array<型別> = []`
   ```typescript
    const team: Array<string> = [ 'Opshell', 'Bear', 'Egg', 'Patty' ];
   ```

   > ※ `Generic(泛型)`是個比較龐大的主題，今天就先混個臉熟。

---
   - ### 4. interface (介面)
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

---
## 小結：
   > 學習完陣列的宣告方式，
   > 除了複習到平常常用的`Annotation(註記)`、`Inference(推論)`外，
   > 對於也很常用的`Union(聯集)` 也越來越熟練，
   > 也提高了閃避`any`的技術，
   > 也和一些後來的花俏技術論了臉熟。
   > 算是蠻有收穫的一天。
