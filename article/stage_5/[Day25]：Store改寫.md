![alt](https://)

# 這豈不是無敵了??
	> *當ES6 裝上了TypeScript，*
	> *這豈不是無敵了?!。*
	> *───────────────────────── By Opshell*

---
## 目標: 學會Function 的Type法
> 作為JavaScript 中常用到的的部分，
> 在 ES6 終於普及後有了更多花式的玩法，
> `Arrow Funciton`、參數預設值、`...rest (其餘運算子)`，
> 簡直就是天堂!!
> 在 TypeScript 中 當然有許多裝備可以配合這些花式玩法，
> 就讓我們一起看下去。

---
## 過程：
- ### 原先的store
   ```javascript
    // index.js
    import { createStore } from "vuex";
    import user from "./user"; // 登入、使用者相關
    import route from "./route"; // 路由相關

    export default createStore({
      state: {},
      getter: {},
      actions: {}, // 變動state 用(可非同步)
      mutations: {} // 變動 state 用(只能同步)
      modules: { user, route },
    });
   ```
   > 看的出來有兩個`modules`，
   > 我們一個一個來處理：

   #### 1. user.js
   > 這段式原先的JS
   > 我們複製一個，丟進 `'src/store/'`裡，
   > 並把檔名改成`user.ts`
   > 會發現很多地方開始提醒你有問題：
   ```javascript
    import { Base64 } from "js-base64";

    export const state = {
      isLogin: false, // 是否有登入
      jwtToken: '',
      userData: {
         // 登入資訊
         user: '',
         name: '',
         /** 使用者權限劃分 permission level
            *  0 最高管理者 全開
            *  1 網站管理者
            *  2 一般使用者
            *  3 訪客
            */
         auth: '3',
      },
    };
    export const actions = {};// 非同步
    export const mutations = { // 同步
      signIn(state) { state.isLogin = true; },
      signOut(state) { state.isLogin = false; },
      /** 將登入後的 Token 轉 成userData
      * @param {*} state
      * @param {JWT} JWT
      */
      setUser(state, JWT) {
         state.jwtToken = JWT;

         // JWT = header.payload.Signature
         const Token = JWT.split("."); // 解析使用者資料
         const data = JSON.parse(Base64.decode(Token[1]));

         // 記錄登入者資訊
         state.userData.user = data.user;
         state.userData.name = data.name;
         state.userData.auth = data.auth;
      },
    };
    export const getters = {
      isAuthenticated: state => !!state.user || !!sessionStorage.getItem("user"),
    };

    export default {
      state,
      getters,
      actions,
      mutations,
      namespaced: true,
    };
   ```
   > 看來看去，最主要的問題是，
   > state的型別沒有宣告，所以我們改成這樣：
   ```typescript
    // 把使用者權限列舉起來
    enum PERMISSION_LEVEL {
      TOP_MANAGEMENT, // 0 最高管理者 全開
      MANAGER, // 1 網站管理者
      USER, // 2 一般使用者
      VISITOR // 3 訪客
    }

    // 宣告、並匯出user的State
    export interface iUserState {
      isLogin: Boolean, // 是否有登入
      jwtToken: string,
      userData: {
         user: string,
         name: string,
         auth: PERMISSION_LEVEL,
      },
    }

    export default {
      namespaced: true,
      state: {
         isLogin: false,
         jwtToken: '',
         userData: {
               user: '',
               name: '',
               auth: PERMISSION_LEVEL.VISITOR,
         },
      },
      // 把state通通補上型別
      mutations: { // 同步
         signIn(state: iUserState) { state.isLogin = true; },
         signOut(state: iUserState) { state.isLogin = false; },
         /** 將登入後的 Token 轉 成userData
            * @param {*} state
            * @param {JWT} JWT
            */
         setUser(state: iUserState, JWT: string) {
               state.jwtToken = JWT;

               // JWT = header.payload.Signature
               const Token = JWT.split("."); // 解析使用者資料
               const data = JSON.parse(Base64.decode(Token[1]));

               // 記錄登入者資訊
               state.userData.user = data.user;
               state.userData.name = data.name;
               state.userData.auth = data.auth;
         },
      },
      getters: { // 這邊順便被提醒state.user 不存在，把userData補上去。
         isAuthenticated: (state: iUserState) => !!state.userData.user || !!sessionStorage.getItem("user"),
      }
    }
   ```
   > 然後安裝一下：`js-base64`
   > JWT機制，解碼用的：
   ```shell
    yarn add axios
   ```
   > 由於`js-base64`已經自帶`.d.ts`了，
   > 所以你啥都不用做就可以直接用了。
   > 剛改寫第一支JS程式，馬上就體驗到TS的好用與方便。
   > `route.js`的改寫方式大同小異，這邊就省略掉了。

   #### 2. index.js
   > modules都改寫完之後，把昨天調整過的`src/store/index.js`改成這樣：
   ```typescript
    import { InjectionKey } from 'vue'
    import { createStore, useStore as baseUseStore, Store } from 'vuex'

    import route, { iRouteState } from './route'; // 登入、使用者相關
    import user, { iUserState } from './user'; // 登入、使用者相關

    export interface State {
      route: iRouteState,
      user: iUserState,
    }

    export const key: InjectionKey<Store<State>> = Symbol()
    export const store = createStore<State>({
      state: {
         route: route.state,
         user: user.state
      }
    })

    // 定義自己的 `useStore` composition(組合式) API
    export function useStore() {
      return baseUseStore(key)
    }
   ```
   > 這樣就大功告成啦~

---
## 小結：
   > 今天會了Funciton的Type法
   > 而且更了解了 ES6 的`其餘預算子`
   > 對於型別的Type法也更熟練了
   > 明天繼續學習 Funciton的 Types法，
   > ~~這麼有料的東西怎麼可以一天水完?~~
