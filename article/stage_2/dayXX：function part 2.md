![alt](https://)

# 這豈不是無敵了??
> *當ES6 裝上了TypeScript，*
> *這豈不是無敵了?!。*
> *───────────────────────── By Opshell*
![alt](https://)

---，。
## 目標: 學會Function 的Type法
   > 作為JavaScript 中常用到的的部分，
   > 在 ES6 終於普及後有了更多花式的玩法，
   > `Arrow Funciton`、參數預設值、`...rest (其餘運算子)`，
   > 簡直就是天堂!!
   > 在 TypeScript 中 當然有許多裝備可以配合這些花式玩法，
   > 就讓我們一起看下去。

---

[interfaces & 過載](https://willh.gitbook.io/typescript-tutorial/basics/type-of-function)
[interfaces2](https://pjchender.dev/typescript/ts-functions/)

## 過程：
   ### 1. Type Alias 定義函式型別
   ```typescript
    type tFullName = (firstname: string, lastname: string) => string;

    const combinName: tFullName = (firstname, lastname) => {
      // 字首轉大寫
      firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
      lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);

      return `Hello ${lastname} ${firstname}, Welcome to typeScript.`;
    };

    console.log(combinName('Liu', 'opshell')); // Hello Opshell Liu, Welcome to typeScript.
   ```

---
   ### 2. Interface 定義函式型別
   ```typescript
    interface iFaceStrChk {
      (paragraph: string, keyword: string): boolean;
    }

    const checkKeyword: iFaceStrChk = (paragraph, keyword) => {
      return paragraph.search(keyword) !== -1;
    }

    console.log(checkKeyword('Hello world !', 123)); // 報錯 類型number 無法指定給 string
    console.log(checkKeyword('Hello world !', 'llo')); // true
    console.log(checkKeyword('Hello world !', 'lle')); // false
   ```

   > 花式

---
   ### 3. Function Overload (函式超載)
   > `Overload(超載)`允許一個函式接受不同數量或型別的引數時，作出不同的處理。
   > 比如，我們需要實現一個函式 reverse，輸入數字 123 的時候，輸出反轉的數字 321，輸入字串 'hello' 的時候，輸出反轉的字串 'olleh'。
   > 利用聯合型別，我們可以這麼實現：
   ```typescript
    function reverse(x: number | string): number | string {
      if (typeof x === 'number') {
         return Number(x.toString().split('').reverse().join(''));
      } else if (typeof x === 'string') {
         return x.split('').reverse().join('');
      }
    }
   ```
   > 然而這樣有一個缺點，就是不能夠精確的表達，輸入為數字的時候，輸出也應該為數字，輸入為字串的時候，輸出也應該為字串。
   > Function Overload 會包含兩個部分：
   > - overload signatures：也就是 type definition 的部分
   > - function implementation：實際上執行的 function，它的型別需要滿足所有的 overload signatures
   > 這時，我們可以使用過載定義多個 reverse 的函式型別：
   ```typescript
    function reverse(x: number): number;
    function reverse(x: string): string;
    function reverse(x: number | string): number | string {
      if (typeof x === 'number') {
         return Number(x.toString().split('').reverse().join(''));
      } else if (typeof x === 'string') {
         return x.split('').reverse().join('');
      }
    }
   ```
   > 上例中，我們重複定義了多次函式 reverse，前幾次都是函式定義，最後一次是函式實現。在編輯器的程式碼提示中，可以正確的看到前兩個提示。
   > 成功使用 function overload 之後，VSCode 的 parameter hints 會跳出提示來說明可用的 function signatures：
   > ※ 注意，TypeScript 會優先從最前面的函式定義開始匹配，所以多個函式定義如果有包含關係，需要優先把精確的定義寫在前面。

---
## 小結：
   > 今天會了Funciton的Type法
   > 而且更了解了 ES6 的`其餘預算子`
   > 對於型別的Type法也更熟練了
   > 明天繼續學習 Funciton的 Types法，
   > ~~這麼有料的東西怎麼可以一天水完?~~
