![alt](https://)

# 所以說那個Type呢?
   > *既然要學習TypeScript*
   > *那Type就是它的醬汁*
   > *───────────────────────── By Opshell*

---
## 昨日重點複習：
   > ### 三種主要的設定type方式

   Title|型別推論|型別註記|型別斷言
   -------------|-------------|-------------|-------------
   英文|Inference|Annotation|Assertion
   模式|被動|主動|主動
   內容|自動推論資料型別的機制|大多使用在初始化階段，例如宣告變數或函式參數等|通常用於接收外部參數，需明確指定資料型別
   後續內容會說|`Inference(推論)`|`Annotation(註記)`|`Assertion(斷言)`

---
## 今日目標：學會基本型的type宣告，避開一些坑。

---
## 過程：
- ### 1. 基本型介紹
   > #### 我們先來複習複習JS的型別：
   > - number 數值
   > - string 字串
   > - boolean 布林值
   > - null 查找不到物件
   > - undefined 未定義
   > - symbol（於 ES6 新定義）

- ### 2. 基本型別的Type法
   ```typescript
    // TypeScript code
    let TS; // any
    let name = 'Opshell'; // string
    let year = 30; // number
    let hasPet = false; // boolean
    let car = undefined; // any
    let house = null; // any
   ```
   > 在 TypeScript 的 `Inference(推論)` 中 ，
   > 上面的宣告會被視為 註解的 Type，是賦予Type的一種方法，
   > ※ 1. `null` 和 `undefined` 被稱為  Nullable Types
   > 　　　在未指名的情況下，Nullable Types會被`Inference(推論)`成`any`

   > ※ 2. 在TS 中，any 是非常難掌控的類型，畢竟他突破了TS 被創造出來的目的，
   > 　　　簡直就是混世大魔王，能不用，就不用，
   > 　　　如果用多了，還不如乾脆回頭寫JS就好，

   > ※ 3. 也會注意到如果你一開始不和TS說內容是什麼也不`Annotation(註記)`他的類型，
   > 　　　TS 就會當他是any, 原理是：在JS宣告時沒帶值就等於帶入`undefined`。

   > 為了盡量不使用`any`，上面的宣告會使用`Annotation(註記)`變成這樣：
   ```typescript
    // TypeScript code
    let TS: undefined; // undefined
    let car: undefined = undefined; // undefined
    let house: null = null; // null
   ```
   > 但是這樣產生了另一個問題，
   > 因為你已經`Annotation(註記)`了型別，
   > 在你未來要用他的時候：
   ```typescript
    // TypeScript code
    let car: undefined = undefined; // undefined

    car = 'skoda fabia 2022';
   ```
![alt](https://)
   > 你就會發現出現了一個TS的警告，
   > 會告訴你型別是不一樣的，
   > 這時候該怎麼辦呢?
   > 這時候就會有個新技巧`Union (聯合)`
   ```typescript
    // TypeScript code
    let car: undefined | string = undefined; // 讓car可以是undefined 或 string

    car = 'skoda fabia 2022'; // 這時候就不會報錯了
   ```

---
## 小結：
   > 今天學會了宣告基本型，
   > 學會了盡量避開`any`坑，
   > 稍微了解到了 每種Type法的配合，
   > ~~跟什麼都沒學到一樣~~ 。
   > 我們明天見。

---
# 章節小結：
   > 第一章結的內容就到這邊
   > 相信大家對TypeScript是什麼、有什麼用、為什麼要用、該怎麼用
   > 都有了一定的認知，
   > 也有可能會覺得好像真的不是很難，
   > 但事情不是我們想的這麼簡單，一坑還有一坑坑，
   > 在後續的幾天，會用例子和大家一起學習，
   > 希望會對它的有更多的認知，
   > 我們明天見~!
