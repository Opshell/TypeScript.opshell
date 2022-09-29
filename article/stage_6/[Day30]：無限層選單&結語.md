![Day27 Banner](https://ithelp.ithome.com.tw/upload/images/20220927/20109918pI0oNjF83n.jpg)

# 無限Menu
> *我如果你願意一層一層*
> *一層一層... 一層一層......*
> *做出Menu! 不願意!*
> *遞迴可以嗎?*
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
   ```html
    <!-- template -->
    <nav class="sideMenu">
        <elTreeItem :menu="list" :child_count="list.length" :depth="0" />
    </nav>
   ```
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
    // javascript Code
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
    import { Ref } from '@vue/reactivity';

    export interface iMenu {
        id: number;
        parent_id: number;
        icon: string;
        title: string;
        link: string;
        hide_sub: Boolean;
        child?: iMenu[];
    }

    const props = defineProps({
        menu: Array<iMenu>,
        depth: Number,
        hide_sub: Boolean,
        child_count: Number,
    });
    const emit = defineEmits(['calcHeight']);

    const list: Ref<iMenu[]> = ref(props.menu);
    const boxHeight: Ref<number> = ref(0);
    const optionHeight = 40;

    // --- methods ---
    // 開啟子層
    const openChild = (i: number) => {
        list.value[i].hide_sub = !list.value[i].hide_sub; // hide_sub == 1 的時候，是收闔的
    };

    /** 回拋Height
     * @param {*} boxh  // 盒子高度
     */
    const calcHeight = (boxh: number) => {
        boxHeight.value = Number(boxHeight.value) + Number(boxh);
        if (props.depth != 0) {
            emit("calcHeight", boxh);
        }
    };

    // 遞迴關閉下層選單
    const rcsCloseChild = (list: iMenu[]) => {
        list.forEach((el) => {
            // if (el.child != undefined) {
            if (el.child) {
                el.hide_sub = true;
                rcsCloseChild(el.child);
            }
        });
    }

    // 監聽prop 要用函式丟
    watch(() => props.menu, (val: iMenu[]) => {
        list.value = val;
    }, { deep: true });

    // 上層關閉時，觸發遞進關閉下層
    watch(() => props.hide_sub, (val: boolean) => {
        if (val) { rcsCloseChild(list.value); }
        // 判斷開或關
        emit("calcHeight", (!val) ? props.child_count * optionHeight : -props.child_count * optionHeight);
    }, { deep: true });
   ```
   > 跟前面一樣，沒特別做什麼，
   > 一樣宣告型別，`export` 型別，
   > 前面沒看過的用法比較是`defineProps`、`defineEmits`等
   > 配合`<script setup>`的語法糖。

---
## 總結：
> 在案件轉換的過程中，
> 開始有了解TS的一些基礎用法，
> 但是經驗太少了，很多奇怪的Bug還要在研究一下，
> 但是可以發現就算很多Bug，TypeScript還是會包容你，
> 幫你轉成JS讓你用，
> 直到你跟他越來越熟，不再出現奇怪的Bug，
> 這樣說起來，TypeScript也是蠻漸進的。

---
## 完賽結語
過了30天，TypeScript可以磕磕絆絆的用了，
Side Project還要繼續下去
希望可以用Vite + TypeScript完成他的後台操作介面。
感謝各位陪伴我完成這次鐵人賽，
心血來潮的參加，只有30幾天準備還真的不太夠，
寫的不是很好，再請大家見諒。
Ops愛大家!
