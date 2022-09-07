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


- ### [使用Vite搭建Vue3(TypeScript版本)项目](https://www.jianshu.com/p/2d1b6c28e9ac)
- ### [vite + vue3 + ts 使用总结](https://segmentfault.com/a/1190000041296321)

---
## 過程：(安裝請點擊藍字)
- ### 1. 系統：[Window 11](https://www.microsoft.com/zh-tw/software-download/windows11)
- ### 2. 編輯器：[VS Code](https://code.visualstudio.com/)
- ### 3. 終端機：[PowerShell 7](https://docs.microsoft.com/zh-tw/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2)
   > 如果本來是PowerShell 5 要安裝7 可能會有一點點問題 [請參考](https://docs.microsoft.com/zh-tw/powershell/scripting/whats-new/migrating-from-windows-powershell-51-to-powershell-7?view=powershell-7.2)
   > 查看powershell版本方式：在powershell中輸入：↓↓↓
   ```
    Get-Host | Select-Object Version
   ```
   > ※ 安裝完之後，記得把VS code的預設終端機改成PowerShell
![alt](https://)

---
- ### 4. Node版本管理：[NVM](https://github.com/coreybutler/nvm-windows)
   > 身為一個會玩前端的園丁，裝個NVM也是合情合理。
   > ※ NVM 建議安裝在C:\
   > 確認NVM有沒有安裝好↓↓↓
   ```
    nvm version
   ```

---
- ### 5. Node本No：[Node.js](https://nodejs.org/zh-tw/)
   > 身為一個會玩前端的園丁，裝個Node.js應該也是很正常的一件事。
   > ~~看了前面的環境，你不會以為我下的指令不是在Windows吧?~~
   > 確認安裝了甚麼版本的node↓↓↓
   ```
    nvm list
   ```
   > 安裝 Node.js 16.17.0 版本↓↓↓
   ```
    nvm install 16.17.0
   ```
   > 切換到16.17.0版的Node↓↓↓
   ```
    nvm use 16.17.0
   ```

---
- ### 6. ~~閃電俠：[yarn](https://ithelp.ithome.com.tw/articles/10191745)~~
   > 身為...
   > 全域安裝 yarn↓↓↓
   ```
    npm install -g yarn
   ```
   > 確認yarn 版本↓↓↓
   ```
    yarn -v
   ```
![alt](https://)

---
- ### 7. 安裝TypeScript(全域)
   > 終於到了我們的主角啦~
   ```
    npm install -g typescript
   ```
   > 如果你沒有遇到任何問題，應該會長這樣，
   > 確認目前安裝的環境↓↓↓
   ```
    npm list -g --depath=0
   ```
![alt](https://)

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
