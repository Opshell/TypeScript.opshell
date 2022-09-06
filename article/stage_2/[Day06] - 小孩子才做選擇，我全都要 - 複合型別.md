![alt](https://)

# 小孩子才做選擇，我全都要
   > *我想要他是number*
   > *但是有時候想當string用*
   > *怎麼辦? 我全都要*
   > *───────────────────────── By 京師六扇門第一捕頭雷豹（花名「豹子頭」）*
![alt](https://)

---
## 目標:想要用哪些型別，就用那些型別。

---
## 過程：
   > TypeScript 裡有個型別叫複合型別，他有兩種模式，
   > `Union Type(聯集型別)` && `Intersection Type(交集型別)`
   > 可以將值宣告為多種類型。
   - ### 1. `聯集型別(Union Type)`
   ```typescript
    // 宣告一個function 讓他可以設定中文 也可以設定數字當年齡
    function consoleAge(age: string | number) {
        console.log(age);
    }

    consoleAge('三十');
    consoleAge(30);
   ```
   > 想知道是幾位數年紀了就會改寫成這樣
   ```typescript
    function getAgeLength(age: string | number): number {
        let result = 0;
        if (age.length) {
            result = age.length;
        } else {
            result = age.toString().length;
        }

        return result;
    }
   ```
   > ▲ 然後就踩到坑了。
![alt](https://)
   > 參數age是字串或數字的其中一種，但`length`不是字串和數字的的共同属性，所以會報錯。
   > 這時候就可以利用`Assertion(斷言)`來處理這個情況，
   > 在多種可能的參數型態中指定一個。
   ```typescript
    // 想知道是幾位數年紀了就會改寫成這樣
    function getAgeLength(age: string | number): number {
        let result = 0;
        if ((<string>age).length) {
            result = (<string>age).length;
        } else {
            result = age.toString().length;
        }

        return result;
    }
   ```
   > ※ 在這個例子中可以注意到，要`Assertion(斷言)`型別，需要加()，否則會報錯喔。
![alt](https://)

---
   - ### 2. `交集型別(Intersection Type)`
   > 可以注意到`聯集型別(Union Type)`是用`|`來連結型別，
   > 有`|`當然就會有`&`啦，
   > 就像if條件中的意思一樣，需要同時符合兩邊才會成立的感覺：
   ```typescript
    type a = 1|2|3; // 建立一個a型別 他可以是 1 或2 或3
    type b = 2|3|4; // 建立一個a型別 他可以是 2 或3 或4

    // 那宣告一個c型別 當作a、b的交集
    type c = a & b; // c 就只會是 2 或 3

    // 考考大家
    type d = a & number; // 會什麼?
   ```

   > 答案會是： 1 或 2 或 3
   > ※ 上面的type 是一種叫做`Alias(別名)`的技巧，
   >    常用來宣告`聯集型別(Union Type)`，當然也有其他好用的使用方式，
   >    之後再慢慢介紹~
---
   - ### 3. 一個更容易理解 TypeScript 中型別的思考方式，
   > 型別：具有特定特性的一些值 的集合：
   > number：所有數字的集合
   > string：所有字串的集合
   > 1：只有1的一個集合 ~~(好孤單)~~
   > 也就是說，上面的type d
   > 就會是 (1|2|3) & 所有數字 = 1|2|3

---
   - ### 4. 按照這個概念，如果把上面consoleAge改成這樣
   ```typescript
    function consoleAge(age: string & number) {
      console.log(age);
    }
   ```
   > 參數 age 他就會變成一個誰都不接受的`<never>`型別了，
   > 畢竟沒有人同時在 字串 和 數字 的型別裡面
![alt](https://)

---
# 小結：
   > 今天學了如何使用複合型別，
   > `聯合型別(Union Type)` 可以當作 || 看
   > `交集型別(Intersection Type)` 則當 && 看
   > 而且有了型別等於特定值的比喻，感覺稍微更了解TS了。
   > 但總感覺交集型別應該比較少會用到?
   > 畢竟有種苛刻的感覺... ~~(射手座討厭框框)~~
   > 而會發現有個新東西  `type a = 1|2|3;`
   > 這是一種叫做`Alias(別名)`的新玩意，
   > 混個臉熟，以後再介紹。
