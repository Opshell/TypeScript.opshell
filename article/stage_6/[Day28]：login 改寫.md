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

---
## 過程：(安裝請點擊藍字)
- ### login 改寫：
   ```javascript
    import { defineAsyncComponent, reactive, onMounted } from 'vue';
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import { getData } from "../hook/getData.js"

    import elInput from "../components/el-input.vue";

    export default {
      name: "LoginVue3",
      components: {
         // elImg,
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

         // const vuexState = useState(['user']);

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
                  // let store = useStore();
                  loginForm.verification = verification;

                  // this.authenticate(username, password)
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
               // ...vuexState,
               loginForm,
               handleLogin
         }
      }
    };
   ```

---
## 小結：
   > 終於把環境安裝搞定啦~
   > 老實說我一直是裝環境的苦手，
   > 好險這次安裝TypeScript好像沒遇到甚麼特別的問題，
   > ~~就是打開家裡的 前端環境 全炸掉了而已，最後整個重裝~~
   > 希望大家安裝過程一切順利。

   > 如果遇到甚麼奇怪的問題，問google大神比我有用多了，
   > 以上...

---
## 坑：
1. ### VS code看不懂英文介面，你可以安裝[中文化](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hant)
2. ### 你的nvm指令老是無法成功，或者出現了亂碼↓↓↓
   > 請將NVM 安裝在C:\ 下，或者使用系統管理員權限執行
