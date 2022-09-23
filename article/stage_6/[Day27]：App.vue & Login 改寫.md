![alt](https://)

# 這豈不是無敵了??
> *當ES6 裝上了TypeScript，*
> *這豈不是無敵了?!。*
> *───────────────────────── By Opshell*

---
## 目標: App.vue && getData
> 終於進到了正題啦!!
> 今天的目標就是把Login做出來，
> 然後把原本Vite預設的頁面變成登入後的首頁。
> 讓我們開始吧!GOGO~

---
## 過程：
- ### 1. App.vue
   > `HTML`和`CSS`架構就不放出來了,
   > 畢竟我們是講`TypeScript`：
   ```javascript
    // App.vue <script> Javascript Code
    import { useState } from "./hook/vuexSugar.js";

    import Header from "./views/block/_header.vue";
    import Footer from "./views/block/_footer.vue";
    import Login from "./views/Login.vue";
    import Account from "./views/Account.vue";
    import SideMenu from "./views/block/_sideMenu.vue";

    // @ is an alias to /src
    export default {
        name: "App",
        components: {
            SideMenu,
            Header,
            Footer,
            Login,
            Account,
        },
        setup() {
            const storeState = useState(['isLoading', 'user']);

            return {
                ...storeState
            }
        }
    };
   ```
   > 改成這樣：
   ```typescript
    // App.vue <script lang=ts> Javascript Code
    import { useStore } from './store';

    export default {
      name: "App",
      setup() {
         const store = useStore();

         return {
            ...store.state
         }
      }
    };
   ```
   > 在script 標籤加上 lang="ts"表示裡面是用TS寫的，
   > 然後 因為App沒用到什麼特別的，
   > 只需要把`Vuex`的`state`輸出就可以了。
   > ※ 值得一提的是，可以看到轉Vite後安裝了`unplugin-auto-import`，
   >    它會自動載入`components` 所以不用再引用了，乾淨整潔超多。
   >    不過`unplugin-auto-import`預設只會載入`components`資料夾的東西，
   >    有需求可以在`vite.config.ts`裡面新增：
   ```typescript
    // vite.config.ts
    plugins: [
        vue({

        }),
        Components({
            dirs: [ 'src/components', 'src/views' ], // 指定components位置 預設是'src/components'
            dts: 'src/types/components.d.ts', // .d.ts生成位置
         }),
   ```
   > 向上面這樣 把'src/views'加進來。

---
- ### 2. Login.vue
   > 接下來就是登入頁啦：
   ```javascript
    // src/views/Login.vue
    import { defineAsyncComponent, reactive, onMounted } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import { getData } from "../hook/getData.js"

    import elInput from "../components/el-input.vue";

    export default {
        name: "LoginVue3",
        components: {
            elBtn: defineAsyncComponent(() => import("../components/el-button.vue")),
            elInput,
        },
        setup() {
            const store = useStore();
            const router = useRouter();

            //data
            const loginForm = reactive({
                username: '',
                password: '',
                verification: '',
            });

            onMounted(() => {
                loginForm.username = "Opshell";
                loginForm.password = "pass";
            });

            // Methods
            const handleLogin = () => {
                const verification = "test";
                const username = loginForm.username;
                const password = loginForm.password;

                if (username !== "" && password !== "") {
                    // 登入成功
                    loginForm.verification = verification;

                    getData(
                        "/api/backEnd/login", "POST",
                        { username, password }
                    ).then((auth) => {
                        if (auth.status) {
                            localStorage.setItem("token", auth.data); // 紀錄token

                            store.commit("user/signIn");
                            store.commit("user/setUser", auth.data); // 記錄使用者資料

                            const redirect = store.state.redirect == "" || store.state.redirect == undefined ? "Dashboard" : store.state.redirect;
                            router.push({ name: redirect });
                        } else {
                            console.log(auth);
                        }
                    });
                } else {
                    // 登入失敗
                    alert("帳號密碼不能為空");
                }
            };

            return {
               loginForm,
               handleLogin
            }
        }
    };
   ```
   > 改成下面這樣：
   ```typescript
    //1. 修改 import 把會自動引用的都拿掉
    import { useStore } from '@/store';
    import { getData } from '@/hook/getData';

   // ...以上相同
   getData(
      "/api/backEnd/login", "POST",
      { username, password }
   ).then((auth) => {
      // 前面要先判斷auth，畢竟沒js自由了，不嚴謹點TS會警告
      if (auth && auth.status) {
            localStorage.setItem("token", auth.data); // 紀錄token

            store.commit("user/signIn");
            store.commit("user/setUser", auth.data); // 記錄使用者資料

            // 把 Dashboard 改成 Home
            const redirect = store.state.redirect == "" || store.state.redirect == undefined ? "Home" : store.state.redirect;
            router.push({ name: redirect });
      } else {
            console.log(auth);
      }
   });
   // ...以下相同
   ```

---
- ### 2. Login.vue
   > 接下來我們來調整`router`：
   ```typescript
    // src/router/routes.ts
    const routes: iRoute[] = [
      {// Home
         name: "Home",
         path: "/",
         component: () => import('@/views/Home.vue'),
         meta: { },
      }, {
         name: "Login",
         path: "/login",
         component: () => import('@/views/Login.vue'),
         meta: { title: '登入' },
      }
    ];
   ```
   > 再把原先Vite 預設的App.vue改名成Home丟進`src/views`就可以了。

---
## 小結：
> 可以發現今天改的東西非常的少，
> 主要集中在調整自動載入的`import`和`componets`，
> 可見前期環境設定還是蠻重要的，沒處理好這邊就會處處碰壁，
> `Vite`快是真的快，要設定的東西也多，
> 不過好處是可以對專案框架瞭如指掌。
> 還是可以學到很多東西的。
> `@/hook/getData`就留給明天處理吧，大家晚安。
