// overload signatures => `type definition`(型別定義)`
function nsReverse(word: number): number; // 數字
function nsReverse(word: string): string; // 字串

// 可以隔開也沒關係
// function implementation 實現 funciton 功能
function nsReverse(word: number | string): number | string {
  if (typeof word === 'number') {
    return Number(word.toString().split('').reverse().join(''));
  } else {
    return word.split('').reverse().join('');
  }
}

console.log(nsReverse('aerg')); // grea



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