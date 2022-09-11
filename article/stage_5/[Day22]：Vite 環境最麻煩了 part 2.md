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
