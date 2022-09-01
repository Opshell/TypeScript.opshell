![alt](https://)

# 我變 我變 我變變變
> *任何傻瓜都可以寫出電腦看得懂的程式，*
> *但好的程式設計師會寫出人也看得懂的。*
> *───────────────────────── By Kent Beck*
![alt](https://)

---

https://pjchender.dev/ironman-2021/ironman-2021-day06/
https://pjchender.dev/ironman-2021/ironman-2021-day02/


## 目標: [泛型](https://medium.com/onedegree-tech-blog/typescript-%E4%B8%80%E4%BA%9B%E4%BB%A4%E4%BA%BA%E5%8F%88%E6%84%9B%E5%8F%88%E6%81%A8%E7%9A%84%E5%85%A7%E5%AE%B9-type-guard-narrowing-1655a9ae2a4d)
   > 首先我們可以先想想如何讓型別轉換這件事被複用，
   > 我們不妨把想法簡單化，就是建立一個 function 把 A 型態轉換成 B 型態，
   > 而這時候就必須要利用 TypeScript 中的 `Generics(泛型)`這個技巧了。

   > `Generics(泛型)`是指在定義 `function`、`interfaces` 或 `class` 的時候，
   > 不預先指定具體的型別而在使用的時候再指定型別的一種特性。
---

## 過程：
   ```typescript
    const createEnumMapper = <T>(mapping: T) => (value: keyof T | null): T[keyof T] | undefined => {
        return value === null ? undefined : mapping[value];
    }
   ```
   > 這個 createEnumMapper 的 function 是一個 currying function，
   > 第一個變數傳入的是 enum 本身，這時候 TypeScript 的 Generics 就會知道我的 T 就是跟 enum 本身有關。
   > 為了讓這個 Generics 可以正確的把兩個 enum mapping 起來，
   >　我們必須要先建立一個 object 把兩個 enum 的 key value 配對像下面這樣：
   ```typescript
    const mapper = {
        [BE_GENDER.MALE]: FE_GENDER.MALE,
        [BE_GENDER.FEMALE]: FE_GENDER.FEMALE,
    };
   ```
   > 由於我們上面的 mapper 是把 enum 的 value 當成 key，
   > 所以我們只要帶入 data 的值就可以直接轉換了，像下面這樣：
   ```typescript
    const foo = () {
        const gender = FE_GENDER.MALE;
        const data = f gender: BE_GENDER.MALE ];
        const getGenderEnumMapper = createMapper(mapper)
        const transformedGender = getGenderEnumMapper(data.gender);
        const t
        undefined const transformedGender: FE GENDER |
        return transformedGender gender;
    }
   ```

---
## 小結：
   > 學習完所謂的列舉，
   > 會發現原生的JavaScript Object
   > 就能簡易的實現大部分的功能，
   > Enum最主要的差別就是提高了他的可讀性，
   > 更易於管理。
