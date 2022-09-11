![alt](https://)

# 環境甚麼的 最討厭了
   > *每次開始學習新的語言或框架，*
   > *最麻煩的不是要學習他有哪些語法、規則*
   > *是安裝...*
   > *嗯?  好了?!!*
   > *───────────────────────── By Opshell*

---
## 目標：
   > 安裝完成使用Vite + TypeScript需要的環境，
   > 然後開始祈禱過程不要出現奇怪的問題。


- ### [使用Vite搭建Vue3(TypeScript版本)项目](https://www.jianshu.com/p/2d1b6c28e9ac)
- ### [vite + vue3 + ts 使用总结](https://segmentfault.com/a/1190000041296321)

---
## 過程：(安裝請點擊藍字)
- ### 安裝Vite
   >
   #### 1.
   ```
    yarn create vite
   ```
   #### 2. 輸入專案名稱
   #### 3. 選擇框架
   #### 4. 選擇語言
   ![alt](https://)
   ![alt](https://)
   ![alt](https://)
   ![alt](https://)

---
- ### Vite + Vue3 + TypeScript 配置

   cd

   #### 1. TypeScript Node
   > 在配置路径别名、进行文件读写等操作时，我们通常为了简化路径都会使用别名，
   > 但是直接配置的话 TS 环境无法正确识别 node 相关的包的类型声明，所以需要先配置 node 的 types 依赖。
   ```
    yarn add @types/node -D
   ```
   ![alt](https://)

   #### 2. 別名配置
   > TS 环境配置别名需要修改两个地方：`tsconfig.json` 和 `vite.config.ts`。

   > 在 tsconfig.json 中的 compilerOptions 内添加 paths 配置，key 为需要增加的别名，value 为别名对应的目录。
   ```
    "paths": {
      "@/*": ["./src/*"]
    },

   ```
   ![alt](https://)

   > ※ 别名一般都是配置的文件目录，所以 key 和 value 都需要加上后缀 /*

   > vite.config.ts 配置别名也很简单，只需要增加一个配置项即可。
   ![alt](https://)
   > ※ 这里注意需要和 tsconfig.json 中的别名配置匹配，只是 key 的末尾不需要添加 /*，value 需要用 path 指定对应的文件目录

   #### 3 开发服务器和代理
   >

   ![alt](https://)

      #### 1. 安装 prettier
   ```
    yarn add --dev --exact prettier
   ```
   > 設定 prettier.config.js
   ```javascript
    // prettier.config.js
    module.exports = {
      printWidth: 200, // 一行最多200字元
      tabWidth: 4, // Tab = 4個空白
      useTabs: false, // 不使用 Tab 縮排，使用空格
      semi: true, // 行尾需要有分號
      singleQuote: true, // 使用單引號代替雙引號
      quoteProps: 'as-needed', // Object 的 key 僅在必要时用引號
      jsxSingleQuote: false, // jsx 不使用單引號，而使用雙引號
      trailingComma: 'all',  // 末尾使用逗號
      bracketSpacing: true, // 大括號內 首尾需要空白 { title: 'Opshell' }
      jsxBracketSameLine: false, // jsx Tag的尾端括號换行
      bracketSameLine: false,
      arrowParens: 'always', // 箭頭函數，只有一个參數的时候，也需要括號
      rangeStart: 0, // 每个文件格式化的範圍是文件的全部内容
      rangeEnd: Infinity,
      requirePragma: false, // 不需要寫文件開頭的 @prettier
      insertPragma: false, // 不需要自動在文件開頭插入 @prettier
      proseWrap: 'preserve', // 預設斷行
      htmlWhitespaceSensitivity: 'css', // 根據 CSS 設定決定 html 要不要斷行
      endOfLine: 'lf' // 換行符號使用lf
    }
   ```

   > 設定 .prettierignore
   ```
    node_modules
    dist
    public
   ```

   #### 2. 安裝ESLint
   > 因为 eslint 不能识别 TypeScript 语法，所以我们要添加对应的 @typescript-eslint/parser 来替换原有解析器；
   > 并安装 @typescript-eslint/eslint-plugin 与 eslint-plugin-vue 来为 ts 等文件增加对应的语法规则。
   > 并且为了配合 prettier 代码美化规则，还需要安装 eslint-config-prettier 和eslint-plugin-prettier 来读取 prettier 配置。

   ```shell
    yarn add eslint -D
    yarn add eslint-plugin-vue -D
    yarn add @typescript-eslint/parser -D
    yarn add @typescript-eslint/eslint-plugin -D
    yarn add eslint-config-prettier -D
    yarn add eslint-plugin-prettier -D
   ```
   > 當然你也可以 縮成一行指令，這邊只是方便看


---
參考
https://juejin.cn/post/7124950336648773640