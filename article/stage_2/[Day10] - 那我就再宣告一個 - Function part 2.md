![Day10 Banner](https://ithelp.ithome.com.tw/upload/images/20220910/20109918LiHjP7G10H.jpg)

# 沒想到還可以超載起來
   > *一個function不夠?*
   > *那我就再宣告一個。*
   > *───────────────────────── By Opshell*

---
## 目標: 學會 Function 的 Type法 Part2
   > 今天來把剩下常用的function type 法來學完，
   > `Alias(別名)` 、`Interface(介面)`和很酷的`Overload(超載)`，
   > 而且透過這些有趣的東西來稍微複習、熟悉我們前面學習的。

---
## 過程：
- ### 1. Alias(別名)
   > 語法：`type 類型名稱 = (參數: 型別) => 型別`;
   ```typescript
    type tFullName = (firstname: string, lastname: string) => string;

    // 字首轉大寫
    const upWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

    const combinName: tFullName = (firstname, lastname) => {
      return `Hello ${upWord(lastname)} ${upWord(firstname)}, Welcome to typeScript.`;
    };

    console.log(combinName('Liu', 'opshell')); // Hello Opshell Liu, Welcome to typeScript.
   ```
   > 除了`Alias(別名)` 的範例以外，
   > 順便複習了 箭頭函式 + 函式`Inference(推論)`，
   > 可以在 ts 中確認兩個函式的的型別，會有更多的了解和熟悉度。

   ![參數](https://ithelp.ithome.com.tw/upload/images/20220910/201099184VlyKZpw5Y.png)

---
- ### 2. Interface(介面)
   > 和前面的`Alias(別名)`
   > 非常的接近，在前一篇 funciton part 1 提到的，
   > 等號賦值 + `Inference(推論)` 的特性，
   > 可以在上面`Alias(別名)`的例子和下面這個，
   > 都可以很明顯看出這個特性，
   > 不需要使用完整的型別陳述：
   ```typescript
    interface IFaceStrChk {
      (paragraph: string, keyword: string): boolean;
    }

    const checkKeyword: IFaceStrChk = (paragraph, keyword) => {
      // 如果再 Ts 中 查看paragraph 或 keyword 都會告訴你是string
      return paragraph.search(keyword) !== -1;
    }

    console.log(checkKeyword('Hello world !', 123)); // 報錯 類型number 無法指定給 string
    console.log(checkKeyword('Hello world !', 'llo')); // true
    console.log(checkKeyword('Hello world !', 'lle')); // false
   ```

---
- ### 3. Overload (超載)
   > `Overload(超載)`允許一個函式接受不同數量或型別的引數時，作出不同的處理。
   > 我們有一個反轉輸入的需求，做成一個函式 reverse，
   > 輸入數字 123 的時候，輸出反轉的數字 321，輸入字串 'hello' 的時候，輸出反轉的字串 'olleh'。
   > 我們會想到利用`Union(聯集)`型別：
   ```typescript
    function reverse(word: number | string): number | string {
      if (typeof word === 'number') {
         return Number(word.toString().split('').reverse().join(''));
      } else if (typeof word === 'string') {
         return word.split('').reverse().join('');
      }
    }
   ```
   > 但`Union(聯集)`輸入與輸出同時使用時有個問題，沒辦法精確的表達輸入與輸出的對應關係，
   > reverse 在輸入數字的時候，輸出也應該是數字，輸入字串的時候，輸出也應該是字串。
   > 這時候就可以使用 `Overload(超載)`技巧。
   > `Overload(超載)`會包含兩個部分：
   > - `overload signatures`：也就是函式輸入輸出對應的部分
   > - `function implementation`：實際上執行的 function，它的型別需要滿足所有的 `overload signatures`

   ```typescript
    // overload signatures => `type definition`(型別定義)`
    function nsReverse(word: number): number; // 數字
    function nsReverse(word: string): string; // 字串

    // 可以隔開也沒關係
    // function implementation 實現 funciton 功能
    function nsReverse(word: number | string): number | string {
      if (typeof word === 'number') {
         return Number(word.toString().split('').reverse().join(''));
      } else {
         return word.split('').reverse().join('');
      }
    }

    console.log(nsReverse('aerg')); // grea
   ```
   > 例子中重複定義了多次函式 reverse，前幾次都是函式對照定義，最後一次是函式實現。
   > 成功使用函式`Overload(超載)` 之後，VSCode 的  會跳出提示來說明可用的 `function signatures`
   > ※ VSCode 的`parameter hints(鑲嵌提示)`功能，可以這樣啟用它：在settings.json中添加：
   >   "javascript.inlayHints.parameterNames.enabled": "all",
   ![鑲嵌提示](https://ithelp.ithome.com.tw/upload/images/20220910/20109918Bsx5Tgx89e.png)
   > > ※ 注意，TypeScript 會優先從最前面的函式定義開始匹配，所以多個函式定義如果有包含關係，需要優先把精確的定義寫在前面。

---
## 小結：
   > 終於把Function Type法學完啦，
   > 沒想到常用的 JS funciton 會有這麼多種花樣的 Type 方式，
   > ~~居然讓我水了兩天~~
   > 明天就要進入Object的世界啦~
   > 大家期不期待呢?

---
# 章節小結：
   > 沒想到跌跌撞撞的也到了第10天，
   > 在這邊學到了`複合型別`，`Function(函式)`的Type，
   > 算是學到了個人覺得TypeScript中很常會使用到的部分，
   > 各種Type法也越來越熟練了，
   > 在每篇文章中都會重複的稍為提及一些較為複雜的東西，
   > 讓大家可以對他們有個熟悉度，
   > 在之後的章節中能夠更容易的上手，
   > 如果現在看到，對他們還不是很熟悉也不用緊張喔~
   > 就讓我們下個章節見吧。
