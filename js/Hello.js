"use strict";
class Member {
    // constructor(建構子)
    constructor(title, age = 0) {
        // Property(屬性)
        this.title = 'nobody';
        this.skill = ['種草', '嘴砲'];
        if (title) {
            this.title = title;
        }
        this.age = age;
    }
    // Property(屬性)
    summary() {
        return `${this.title} is ${this.age} years old.`;
    }
}
class SuperMember extends Member {
    constructor(title, age, weight = 100) {
        // 在這裡執行的 super 等同於執行父類別的 constructor(建構子)
        super(title, age);
        this.weight = weight;
        this.skill = this.skill.concat([
            '散步投罐罐',
            '熊熊掛保證'
        ]);
    }
    DrinkCola() {
        return this.weight;
    }
    superSkill() {
        return this.skill.concat([
            '散步投罐罐',
            '熊熊掛保證'
        ]);
    }
}
SuperMember.skill = [];
const Bear = new SuperMember('Bear', 40, 110);
console.log(Bear.summary()); // Bear is 40 years old.
console.log(Bear.weight); // 'weight' 是私有屬性，只能從類別 'SuperMember' 中存取
console.log(Bear.DrinkCola()); // 100
console.log(SuperMember.skill); // undefined
console.log(Bear.superSkill()); // ['種草', '嘴砲', '散步投罐罐', '熊熊掛保證', '散步投罐罐', '熊熊掛保證']
//# sourceMappingURL=Hello.js.map