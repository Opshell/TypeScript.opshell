![alt](https://)

# 這豈不是無敵了??
	> *當ES6 裝上了TypeScript，*
	> *這豈不是無敵了?!。*
	> *───────────────────────── By Opshell*


https://pjchender.dev/ironman-2021/ironman-2021-day12/

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
   - ### 1. App.vue
   ```javascript
    // App.vue <script>
    import Login from "./views/Login.vue";

    export default {
        name: "App",
        components: {
            Login,
        },
        setup() {
            const storeState = useState(['isLoading', 'user']);

            return {
                ...storeState
            }
        }
    };
   ```

   > 重新引用store，因為有自動引用，
   > 所以刪除 Login 引用
   ```typescript
    import { useStore } from './store';
    export default {
      name: "App",
      setup() {
         const store = useStore();

         return {
            ...store.state
         }
      }
    }
   ```

   > 新增自動載入components 路徑


   > 新增view資料夾
   > 新增Login.vue
   ```typescript

   ```

---
## 小結：
   > 今天會了Funciton的Type法
   > 而且更了解了 ES6 的`其餘預算子`
   > 對於型別的Type法也更熟練了
   > 明天繼續學習 Funciton的 Types法，
   > ~~這麼有料的東西怎麼可以一天水完?~~
