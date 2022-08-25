![alt](https://)

# 家裡有誰? 誰變成誰?
> **
> *你也不認識我*
> *───────────────────────── By Opshell*
![alt](https://)

---

## 目標:我想知道你是誰，要做什麼 - 型別檢測(Type Guard)
---

## 過程：
   > 在JavaScript中其實也是有型別的，
   > 只是他很善變，在不知道發生什麼事的情況下，
   > 很容易就臉盲了，
   > 套一句某客戶對我說的話：你這樣很不穩定ㄟ ~~(吐血)~~

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

   ### 1. Enum(列舉、枚舉)：
   #### - 語法講解
   > Enum 是 TypeScript 中增加的新語法，
   > 用來管理多個同系列的常數（不可修改的變數
   > 或做為狀態的判斷所使用。
   > 語法：enum 列舉名稱 {列舉內容};

   ```javascript
    // 在JS 中 如果要判斷很多狀態
    // 通常會用各種方式做紀錄，
    // 註解、物件等
    /** gender
     *  1 = Man
     *  2 = Woman
     *  3 = other
     */
    const gender = {
        '1': 'Man',
        '2': 'Woman',
        '3': 'Other'
    };
   ```
   ```typescript
    // 在TS中提供了Enum(列舉)
    // enum 名稱沒有規定要純大寫(只是習慣)
    enum GENDER {
        man,
        woman,
        other,
    }
    // 沒有賦值的情況下，TS會自動從0開始賦值
   ```
   #### - 實務應用
   > `Enum(列舉、枚舉)`實務中比較常見的用法是，
   > 配合`型別檢測(Type Guard)`中的一種模式，
   > "Discriminated unions"
   > 來處理請求，針對不同的 Response status codes(狀態代碼)
   > 做對應的處理：

   ```typescript
    enum STATUS_DESCRIPTION {
        OK = 'Success',
        Error = 'Fail',
    }

    // 定義多個不同的 Type，但這些 Type 中都會有一個共同的欄位，例如 `status`
    // 以此欄位來判斷物件中會有其他哪些屬性。
    interface iFaceSuccessResp {
        status: STATUS_DESCRIPTION.OK;
        data: unknown;
    }

    interface iFaceErrorResp {
        status: STATUS_DESCRIPTION.ERROR;
        errorCode: number;
        message: string;
    }

    // 利用 Union 的方式產生 Union Type
    type Resp = iFaceSuccessResp | iFaceErrorResp;

    // CAUTION：不要在函式參數的地方做物件的解構，
    // 例如，不要 ({status, data, errorCode, message} : Resp)
    // 需要的話，可以在 switch case 判斷完後再來解構
    const parseResponse = (resp: Resp) => {
        switch (resp.status) {
            case STATUS_DESCRIPTION.OK: {
                // 透過 narrow 可以確定這裡的 resp 是 iFaceSuccessResp 的型別
                const { data } = resp;
                return data;
            }
            case STATUS_DESCRIPTION.ERROR: {
                // 透過 narrow 可以確定這裡的 resp 是 iFaceErrorResp 的型別
                const { errorCode, message } = resp;
                return message;
            }
            default:
                // 沒判斷到的情況利用 fail checking
                // 避免有 case 在上面是沒有被定義到的
                return fail(`"${resp.status}" unknown status !`);
        }
    };

    function fail(message: string): never {
       throw new Error(message);
    }
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
