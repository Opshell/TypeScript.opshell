type tFullName = (firstname: string, lastname: string) => string;

// 字首轉大寫
const upWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

const combinName: tFullName = (firstname, lastname) => {
   return `Hello ${upWord(lastname)} ${upWord(firstname)}, Welcome to typeScript.`;
};

console.log(combinName('Liu', 'opshell')); // Hello Opshell Liu, Welcome to typeScript.