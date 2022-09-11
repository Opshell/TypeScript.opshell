![Day 07](https://ithelp.ithome.com.tw/upload/images/20220907/20109918KYTx5tuz9P.jpg)

# 認識來自TypeScript的新朋友
   > *有型別自TypeScript來*
   > *不亦悅乎!*
   > *───────────────────── By Opshell*

---
## 目標:認識來自TypeScript的新朋友
   > 當使用第三方函式庫時，我們需要參考它的宣告檔案，
   > 才能獲得對應的程式碼自動完成、介面提示等功能。

- ### 新語法索引
   > - 宣告
   >    * [declare var 宣告全域變數](#declare_var)
   >    * [declare function 宣告全域方法](#declare_function)
   >    * [declare class 宣告全域類別]()
   >    * [declare enum 宣告全域列舉型別]()
   >    * [declare namespace 宣告（含有子屬性的）全域物件]()
   >    * [interface 和 type 宣告全域型別]()
   > - 匯入、匯出
   >    * [export 匯出變數](/#)
   >    * [export namespace 匯出（含有子屬性的）物件]()
   >    * [export default ES6 預設匯出]()
   >    * [export = commonjs 匯出模組]()
   >    * [export as namespace UMD 函式庫宣告全域變數]()
   > - 擴充
   >    * [declare global 擴充套件全域變數]()
   >    * [declare module 擴充套件模組]()
   > - 其他
   >    * [/// <reference /> 三斜線指令]()

---
- ### 宣告

<h4 id="declare_var">declare var 宣告全域變數</h4>

   > 一般 `void` 用於沒有回傳值的 funciton 中
   > 可以用我們之前寫的consoleAge來改一下
   > 來表示consoleAge不會回傳任何值
   ```typescript
    function consoleAge(age: string | number): void {
      console.log(age);
    }
   ```
   > ※　在參數括號外`: 型別`代表該 function 回傳的類型

   #### 2. 任意 any: 不檢查型別(畢竟我誰都是)
   > 可以想像成 let age; 的感覺，
   > 只知道有這個人，但他誰都可以是。
   > 在TS中宣告時如果沒有指定型別，一律`Inference(推論)`為`any`
   ```typescript
    function consoleAge(age): void {
      console.log(age); // age什麼值都可以!
    }
   ```
   > ※　不要濫用`any`型別，這樣跟沒用TypeScript一樣
   > 　　甚至更赤裸了...

<h4 id="declare_function">declare function 宣告全域方法</h4>

   #### 3. 任意 unknown: 不檢查型別(畢竟我誰都是)
   > `unknown` 和 `any` 一樣可以接受任何型別賦值，
   > 但 `any` 可以賦值給任何型別，
   > `unknown` 只能賦值給 `any` 和自己。

   ```typescript
    function consoleAge(age: unknown): void {
      let name: string = 'Opshell';
      name = age; // Error：類型 string 不可指派給 unknown
    }
   ```

   #### 4. 絕不 never: 永遠不存在值的型別
   > 這邊可以用之前的例子來舉證，
   > 這個情況下 `age` 永遠不會有值，
   > 所以是 `never`

   ```typescript
    function consoleAge(age: string & number) {
      console.log(age);
    }
   ```

<h4 id="declare_class">declare class 宣告全域類別</h4>

<h4 id="declare_enum">declare enum 宣告全域列舉型別</h4>

<h4 id="declare_var">declare namespace 宣告（含有子屬性的）全域物件</h4>

<h4 id="declare_var">interface 和 type 宣告全域型別</h4>

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
