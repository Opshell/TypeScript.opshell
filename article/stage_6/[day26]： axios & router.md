![alt](https://)

# 環境甚麼的 最討厭了
> *每次開始學習新的語言或框架，*
> *最麻煩的不是要學習他有哪些語法、規則*
> *是安裝它的環境...*
> *───────────────────────── By Opshell*

---
## 目標：
   > 安裝完成使用TypeScript需要的環境，
   > 然後開始祈禱過程不要出現奇怪的問題。

封裝axios
https://juejin.cn/post/7107047280133275678

---
## 過程：(安裝請點擊藍字)
- ### axios
   > 為啥要裝?別鬧了`axios`捏?
   ```shell
    yarn add axios -D
   ```
   > 由於`axios`已經自帶`.d.ts`了，
   > 所以你啥都不用做就可以直接用了。

---
- ### vue router
   > 安裝當起手式沒問題吧?
   ```shell
    yarn add vue-router@next -D
   ```
- #### 1. 修改`main.ts`
   ```typescript
    import router from './router'

    app.use(router)
   ```
   > `vue router`本身提供了`宣告檔案`，
   > 所以開箱即用~~(真是太好了)~~


- #### 2. 改寫`router`
   > 在`src`下面建立`router`目錄，
   > 新增兩個檔案`index.ts`、`router.ts`

   * 2-1. `index.ts`：
   > 原先JS長這樣：
   ```javascript
    import { createRouter, createWebHistory } from "vue-router";
    import axios from "axios";
    import store from "../store";

    import routes from "./router.js"; // 路由列表

    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
    });

    // 在 login 頁面還不能完全做到攔截不正確登入訊息，我們必須在router.js做更進一步處理
    router.beforeEach(async (to, from) => {
      store.commit("setRouteFrom", from);
      store.commit("startLoading"); // 開啟遮罩
      // 目的路由在meta上是否有設置requireAuth: true
      if (to.meta.requireAuth) {
         const isLogin = store.state.user.isLogin;

         if (isLogin) {
               const token = localStorage.getItem("token");
               axios({
                  url: "/api/auth/verify",
                  method: "GET",
                  headers: { Authorization: `Bearer ${token}` },
               }).then((res) => {
                  if (res.status == 200) {
                     if (res.data.status == "Success") {
                           localStorage.setItem("token", res.data.data);
                           store.commit("setRedirect", "");
                     } else {
                           localStorage.setItem("token", "");
                           return { name: "Login" };
                     }
                  } else {
                     localStorage.setItem("token", "");
                     return { name: "Login" };
                  }
               })
               .catch(() => {
                  localStorage.setItem("token", "");
                  return { name: "Login" };
               });
         } else {
               localStorage.setItem("token", "");
               return { name: "Login" };
         }
      }

      store.commit("setRouteTo", to);
    });

    export default router;
   ```
   > 恩，沒錯紅通通一片，
   > 我們把它改寫成這樣：
   ```typescript
    const router = createRouter({
      // history: createWebHistory(process.env.BASE_URL),
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
    });
   ```
   > 是的，`Vite`並不能用`process.env.BASE_URL`，
   > 但是他另外提供了`import.meta.env`可以用，[參考](https://cn.vitejs.dev/guide/env-and-mode.html)

   > 好吧，其實沒有一片，只有一點點要改而已，
   > 沒辦法，`axios`和`vue router`都有提供`宣告檔案`，
   > 就是這麼方便。

---
   * 2-2. `router.ts`：
   > 老樣子提供原碼：
   ```javascript
    const routes = [
      {
         name: "Login",
         path: "/login",
         component: () => import("../views/Login.vue"),
         meta: { title: '登入' },
      },
      // ... 省略一堆
    ];

    export default routes;
   ```
   > 這時候就會警告說你用any，
   > 但我們知道其實我們有固定的格式，
   > 所以宣告一下：
   ```typescript
    interface iRoute {
      name: string,
      path: string,
      component: () => {},
      meta: {
         title?: string,
         requireAuth?: boolean,
      }
    }

    const routes:iRoute[] = [];
   ```
   > 恩，就這樣沒問題了，是不是很簡單?
   > 什麼? 覺得今天很空虛?
   > 那我們多講點其他的。

---
- ### AutoImport
   > 什麼? 你說這講過了?
   > 只說怎麼安裝沒說怎麼用阿!
   > 例如上面的`axios`和之前的`Base64`要怎麼自動載入呢?
   > 我們來到`vite.config.ts`：
   ```typescript
    export default defineConfig({
      // ... 省略一堆
      plugins: [
         vue(), vueJsx(),
         AutoImport({
            // targets to transform
            include: [
               /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
               /\.vue$/, /\.vue\?vue/, // .vue
               /\.md$/, // .md
            ],

            // global imports to register
            imports: [
               // presets
               'vue',
               'vue-router',
               // custom
               {
                  '@vueuse/core': [
                     // named imports
                     'useMouse', // import { useMouse } from '@vueuse/core',
                     // alias
                     ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
                  ],
                  'vuex': [
                     'useStore', 'useState',
                     ['default', 'vuex'],
                  ],

                  // '[package-name]': [
                  //     '[import-names]',
                  //     // alias
                  //     ['[from]', '[alias]'],
                  // ],
                  // 整包 axios import
                  'axios': [
                     // default imports
                     ['default', 'axios'], // import { default as axios } from 'axios',
                  ],
                  // import Base64 單一功能
                  'js-base64': [
                     'Base64'
                  ],

               },
            ],
         // ... 省略一堆
         }),
         Components({
            dirs: ['src/components'], // 指定组件位置，默认是src/components
            dts: 'src/types/components.d.ts', // 配置文件生成位置
            resolvers: [NaiveUiResolver()]
         })
      ],
      // ... 省略一堆
      build: {
         outDir: '../WebAdmin/', // 指定輸出位置(相對於 項目根目錄).
      }
   });
   ```
   > 像上面`plugins.imports`裡的這樣，就會按需自動import囉~

---
## 小結：
> 今天連router都處理好了，
> 明天應該就能正式開始寫點什麼了，
> 大家明天見。
