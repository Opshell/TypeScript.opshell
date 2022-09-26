![Day 26 Banner](https://ithelp.ithome.com.tw/upload/images/20220926/20109918YUK1LbTjiO.jpg)

# Axios X Router
> *這才不是PS5*
> *這是Plash Speed 5*
> *────────────────── By 장삐쭈*

---
## 目標：安裝 axios + router

---
## 過程：
- ### axios 安裝、使用
   > 為啥要裝?別鬧了`axios`捏?
   ```
    yarn add axios -D
   ```
   > 由於`axios`已經自帶`.d.ts`了，
   > 所以你啥都不用做就可以直接用了。

---
- ### vue router
   > 安裝當起手式沒問題吧?
   ```
    yarn add vue-router@next -D
   ```
   > `vue router`本身提供了`宣告檔案`，
   > 所以開箱即用~~(真是太好了)~~

- #### 1. 改寫`router`
   > 在`src`下面建立`router`目錄，
   > 新增兩個檔案`index.ts`、`routes.ts`

* 1-1. `index.ts`：
   > 原先JS長這樣：
   ```javascript
    import { createRouter, createWebHistory } from "vue-router";
    import axios from "axios";
    import store from "../store";

    import routes from "./routes.js"; // 路由列表

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

---
- #### 調整store引用：
   ```typescript
    // @/router/index.ts
    import { store } from "@/store";
   ```
   > 由於`/router/index.ts`沒有`setup`也不是`components`
   > 所以不能`inject`，要換成另一種`store`引用的方式。

---
- #### 調整環境參數：
   ```typescript
    const router = createRouter({
      // history: createWebHistory(process.env.BASE_URL),
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
    });
   ```
   > 是的，`Vite`並不能用`process.env.BASE_URL`，
   > 但是他另外提供了`import.meta.env`可以用，[參考](https://cn.vitejs.dev/guide/env-and-mode.html)

---
- #### 調整store.commit用法
   ```typescript
    store.commit("route/setRouteFrom", from);
    store.commit("route/startLoading"); // 開啟遮罩
   ```
   > 像這樣在前面加上`namespace`。

---
- #### 調整`store/route.ts`型別：
   ```typescript
    export interface iRouteState {
      isLoading: Boolean, // 是否處於Loading狀態
      redirect: string,
      route: {
         from: any,
         to: any
      },
      pageData: iPageData,
    }
   ```
   > 由於我們有安裝`vue-router`了，
   > 當然馬上把`any`換掉：
   ```typescript
    import { RouteLocationNormalized } from "vue-router"; // 引用 vue-router 型別

    export interface iRouteState {
      isLoading: Boolean, // 是否處於Loading狀態
      redirect: string,
      route: {
         from: any,
         to: any
      },
      pageData: iPageData,
    }
   ```
   ![改型別](https://ithelp.ithome.com.tw/upload/images/20220926/20109918ZA9uuPk7IN.png)
   > 下面兩個`mutations`的`from`、`to`也別忘了。

---
* 1-2. `routes.ts`：
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
   > 這時候就會警告說你用`any`，
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

    const routes:iRoute[] = [
      {
         name: "Login",
         path: "/login",
         component: () => import("@/views/Login.vue"),
         meta: { title: '登入' },
      }
    ];
   ```

---
- #### 2. 修改`main.ts`
   ```typescript
    import router from './router'

    app.use(router)
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
               'vuex',
               // custom
               {
                  '@vueuse/core': [
                     'useMouse', // named imports
                     ['useFetch', 'useMyFetch'], // alias
                  ],
                  'axios': [ // 整包 axios import
                     ['default', 'axios'], // import { default as axios } from 'axios',
                  ],
                  'js-base64': [ // import Base64 單一功能
                     'Base64'
                  ],
               },
            ],
         // ... 省略一堆
         }),
         Components({
            dirs: ['src/components'], // 指定组件位置，預設是src/components
            dts: 'src/types/components.d.ts', // 配置文件生成位置
            resolvers: [NaiveUiResolver()]
         })
      ],
      // ... 省略一堆
      build: {
         outDir: '../WebAdmin/', // 指定輸出位置(相對於project根目錄).
      }
   });
   ```
   > 像上面`plugins.imports`裡的這樣，就會按需自動import囉~

---
## 小結：
> 今天連router都處理好了，
> 明天應該就能正式開始寫點什麼了，
> 大家明天見。
