"use strict";
function creatMember() {
    // 在這邊不能用箭頭函式表達喔
    let member = function (title, age) {
        return `${title} is ${age} years old.`;
    };
    member.weight = 100;
    member.getWeight = (e) => { console.log(e.weight); };
    return member;
}
let Opshell = creatMember();
console.log(Opshell('Opshell', 30));
Opshell.weight = 60;
console.log(Opshell.getWeight(Opshell));
//# sourceMappingURL=Hello.js.map