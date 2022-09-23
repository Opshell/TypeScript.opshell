![alt](https://)

# 環境甚麼的 最討厭了
> *每次開始學習新的語言或框架，*
> *最麻煩的不是要學習他有哪些語法、規則*
> *是安裝它的環境...*
> *───────────────────────── By Opshell*

---
## 目標：今天來改寫getData吧
> 因為有特定的API回傳格式，
> 不想每頁重複寫，所以先稍微做個封裝。

---
## 過程：
- ### JavaScript原碼：
   ```javascript
    import axios from 'axios';

    export const getData = async function (url, type = 'GET', data = {}, header = {}) {
      return await axios({
         url: url,
         method: type,
         data: data,
         headers: header,
      }).then((response) => {
         let result = {
               status: false,
               msg: response.data.message,
               data: response.data.data,
         }

         if (response.status == 200 && response.data.status == 'Success') {
               result.status = true;
         }

         return result;
      }).catch(() => false);
    }

    export default {
      setup() {
         return {
               getData
         }
      }
    }
   ```

---
- ### 改成`TypeScript`流程：
   #### 1. 定義回傳的格式：
   ```typescript
    export interface iResult {
      status: boolean;
      msg: string;
      data: any;
    }
   ```
   #### 2. 定義輸入格式：
   > 本來想說用`Enum(列舉)`定義一下，
   > 然後轉成`Alias(別名)`，像這樣：
   ```typescript
    enum HTTP_VERBS {
      GET = 'GET',
      POST = 'POST',
      PUT = 'PUT',
      DELETE = 'DELETE',
      PATCH = 'PATCH',
    }
    type tHttpVerbs = keyof typeof HTTP_VERBS;
   ```
   > 這上面得操作是把`Enum(列舉)`轉成`Union String Literal(聯集字串字面量)`：
   ![alt](https://)

   #### 3. 從`宣告檔案`拉型別出來用
   > 做到這邊我突然想到，`axios`其實是有提供`.d.ts(宣告檔案)`的，
   > 那我直接從裡面拉出來用就好了吧：
   ```typescript
    // 從Axios 拉型別出來用
    import { Method, AxiosRequestHeaders } from "axios";

    export const getData = async function (
      url: string,
      method: Method = 'GET',
      data: any = {},
      headers: AxiosRequestHeaders = {}
    ): Promise<iResult | false> {
      return await axios({
         url,
         method,
         data,
         headers,
      }).then((response) => {
         let result: iResult = {
               status: false,
               msg: response.data.message,
               data: response.data.data,
         }

         if (response.status == 200 && response.data.status == 'Success') {
               result.status = true;
         }

         return result;
      }).catch(() => false);
    }
   ```
   > 宣告完輸入的型別之後，
   > 在稍微定義一下輸出的型別就完成了。

   #### 4. 在Login.vue看看結果
   > 我們可以比較一下，有沒有定義輸出型別差在哪，
   > 這張是沒有定義的：
   ![alt](https://)
   > 這張是有定義的：
   ![alt](https://)

---
- ### yarn run dev 試試看：
   ![alt](https://)
   ![alt](https://)
   > 看起來，路由導向啥的，也都沒問題。

---
## 小結：
> 這邊改完了`getData`，
> 懂了怎麼看套件的型別，然後拿來用，
> 其實只適用ctrl + 滑鼠左件點一下`axios`而已，
> 他就會自己`index.d.ts(宣告檔案)`出來了，
> TS 最大的特點就是會給你很詳細的介紹，所以要找型別出來用不難。
> 但是這次改完，有種對TypeScript更熟悉的感覺。
> 不知道各位怎麼樣，可能看得霧颯颯(台語)吧。
