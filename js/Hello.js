"use strict";
// interface IMember {
//   name: string,
//   age: number,
//   gender: string,
//   car?: null,
//   house?: undefined,
//   summary(): `${IMember.name}：${IMember.age} years old, is a ${gender}.`;
// };



let member = {
    name: "Opshell",
    age: 30,
    gender: "man",
    car: null,
    summary: function () { return `${this.name}：${this.age} years old, is a ${this.gender}.`; }
};
delete member.car;
console.log(member);
console.log(member.summary());




// overload signatures => type definition`(型別定義)
// function nsReverse(word: number): number; // 數字
// function nsReverse(word: string): string; // 字串
// // 可以隔開也沒關係
// // function implementation 實現 funciton 功能
// function nsReverse(word: number | string): number | string {
//   if (typeof word === 'number') {
//     return Number(word.toString().split('').reverse().join(''));
//   } else {
//     return word.split('').reverse().join('');
//   }
// }
// console.log(nsReverse('aerg')); // grea
// const plus30 = (num: number): number => num + 30;
// console.log(plus30(123));   // 153
// console.log(plus30('123')); //
// console.log(plus30(Number('123'))); // 153
// type tFullName = (firstname: string, lastname: string) => string;
// // 字首轉大寫
// const upWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
// const combinName: tFullName = (firstname, lastname) => {
//   return `Hello ${upWord(lastname)} ${upWord(firstname)}, Welcome to typeScript.`;
// };
// console.log(combinName('Liu', 'opshell')); // Hello Opshell Liu, Welcome to typeScript.
// interface iFaceStrChk {
//   (paragraph: string, keyword: string): boolean;
// }
// const checkKeyword: iFaceStrChk = (paragraph, keyword) => {
//   // 如果再 Ts 中 查看paragraph 或 keyword 都會告訴你是string
//   return paragraph.search(keyword) !== -1;
// }
// console.log(checkKeyword('Hello world !', 123)); // 報錯 類型number 無法指定給 string
// console.log(checkKeyword('Hello world !', 'llo')); // true
// console.log(checkKeyword('Hello world !', 'lle')); // false
//# sourceMappingURL=Hello.js.map