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

- ### vue router
   ```shell
    yarn add vue-router@next -D
   ```
   1. 修改main.ts
   ```typescript
    import router from './router'

    app.use(router)
   ```

   修改 router.js

   > 在src目錄下新建資料夾router，
   > 新增`index.ts`然後把之前寫的js塞進來，
   > 會產生一堆錯誤：

   ![alt](https://)

   > 開始調整



   https://blog.csdn.net/mzl87/article/details/118583268
   https://www.jianshu.com/p/2d1b6c28e9ac

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
