![alt](https://)

# 環境甚麼的 最討厭了
   > *每次開始學習新的語言或框架，*
   > *最麻煩的不是要學習他有哪些語法、規則*
   > *是安裝...*
   > *嗯?  好了?!!*
   > *───────────────────────── By Opshell*

---
## 目標：
   > 安裝完成使用Vite + TypeScript需要的環境，
   > 然後開始祈禱過程不要出現奇怪的問題。

https://juejin.cn/post/7124950336648773640
- ### [使用Vite搭建Vue3(TypeScript版本)项目](https://www.jianshu.com/p/2d1b6c28e9ac)
- ### [vite + vue3 + ts 使用总结](https://segmentfault.com/a/1190000041296321)

---
## 過程：
- ### 安裝Vite
   >
   #### 1. 在目前環境下開始
   > 弄個專案資料夾，因為前言有講，
   > 所以Ops直接弄在自己部落格專案的下面。
   ![目前環境](https://ithelp.ithome.com.tw/upload/images/20220912/20109918A8nibfHbsl.png)
   ```shell
    yarn create vite
   ```

   #### 2. 輸入專案名稱
   > 因為是要當後台用，
   > 直接輸入webadminvite(個人喜好)
   ![專案名稱](https://ithelp.ithome.com.tw/upload/images/20220912/20109918N5aItBHfQ2.png)

   #### 3. 選擇框架
   > Vue不解釋
   ![Vue](https://ithelp.ithome.com.tw/upload/images/20220912/20109918eyJXnEt22i.png)

   #### 4. 選擇語言
   ![TypeScript](https://ithelp.ithome.com.tw/upload/images/20220912/20109918CjHZQX7bwB.png)

   #### 5. 結果
   ![結果](https://ithelp.ithome.com.tw/upload/images/20220912/20109918GXA2t3rlqa.png)

---
- ### Vite + Vue3 + TypeScript 配置
   #### 1. TypeScript Node
   > 進去專案資料夾
   ```shell
    cd webadminvite
   ```

---
   #### 1.1 vite.config.ts 設定
   > 輸出路徑

---
   #### 2. TypeScript Node type 依賴
   > 在設定路徑別名、文件讀寫等操作的時候，為了簡化路徑都會使用別名，
   > 但是直接設定的话 TypeScript 看不懂 node 相關的套件的型別聲明，
   > 所以需要先設定 node 的 types 依賴。
   ```
    yarn add @types/node -D
   ```
   ![指令](https://ithelp.ithome.com.tw/upload/images/20220912/20109918SrVJeJRiks.png)
   省略一堆
   ![結果](https://ithelp.ithome.com.tw/upload/images/20220912/20109918ZGrXG00O3k.png)

---
   #### 2. 別名設定
   > TypeScript 設定別名需要改：`tsconfig.json` 和 `vite.config.ts` 兩支檔案。

   > 在 `tsconfig.json` 中的 `compilerOptions` 内新增 `paths` 設定，
   > key 為需要增加的别名，value 為別名對應的目錄。
   ```json
    // tsconfig.json
    "paths": {
      "@/*": ["./src/*"]
    },
   ```
   ![別名設定](https://ithelp.ithome.com.tw/upload/images/20220912/20109918XTuOi0Lajv.png)

   > ※ 别名一般都是設定目錄，所以 key 和 value 都要加上 `/*`

   > `vite.config.ts`設定别名也很简单，import path之後，
   > 在`defineConfig`裡新增`resolve`區塊：
   ```typescript
    // vite.config.ts
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import path from 'path'; // 這個

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [vue()],

      // 這裡
      resolve: {
         alias: {
            '@': path.resolve(__dirname, 'src')
         }
      }
    });
   ```
   > ※ `vite.config.ts`設定得別名要和`tsconfig.json` 裡設定的一樣才可以，
   >    只是 key 的末尾不需要 `/*`，value 需要用 `path` 指向對應的目錄。

---
   #### 3 Node Service和proxy(代理)
   > 在本機開發的時候，都需要啟動 Node Service 來瀏覽畫面，
   > 通過`proxy(代理)`來串接後端接口，
   > 所以我們需要設定一下。

   ```javascript
    // vite.config.ts
    export default defineConfig({
      // 以上省略...

      // 代理伺服器
      server: {
         port: 1025,
         strictPort: false, // Port被占用時直接退出， false會嘗試連接下一個可用Port
         open: true, // dev時自動打開網頁，也可以給網址指定。
         // 自訂代理規則，配合後端進行Api呼叫等。
         // 預設使用 [http-proxy](https://github.com/http-party/node-http-proxy) 完整設定請見官方
         proxy: {
            '/api': {
               target: "http://www.opshell/api/", // 本機串接
               ws: true, // 代理的WebSockets
               changeOrigin: true, // 允許websockets跨域
               rewrite: (path) => path.replace(/^\/api/, '')
            },
         }
      }
    })
   ```
   > 更多的設定可以參考[官方](https://cn.vitejs.dev/config/server-options.html)

---
   #### 4 都設定好了之後，試著跑跑看
   > 輸入下面的指令：

   ![別名設定](https://ithelp.ithome.com.tw/upload/images/20220912/20109918XTuOi0Lajv.png)

   > 有沒有出現這個畫面呢~?

   ![別名設定](https://ithelp.ithome.com.tw/upload/images/20220912/20109918XTuOi0Lajv.png)

---
## 小結：
> 今天的Vite + TypeScript 的常用設定就處理好啦～
> 明天還有更多，更多的東西要來設定呢~
> 沒辦法 Vite快是沒錯 但是也是拋下了那些 Cli包好的東西，
> 所以需要什麼，就一個個裝回來，
> 這是一個漫長的過程。
> 大家早點睡，晚安~
