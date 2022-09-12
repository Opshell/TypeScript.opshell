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
    import { defineConfig } from 'vite'
    // ...

    export default defineConfig({
      // ...
      // 开发环境服务器的配置都在 server 配置项内
      server: {
         // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
         // 默认为 'localhost'，即仅能本机访问
         host: '0.0.0.0',
         // 启动端口
         port: 8080,
         // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
         strictPort: false,
         // HMR 连接配置（用于 HMR websocket 必须使用不同的 http 服务器地址的情况，或者禁用 hmr 模块），一般省略
         hmr: {
               host: '127.0.0.1',
               port: 8080
         },
         // 参数类型：boolean | string，配置启动时时候自动打开网页，是字符串时表示打开某个特定路径
         open: true,
         // 自定义代理规则，用来配合后端服务进行接口调用等。
         // 默认使用 [http-proxy](https://github.com/http-party/node-http-proxy) 模块，完整配置见官方仓库
         proxy: {
               // 字符串简写写法
               '/foo': 'http://localhost:4567',
               // 选项写法
               '/api': {
                  target: 'http://jsonplaceholder.typicode.com',
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/api/, '')
               },
               // 正则表达式写法
               '^/fallback/.*': {
                  target: 'http://jsonplaceholder.typicode.com',
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/fallback/, '')
               },
               // Proxying websockets or socket.io
               '/socket.io': {
                  target: 'ws://localhost:3000',
                  ws: true
               }
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
