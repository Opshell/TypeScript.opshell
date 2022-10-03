![Day32 Banner](https://ithelp.ithome.com.tw/upload/images/20221001/20109918EjcEQcDdDz.jpg)

# 解放滿滿的import
> *正事還沒做就先Import一堆*
> *不行吧?*
> *─────────────────── By Opshell*

---
## 目標：Auto起來
> 裝完`ESLint`、`Prettier`，
> 看起來沒啥問題，可以乖乖用，難道是因為，
> `unplugin-auto-import`和`unplugin-vue-components`，在鬧?

---
## 過程：
- ### 路徑別名設定起來
   > 安裝 @type/node
   > 可以直接參考[[Day22]：Vite 環境最...咦裝好了 part1](https://ithelp.ithome.com.tw/articles/10296329)
   > 唯一不同的地方是需要再`tsconfig.json`裡，
   > `compilerOptions`增加配置：
   ```json
    // tsconfig.json
    {
      "compilerOptions": {
         // ...以上省略
         "types": ["vite/client", "node"]
         // ...以下省略：
      }
    }
   ```
   > 詳請可以參閱[Vite 官方中文文檔](https://cn.vitejs.dev/guide/features.html)，
   > 這邊就不多做解釋了= 口=


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

- ### AutoLoad
   > 安裝 `unplugin-auto-import`和`unplugin-vue-components`
   > 的方式和 [[Day23]：Vite 環境最麻煩了 part 2](https://ithelp.ithome.com.tw/articles/10296947)
   > 基本沒有區別，注意讓`AutoImport`的`eslintrc:{enabled`
   > 選項為`true`生成一下參照檔案，
   > 然後把參照檔案加入`.eslintrc.cjs`裡`extends`的最前面
   ```javascript
    module.exports = {
      extends: [
        './.eslintrc-auto-import.json', // `unplugin-auto-import` 生成的規則設定
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
      ],
    }
   ```

---
## 小結：
> 往後就沒有甚麼特別的環境要裝了，
> 把檔案都處理好後，總算可以完全正常執行了，
> 雖然看起來好像沒做什麼，
> 但其實Ops反覆裝了5~6次，
> 爬了N篇文章+各種官方文件...
> 真的要筆記起來，
> 也希望能夠真的幫助到有問題的各位。

# 真‧完賽總結+心得：
這次是真的結束了，教學果然是最好的學習方式，
推薦還在觀望的各位，有機會也來參加鐵人賽，
大家晚安






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



