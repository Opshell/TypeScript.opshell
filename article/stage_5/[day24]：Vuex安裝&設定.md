![alt](https://)

# Vuex 設定
> *`Vuex`是一個專為`Vue.js`開發的狀態管理模式 + 套件*
> *他集中儲存、管理App中的所有組件狀態*
> *──────────────────── By Opshell*

---
## 目標：安裝、設定Vuex

---
## 過程：
- ### SCSS
   > 沒事，就是前兩天忘了裝：
   ```shell
    yarn add sass sass-loader -D
   ```
   > 設定`vite.config.ts`
   ```typescript
      css: {
         preprocessorOptions: {
            scss: { // 設定全域SCSS
                  additionalData: '@import "@/assets/scss/stylesheet.scss";'
            }
         }
      }
   ```
   > ※ 在main.js中不要再次引用stylesheet.scss文件，不然會報重複引用錯誤。

- ### `Vuex`
   > 進入今天的重點：
   ```shell
    yarn add vuex@next -D
   ```
   > 目前`Vuex`沒有為`this.$store`提供`宣告檔案`，所以沒辦法開箱即用。
   > 所以我們需要做個`宣告檔案`所幸Vuex有提供[文件教學](https://vuex.vuejs.org/zh/guide/typescript-support.html)，
   > 讓我們一步一步來：

   * #### 1. Vue 中 $store 属性的型別宣告
   > 在`./src/types/`裡新增一個`vuex.d.ts(vuex宣告檔案)`來宣告`ComponentCustomProperties(組件自訂屬性)`：
   ```typescript
    // vuex.d.ts
    import { Store } from 'vuex'

    declare module '@vue/runtime-core' {
      // 宣告vuex內部的 store state
      interface State {
         count: number
      }

      // 宣告 `this.$store` 型別
      interface ComponentCustomProperties {
         $store: Store<State>
      }
    }
   ```

   * #### 2. useStore `composition(組合式)` API 型別宣告
   > 使用`composition(組合式)`API寫 Vue 組件的時候，
   > 會希望`useStore`回傳型別化的`store`，
   > 為了達成這個效果，必須做下面這些設定：
      * 定義型別化的`InjectionKey`。
      > 使用Vue的`InjectionKey`接口和自己的`store`型別宣告來定義 `key`：
      ```typescript
       // store.ts
       import { InjectionKey } from 'vue'
       import { createStore, Store } from 'vuex'

       // 宣告 store state 型別
       export interface State {
         count: number
       }

       // 宣告 injection key
       export const key: InjectionKey<Store<State>> = Symbol()

       export const store = createStore<State>({
         state: {
            count: 0
         }
       });
      ```

      * 將`store`安裝到 Vue app時，提供型別化的`InjectionKey`。
      ```typescript
       // main.ts
       import { createApp } from 'vue';
       import './style.css';
       import App from './App.vue';
       import { store, key } from './store';

       const app = createApp({});

       // 傳入 Injection key
       app.use(store, key);
       app.mount('#app');
      ```

      * 最後，型別化的`InjectionKey`傳給`useStore`。
      ```typescript
       // 要使用的組件
       import { useStore } from 'vuex'
       import { key } from './store'

       export default {
         setup () {
            const store = useStore(key)

            store.state.count // 型別為 number
         }
       }
      ```

   * ### 3. 簡化 useStore 用法
   > 但是，利用`InjectionKey`傳給`useStore`，這件事，
   > 很快就會變成工廠流水線，讓你一直重複。
   > 依照`自動化原則`，來定義自己的`composition(組合式)` API 来檢索型別化的`store`：
   ```typescript
   // store.ts
    import { InjectionKey } from 'vue'
    import { createStore, useStore as baseUseStore, Store } from 'vuex'

    export interface State {
      count: number
    }

    export const key: InjectionKey<Store<State>> = Symbol()
    export const store = createStore<State>({
      state: {
         count: 0
      }
    })

    // 定義自己的 `useStore` composition(組合式) API
    export function useStore () {
      return baseUseStore(key)
    }
   ```
   > 现在，我們不用提供`Injection key`和`型別宣告`就可以直接得到型別化的`store`：
   ```typescript
    // vue 组件
    import { useStore } from './store'

    export default {
      setup () {
         const store = useStore()

         store.state.count // 型別為 number
      }
    }
   ```

---
## 小結：
> 按照官方提供的流程一步步來，
> 感覺並不是很複雜，
> 但真正的問題總是在實作時出沒，
> 在明天正式改寫`store`的時候見真章~
> 大家晚安~
