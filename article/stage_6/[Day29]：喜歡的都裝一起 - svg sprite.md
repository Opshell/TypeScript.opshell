![alt](https://)

# 喜歡的都裝在一起
> *當ES6 裝上了TypeScript，*
> *這豈不是無敵了?!。*
> *───────────────────────── By Opshell*

---
## 目標: [`vite-plugin-svg-icons`](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)
> 因為想要隨時可以增減icon，
> 然後挑自己喜歡的Icon來用，
> 所以原先在`Vue_clil`的時候有使用`svg-sprite-loader`，
> 但`svg-sprite-loader`是基於`webpack`打包的，
> 現在換到`Vite`我們需要換一套：

---
## 過程：
- ### 安裝 & 設定
- #### 1. 安裝
   ```
    yarn add vite-plugin-svg-icons -D
   ```

---
- #### 2. 設定
   > 修改`vite.comfig.ts`：
   ```typescript
    // vite.comfig.ts
    import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

    export default () => {
      return {
         plugins: [
            createSvgIconsPlugin({
               iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 指定需要占存的Icon目錄
               symbolId: '[name]', // 指定symbolId格式 預設：'icon-[dir]-[name]

               inject: 'body-last', // | 'body-first' sprite插入位置
               customDomId: '__svg__icons__dom__', // 自訂 Dom ID
            }),

    //... 以下省略

   ```

---
- #### 3. `src/main.ts`
   > 在`src/main.ts`內引用：
   ```typescript
    // src/main.ts
    import 'virtual:svg-icons-register';
   ```

---
- #### 4. `tsconfig.json`
   > 用Typescript，還需要在`tsconfig.json`内新增：
   ```typescript
    // tsconfig.json
    {
      "compilerOptions": {
         "types": ["vite-plugin-svg-icons/client"]
      }
    }
   ```
---
- ### 基本使用
- #### 1. 新增
   > 把要用的svg都丟到`src/assets/icon`。

- #### 2. 使用
   > 在`src/components`裡新增 `el-svgIcon.vue`
   > 這個部分不太需要改什麼，使用方式沒啥區別，
   > 畢竟原理一樣
   ```vue
    <div v-if="href == ''" class="icon">
        <svg class="svg">
            <use :xlink:href="`#${name}`" />
        </svg>
    </div>
   ```

---
- ### 番外
- #### 1. 在`src/views`裡新增 IconList.vue
   > 做一個icon列表，圖像化的方式，
   > 之後後台使用更方便，原碼：
   ```javascript
    // IconList.vue(Javascript)
    import { onMounted, ref } from "vue";
    import { useStore } from "vuex";

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

   > Script 標籤改成這樣`<script setup lang="ts">`
   > 並且修改下面這些部分：

   ```typescript
    import { useStore } from '@/store';
    import { Ref } from '@vue/reactivity'; // Ref的型別

    const store = useStore();
    const iconList: Ref<string[]> = ref([]);

    onMounted(() => {
        const spriteSvg = document.getElementById('__svg__icons__dom__');

        if (spriteSvg != null) {
            let svgList = Array.from(spriteSvg.children); // 2488

            svgList.forEach((svgDom) => {
                iconList.value.push(svgDom.id);
            });
        }
    });

    store.commit('route/endLoading');
   ```
   > 這次的改寫過程遇到了好多問題：
   1. Ref型別：
   >  這個還行，看官方文件就可以解決了。

   2. 型別檢測：
   >  用型別檢測做個導流。

   3. Array-like轉換：
   >  錯誤代碼(TS2488)，
   >  這個實在很奇怪，理論上來說`Array.from(spriteSvg.children)`
   >  等價於`[...spriteSvg.children]`
   >  但是就是會報錯，打死解不開，求有解的大大解惑。
   ![alt](https://)

   4. `iconList`在Tamplate中型別錯誤
   >  這個錯誤也是很奇怪，各種寫法都一樣的結果，
   >  猜測是莫名地抓不到暴露的vue，但是該有的設定都跑了，
   >  也查不到相關的錯誤，雖然能成功執行就是了。
   ![alt](https://)

   > ※ 3和4的錯誤一直沒有其他想法，
   >    期待有大大解惑，或者哪天我懂了再回來改文章。

---
## 小結：
> 這邊遇到了好多神奇的問題，
> 雖然大部分都沒有解開，
> 只是找了個方法繞過去，
> 但過程中學到了很多東西，
> 也算是獲益良多。
