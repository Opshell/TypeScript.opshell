![Day11 Banner](https://ithelp.ithome.com.tw/upload/images/20220911/20109918UMfK32zePF.jpg)

# 這就是一隻鴨子
  > *當我看到一隻鳥像鴨子一樣走路*
  > *像鴨子一樣游泳，像鴨子一樣嘎嘎叫時，*
  > *我就叫那隻鳥為鴨子*
  > *────────────────── By James Whitcomb Riley*

---
## 目標: 學會Object 的Type法

---
## 過程：
- ### 1. Inference(推論) 物件
   ```javascript
    // JavaScript Code
    let typescript = {
      name: 'Opshell',
      age: 30,
      gender: 'man',
      car: null,
      house: undefined,
      summary: function() { return `${this.name}：${this.age} years old, is a ${this.name}.`; }
    };

    console.log(member.summary());
   ```
   ![object-2](https://ithelp.ithome.com.tw/upload/images/20220911/201099183qOEVmLQTg.png)

   > 可以發現TypeScript住海邊，管得非常寬，
   > 他不是直接跟你說 member的型別是物件，
   > 而是把物件內的型別`Inference(推論)`的清清楚楚。

   > 就連前面提到的 `Nullable Type`都可以推論出來，
   > 而不是給`any`含糊帶過。

   > 接下來我們來試著對這個物件做一些常規操作：
   ```typescript
    // 改物件值
    member.name = 'Opshell Liu'; // 成功

    // 試著添加新屬性
    member.firstName = "Liu"; // 提醒：無法添加不存在屬性
    // 試著輸入錯誤型別
    member.age = '三十'; // 提醒：輸入型別錯誤

    // 試著覆蓋物件
    member = {
      name: 'Opsehll Liu',
      age: 30,
      gender: 'man',
      dna: 'xy', // 提醒：不能新增鍵值
      car: null,
      house: undefined,
      summary: function() { return `${this.name}：${this.age} years old, is a ${this.gender}.`; }
    }

    delete member.gender; // 提醒：不能刪除必填屬性
   ```
   - #### 以上行為可以得出幾個結論
   > 1. `Inference(推論)`出來的型別很準確，連`Nullable Type`都可以推。
   > 2. 物件宣告完成後，只可以改值，而且需要型別正確才可以。
   > 3. 不可以新增、修改、刪除 `key(屬性)`。

---
- ### 2. `Annotation(註記)` 物件
   > 就像前面funciton 一樣，上面的方式其實不是完整的宣告Type的方法。
   > 而是像這樣，落落長的`Annotation(註記)`：
   ```typescript
    let member: {
      name: string;
      age: number;
      gender: 'man' | 'woman' | 'other';
      car?: null | string;  // 和funciton 一樣 加了? 就是可選參數
      house?: undefined | string; //
      summary: Function;
    } = {
      name: "Opshell",
      age: 30,
      gender: "man",
      car: null,
      summary: function () { return `${this.name}：${this.age} years old, is a ${this.gender}.`; }
    }

    delete member.car; // 因為是可選參數 所以可以刪除

    console.log(member); // 會發現car不見了
    console.log(member.summary()); // Opshell：30 years old, is a man.
   ```
   > 會發現，雖然用`Annotation(註記)`的方式很麻煩，
   > 但是變成可以處理可選參數，
   > 但更常使用的其實應該是 `Interface(介面)` 來抽象，
   > 在之後`Interface(介面)`的介紹中就會了解到了。

   > 不過看看這個編譯過後的程式碼量...

   ![object-3](https://ithelp.ithome.com.tw/upload/images/20220911/20109918NNrjX9mMXc.png)

---
- ### 3. 筆記小知識`String Literal(字串字面)`
   > ※  這邊會注意到我的gender的型別變成了 'man' | 'woman' | 'other',
   >     其實這是一種叫做`String Literal(字串字面)`的型別，
   >     聽起來複雜，其實原理很簡單，就是約束值，
   >     只能從有宣告的值中選擇。
   ```typescript
    type SLGender = 'man' | 'woman' | 'other';
    function consoleMemberGender(name: String, gender: SLGender): void {
      console.log(`name is a ${gender}.`);
    }

    consoleMemberGender('Opshell', 'handsome guy'); // 提醒：型別 handsome guy 不可指派給 SLGender 型別的參數
    consoleMemberGender('Opshell', 'man');
   ```

---
## 小結：
   > 看完今天的Object的宣告，
   > 會開始覺得TypeScript怎麼這麼麻煩，
   > 但之後的`Interface(介面)`、`Class(類別)`、`Generics(泛型)`等，
   > 會讓Object的使用變得更為容易，
   > 甚至會有一種拼圖接上的感覺，
   > 然後還學了`String Literal(字串字面)`，
   > 讓我們一起期待吧!
