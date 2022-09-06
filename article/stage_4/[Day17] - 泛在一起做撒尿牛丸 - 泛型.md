![alt](https://)

# 我變 我變 我變變變
> *爭什麼爭！*
> *泛在一起做撒尿牛丸阿，笨蛋*
> *───────────────────────── By 周星馳 - 食神*
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
   - ### 1. `Generics(泛型)` 基本使用
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

   > 當然，你可能會想 `<T>`是什麼天書...
   > 其實就是型別變數，既然是變數，當然可以自訂名稱，
   > `<T, U, V>`之類的都可以，當然你會注意到Ops舉例直接包在了一起
   > 是的`Generics(泛型)`也接受你一次宣告多個。

---
   - ### 2. `Generic Constraints(泛型收束)`
   > 一般`Generics(泛型)`宣告後，你想帶什麼都可以，
   > 跟`any`沒甚麼兩樣，在這種模糊的狀況下，
   > 就很容易出事，所以我們需要約束一下他可以傳入哪些型別：
   ```typescript
    class AryInOut<T extends number | string> {
      private list: T[] = [];

      push = (item: T) => this.list.push(item);
      pop = (): T | undefined => this.list.shift();
    }
   ```
   > 沒錯，就是利用`extends(繼承)`，和`Class(類別)`、`Interface(介面)`一樣的用法，
   > `extends(繼承)`後你放進<T>的型別，需要是符合`extends(繼承)`的型別才能用喔。

---
   - ### 3. 常用實例：JSON Promise：
   > 如果我們做一個接收回傳JSON 的 功能，
   > 每個回傳都單獨做一個實在是太累了，
   > 不如就泛在一起做撒尿牛丸：
   ```typescript
    const getJSON = <T>(config: {
      url: string;
      headers?: { [key: string]: string }
    }): Promise<T> => {
      const fetchConfig = {
         method: 'GET',
         Accept: 'application/json',
         'Content-Type': 'application/json',
         ...(config.headers || {})
      };
      return fetch(config.url, fetchConfig)
         .then<T>(response => response.json());
    };
   ```
   > 這樣子總比`Promise<any>`可控多了。

---
## 小結：
   > `Generics(泛型)`的使用很靈活，
   > 但是Ops覺得有點太抽象了，
   > 所以在後面會有更多例子來闡述他的方便。
   > 大家晚安~
