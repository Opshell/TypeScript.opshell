"use strict";
// 字首轉大寫
const upWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const combinName = (firstname, lastname) => {
    return `Hello ${upWord(lastname)} ${upWord(firstname)}, Welcome to typeScript.`;
};
console.log(combinName('Liu', 'opshell')); // Hello Opshell Liu, Welcome to typeScript.
// interface iFaceStrChk {
//   (paragraph: string, keyword: string): boolean;
// }
// const checkKeyword: iFaceStrChk = (paragraph, keyword) => {
//   return paragraph.search(keyword) !== -1;
// }
// console.log(checkKeyword('Hello world !', 123));
// console.log(checkKeyword('Hello world !', 'llo'));
// console.log(checkKeyword('Hello world !', 'lle'));
//# sourceMappingURL=Hello.js.map