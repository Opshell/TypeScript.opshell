![alt](https://)

# Vite 環境最麻煩了
> *開始用Vite之後，*
> *是個會自立自強的大人了呢!!*
> *───────────────────────── By Opshell*

---
## 目標：
> 開始設定一些環境，框架行為、檢查等。

---
## 過程：
- ### 程式碼風格、檢查設定
   > 為了美觀、統一風格，我們一定是會安裝`Prettier`、`ESLint`，
   > 等風格化套件，但由於是TypeScript，會有億點點不一樣：

   #### 1. 安装 prettier
   ```shell
    yarn add -D -E prettier
   ```
   ![alt](https://)

   > 在`webadminvite`目錄下新增`prettier.config.js`然後設定他：
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
   > 在`webadminvite`目錄下新增`.prettierignore`並設定他：
   ```
    node_modules
    dist
    public
   ```

   #### 2. 安裝`ESLint`
   > 因為`ESLint`看不懂TypeScript，所以我们要安裝對應的`@typescript-eslint/parser`来擴充解析器；
   > 再安裝`@typescript-eslint/eslint-plugin`、`eslint-plugin-vue` 來新增`.ts`等文件對應的語法。
   > 再配合`prettier`安裝`eslint-config-prettier`、`eslint-plugin-prettier`來應用`prettier`的設定。
   ```shell
    yarn add eslint -D
    yarn add eslint-plugin-vue -D
    yarn add @typescript-eslint/parser -D
    yarn add @typescript-eslint/eslint-plugin -D
    yarn add eslint-config-prettier -D
    yarn add eslint-plugin-prettier -D
   ```
   > 當然你也可以 縮成一行指令，這邊只是方便看。
   > 在`webadminvite`目錄下新增`.eslintrc.js`然後把下面的設定塞進去：
   ```javascript
    module.exports = {
      // parser 解析依賴設定
      parser: 'vue-eslint-parser',
      parserOptions: {
         parser: '@typescript-eslint/parser', // 設定解析器
         ecmaVersion: 2020, // 設定ECMAScript版本
         sourceType: 'module', // 設定原始碼類型
         ecmaFeatures: {} // 其他語言擴展，包含jsx、全域嚴格模式等
      },
      // 繼承套件的規則設定
      extends: [
         'plugin:vue/vue3-recommended',
         'plugin:@typescript-eslint/recommended',
         'plugin:prettier/recommended',
         'prettier'
      ],
      // 自訂規則
      rules: {}
    }
   ```
   > 然後新增忽略文件`.eslintignore`：
   ```
    node_modules/
    public/
    es/
    lib/
    dist/
    docs/
    src/assets/
    package.json
   ```
   > 這樣子風格檢查環境就做好了。

---
- ### `AutoLoad(自動載入)`
   > 在使用Vue 3的`compostion(組合式)` API的时候，
   > 稍微大點的專案，通常會用很多`import`，
   > [Anthony Fu(antfu)](https://github.com/antfu)(Vue 與 vite 的主要貢獻者之一)大大，
   > 根據`unplugin`做了幾個自動import的套件，
   > 我們使用`unplugin-auto-import`和`unplugin-vue-components`：

   #### 1. `unplugin-auto-import(自動載入套件)`
   ```
    yarn add unplugin-auto-import -D
   ```
   > 因為我們是用vite + ts，還使用了`ESLint`，
   > 所以我们需要在`vite.config.ts`設定一些東西：
   ```typescript
    import AutoImport from 'unplugin-auto-import/vite' // 引用

    export default defineConfig({
      plugins: [
         AutoImport({ /* options */ }), // 設定
      ],
    })
   ```
   > `/* options */`設定可以看[這邊](https://github.com/antfu/unplugin-auto-import)，可以直接複製範例。
   > 然後把`dts`的值改成：`'./types/auto-imports.d.ts'`。
   > 然後需要修改`.eslintrc.js`，增加`unplugin-auto-import`生成的規則文件。
   ```javascript
    module.exports = {
      extends: [
         './.eslintrc-auto-import.json', // `unplugin-auto-import` 生成的規則設定
         // ...
      ]
    }
   ```

   #### 2. 自動引用組件
   > 這個套件自動按照需求`import(載入)`組件，
   > 還可以自訂`Resolver(解析)`来設定`import(載入)`規則。
   > 並預設了 `Ant Design Vue`、`Element Plus`、`Naive UI`、`VueUse Components`等
   > 18個常用套件的`Resolver(解析)`方法。
   > ※ 不支援`Jsx`和`Tsx`語法：
   ```shell
    yarn add unplugin-vue-components -D
   ```

   > 在`vite.config.ts`裡新增下面的設定：
   ```typescript
    import Components from 'unplugin-vue-components/vite'
    import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

    export default defineConfig({
      plugins: [
         Components({
            dirs: [ '@/components' ], // 指定components位置 預設是'src/components'
            dts: './types/components.d.ts', // .d.ts生成位置
            resolvers: [ NaiveUiResolver() ] // 解析規則
         })
      ]
    })
   ```
   > 然後在`webadminvite`目錄裡新增`types`資料夾，用來放之後的`宣告檔案`。

---
- ### 執行看看
   ```shell
    yarn run dev
   ```
   > 沒問題的話，依然會看到這個：
   ![vite 成功畫面](https://ithelp.ithome.com.tw/upload/images/20220920/20109918xKJxxoPWAV.png)

---
## 小結
> 今天環境裝太多了設定太多了，
> 要吐了，先這樣... 我不行了。


- ### [使用Vite搭建Vue3(TypeScript版本)项目](https://www.jianshu.com/p/2d1b6c28e9ac)
- ### [vite + vue3 + ts 使用总结](https://segmentfault.com/a/1190000041296321)
- ### [Vue 3 + TypeScript + Vite 搭建初始项目](https://juejin.cn/post/7051565418460217375)