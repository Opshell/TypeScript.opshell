![alt](https://)

# 這豈不是無敵了??
	> *當ES6 裝上了TypeScript，*
	> *這豈不是無敵了?!。*
	> *───────────────────────── By Opshell*


https://pjchender.dev/ironman-2021/ironman-2021-day12/

---
## 目標: `vite-plugin-svg-icons`
   > 因為想要隨時可以增減icon，
   > 然後挑自己喜歡的Icon來用，
   > 所以原先在`Vue_clil`的時候有使用`svg-sprite-loader`，
   > 但`svg-sprite-loader`是基於`webpack`打包的，
   > 現在換到`Vite`我們需要換一套：
   [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

---
## 過程：
   - ###
   ```
    yarn add vite-plugin-svg-icons -D
   ```
   > 修改`vite.comfig.ts`：

   ```typescript
    import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

    createSvgIconsPlugin({
        // 指定需要占存的Icon目錄
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式 ex：'icon-[dir]-[name]
        symbolId: '[name]',

        /**
         * 自定义插入位置
         * @default: body-last
         */
        inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        customDomId: '__svg__icons__dom__',
      }),

   ```

---
## 小結：
   > 今天會了Funciton的Type法
   > 而且更了解了 ES6 的`其餘預算子`
   > 對於型別的Type法也更熟練了
   > 明天繼續學習 Funciton的 Types法，
   > ~~這麼有料的東西怎麼可以一天水完?~~
