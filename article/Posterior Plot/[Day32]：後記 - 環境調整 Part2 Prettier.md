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



这时候命令行中会显示出上图中的报错，意思就是在解析.vue后缀的文件时候出现解析错误parsing error。
查阅资料后发现，eslint默认是不会解析.vue后缀文件的。因此，需要一个额外的解析器来解析.vue后缀文件。
但是我们查看.eslintrc.js文件中的extends会发现已经有继承"plugin:vue/vue3-essential"的配置。然后在node_modules中可以找到eslint-plugin-vue/lib/cinfigs/essential，里面配置了extends是继承于同级目录下的base.js，在里面会发现parser: require.resolve('vue-eslint-parser')这个配置。因此，按道理来说应该是会解析.vue后缀文件的。
继续往下看.eslintrc.js文件中的extends会发现，extends中还有一个"plugin:@typescript-eslint/recommended"，它是来自于/node_modules/@typescript-eslint/eslint-plugin/dist/configs/recommended.js，查看该文件会发现最终继承于同级目录下的base.js文件。从该文件中可以发现parser: '@typescript-eslint/parser',配置。
按照.eslintrc.js文件中的extends配置的顺序可知，最终导致报错的原因就是@typescript-eslint/parser把vue-eslint-parser覆盖了。

```javascript
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "parser": "@typescript-eslint/parser"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
    }
}
```

两个parser的区别在于，外面的parser用来解析.vue后缀文件，使得eslint能解析<template>标签中的内容，而parserOptions中的parser，即@typescript-eslint/parser用来解析vue文件中<script>标签中的代码。


yarn add -D prettier
yarn add -D vue-eslint-parser

 yarn add eslint-config-prettier -D
 yarn add eslint-plugin-prettier -D


setup-compiler-macros





---

- ###

- ###








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
