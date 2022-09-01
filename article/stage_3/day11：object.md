![alt](https://)

# 這豈不是無敵了??
	> *當ES6 裝上了TypeScript，*
	> *這豈不是無敵了?!。*
	> *───────────────────────── By Opshell*

---
## 目標: 學會Object 的Type法，理解什麼是 `Interfaces(介面)`
   > 物件導向的語言中，`Interfaces(介面)`是一個很重要的概念，
   > 它是對行為的一種抽象，如何運作則由`classes(類別)`去`implement(實現)`。

   > 而在TypeScript 中的`Interfaces(介面)`是一個非常靈活的概念，
   > 除了可用於對`classes(類別)`的一部分行為進行抽象以外，
   > 也很常用描述`object(物件)`的`Shape(形狀)`。

https://magiclen.org/typescript-object/
https://ithelp.ithome.com.tw/articles/10269828
https://willh.gitbook.io/typescript-tutorial/basics/type-of-object-interfaces
https://ithelp.ithome.com.tw/articles/10214840

---
## 過程：
   - ### 1. 大括號 {} 物件
   > 語法：`物件名稱: {} = {}`
   ```javascript
    // JavaScript Code
    let o = {
        name: "David",
        age: 18,
        toString: function () {
            return `${this.age}: ${this.name}`;
        },
    };

    console.log(o.toString());
   ```

   ```typescript

   ```



   > 有經驗的大大看到這個funciton第一個想法是，
   > 到底是數字相加呢? 還是字串相加呢?
   > 沒錯TypeScript 也一樣，
   > 那會怎樣? 沒錯TypeScript會直接把萬惡的`any`拿出來用。
   > 所以說，一般的funciton 都會積極`Annotation(註記)` 輸入和輸出。
   > 像這樣：

   ```typescript
    function add(num1: number, num2: number): number {
      // 是不是就能明顯看出這個function在做甚麼了呢?
      return num1 + num2;
    }
   ```
   > ※ 但是`Annotation(註記)`是沒辦法多輸入或少輸入參數的，
   >    有需求可以使使用`optional parameter(可選參數)`
   >    語法：`參數?:型別`(沒錯，就是加個? 就是這麼形象)
   ```typescript
    function add(num1: number, num2?: number): number {
      num2 = num2 || 0;
      return num1 + num2;
    }
   ```
   > ※ `optional parameter(可選參數)`是不能放在`required parameter(必填)`的前面。

   > 在`ES6`後，終於允許我們給函式參數新增預設值了，
   > 而在TypeScript中會自動把有預設值的參數視為`optional parameter(可選參數)`，
   ```typescript
    function add(num1: number, num2: number = 0): number {
      return num1 + num2;
    }

    console.log(add(1)); // 1
   ```
   > ※ 帶預設值的`optional parameter(可選參數)`可以放在`required parameter(必填)`的前面，
   >    放最前面又不填的情況下，要給 `undefined`。

---
   - ### 2. 匿名函式Type法
   ```typescript
    const add = function(num1: number, num2: number): number {
      return num1 + num2;
    }
   ```
   > ※ 其實上面的Type法是透過等好ˋ賦值`Inference(推論)`出add的型別，
   >    完整`Annotation(註記)`的寫法是：
   ```typescript
    const add: (num1: number, num2: number) => number = function(num1: number, num2: number): number {
      return num1 + num2;
    }
   ```
   > ~~超級繞~~
   > ※ 要稍微區分一下，上面的=> 不是 `Arrow Funciton(箭頭函式)` 的箭頭喔!。
   >    只要後面等號賦值有帶型別，`Inference(推論)`都不太會出事，
   >    所以很少有人會用這麼繞口的做法= 口=
   > ~~Opshell超愛箭頭函式的，這是我學ES6最大的動力。~~

---
   - ### 3. rest (剩餘引數)【ES6】
   > ES6 中，可以使用 ...rest 的方式獲取函式中的`Rest parameter(剩餘參數)`
   > 或稱`其餘運算子` [參考](https://ithelp.ithome.com.tw/articles/10214394)
   ```javascript
    // JavaScript Code
    function teamUp(team, ...members) {
      members.forEach(function(member) {
         team.push(member);
      });
    }

    let Maya = [];
    teamUp(Maya, 'Opshell', 'Bear');

    console.log(Maya); // ['Opshell', 'Bear']
   ```
   > `其餘運算子`的原理是將剩餘的參數塞進一個陣列，所以我們可以用陣列的型別來定義它：
   ```typescript
    type stringArray = string | null;

    function teamUp(team: stringArray[], ...members: stringArray[]) {
      members.forEach((member) => {
         team.push(member);
      });
    }

    let Maya: stringArray[] = [];
    teamUp(Maya, 'Opshell', 'Bear');

    console.log(Maya); // ['Opshell', 'Bear']
   ```

---
## 小結：
   > 今天會了Funciton的Type法
   > 而且更了解了 ES6 的`其餘預算子`
   > 對於型別的Type法也更熟練了
   > 明天繼續學習 Funciton的 Types法，
   > ~~這麼有料的東西怎麼可以一天水完?~~
