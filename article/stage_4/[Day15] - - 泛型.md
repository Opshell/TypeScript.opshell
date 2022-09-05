![alt](https://)

# 我變 我變 我變變變
> *任何傻瓜都可以寫出電腦看得懂的程式，*
> *但好的程式設計師會寫出人也看得懂的。*
> *───────────────────────── By Kent Beck*
![alt](https://)

---

https://jkchao.github.io/typescript-book-chinese/typings/generices.html#%E5%8A%A8%E6%9C%BA%E5%92%8C%E7%A4%BA%E4%BE%8B
https://pjchender.dev/ironman-2021/ironman-2021-day06/
https://pjchender.dev/ironman-2021/ironman-2021-day02/

## 目標: `Generics(泛型)`
   > 在前面的例子中，會發現型別都會事先定義好，
   > 想使用不同的型別的參數就會需要使用很多技巧，
   > 除了前面介紹的`Union(聯集)`、`Overload(超載)`等方式，
   > `Generics(泛型)`是指在定義 `function`、`Interfaces(介面)` 或 `Class(類別)` 的時候，
   > 不指定具體的型別，讓型別抽象化，使用的時候再指定型別的一種特性。
   > 簡單來說就是讓型別，也變成一個變數。
---

## 過程：
   ### 1. `Generics(泛型)` 基本使用
   > 做一個可以新增、剔除成員的 Class
   ```typescript
    class Team {
      private list: string[] = [];

      push = (item: string) => this.list.push(item);
      pop = (): string | undefined => this.list.shift();
    }

    const Maya = new Team();

    Maya.push('Opshell');
    Maya.push(0); // WARN：類型 number 不能指派給 string 的參數

   ```
   > 那我今天要用ID 做相同的功能
   > 不就要在另外寫一個不同型別，但功能都一樣的class?
   > 想想就傻爆了...
   > 這時候就可以用`Generics(泛型)`來處理了：
   ```typescript
    class AryInOut<T> {
      private list: T[] = [];

      push = (item: T) => this.list.push(item);
      pop = (): T | undefined => this.list.shift();
    }

    const MayaTeam = new AryInOut<string>();
    const TeamIDList = new AryInOut<number>();

    MayaTeam.push('Opshell');
    TeamIDList.push(1);
   ```
   > 改成這樣之後




---
## 小結：
   > 學習完所謂的列舉，
   > 會發現原生的JavaScript Object
   > 就能簡易的實現大部分的功能，
   > Enum最主要的差別就是提高了他的可讀性，
   > 更易於管理。
