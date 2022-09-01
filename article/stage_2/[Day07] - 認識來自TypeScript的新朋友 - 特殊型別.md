![alt](https://)

# 認識來自TypeScript的新朋友
   > *有型別自TypeScript來*
   > *不亦悅乎!*
   > *───────────────────────── By Opshell*

---
## 目標:認識來自TypeScript的新朋友
   - ### 1. 型別總覽
   #### 我們先來複習複習JS的型別：
   > - 原始資料型別
   >    * boolean 布林值
   >    * number 數值
   >    * string 字串
   >    * null 查找不到物件
   >    * undefined 未定義
   >    * symbol（於 ES6 新定義）
   > - 物件型別
   >    * object 物件
   >    * array 陣列
   >    * function 函式
   #### 認識一點TS裡的新朋友
   > - 特殊型別
   >    * void (空值)
   >    * unknown (不曉得)
   >    * any (任意型別) (全世界都是我的 的可怕型別)
   >    * never (全世界都不是我的 的型別)


---
   - ### 2. JS大家都這麼熟了，我們來介紹一下TS的新朋友：
   #### - 空值 void: 沒有回傳值
   > 一般 `void` 用於沒有回傳值的 funciton 中
   > 可以用我們之前寫的consoleYear來改一下
   > 來表示consoleYear不會回傳任何值
   ```typescript
    function consoleYear(year: string | number): void {
      console.log(year);
    }
   ```
   > ※　在參數括號外`: 型別`代表該 function 回傳的類型

   #### - 任意 any: 不檢查型別(畢竟我誰都是)
   > 可以想像成 let year; 的感覺，
   > 只知道有這個人，但他誰都可以是。
   > 在TS中宣告時如果沒有指定型別，一律"推論"為any
   ```typescript
    function consoleYear(year): void {
      console.log(year); // year什麼值都可以!
    }
   ```
   > ※　不要濫用any型別，這樣跟沒用TypeScript一樣
   > 　　甚至更赤裸了...

   #### - 任意 unknown: 不檢查型別(畢竟我誰都是)
   > unknown 和 any 一樣可以接受任何型別賦值，
   > 但 any 可以賦值給任何型別，
   > unknown 只能賦值給 any 和自己。

   ```typescript
    function consoleYear(year: unknown): void {
        let name: string = 'Opshell';
        name = year; // Error：類型 string 不可指派給 unknown
    }
   ```
---
   #### 絕不 never: 永遠不存在值的型別
   > 這邊可以用之前的例子來舉證，
   > 這個情況下 year 永遠不會有值，
   > 所以是 `never`

   ```typescript
    function consoleYear(year: string & number) {
      console.log(year);
    }
   ```
![alt](https://)
   > 或者可以是另一個情況，
   > 像這種無窮迴圈，在TS的`Inference(推論)`中會判斷回傳為 `never`，
   > 沒有人可以從無窮迴圈中出來...
   ```typescript
    let immortal = function forever(year: number) {
      while (true) {
         year++;
      }
    }
   ```
   > ※　`never`類型，只能用`never`賦值，
   >    但是`never`可以賦值給所有型別，
   >    也就是說，`never`是所有型別的子類，
   > 　　可以理解為，所有物件都有錯誤的可能。

   > ※　可以發現`void`和`never`很接近，
   > 　　最值觀的差別是會不會結束?
   >    `void`函式 會完整結束只是沒有要回傳;
   >    `never`函式 無法完整跑完，無法回傳。

---
   > 因為`never`的特性緣故，
   > 很常用來處理錯誤。
   > `boolean`裡其實也含有`never`(`never`是所有型別的子類)
   > 所以: `boolean` 和: `boolean | never`是一樣的
   > 有興趣的可以把: `boolean | never`寫出來觀察一下
   > TS 只會說age的回傳是 `boolean`型別
   ```typescript
    function age(year: string | number): boolean{
      if (typeof year === 'string') {
          return true;
      } else if (typeof year === 'number') {
          return false;
      }

      //TS 推論此為 never 型別
      return fail('Age cannot be expressed in this way!');
    }

    function fail(message: string): never {
      throw new Error(message);
    }
   ```
---
## 小結：
   > 可以發現TypeScript，
   > 非常努力補足JavaScript沒有算處理的部分，
   > 讓程式碼都變得更井然有序、更容易讀懂，
   > 而且除了型別以外的地方，
   > 基本上都還是按照JS 原來的操作。
   > 可以明確感受到 "TypeScript是JavaScript的型別外掛"
   > `never` 與 `void` 讓我們更容易了解函式的回傳，
   > 對於理解他人程式碼相對容易非常多。
