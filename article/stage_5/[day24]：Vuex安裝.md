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
## 過程：
- ### 1. SCSS
   > 安裝SCSS
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

- ### 2. 安裝`vuex`
   ```shell
    yarn add vuex@next -D
   ```
   > 目前`Vuex`沒有官方的TS`宣告檔案`，所以沒辦法開箱及用。
   > 所以我們需要做個`宣告檔案`所幸Vuex有提供[文件教學](https://vuex.vuejs.org/zh/guide/typescript-support.html)，
   > 讓我們一步一步來：

   * #### 1. Vue 中 $store 属性的型別宣告
   > 在專案目錄裡新增一個`宣告檔案`來宣告`ComponentCustomProperties(組件自訂屬性)`：
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
   > 使用`composition(組合式)` API寫 Vue 組件的時候，
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
       import { createApp } from 'vue'
       import { store, key } from './store'

       const app = createApp({ ... })

       // 傳入 Injection key
       app.use(store, key)
       app.mount('#app')
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
   > 終於把環境安裝搞定啦~
   > 老實說我一直是裝環境的苦手，
   > 好險這次安裝TypeScript好像沒遇到甚麼特別的問題，
   > ~~就是打開家裡的 前端環境 全炸掉了而已，最後整個重裝~~
   > 希望大家安裝過程一切順利。

   > 如果遇到甚麼奇怪的問題，問google大神比我有用多了，
   > 以上...
