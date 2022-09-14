![Day14 Banner](https://ithelp.ithome.com.tw/upload/images/20220914/20109918NiCjkfHuY6.jpg)

# 這兩隻不都是鴨子嗎?
> *鴨子與鵝實際差在哪?*
> *等等? 這兩隻不都是鴨子嗎?*
> *────────────────────── By Opshell*

---
## 目標: `Type Alias(型別別名)`
   > 千呼萬喚始出來阿，前面用了這麼多次的`Alias(別名)`
   > 今天終於要來正式介紹了。

   > 和`Interface(介面)`很接近，
   > 但又有那一點點不一樣，
   > 今天藉由比較`Interface(介面)`和一些例子，
   > 來好好認識`Alias(別名)`。
   > *A type alias is exactly that - a name for any type.*

---
## 過程：
- ### 1. 當型別組使用
   > 在前面幾天都可以發現這個用法，
   > 符合特訂條件或需求的元素或子類組合起來並給個別名：
   ```typescript
    type tStrOrNum = string | number;

    function consoleAge(age: tStrOrNum) {
        console.log(age);
    }

    consoleAge('三十');
    consoleAge(30);
   ```
   > 在上面的例子中，我們直接把string 和 Number
   > 組成一個群組 'tStrOrNum' 然後給個別稱。

---
- ### 2. 與`Interface(介面)`的區別
   > 前面提到說`Alias(別名)`與`Interface(介面)`，
   > 在使用上幾乎沒有區別，但那是幾乎，

---
* #### 2-1. `Interface(介面)`會有名稱
   > 宣告完`Interface(介面)`後，會建立一個抽象的介面，並賦予它名稱，
   > 簡單說就是建立出一個`靜態物件`，
   > 而`Alias(別名)`只會把型別群組起來，給一個別稱，並不會建立東西，
   > 只是你提到別稱，TS會知道代指哪些人。
   ```typescript
    type tMember = {
      title: string
    };
    interface iMember {
      title: string;
    };

    const Opshell: tMember = { title: 'Opshell' }; // 圖一
    const Bear: iMember = { title: 'Bear' }; // 圖二
   ```
   ![tMember](https://ithelp.ithome.com.tw/upload/images/20220914/201099183ioPKHsEVL.png)
   ![iMember](https://ithelp.ithome.com.tw/upload/images/20220914/20109918G0NGrhVi3c.png)

---
* #### 2-2. 在`extends(繼承)`的區別
   ```typescript
    interface iMember {
      title: string;
      age: number;
    }
    interface iSuperMember extends iMember {
      gender: string;
    }

    type tMember = {
      title: string;
      age: number;
    }
    type tSuperMember = tMember & {
      gender: string;
    }
   ```
   > 可以看出來他們在使用上的區別，
   > `Alias(別名)`有一種把兩個型別Group起來的感覺。

---
* #### 2-3. `Alias(別名)` `Implements(實現)`的區別
   > 在`Alis(別名)`上我們常常用來定義`Union(聯集)`，
   > 但是 `Union Alis(聯集別名)`是不能拿來`Implements(實現)`的，
   > 但是物件形式可以。
   ```typescript
    type tMember = {
      title: string;
      age: number;
    }
    class Member implements tMember {
      title = 'Opshell';
      age = 30;
    }

    type tStrNumUnion = string | number;
    class Member2 implements tStrNumUnion {
      title = 'Opshell';
      age = 30;
    }
   ```
   ![報錯](https://ithelp.ithome.com.tw/upload/images/20220914/20109918TXTWckTxgo.png)

---
* #### 2-4. `Alias(別名)` 名稱不能重複定義
   > 在`Interface(介面)`中 當我們重複定義時，
   > `Interface(介面)` 會被 `Declaration Merging(聲明合併)`，
   > 但是在 `Alias(別名)` 中會被警告喔：
   ```typescript
    type tMember = {
      title: string;
    }
    type tMember = {
      age: number;
    }
   ```
   ![type重複](https://ithelp.ithome.com.tw/upload/images/20220914/20109918aw1IrdrUvD.png)

---
* #### 2-5. `Interface(介面)` 無法描述型別組
   > 在這個例子中就能很明顯的感受到兩者的差異了，
   > 也對他們的實際分工有了更明確的認知：
   ```typescript
    //primitive type(原始型別)
    type title = string;

    interface iMember { // 會員
      doSomething(): void;
    }
    interface iVisitor { // 訪客
      walkAround(): void;
    }

    //union type(聯集型別)
    type canSee = iMember | iVisitor;

    //tuple(元組)
    type parkList = [iMember, iVisitor];
   ```
   > 上面用`Alias(別名)`處理的都是`Interface(介面)`處理不了的喔。
   > 是不是對於區別有個更明顯的感受?

---
## 小結：
   > 由上面的不同處來比較，
   > 會對於`Interface(介面)`：
   > 是`Object Shape(物件形狀)`的描述；
   > 是`Class(類別)`邏輯得抽象。
   > 有了更明確的認知。
   > 而`Alias(別名)`則補全了`Interface(介面)`對於型別處理剩餘的那些部分，
   > `Union(聯集)`、`Tuple(元組)`等對於型別的描述。
