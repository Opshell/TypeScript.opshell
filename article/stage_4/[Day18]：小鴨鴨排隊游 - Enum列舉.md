![Day 18 Banner](https://ithelp.ithome.com.tw/upload/images/20220918/20109918LE2OXMGxeB.jpg)

# 小鴨鴨排隊游
> *2022搞笑諾貝爾物理獎：*
> *小鴨游泳排隊跟在媽媽後面，「加速相位」*
> *寫程式也一樣，排排隊寫起來更快。*
> *───────────────────────── By Opshell*

---
## 目標:`Enum(列舉)`
   > 在JS 中 如果要判斷很多狀態
   > 通常會用各種方式做紀錄，
   > 註解、物件等：
   ```javascript
    // javascript Code
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

---
## 過程：
- ### Enum基礎
   > 在TS中提供了`Enum(列舉)`，
   > 用來管理多個同系列的常數(不可修改的變數，
   > 語法：`enum 列舉名稱 {列舉內容}`，
   > ※ `Enum(列舉)`名稱沒有規定要純大寫(只是習慣)
   ```typescript
    enum GENDER {
      MAN,
      WOMAN,
      OTHER,
    }

    const Opshell = GENDER.MAN;
    const Patty = GENDER[1];

    console.log(Opshell); // 0
    console.log(Patty); // WOMAN
   ```
   > ※ 沒有賦值的情況下，TS會自動從0開始賦值。
   >    也接受只賦值部分的情況：
   ```typescript
    enum GENDER {
      MAN = 2,
      WOMAN, // 3
      OTHER, // 4
    }

    const Opshell = GENDER.MAN;
    const Patty = GENDER[1];

    console.log(Opshell); // 2
    console.log(Patty); // undefined
   ```
   > 上面這個情況，TS會依照你賦值的後面繼續遞增，如果有重複的，
   > 後來者覆蓋前者(會出現不經意的坑)，所以不推薦這樣使用，
   > 要馬全給，要馬不給。

   > `Enum(列舉)`的值也是能計算的：
   ```typescript
   enum FEATURE {
      None = 0,
      O_BLOOD = 1 << 0, // 轉成10進制會是 1
      BRUNETTE = 1 << 1, // 2
      BROWN_EYE = 1 << 2, // 4
      EAGLE_NOSE = 1 << 3, // 8
      UNIVERSAL_ASIA = BRUNETTE + BROWN_EYE // 6
   }
   ```

   > 當然`Enum(列舉)`除了數字外，也可以用字串當值
   > 某方面來說更能讓人讀懂程式碼：
   ```typescript
    enum GENDER {
      MAN = 'DNA=XY',
      WOMAN = 'DNA=XX',
      OTHER = 'have a different identity.'
    }
   ```

   > ※ 數字、字串混用也可以，只是這樣很亂，
   >    常數內容反而很不明確，很少這樣用，除非你確實需要。

---
- ### 實務應用
   > `Enum(列舉、枚舉)`實務中比較常見的用法是，
   > 配合`型別檢測(Type Guard)`中的一種模式，
   > `Discriminated unions(集合鑑別)`
   > 處理請求，針對不同的`Response status codes(狀態代碼)`
   ```typescript
    enum STATUS_LIST {
      SUCCESS = 200,
      ERROR = 400,
    }

    /** 定義多個不同的 interface，
     *  但這些 interface 中都會有一個共同的欄位"status"
     *  以此欄位來判斷物件中會有其他哪些屬性。
     */
    interface iSuccessResp {
      status: STATUS_LIST.SUCCESS;
      data: unknown;
    }
    interface iErrorResp {
      status: STATUS_LIST.ERROR;
      errorCode: number;
      message: string;
    }

    // 利用 Union 的方式產生 Union Type
    type tResp = iSuccessResp | iErrorResp;

    /** 不要在函式參數的地方做物件的解構，
     *  不要這樣：({status, data, errorCode, message}: tResp)
     *  需要的話，可以在 switch case 判斷完後再來解構
     */
    const parseResponse = (resp: tResp) => {
      /** 當然Enum也可以解構來使用：
       *  const { OK, ERROR } = STATUS_LIST;
       */
      switch (resp.status) {
         // 透過 narrow 可以確定這裡的 resp 是哪個型別
         case STATUS_LIST.SUCCESS: {
            const { data } = resp; // 這邊才解構
            return data;
         }
         case STATUS_LIST.ERROR: {
            const { errorCode, message } = resp;  // 這邊才解構
            return `${errorCode}：${message}`;
         }
      }
    };
   ```
   > ※　在上面範例中`Enum(列舉)`的宣告方式，
   >    編譯過後會變成 key 和 value 互相對應的 `Object`，
   >    不管是用 key 還是 value 都可以取出對應的值，
   >    這就是`Enum`的`反向對映`特性，
   >    原理是使用 `IIFE(立即執行函式)` 產生`Object`將 key 和 value 綁定起來，
   >    但是`IIFE(立即執行函式)`會造成一些效能上的耗損，也會增加記憶體消耗，
   >    `Enum(列舉)`數量一多，效能會變差。

   > ※ 要解決上面這個問題，在不需要key value互相對應的情況下
   >    可以像這樣：
   ```typescript
    const enum STATUS_DESCRIPTION {
        OK = 'Success',
        Error = 'Fail',
    };
   ```
   > ※ 這就是所謂的`const enum(常數列舉)`，
   >    這種方法就不能用計算式賦值，只能使用固定值，
   >    編譯階段也會被刪除，所以不會互相對應，
   >    不會產生物件，性能就高了。

---
## 小結：
   > 學習完所謂的`Enum(列舉)`，
   > 會發現原生的JavaScript Object
   > 就能簡易的實現大部分的功能，
   > `Enum(列舉)`最主要的差別就是提高了他的可讀性，
   > 更易於管理。
