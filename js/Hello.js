"use strict";
// 建立Member Class 設定 名稱、年紀、性別為建構子
class Member {
    constructor(name, year, gender) {
        this.name = name;
        this.year = year;
        this.gender = gender;
    }
}
// 建立Team Class 團隊名稱、團隊成員 性別為建構子
// 這邊可以看出 members建構子的型別是 Member Class
class Team {
    constructor(title, members) {
        this.title = title;
        this.members = members;
    }
}
function getName(cls) {
    return (cls instanceof Member) ? cls.name : cls.title;
}
const how = new Member('Opshell', 30, 'man');
const zoo = new Team('Maya', [how]);
console.log(getName(how));
console.log(getName(zoo));
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
//     if (typeof year === 'string') {
//         result = year.length;
//     } else {
//         result = year.toString().length;
//     }
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
//# sourceMappingURL=Hello.js.map