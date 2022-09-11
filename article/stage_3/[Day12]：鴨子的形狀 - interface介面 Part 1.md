![alt](https://)

# 恩~ 鴨子就是長這樣... 嗎?
> *鵝 、 鵝 、 鵝*
> *曲項向天歌，白毛浮綠水*
> *紅掌撥清波...*
> *等等?  這是鴨子?*
> *────────────────────── By 駱賓王*

---
## 目標:`Interface(介面)`
   > 物件導向的語言中，`Interface(介面)`(也稱接口)是一個很重要的概念，
   > 它是對行為的一種抽象，如何運作則由`Class(類別)`去`implement(實現)`。

   > 而在TypeScript 中的`Interface(介面)`是一個非常靈活的概念，
   > 除了可用於對`Class(類別)`的一部分行為進行抽象以外，
   > 也很常用描述`object(物件)`的`Shape(形狀)`。
---

## 過程：
   - ### 1. Object face
   > 上一節中筆記了各種object的type法，
   > 其實更常使用得方式是透過`Interface(介面)`來定義：
   ```typescript
    interface IMember {
      name: string;
      age: number;
      gender: 'man' | 'woman' | 'other';
      car?: null | string;  // 和funciton 一樣 加了? 就是可選參數
      house?: undefined | string; //
      summary(): void;
    }

    let Opshell: IMember = {
      name: 'Opshell',
      age: 30,
      gender: 'man',
      summary: function () { return `${this.name}：${this.age} years old, is a ${this.gender}.`; }
    }

    console.log(member.summary()); // Opshell：30 years old, is a man.
   ```
   > ※ 在使用上，一般習慣在前面加上大寫的I，並使用`PascalCase(帕斯卡)`命名法。
   >    用`Interface(介面)`描述物件的`Shape(形狀)`，有甚麼好處呢?
   >    這樣我們就可以反覆使用，例如我今天要多一個成員：
   ```typescript
    let Bear: IMember = {
      name: 'Bear',
      age: 40,
      gender: 'man',
      summary: function () { return `${this.name} is the bearer of the Maya Zoo, he is ${this.age} years old.`; }
    }
   ```
   > 是不是覺得 Object 的宣告方便了不少。

---
   - ### 2. Array face
   > 宣告 Array 的`Shape(形狀)`當然也是很容易的：
   ```typescript
    interface ITeamArray {
      [index: number]: string;
    }

    let maya: ITeamArray = [ 'Opshell', 'Bear', 'Patty', 'Egg' ];
   ```
   > 在javascript 中 Array 其實也是種物件，
   > 所以我們宣告 key 名 為index 會是 number 類別，
   > value 是字串類型。

---
   - ### 3. any object face
   > 透過上面例子的原理，我們可以推論出：
   ```typescript
    interface IDictionary {
      [propName: string]: any;
    }
   ```
   > 這樣就會變成，可以接受任何型別的物件face。

---
   - ### 4. function face
   > 有object、array當然也會有 function，
   > 在 [Day10] - function part 2 有稍微提到，
   > 現在我們來更深入的了解 function face：
   ```typescript
    type tGender = 'man' | 'woman' | 'other';

    interface IMemberSummary {
      (name: string, age: number, gender: tGender): void;
    }

    // 如果用 type alias(別名) 來定義型別會長這樣
    type tMemberSummary = (name: string, age: number, gender: tGender) => string;

    // 這個 greet function 會自動符合 Greet 這個 interface
    let memberSummary: IMemberSummary = (name, age, gender) => {
      return `${name}：${age} years old, is a ${gender}.`;
    };

    console.log(memberSummary('Opshell', 30, 'man')); // Opshell：30 years old, is a man.

    // 參數名稱不符合，只要型別符合即可 Interface 的形狀。
    // 例如這裡改用 n, a, g 當作參數名稱，一樣符合 IMemberSummary
    let memberSummary2: IMemberSummary = (n: string, a: number, g: tGender) => {
      return `${name}：${age} years old, is a ${gender}.`;
    };

    console.log(memberSummary('Opshell', 30, 'man')); // Opshell：30 years old, is a man.
   ```
   > 會發現從前面的篇章到這邊，
   > Ops一直在偷渡`type alias(別名)`的使用方式，
   > 其實是因為`type alias(別名)`的使用上和`Interface(介面)`極度接近，
   > 先讓各位熟悉一下，之後在比較的時候，就會更容易搞懂。

---
   - ### 5. Hybrid face
   > 除了一般屬型外，也可以混 function進來，
   > 所以上面的例子可以改成這樣：
   ```typescript
    type tGender = 'man' | 'woman' | 'other';

    interface IMember {
      (title: string, age: number, gender: tGender): string; // 要輸入的參數
      title: string; // 物件Key
      age: number; // 物件Key
      gender: tGender; // 物件Key
      summary(): string; // 物件 function
    }

    const getMember = (): IMember => {
      let member = function (title: string, age: number, gender: tGender) {
         member.title = title;
         member.age = age;
         member.gender = gender;
      } as IMember;

      member.summary = () => {
         return `${member.title}：${member.age} years old, is a ${member.gender}.`;
      };

      return member;
    };

    // Opshell 同時是物件，也是函式
    const Opshell = getMember();
    Opshell('Opsehll', 30, 'man');
    console.log(Opshell.title); // Opsehll
    console.log(Opshell.summary()); // Opsehll：30 years old, is a man.
   ```
   > 混合模式比較複雜，可能要多看幾次才會懂，
   > 需要實際操作才比較理解，之後有機會在示範其他範例。

---
## 小結：
   > 學習了基本的 JavaScript 三物件的 `Interface(介面)`
   > 內容有點多，可能會看得霧煞煞，
   > 尤其是混合模式，實在是很容易搞混阿，
   > 不過如果把javascript裡的一切都 是物件的概念帶進來，
   > 就會清楚很多，就先寫到這邊，
   > 明天再把剩下的`Interface(介面)`寫完。
   > 大家明天見~
