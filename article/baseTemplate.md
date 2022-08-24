![alt](https://)

# 環境甚麼的 最討厭了
> 每次開始學習新的語言或框架，
> 最麻煩的不是要學習他有哪些語法、規則
> 是安裝它的環境...
> ─────────────────────── By Opshell

## 目標：要使用TypeScript 我需要有?

## 過程：(安裝請點擊藍字)
- #### 系統：[Window 11](https://www.microsoft.com/zh-tw/software-download/windows11)
- #### 編輯器：[VS Code](https://code.visualstudio.com/)
- #### 終端機：[PowerShell 7](https://docs.microsoft.com/zh-tw/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2)
    > 如果本來是PowerShell 5 要安裝7 可能會有一點點問題 [請參考](https://docs.microsoft.com/zh-tw/powershell/scripting/whats-new/migrating-from-windows-powershell-51-to-powershell-7?view=powershell-7.2)
    > 查看powershell版本方式：在powershell中輸入：↓↓↓
    ```
    Get-Host | Select-Object Version
    ```
- #### Node版本管理：[NVM](https://github.com/coreybutler/nvm-windows)
    > 身為一個會玩前端的園丁，裝個NVM也是合情合理。
    > ※ NVM 建議安裝在C:\
    > 確認NVM有沒有安裝好↓↓↓
    > ```
    > nvm version
    > ```
- #### Node本No：[Node.js](https://nodejs.org/zh-tw/)
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
- #### ~~閃電俠：[yarn](https://ithelp.ithome.com.tw/articles/10191745)~~
    > 身為...
    > 全域安裝 yarn↓↓↓
    ```
    npm install -g yarn
    ```
    > 確認yarn 版本↓↓↓
    ```
    yarn -v
    ```

## 結果：
   > 如果你沒有遇到任何問題
   > 那你應該會和下面這張圖有一樣得結果↓↓↓

   ![alt](https://)

## 坑：
1. ### VS code看不懂英文介面，你可以安裝[中文化](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hant)
2. ### 你的nvm指令老是無法成功，或者出現了亂碼↓↓↓
    > 請將NVM 安裝在C:\ 下，或者使用系統管理員權限執行

