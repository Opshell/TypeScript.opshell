![Day27 Banner](https://ithelp.ithome.com.tw/upload/images/20220927/20109918pI0oNjF83n.jpg)

# Menu
> *登入*
> *─────────── By Opshell*

---
## 目標: 選單
> 要實現一個後台，選單必不可少，
> 當初對選單的需求是可以有無限的子層，
> 所以，來把選單改成TS吧。

---
## 過程：
- ### 容器改寫
   > 改寫Menu容器，
   > 下面是原碼。
   ```html
    <!-- template -->
    <nav class="sideMenu">
        <elTreeItem :menu="list" :child_count="list.length" />
    </nav>
   ```
   ```javascript
    // javascript
    import { ref } from "vue";
    import axios from "axios";

    import elTreeItem from "@/components/el-treeItem.vue";

    export default {
        name: "sideMenu",
        components: { elTreeItem },
        setup() {
            const token = localStorage.getItem("token");
            const list = ref([]);

            axios({
                url: "/api/backEnd/sidemenu",
                method: "GET",
                data: {},
                headers: { Authorization: `Bearer ${token}` },
            }).then((result) => {
                if (result.status == 200) {
                    list.value = result.data.data;
                } else {
                    return {
                        status: false,
                        msg: result.data.message,
                        data: result.data.data,
                    };
                }
            }).catch(() => {
                return false;
            });

            return {
                list
            };
        },
    };
   ```
   > 可以看出來，這邊只是遞迴Menu的容器
   > 順便取資料，所以改成下面這樣：
   ```typescript
    // typescriptlang
    import { iMenu } from '@/components/el-treeItem.vue';
    import { Ref } from '@vue/reactivity';

    import { getData } from '@/hook/getData';

    const token = localStorage.getItem("token");
    const list: Ref<iMenu[]> = ref([]);

    getData(
        '/api/backEnd/sidemenu', 'GET', {},
        { Authorization: `Bearer ${token}` }
    ).then((result) => {
        if (result && result.status) {
            list.value = result.data;
        }
    });
   ```
   > 除了用上前面改寫的getData以外
   > 還另外了iMenu類型。

- ### 遞迴項目改寫：
   > 那iMenu是怎麼來的呢?
   > 從我們改寫的遞迴項目來的：
   ```javascript
    import { ref, watch } from "vue";
    import elSvgIcon from "./el-svgIcon.vue";

    export default {
        name: "elTreeItem",
        components: { elSvgIcon },
        emits: [ "calcHeight" ],
        props: {
            menu: {
                type:  Array,
                default: () => []
            },
            depth: { // 計算後推用
                type: Number,
                default: 0
            },
            hide_sub: { // 是否收闔
                type: Boolean,
                default: true
            },
            child_count: { // 子層數量
                type: Number,
                default: 0
            },
        },
        setup(props, target) {
            const list = ref(props.menu);
            const boxHeight = ref(0);
            const optionHeight = 40;

            // --- methods ---
            // 開啟子層
            const openChild = (i) => {
                list.value[i].hide_sub = !list.value[i].hide_sub; // hide_sub == 1 的時候，是收闔的
            };
            /** 回拋Height
             * @param {*} boxh  // 盒子高度
             */
            const calcHeight = (boxh) => {
                boxHeight.value = Number(boxHeight.value) + Number(boxh);
                if (props.depth != 0) {
                    target.emit("calcHeight", boxh);
                }
            };
            /** 遞迴關閉下層選單
             * @param {list} Array // 要檢查的Array
             */
            const rcsCloseChild = (list) => {
                list.forEach((el) => {
                    // if (el.child != undefined) {
                    if (el.child) {
                        el.hide_sub = true;
                        rcsCloseChild(el.child);
                    }
                });
            }

            // 監聽prop 要用函式丟
            watch(() => props.menu, (val) => {
                list.value = val;
            }, { deep: true });

            // 上層關閉時，觸發遞進關閉下層
            watch(() => props.hide_sub, (val) => {
                if (val) { rcsCloseChild(list.value); }
                // 判斷開或關
                target.emit("calcHeight", (!val) ? props.child_count * optionHeight : -props.child_count * optionHeight);
            }, { deep: true });

            return {
                list,
                boxHeight,
                openChild,
                calcHeight,
            }
        }
    }
   ```
   > 改成這樣`<script setup lang="ts">`：
   ```typescript

   ```


---
## 小結：
> 可以發現今天改的東西非常的少，
> 主要集中在調整自動載入的`import`和`componets`，
> 可見前期環境設定還是蠻重要的，沒處理好這邊就會處處碰壁，
> `Vite`快是真的快，要設定的東西也多，
> 不過好處是可以對專案框架瞭如指掌。
> 還是可以學到很多東西的。
> `@/hook/getData`就留給明天處理吧，大家晚安。
