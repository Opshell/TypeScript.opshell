![Day31 Banner](https://ithelp.ithome.com.tw/upload/images/20221001/20109918EjcEQcDdDz.jpg)

# Vite環境最...咦!壞掉了...
> *環境什麼的*
> *果然還是最麻煩了! 哭阿!*
> *──────────────── By Opshell*

---
## 目標：成功完成一個能用的環境
> 在完賽後，環境也不堪改造，神機錯亂了，
> 沒錯，他開始不分敵我到處亂紅，
> 找不到問題就算了，還傷眼...
> 身為一個工程師，看到滿畫面的紅線能忍= =?
> 更何況，因為`Error Len`的關係，
> 他還會有一堆紅字...

---
## 過程：從新改造
- ### RE 再來一場：
   > 從裝個新的vite出來用：
   ```
    yarn create vite webadminvite --template vue-js
    cd webadminvite
   ```

---
- ### 安裝VS Code 外掛
   > 為了徹底釐清問題
   > Ops幾乎把全部的外掛都拆了，
   > 把要用的裝起來就好，盡量乾淨QAQ：
   1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   2. [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
   3. [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
   4. [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
   4. [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)


---
- ### ESLint
   > 我嚴重懷疑就是這個部分沒弄好，
   > 他才會超載，直接錯亂給我看...

- #### 1. 安裝 ESLint
   ```
    yarn add eslint -D
   ```

---
- #### 2. 產生 `.eslintrc.cjs`
   > 所以這次直接乖乖用`eslint --init`自己產生：
   ```
    yarn eslint --init
   ```

   1. How would you like to use ESLint?
      - 選擇：To check syntax and find problems
   2. What type of modules does your project use?
      - 選擇：JavaScript modules (import/export)
   3. Which framework does your project use?
      - 選擇：Vue.js
   4. Does your project use TypeScript?
      - 選擇：Yes
   5. Where does your code run?
      - 選擇：Browser
   6. What format do you want your config file to be in?
      - 選擇：JavaScript
   7. Would you like to install them now?
      - 選擇：Yes
   8. Which package manager do you want to use?
      - 選擇：yarn

---
- #### 3. `.eslintrc.cjs` 修正
   > 等他裝完之後，會生出`.eslintrc.cjs`這個檔案在根目錄，
   > 你打開他，會發現第一行就報錯給你看= =：
   > 這時候你需要在下面的`env`加上`node: true`讓`eslint`認識他
   > 因為`module.exports`是要透過`node`處理的：
   ```javascript
    // .eslintrc.cjs
    module.exports = {
      env: {
         browser: true,
         es2021: true,
         node: true,
      },
      // ... 省略一堆
    }
   ```

---
- #### 4. 新增指令
   > `ESLint` 裝完之後，想檢查就檢查：
   > 在根目錄下`package.json`裡新增指令：
   ```json
    // package.json
    "scripts": {
      // ...上面省略
      "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
    },
    // ...下面省略
   ```
   > 新增完可以直接執行看看，在終端輸入：
   ```
    yarn run lint
   ```
   > 然後就報錯了，主要問題：vue/vue3-essential

   1. `eslint`看不懂 `*.vue` 文件，解析噴錯了，
   >    需要而外裝解析器，但是可以看到`.eslintrc.cjs`裡，
   >    已經有`extends``plugin:vue/vue3-essential`了，
   >    但是`parser`設定的是`@typescript-eslint/parser`，
   >    且照`.eslintrc.cjs`的`extends`順序可以知道，
   >    會報錯的原因就是`@typescript-eslint/parser`蓋掉了`vue-eslint-parser`，
   >    所以我們要稍微調整解析器一下：
   ```javascript
    // .eslintrc.cjs
    module.exports = {
      parser: 'vue-eslint-parser',
      parserOptions: {
         ecmaVersion: 'latest',
         sourceType: 'module',
         parser: '@typescript-eslint/parser',
      },
    }
   ```

   2. "{} 不能當作一個類型"：
   > 在 `.eslintrc.cjs` 裡關掉這個錯誤提醒，
   > 畢竟是不可能避開{}的使用的：
   ```javascript
    // .eslintrc.cjs
    module.exports = {
      // ...以上省略
      rules: {
        '@typescript-eslint/ban-types': [
            // 關閉錯誤(error)：不要以 {} 當作一個類型
            'error',
            {
                extendDefaults: true,
                types: {
                    '{}': false,
                },
            }
         ],
      }
    }
   ```

   3. 這是一個警告，警告你用了`any`，因為想盡量避免`any`，
   > 所以Ops會留著這個警告，如果你想關掉，你可以在上面的`rules`在加一條：
   ```javascript
    // .eslintrc.cjs
    module.exports = {
      // ...以上省略
      rules: {
        '@typescript-eslint/ban-types': [
            // 關閉錯誤(error)：不要以 {} 當作一個類型
            'error',
            {
                extendDefaults: true,
                types: {
                    '{}': false,
                },
            }
         ],
         "@typescript-eslint/no-explicit-any": ["off"], // 關閉警告(warning)：不允許使用 any
      }
    }
   ```

---
- ### 再次執行
   > 再度執行看看：
   ```
    yarn run lint
   ```
   > 沒意外的話，看起來乖多了。

   ![結果](https://ithelp.ithome.com.tw/upload/images/20221001/20109918wwJAg3J4Qp.png)

---
## 小結：
> 前前後後重裝了超多次，
> 絕對要筆記起來，
> 不然之後又來，Ops絕對吐血三升...
> 今天這樣只是剛開始，
> 明天繼續...
