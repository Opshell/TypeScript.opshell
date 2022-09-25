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

    export default () => {
      return {
         plugins: [
            createSvgIconsPlugin({
               iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 指定需要占存的Icon目錄
               symbolId: '[name]', // 指定symbolId格式 ex：'icon-[dir]-[name]

               /** Dom自定插入位置
                * @default: body-last
                */
               inject?: 'body-last' | 'body-first'

               /** 自訂 Dom ID
                * @default: __svg__icons__dom__
                */
               customDomId: '__svg__icons__dom__',
            }),

    //... 以下省略

   ```
   > 在`src/main.ts`內引用：
   ```typescript
    // src/main.ts
    import 'virtual:svg-icons-register';
   ```

   > 用Typescript，還需要在`tsconfig.json`内新增：
   ```typescript
    // tsconfig.json
    {
      "compilerOptions": {
         "types": ["vite-plugin-svg-icons/client"]
      }
    }
   ```
- ### 新增`src/assets/icon`然後把svg丟進去

- ### 在`src/components`裡新增 el-svgIcon.vue
   > 這個部分不太需要改什麼，使用方式沒啥區別，
   > 畢竟原理一樣
   ```vue
    <div v-if="href == ''" class="icon">
        <svg class="svg">
            <use :xlink:href="`#${name}`" />
        </svg>
        <span v-if="text != ''" class="text">{{text}}</span>
    </div>
   ```

https://stackoverflow.com/questions/47585409/use-spread-operator-on-nodelist-in-typescript
- ### 在`src/views`裡新增 IconList.vue
   ```javascript
    import { onMounted, ref } from "vue";
    import { useStore } from "vuex";
    import { useState } from "../hook/vuexSugar.js";

    import elSvgIcon from "../components/el-svgIcon.vue";

    export default {
        components: { elSvgIcon },
        setup() {
            const store = useStore();
            const states = useState(["userData"]);
            const iconList = ref([]);

            onMounted(() => {
                iconList.value = [];

                let spriteSvg = [...document.getElementById('__SVG_SPRITE_NODE__').children];
                spriteSvg.forEach(svgDom => {
                    iconList.value.push(svgDom.id);
                });
            });

            store.commit('endLoading');

            return {
                ...states,
                iconList
            };
        },
    };
   ```
   > 改成這樣
   https://stackoverflow.com/questions/52491832/how-to-use-document-getelementbyid-method-in-typescript


   https://bobbyhadz.com/blog/typescript-type-object-must-have-symbol-iterator-method

---
## 小結：
   > 今天會了Funciton的Type法
   > 而且更了解了 ES6 的`其餘預算子`
   > 對於型別的Type法也更熟練了
   > 明天繼續學習 Funciton的 Types法，
   > ~~這麼有料的東西怎麼可以一天水完?~~
