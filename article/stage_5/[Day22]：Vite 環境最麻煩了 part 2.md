![alt](https://)

# 環境甚麼的 最討厭了
   > *每次開始學習新的語言或框架，*
   > *最麻煩的不是要學習他有哪些語法、規則*
   > *是安裝...*
   > *嗯?  好了?!!*
   > *───────────────────────── By Opshell*

---
## 目標：
   > 安裝完成使用TypeScript需要的環境，
   > 然後開始祈禱過程不要出現奇怪的問題。


- ### [使用Vite搭建Vue3(TypeScript版本)项目](https://www.jianshu.com/p/2d1b6c28e9ac)
- ### [vite + vue3 + ts 使用总结](https://segmentfault.com/a/1190000041296321)

---
## 過程：(安裝請點擊藍字)
- ### 語法配置
   >
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


   #### 3. jsx
   > [JSX](https://blog.csdn.net/qq_16221009/article/details/122460305)
   ```shell
    import vueJsx from '@vitejs/plugin-vue-jsx'
   ```
   ![alt](https://)

   > 其實Ops 沒在用Jsx的，根本不會啊
   > 不過聽說和TypeScript 很合 然後Vite又支援
   > 不然先裝起來  總有天會用到


   #### 4. 自動載入
   > 在使用 vue 3 的组合式 api 的时候，页面上通常需要些很多的 import，所以 vue 与 vite 的主要贡献者 [Anthony Fu(antfu) ]()(關注起來)
   > 根据 unplugin 编写了几个自动引入插件，这里可以使用 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 和 unplugin-vue-components
   ```
    npm i unplugin-auto-import -D
   ```

   > 因为我们使用的是 vite + ts 的环境，并使用了 eslint，所以我们需要进行一下配置
   ```
   ```

   ```typescript
    // vite.config.ts
    import AutoImport from 'unplugin-auto-import/vite'

    export default defineConfig({
      plugins: [
         AutoImport({ /* options */ }),
      ],
    })
   ```

   > 这里需要对原来的 .eslintrc.js 文件进行修改，增加 unplugin-auto-import 生成的规则文件。
   ```
   ```

   ![alt](https://)

   #### 5. 自動引入
   > 这个仓库则是自动为 vue 项目按需导入组件的插件，并且可以自定义 Resolver 来配置引入规则。但是，该插件不支持 Jsx 和 Tsx 语法
   > 该仓库内置了 Ant Design Vue Arco Design Vue Element Plus Naive UI VueUse Components 等 18 个组件库的 Resolver 方法。
   ```shell
    yarn add unplugin-vue-components -D
   ```

   > 然后，在 vite.config.ts 中进行配置。

   #### 6. dev
   ```shell
    npm run dev
   ```
---
## 小結
> 今天環境裝太多了設定太多了，
> 要吐了 先這樣  先緩緩  我不行了。
