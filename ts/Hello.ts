// // 建立Member Class 設定 名稱、年紀、性別為建構子
// class Member {
//     constructor(public name: string, public year: number, public gender: string) { }
// }
// // 建立Team Class 團隊名稱、團隊成員 性別為建構子
// // 這邊可以看出 members建構子的型別是 Member Class
// class Team {
//     constructor(public title: string, public members: Member[]) { }
// }

// function isMember(cls: any): cls is Member {
//     return 'name' in cls;
// }

// const Opshell = new Member('Opshell', 30, 'man');
// const Zoo = new Team('Maya', [Opshell]);

// console.log(isMember(Opshell)); // true
// console.log(isMember(Zoo)); // false

type Man = 'xy';
type Woman = 'xx';

function isMan(gender: Man | Woman): gender is Man {
    return (gender as Man) === 'xy';
}

const Opshell = {
    gender: (<Man>'xy'),
    year: 30
};

console.log(isMan(Opshell.gender));


// // 建立Member Class 設定 名稱、年紀、性別為建構子
// class Member {
//     constructor(public name: string, public year: number, public gender: string) { }
// }
// // 建立Team Class 團隊名稱、團隊成員 性別為建構子
// // 這邊可以看出 members建構子的型別是 Member Class
// class Team {
//     constructor(public title: string, public members: Member[]) { }
// }

// function getName(cls: Member | Team) {
//     return (cls instanceof Member) ? cls.name : cls.title;
// }
// const how = new Member('Opshell', 30, 'man');
// const zoo = new Team('Maya', [how]);

// console.log(getName(how)); // Opshell
// console.log(getName(zoo)); // 因為Team 不在 Member的原型鏈上面 所以印出 Maya

// getName(new Member('Opshell', 30, 'man')); //  'Opshell'

// let immortal = function forever(year: number) {
//     while (true) {
//         year++;
//     }

//     // return 'life end';
// }

// function consoleYear(year: string & number) {
//     console.log(year);
// }

// consoleYear(1);
// consoleYear('1');
// consoleYear(<any>1);
// consoleYear(<never>1);
// consoleYear(<void>1);


// function getYearLength(year: string | number): number {
//     let result = 0;

//     // if (typeof year === 'string') {
//     //     result = year.length;
//     // } else {
//     //     result = year.toString().length;
//     // }
//     // if ((<string>year).length) {
//     //     result = (<string>year).length;
//     // } else {
//     //     result = year.toString().length;
//     // }

//     return result;
// }

// function setYear(year: string | number) {
//     console.log(year);
// }

// setYear('三十');
// setYear(30);


// interface Human {
//     year: number;
//     gender: string;
// }

// const ops: Human = {
//     year: 30,
//     gender: 'man'
// };
// // 或者是
// // const ops = {} as Human;
// // const ops = <Human> {}

// // 這時候就可以指定資料了
// ops.year = 30;
// ops.gender = 'man';



// function sayHello(name: string){
//     return 'Hello, ' + name;
// }
// const who = '123';
// console.log(sayHello(who));


// const plus = (num: number) => num + 30;
// console.log(plus(123));
// console.log(plus('123'));
// console.log(plus(Number('123')));

// let say:any = '123';
// let sayHello = >say + 30;

// console.log(sayHello);
