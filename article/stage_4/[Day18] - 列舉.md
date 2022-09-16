![alt](https://)

# 家裡有誰? 誰變成誰?
> *任何傻瓜都可以寫出電腦看得懂的程式，*
> *但好的程式設計師會寫出人也看得懂的。*
> *───────────────────────── By Kent Beck*

---
## 目標:`Enum(列舉)`
    > 在JavaScript中其實也是有型別的，
   > 只是他很善變，在不知道發生什麼事的情況下，
   > 很容易就臉盲了，
   > 套一句某客戶對我說的話：你這樣很不穩定ㄟ ~~(吐血)~~

---
## 過程：
- ### 語法講解
   > Enum 是 TypeScript 中增加的新語法，
   > 用來管理多個同系列的常數(不可修改的變數
   > 或做為狀態的判斷所使用。
   > 語法：`enum 列舉名稱 {列舉內容}`;

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
   > 在TS中提供了Enum(列舉)
   > enum 名稱沒有規定要純大寫(只是習慣)
   ```typescript
    enum GENDER {
        man,
        woman,
        other,
    }
   ```
   > ※ 沒有賦值的情況下，TS會自動從0開始賦值。

---
- ### 實務應用
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

    // 定義多個不同的 interface，
    // 但這些 interface 中都會有一個共同的欄位"status"
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
    type tResp = iFaceSuccessResp | iFaceErrorResp;

    // ※　不要在函式參數的地方做物件的解構，
    // 　　不要({status, data, errorCode, message} : Resp)
    // 　　需要的話，可以在 switch case 判斷完後再來解構
    const parseResponse = (resp: tResp) => {
        // 當然enum也可以解構來使用
        // const { OK, ERROR } = STATUS_DESCRIPTION;
        switch (resp.status) {
            // 透過 narrow 可以確定這裡的 resp 是哪個型別
            case STATUS_DESCRIPTION.OK: {
                const { data } = resp; // 這邊才解構
                return data;
            }
            case STATUS_DESCRIPTION.ERROR: {
                const { errorCode, message } = resp;  // 這邊才解構
                return `${errorCode}：${message}`;
            }
            default:
                // 避免有 status 在上面是沒有被定義到的
                return fail(`"${resp.status}" unknown status !`);
        }
    };

    function fail(message: string): never {
       throw new Error(message);
    }
   ```
   > ※　在上面範例中`Enum(列舉)`的宣告方式，
   >    編譯過後會變成 key 和 value 互相對應的 `Object`，
   >    也就是說不管是用 key 還是 value 都可以取出對應的值，
   >    原理是使用 IIFE 產生`Object`將 key 和 value 綁定到 Object，
   >    造成一些效能上的耗損，也會增加內存，
   >    `Enum(列舉)`數量一多，效能會變差。

   > ※　要解決上面這個問題，在不需要key value互相對應的情況下
   >    可以像這樣：
   ```typescript
    const enum STATUS_DESCRIPTION {
        OK = 'Success',
        Error = 'Fail',
    };
   ```
   > 由於是用const產生，編譯後就不需要互相對應，性能就高了。

---
## 小結：
   > 學習完所謂的列舉，
   > 會發現原生的JavaScript Object
   > 就能簡易的實現大部分的功能，
   > Enum最主要的差別就是提高了他的可讀性，
   > 更易於管理。
