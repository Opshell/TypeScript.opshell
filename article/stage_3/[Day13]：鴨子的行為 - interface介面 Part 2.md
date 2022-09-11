![alt](https://)

# 你這鴨子怎麼咬人了呢?
> *會游泳、嗄嗄叫*
> *肥嘟嘟的一隻，*
> *沒錯就是鴨子*
> *ㄟ~!!你這鴨子怎麼咬人了呢?*
> *───────────────────────── By Opshell*

---
## 目標:`Interface(介面)`
   > 昨天提到，在 TypeScript 中的`Interface(介面)`是一個非常靈活的概念，
   > 今天我們就來看一些其他的使用方式，
   > 了解它到底有多靈活。
---

## 過程：
   - ### 1. Type face
   > 昨天的例子中，`Interface(介面)` 都是當作物件的形狀做使用，
   > 當然他也可以當作是一種型別：
   ```typescript
    interface IMember {
      title: string;
      age: number;
    }

    const Opshell:IMember = { title: 'Opshell' }; // 提醒：型別 IMember 但缺少屬性 age。
    const Bear:IMember = { title: 'Bear', age: 40, weight: 110 }; // 提醒：型別 IMember 不存在 weight 屬性。
   ```
   > ※ 可以看出來 `Interface(介面)` 不管是當`Shape(形狀)`還是`Type(型別)`使用
   >    使用方式都差不多，值得注意的是，一旦你宣告了`Interface(介面)`後，使用上不能自動添加或減少屬性。

   > ※ `Interface(介面)` 重複定義的時候，他們會被merge起來：
   >    也就是說IMember 也等於：
   ```typescript
    interface IMember {
      title: string;
    }
    interface IMember {
      age: number;
    }
   ```

---
   - ### 2. Object Literal face
   > `Interface(介面)`也可以當作參數的型別，
   > 可以讓typescript 幫你檢查參數格式對不對：
   ```typescript
    interface IMember {
      title: string;
      age: number;
    }

    function getSummary(member: IMember) {
      return `${member.title} is ${member.age} years old.`;
    }

    console.log(getSummary({ title: 'Opshell', age: 30, gender: 'man' })); // 提醒：不可指派IMember不存在屬性。
   ```
   > 為什麼會這樣呢?
   > 原來因為如果沒有宣告起來直接輸入，
   > 會觸發`excess property checking(額外檢查)`，
   > `Shape(形狀)`需要完全相同才可以，
   > 在與`Interface(介面)`很相似的`Type Alias(別名)`也是一樣的情況喔~
   > 有三種方式來避免`excess property checking(額外檢查)`的情況：

   #### 2-1. `Assertion(斷言)`
   ```typescript
    console.log(getSummary(<IMember>{ title: 'Opshell', age: 30, gender: 'man' }));
   ```

   #### 2-2. 將物件先宣告起來
   ```typescript
    const Opshell = {
      title: 'Opshell',
      age: 30,
      gender: 'man'
    }
    console.log(getSummary(Opshell)); // Opshell is 30 years old.
   ```

   #### 2-3. `index signature(索引簽名)`
   > 在 IMember宣告時 讓他可以接受任意屬性
   > 會變成這樣：
   ```typescript
    interface IMember {
      title: string;
      age: number;
      [propName: string]: any
    }
   ```
   > 當然以此類推，
   > 我們也可以在`Interface(介面)`的key裡面加? 讓他變成可選參數：
   ```typescript
    interface IMember {
      title: string;
      age: number;
      gender?: 'man' | 'woman';
    }
   ```
   > 上面三種方式當然也可以應用到 上面 1. Type face的部分，
   > 來修正上面報錯的部分，各位可以試試看。

---
   - ### 3. 套件的 options 物件 face
   > 和 `Object Literal` face 幾乎沒有差別
   > 只是變成了全可選參數的物件：
   ```typescript
    interface cubeConfig {
      title?: string;
      long?: number;
      width?: number;
      height?: number;
      weight?: number;
    }

      // 接受 memberConfig 做為參數，回傳 {summary: string; weight: number | null}
    const createCube = (config: cubeConfig): { title: string, volume: number, weight: number | null } => {
      let cube: { // 複習 物件型別 註記
         title: string;
         volume: number;
         weight: number | null;
      } = {
         title: 'cube',
         volume: 1000,
         weight: null
      };

      if (config.title) { cube.title = config.title; }
      if (config.weight) { cube.weight = config.weight; } // 上面沒註記 這邊會出事 number 不能塞進null

      if (config.long && config.width && config.height) {
         cube.volume = config.long * config.width * config.height;
      }

      return cube;
    };

    const Opshell = createCube({ title: 'bigCube', long: 20, width: 20, height: 20 });
    console.log(Opshell.title); // bigCube
    console.log(Opshell.volume); // 8000
    console.log(Opshell.weight); // null
   ```

---
   - ### 4. funciton `Overload(超載)` 的 `overload signatures(簽章)` face
   > 也可以拿來當作`Overload(超載)`的`overload signatures(簽章)`
   > 拿前面[[Day10] - funciton part 2]()超載的例子來改寫：
   ```typescript
    interface INSReverse {
      (word: number): string;
      (word: string): string;
    }

    const nsReverse: INSReverse = (word: number | string) => {
      if (typeof word === 'number') {
         return word.toString().split('').reverse().join('');
      } else if (typeof word === 'string') {
         return word.split('').reverse().join('');
      }

      // 若不拋出錯誤的話，這裡會自動回傳 undefined 而非 never，將會不符合 interface 的定義
      throw new Error('Invalid arguments');
    };

    console.log(nsReverse('aerg')); // grea
    console.log(nsReverse(123)); // 321
   ```

---
## 小結：
   > 寫到這邊，把常見的各種`Interface(介面)`的用法都寫出來了，
   > 足足寫了兩篇，可見`Interface(介面)`有多靈活，
   > 還有很多奇技淫巧可以聊，但使用方式都不會差太多，
   > 可以發現上面這兩天的例子看來看去，格式都差不多，
   > 希望藉由這兩天大量的例子，讓大家可以體驗到`Interface(介面)` 的使用感覺。
   > 還是看不大懂沒關係，在後面還是會有很多例子使用到他，
   > 大家可以慢慢熟悉。
