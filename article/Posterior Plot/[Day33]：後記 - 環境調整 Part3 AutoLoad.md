![Day32 Banner](https://ithelp.ithome.com.tw/upload/images/20221001/20109918EjcEQcDdDz.jpg)

# Vite環境最...咦!壞掉了...
> **
> *果然還是最麻煩了! 哭阿!*
> *──────────────── By Opshell*

---
## 目標：成功完成一個能用的環境
> `ESLint`裝完之後，
> 再來就是`Prettier`了，
> 這兩個也是很會打架，
> 壞掉絕對有這傢伙的鍋。

---
## 過程：新裝備給他加載上去
- ### Prettier安裝：
   > `prettier`裝起來：
   ```
    yarn add prettier -D
   ```
   > 然後為了配合`ESLint`，
   > 配合VS Code外掛[Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)的文件
   > 我們安裝這兩個：
   ```
    yarn add eslint-config-prettier -D
    yarn add eslint-plugin-prettier -D
   ```

---
- ### Prettier設定：
   > 在根目錄下新增檔案`.prettierrc`
   > 對，不用副檔名，檔案內容我們用`json`格式：
   ```json
    {
      "printWidth": 100,
      "tabWidth": 4,
      "useTabs": false,
      "semi": true,
      "singleQuote": true,
      "quoteProps": "as-needed",
      "jsxSingleQuote": false,
      "trailingComma": "all",
      "bracketSpacing": true,
      "bracketSameLine": false,
      "arrowParens": "always",
      "requirePragma": false,
      "insertPragma": false,
      "proseWrap": "preserve",
      "htmlWhitespaceSensitivity": "css",
      "vueIndentScriptAndStyle": true,
      "endOfLine": "lf"
    }
   ```
   > 當然，可以改成你習慣的格式。

---
- ### 設定`.eslintrc.cjs`：
   > 設定一下繼承順序：
   ```javascript
    module.exports = {
      // ...以上省略
      extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
      ],
      // ...以下省略
    }
   ```

---
- ### 設定`package.json` 格式化指令：
   > 打開`package.json`，在`script`區設定：
   ```json
    "scripts": {
      "format": "prettier --ignore-path .gitignore --write \"**/*.+(html|vue|ts|js|json|cjs)\""
    },
   ```
   > 這樣只要在終端輸入指令：
   ```
    yarn run format
   ```
   > 就會調整你文件的格式，看起來舒服多了。

---
- ### 設定 VS Code setting：
   > 相信大家都會打開`setting.json`這個檔案，
   > 打開之後，補上設定：
   ```json
    "editor.formatOnSave": true, //存檔時自動格式化
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint", // 解析規則
    "editor.formatOnSaveMode": "file", // 格式化範圍
   ```
   > 這樣子只要你按`ctrl + S`就可以自動格式化該檔案，
   > 在不用一直執行指令了。
   > 但是指令還是有用的，當你拉一大堆檔案進來，
   > 直接執行指令可以一次刷一排，舒服。

---
## ※ 補充：
> Day 31 和 Day 32 的 ESLint和Prettier的忽略文件沒啥改，
> 直接參考[[Day23]：Vite 環境最麻煩了 part 2](https://ithelp.ithome.com.tw/articles/10296947)即可。

---
## 小結：
> 一直都沒辦法好好用`Prettierr`，
> 經過這一攤之後，終於可以正常的用，
> 會按照我想要的方式格式化真是太好了，
> 再來要再補很多有的沒的設定，
> 明天繼續...








类型“{}”上不存在属性“count”

解决方案为在 main 的根目录下创建如下文件
/**
 * vue-file-import.d.ts 文件
 * 添加此文件用来解决ts提示 【类型“{}”上不存在属性“count”】 的问题
 */
declare module"*.vue" {
  import Vue from"vue";
  export default Vue;
}

https://juejin.cn/post/7139720788738834468

"rules": {
    "@typescript-eslint/ban-types": [ // 關閉錯誤(error)：不要以 {} 當作一個類型
        "error",
        {
            "extendDefaults": true,
            "types": {
            "{}": false
            }
        }
    ],
    // "@typescript-eslint/no-explicit-any": ["off"], // 關閉警告(warning)：不允許使用 any
}



Prettier
https://ithelp.ithome.com.tw/articles/10240009

安装 @type/node 依赖： pnpm add @types/node -filter @motorepo/main
修改 tsconfig.json ，在 compilerOptions 字段中增加配置： "types": ["vite/client", "node"]




2305
https://vuejs.org/guide/typescript/overview.html#configuring-tsconfig-json



Vuex

---

- ### ref.value
衆所周知，ref要求我們訪問變量時需要加上.value，這讓很多開發者覺得難受.
let count = ref(1)
const addCount = () => {
  count.value += 1
}
 後來尤大大也提交了一份新的ref語法糖提案。

ref: count = 1
const addCount = () => {
  count += 1
}
該提案一出便引起了社區的一片討論，時間已經過去很久了，這裏就不再廢話這個話題了。

這裏我介紹的是另外一種寫法，也是官方後來出的一種方案，在ref前加上$，該功能默認關閉，需要手動開啓。

// vite.config.ts

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [
    vue({
      refTransform: true // 開啓ref轉換
    })
  ]
})
開啓之後可以這樣寫：

let count = $ref(1)

const addCount = () => {

  count++

}
該語法糖根據不同的版本配置也略有不同，下面貼一下我自己所用相關插件的版本：

"vue": "^3.2.2",
"@vitejs/plugin-vue": "^1.9.0",
"@vue/compiler-sfc": "^3.2.5",
"vite": "^2.6.13"


- ### 配置VScode

1、安装“ESLint”插件【作者: Microsoft】
2、安装“Prettier ESLint”插件 【作者：Rebecca Vest】


https://blog.csdn.net/ganyingxie123456/article/details/126544563?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5-126544563-blog-121949037.pc_relevant_aa_2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5-126544563-blog-121949037.pc_relevant_aa_2&utm_relevant_index=6

https://juejin.cn/post/7130887368042610718



https://blog.csdn.net/weixin_44727080/article/details/123197447





- ### 环境变量配置

vite 提供了两种模式：具有开发服务器的开发模式（development）和生产模式（production）

项目根目录新建:.env.development :
NODE_ENV=development

VITE_APP_WEB_URL= 'YOUR WEB URL'
复制代码
项目根目录新建:.env.production :
NODE_ENV=production

VITE_APP_WEB_URL= 'YOUR WEB URL'
复制代码
组件中使用：
console.log(import.meta.env.VITE_APP_WEB_URL)
复制代码
配置 package.json:

打包区分开发环境和生产环境

"build:dev": "vite build --mode development",
"build:pro": "vite build --mode production",


- ### 驗證
Vite 天然支持引入 .ts 文件。
Vite 仅执行 .ts 文件的转译工作，并 不 执行任何类型检查。并假设类型检查已经被你的 IDE 或构建过程接管了（你可以在构建脚本中运行 tsc --noEmit 或者安装 vue-tsc 然后运行 vue-tsc --noEmit 来对你的 *.vue 文件做类型检查）。
Vite 使用 esbuild 将 TypeScript 转译到 JavaScript，约是 tsc 速度的 20~30 倍，同时 HMR 更新反映到浏览器的时间小于 50ms。
注意因为 esbuild 只执行转译工作而不含类型信息，所以它不支持 TypeScript 的特定功能例如常量枚举和隐式 “type-only” 导入。你必须在你的 tsconfig.json 中的 compilerOptions 里设置 “isolatedModules”: true，这样 TS 才会警告你哪些功能无法与独立编译模式一同工作

vue-tsc 和 tsc
tsc 只能验证 ts 代码类型
vue-tsc 可以验证 ts + Vue Template 中的类型（基于 Volar）
建议在 package.json 中新增一个 scripts 脚本用来单独执行 TS 类型验证：

"scripts": {
	  ...
	  "build": "npm run tsc && vite build",
	  "tsc": "vue-tsc -noEmit"
	}
-noEmit 表示只验证类型，不输出编译结果

跳过第三方包类型检查, 在tsconfig.json中添加:

	{
	  "compilerOptions": {
	    ...
	    "baseUrl": "./",
	    "skipLibCheck": true
	  }
	}
Vue3 的TS具体语法，这里不再赘述，不会的小伙伴可以直接参考 官方文档

https://www.npmjs.com/package/vue-eslint-parser

```
 yarn add vue-eslint-parser -d
```

```javascript
 // .eslintrc.js
 "extends": "eslint:recommended",
  "parser": "vue-eslint-parser"

```

https://juejin.cn/post/7139720788738834468#heading-10



- ## 重新配置 Vite + TypeScript + Vue3 + ESLint + Prettier
```
 yarn create vite eslinttest --template vue-ts
```

```
 yarn add eslint -D
```

```
 yarn eslint --init
```
(1) How would you like to use ESLint?
选择：To check syntax and find problems

(2) What type of modules does your project use?
选择：JavaScript modules (import/export)

(3) Which framework does your project use?
选择：Vue.js

(4) Does your project use TypeScript?
选择：Yes

(5) Where does your code run?
选择：Browser

(6) What format do you want your config file to be in?
选择：JavaScript

(7) Would you like to install them now?
选择：Yes

(8) Which package manager do you want to use?
选择：yarn
