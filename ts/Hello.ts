interface Member {
   (title: string, age: number | string): string; // 函式的In Out
   weight: number; // 函式裡的屬性
   getWeight(e: {weight: number}): void; // 函式裡的方法
}

function creatMember(): Member {
   // 在這邊不能用箭頭函式表達喔
   let member = <Member>function (title: string, age: number): string {
      return `${title} is ${age} years old.`;
   }

   member.weight = 100;
   member.getWeight = (e: {weight: number}) => { console.log(e.weight) };

   return member;
}

let Opshell = creatMember();
console.log(Opshell('Opshell', 30));
Opshell.weight = 60;
console.log(Opshell.getWeight(Opshell));
