![alt](https://)

# 家裡有誰? 誰變成誰?
> *任何傻瓜都可以寫出電腦看得懂的程式，*
> *但好的程式設計師會寫出人也看得懂的。*
> *───────────────────────── By Kent Beck*
![alt](https://)

---
## 目標: `Class(類別)`
   > 在ES6中 JavaScript 終於迎來了 class，
   > 而TypeScript添加了更多的功能給他，
   > 就像前面講的 ES6 + TypeScript，
   > 簡直就是天堂~!!

   > 那`Class(類別)`是甚麼呢?
   > 你可以把他理解成 一張設計圖，或者是生產線，
   > 可以透過定義`Class(類別)` 來產生特定的物件。
   > 並有著面向物件(OOP)的三大特性：封裝、繼承、多型。

---
## 過程：
   - ### Class 基本使用 與 `Property(屬性)` 存取權
   > 讀萬卷書，一樣要行萬里路，
   > 實踐才是學會Codeing的硬道理，
   > 我們直接來個例子講解吧：
   ```typescript
    class Member {
      // Property(屬性)
      title: string = 'nobody';
      age: number;
      protected skill: Array<string> = ['種草', '嘴砲'];
      public readonly team = 'Maya';

      // constructor(建構子)
      constructor(title: string, age: number = 0) {
         if (title) { this.title = title; }
         this.age = age;
      }

      // Property(屬性)
      public summary(): string {
         return `${this.title} is ${this.age} years old.`;
      }
    }

    const Opshell = new Member('Opshell', 30);
    const Bear = new Member('Bear');

    console.log(Opshell.summary()); // Opshell is 30 years old.
    console.log(Bear.summary()); // Bear is 40 years old.
   ```
   > 在上面的class中，
   > 我們賦予了他五個`Property(屬性)`，
   > 分別是 title、age、skill、summary，
   > 這上面有蠻多東西可以講的：
   1. 特性都要宣告所謂的存取權，

   存取權|`public(公開)`|`static(靜態)`|`protected(保護)`|`private(私有)`
   -------------|-------------|-------------|-------------|-------------
   誰可以讀取| `Class(類別)`、 `Instance(實體)` | `Class(類別)`、 `Instance(實體)`| 自己、繼承`Class(類別)`中 | 自己`Class(類別)`中
   呼叫方式| this | class | this | this

   2. 如果沒有特別指明，預設會給`public(公開)`(如：title、age)。
   3. 透過設計圖`Class(類別)` new 出來的東西，我們稱呼他為`Instance(實體)`
      如(Opsehll，Bear)。
   4. `constructor(建構子)` 是 new `Instance(實體)`出來時，會執行的區塊，
      一般用來處理預設值，所以會發現，要帶參數給設計圖，會透過 `constructor(建構子)` 定義。
   5. `Property(屬性)`在`constructor(建構子)`結束前需要給預設值。
   6. `Property(屬性)` readonly 時，就不能改變，只能讀取。

---
   - ### Class `extends(繼承)`
   > 上面說了一堆很抽象的東西，
   > 我們來實作一下：
   ```typescript
    class SuperMember extends Member {
      private weight: number;
      static skill: Array<string> = [];

      constructor(title: string, age: number, weight: number = 100) {
         // 在這裡執行的 super 等同於執行父類別的 constructor(建構子)
         // 如果要執行其他父類的functionProperty(屬性)`，一樣是透過super：
         // super(summary)
         super(title, age);
         this.weight = weight;

         this.skill = this.skill.concat([
               '散步投罐罐',
               '熊熊掛保證'
         ]);
      }

      public DrinkCola(): number {
         return this.weight;
      }

      public superSkill() {
         // 這邊this 是指父類(Member)
         return this.skill.concat([
               '散步投罐罐',
               '熊熊掛保證'
         ]);
      }
    }

    const Bear = new SuperMember('Bear', 40, 110);

    console.log(Bear.summary()); // Bear is 40 years old.
    console.log(Bear.weight); // 提示：'weight' 是私有屬性，只能從類別 'SuperMember' 中存取
    console.log(Bear.DrinkCola()); // 100
    console.log(SuperMember.skill); // []
    console.log(Bear.superSkill()); // ['種草', '嘴砲', '散步投罐罐', '熊熊掛保證', '散步投罐罐', '熊熊掛保證']
   ```
   > 上面的例子可以得出很多結論：
   1. `extends(繼承)`出來的新類，可以直接使用父類的`Property(屬性)`。
   2. `private(私有)`屬性 只能在 `Class(類別)` 使用。
   3. `static(靜態)`屬性的呼叫，不會執行`constructor(建構子)`。
   4. 子類能存取父類的`protected(保護)`屬性，語法：`this.屬性`。

   > ※ static function 沒辦法存取父類`protected(保護)`屬性，
   >    因為this會變成自己(子類)本身。
   >    除非父類在回傳時回傳的是this 就能正確識別。
   > ※ `private(私有)`屬性 子類不能使用外，也不會`extends(繼承)`

---
   - ### Class `abstract(抽象)`
   > 對，我們現在是真的抽象了，
   > 甚麼意思? 比喻一下：
   > `class(類別)`是真的設計圖,
   > 那 `abstract(抽象)``class(類別)`就是只是一個設計概念，
   > 設計圖可以直接拿來 new 出`Instanceof(實體)`，
   > 但是設計概念沒辦法，他只能拿來`extends(繼承)`：
   ```typescript
    // 新增一個抽象類別，並把team移到 Maya
    // 宣告一個抽象發法 getSlogan()
    abstract class Maya {
      public readonly team = 'Maya';
      public abstract getSlogan(): string;
    }
   ```
   > 然後讓Member繼承Maya：

   ![alt](https://)
   > 在Member 裡面補上
   ```typescript
    public getSlogan = (): string => {
      return `${ this.team } ${ this.team } 我的媽呀!`;
    };
   ```
   > 警告就消失了，在這邊我們可以得到結論：
   1. `abstract class(抽象類別)`裡的`abstract funciton(抽象方法)`一定要被實現
   > ※ 實現時連可見度都需要一樣。

---
## 小結：
   > 結論都在上面說完啦~~，
   > 如果本身有使用其他語言 php 之類的，
   > 這個章節的內容吸收起來相對會容易很多，
   > 如果沒有，也不是太難懂~~(更難的在後面)~~，
   > 如果有不懂的地方，試著改範例玩玩看，
   > 理解起來會更順暢，

   > 簡單來說：
   > 就是透過`class(類別)`的規範，生成一個`Instance(實體)`(也稱實例)，
   > 而這個規範是可以透過 `extends(繼承)` 累計的。
   > 而這些規範有四種可見度來決定在那些地方能呼叫、使用。
   > 以上，大家晚安~
