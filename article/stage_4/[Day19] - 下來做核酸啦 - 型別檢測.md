![alt](https://)

# 我怎麼知道誰是誰?
> *最尷尬的莫不是我不認識你*
> *你也不認識我*
> *───────────────────────── By Opshell*

---
## 目標:我想知道你是誰，要做什麼 - 型別檢測(Type Guard)
> 在JavaScript中其實也是有型別的，
> 只是他很善變，在不知道發生什麼事的情況下，
> 很容易就臉盲了，
> 套一句某客戶對我說的話：你這樣很不穩定ㄟ ~~(吐血)~~

---
## 過程：
   > `型別檢測(Type Guard)`
   > 是的又多個新朋友，
   > 別慌，我們慢慢認識他。
   > 他的工作是在執行時限縮型別的表達式，
   > 是使用各種方式判斷、轉換型別，
   > 進行導流處理，避免TS報錯。
   > 通常會在條件式（例如if...else 語句）中進行檢查後。
   > 下面是常見的幾種方式：
   > - 使用 JS 運算子：[`typeof` 、 `instanceof`](https://medium.com/@mengchiang000/js%E5%9F%BA%E6%9C%AC%E8%A7%80%E5%BF%B5-typeof-vs-instanceof-4dcb89e315df)或 `isArray` 等
   > - 使用使用者自定義的型別檢查：`型別謂語(type predicates)`、`in 關鍵字`

   ### 1. JS 運算子：
   - #### typeof
   > typeof 用來檢測未經計算的資料型別。
   > 在使用 typeof 運算子時，有幾個型別要特別小心，
   > 分別是原始型別的 null 以及 Array，兩者判斷後的結果都是物件。

   ```typescript
    // 讓我們利用"型別檢測"來修改之前的 getYearLength function
    // 之前利用(<string>.year)的方式來處理，
    // 現在改成透過型別檢測判斷是否為字串，進行導流
    // 在某方面來說，可讀性更好。
    function getYearLength(year: string | number): number {
        let result = 0;
        if (typeof year === 'string') {
            result = year.length;
        } else {
            result = year.toString().length;
        }

        return result;
    }
   ```
   - #### [instanceof](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/javascript-instanceof-operator-implementation-ee8f40f9e3b6)
   > instanceof 是用來判斷 A是否為B的實例，比較的是原型(prototype)
   > 換句話說，就是有沒有在原型鏈上面
   ```typescript
    // 建立Member Class 設定 名稱、年紀、性別為建構子
    class Member {
        constructor(public name: string, public year: number, public gender: string) { }
    }
    // 建立Team Class 團隊名稱、團隊成員 性別為建構子
    // 這邊可以看出 members建構子的型別是 Member Class
    class Team {
        constructor(public title: string, public members: Member[]) { }
    }

    function getName(cls: Member | Team) {
        return (cls instanceof Member) ? cls.name : cls.title;
    }
    const how = new Member('Opshell', 30, 'man');
    const zoo = new Team('Maya', [how]);

    console.log(getName(how)); // Opshell
    console.log(getName(zoo)); // 因為 Team 不在 Member 的原型鏈上面，所以印出 Maya
   ```
   > ※　instanceof只能用來判斷兩個比較對象是否屬於實例關係，無法明確指出具體屬於哪種類型。
---
   ### 2. 使用者自定義：
   - #### 型別謂語:
   > 是一個具特殊回傳值的函式，
   > 它會向編譯器傳遞訊號，告知回傳值的型別。
   > `型別謂語(parameterName is Type)`只能用在單一傳入值，且會回傳布林值。
   > 下面的範例中型別謂語也就是 s is string，語法為`參數名 is 型別`。

   ```typescript
    type Man = 'xy';
    type Woman = 'xx';

    function isMan(gender: Man | Woman): gender is Man {
        return (gender as Man) === 'xy';
    }

    // 如果gender 沒有使用"斷言"指定型別，
    // 他會被"推論"成字串
    // 這邊就是前面提到的，用"斷言"覆蓋"推論"的做法
    // 無法丟進去isMan做驗證喔
    const Opshell = {
        gender: (<Man>'xy'),
        year: 30
    };

    console.log(isMan(Opshell.gender)); // true
   ```
   - #### in 關鍵字:
   > 使用 `in 關鍵字`會回傳布林值，
   > 判斷屬性是否存在特定物件或其原型鏈上，
   > 語法為 n in x，n 為字串或字串字面值，x 為 union型別
   ```typescript
    class Member {
        constructor(public name: string, public year: number, public gender: string) { }
    }
    class Team {
        constructor(public title: string, public members: Member[]) { }
    }

    function isMember(cls: any): cls is Member {
        return 'name' in cls;
    }

    const Opshell = new Member('Opshell', 30, 'man');
    const Zoo = new Team('Maya', [Opshell]);

    console.log(isMember(Opshell)); // true
    console.log(isMember(Zoo)); // false
   ```
---
## 小結：
   > 看完上面的例子可以發現`型別檢測(Type Guard)`，
   > 跟我們平常在Js中會做的事情差不多，
   > 判斷型別決定要做的事情，
   > 只是TS提供更多樣、嚴謹的方式來幫助 ~~(強迫)~~你做。
   > 讓程式碼更嚴謹易讀，上面只是一些比較常見的方式，
   > 還有更多厲害的可以參考pjchender大大整理這這篇文章，
   > [【TS】Type Guard and Narrowing](https://pjchender.dev/typescript/ts-narrowing/) - By pjchender
   > 在後續的學習中，也會看到更多樣的`型別檢測(Type Guard)`方式，
   > 大家明天見囉~

---
### 參考資料
[【Day 14】TypeScript 資料型別 - 複合型別（Union & Intersection) & 型別檢測(Type Guard)](https://ithelp.ithome.com.tw/articles/10222470?sc=rss.iron)
[Typescript 一些令人又愛又恨的內容 — Type Guard、Narrowing -> 延伸到泛型](https://medium.com/onedegree-tech-blog/typescript-%E4%B8%80%E4%BA%9B%E4%BB%A4%E4%BA%BA%E5%8F%88%E6%84%9B%E5%8F%88%E6%81%A8%E7%9A%84%E5%85%A7%E5%AE%B9-type-guard-narrowing-1655a9ae2a4d)
