class Member {
   title: string = 'nobody';
   age: number = 0;
}

interface IMember extends Member {
   weight: number;
}

let Opshell: IMember = { weight: 60 }