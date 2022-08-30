type tFullName = (firstname: string, lastname: string) => string;

    const combinName: tFullName = (firstname, lastname) => {
      firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
      lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);

      return `Hello ${lastname} ${firstname}, Welcome to typeScript.`;
    };

console.log(combinName('Liu', 'opshell'));

// interface iFaceStrChk {
//   (paragraph: string, keyword: string): boolean;
// }

// const checkKeyword: iFaceStrChk = (paragraph, keyword) => {
//   return paragraph.search(keyword) !== -1;
// }

// console.log(checkKeyword('Hello world !', 123));
// console.log(checkKeyword('Hello world !', 'llo'));
// console.log(checkKeyword('Hello world !', 'lle'));