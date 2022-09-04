abstract class Maya {
    public readonly team = 'Maya';
    public abstract getSlogan(): string;
}

class Member extends Maya {
    // Property(屬性)
    title: string = 'nobody';
    age: number;
    protected skill: Array<string> = ['種草', '嘴砲'];

    // constructor(建構子)
    constructor(title: string, age: number = 0) {
        // 只要有繼承，都要在建構子 呼叫super
        super();
        if (title) { this.title = title; }
        this.age = age;
    }

    public getSlogan = (): string => {
        return `${ this.team } ${ this.team } 我的媽呀!`;
    };

    // Property(屬性)
    public summary(): string {
        return `${this.title} is ${this.age} years old.`;
    }
}

class SuperMember extends Member {
    private weight: number;
    static skill: Array<string> = [];

    constructor(title: string, age: number, weight: number = 100) {
        // 在這裡執行的 super 等同於執行父類別的 constructor(建構子)
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

    static superSkill() {
        return super(skill).concat([
            '散步投罐罐',
            '熊熊掛保證'
        ]);
    }

}

const Bear = new SuperMember('Bear', 40, 110);

console.log(Bear.summary()); // Bear is 40 years old.
console.log(Bear.weight); // 'weight' 是私有屬性，只能從類別 'SuperMember' 中存取
console.log(Bear.DrinkCola()); // 100
console.log(SuperMember.skill); // undefined
console.log(Bear.superSkill()); // ['種草', '嘴砲', '散步投罐罐', '熊熊掛保證', '散步投罐罐', '熊熊掛保證']