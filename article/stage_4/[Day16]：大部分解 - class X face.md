![alt](https://)

# 大部分解開始~
> *清槍開始、清槍蹲下*
> *將槍枝斜舉於左胸膛，檢視藥室內有無子彈*
> *───────────────────────── By TW 國軍*

---
## 目標:`Interface(介面)` & `Class(類別)` 的組合技
   > 昨天提到，`Interface(介面)` 另一個主要的功能是：
   > 對`Class(類別)`的功能做抽象，抽象幹嘛?
   > 這樣其他人就可以重複使用他，
   > 這是`OOP(物件導向)`的一大特性。

---
## 過程：
- ### `implements(實現)`
   > 一般來說`Class(類別)` 只會繼承另一個`Class(類別)`，
   > 但是有些時候，不同產線上的`Class(類別)`會有相同的需求，
   > 這時候就會利用`Interface(介面)`把那個功能抽象化。
   ```typescript
    interface ISummary {
      getSummary(): string;
    }

    class Member {
      title: string ;
      age: number;

      constructor(title: string = 'nobody', age: number = 0) {
         this.title = title;
         this.age = age;
      }
    }

    class SuperMember extends Member implements ISummary{
      private weight: number;

      constructor(title: string, age: number, weight: number = 100) {
         super(title, age);
         this.weight = weight;
      }
    }
   ```
   > 沒錯，就是這麼簡單明瞭，在你的`Class(類別)`後面，
   > 告訴他你要`Implements(實現)`什麼功能就可以了，
   > 但是可不能光說不練，你說了你想做什麼，你就需要真的做才可以。
   > 上面這個範例TS是會警告的他會告訴你：沒有實做getSummary。
   ```typescript
    getSummary = () => {
      return `${this.title} is ${this.age} years old.`;
    }
   ```
   > 需要把上面這個function實做出來才可以喔~
   > 當然 就像`extends(繼承)`一樣 `implements(實現)`也可以實現多個，
   > 用,隔開就可以了：
   ```typescript
    class SuperMember extends Member implements ISummary, IAge{
   ```

---
- ### `Interface extends(介面繼承)`
   > ㄟㄟ? 怎麼回頭講`Interface(介面)`了?
   > 沒錯 之前還沒有講過 `Interface extends(介面繼承)`
   > 現在剛好補充起來：
   ```typescript
    interface IAge {
      convertAge(): string;
    }

    interface ISummary extends IAge{
      getSummary(): string;
    }
   ```
   > 說穿了也沒什麼，其實跟我們上一章裡的`extends(繼承)`用法一樣。

---
- ### `Interface(介面)` 繼承 `Class(類別)`
   > 沒錯，前面說TS的`Interface(介面)`極度靈活，
   > 他就是可以靈活成這樣：
   ```typescript
    class Member {
      title: string = 'nobody';
      age: number = 0;
    }

    interface IMember extends Member {
      weight: number;
    }

    let Opshell: IMember = { weight: 60 }
   ```
   ![alt](https://)
   > 雖然這樣做很奇怪，不知道為啥要這樣弄就是了，
   > 如果有實際的使用其情況，請大大不吝嗇留言，
   > 感恩~

---
- ### Hybrid face
   > 又是混合模式，透過這次講OOP Class 我們來好好複習霧煞煞的混合模式，
   > 使用`Interface(介面)`的方式來定義一個`Function(函式)`需要符合的`Shape(形狀)`：
   ```typescript
    interface Member {
      (title: string, age: number | string): string;
    }

    let Opshell: Member = (title, age) => `${title} is ${age} years old.`;
   ```
   > 然後對她做混合：
   ```typescript
    interface Member {
      (title: string, age: number | string): string; // 函式的In Out
      weight: number; // 函式裡的屬性
      getWeight(e: {weight: number}): void; // 函式裡的方法
    }

    function creatMember(): Member {
       // 在這邊不能用箭頭函式表達喔
      let member = <Member>function (title: string, age: number): string {
         return `${title} is ${age} years old.`;
      }

      member.weight = 100;
      member.getWeight = (e: {weight: number}) => { console.log(e.weight) };

      return member;
    }

    let Opshell = creatMember();
    console.log(Opshell('Opshell', 30));
    Opshell.weight = 60;
    console.log(Opshell.getWeight(Opshell));
   ```
   > 過了幾個章節回來看混合模式，
   > 有沒有更理解了? 對Ops來說 混合模式感覺像簡易版的`Class(類別)`，
   > `Class(類別)`可以做到混合模式在做的全部事情，甚至更靈活，
   > 所以一般有這種需求，應該都會使用`Class(類別)`實做吧，
   > 如果有什麼`Hybrid(混合模式)`是更優解的情況，
   > 再請大大補充，讓小弟學習= 口=

---
## 小結：
   > 寫到這邊，`Interface(介面)`、`Class(類別)`和`Function(函式)`，
   > 之間的關係清楚了很多，混合模式也也能得比較清楚，
   > 可以看出來，他們之間的交互可以很自由。
   > 要炫技可以炫到眼花= 口=
   > 身為菜鳥的Ops稍微了解一下就好，
   > 等等迷路。
