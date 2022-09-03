"use strict";
// 接受 memberConfig 做為參數，回傳 {summary: string; weight: number | null}
const createCube = (config) => {
    let cube = {
        title: 'cube',
        volume: 1000,
        weight: null
    };
    if (config.title) {
        cube.title = config.title;
    }
    if (config.weight) {
        cube.weight = config.weight;
    } // 上面沒註記 這邊會出事 number 不能塞進null
    if (config.long && config.width && config.height) {
        cube.volume = config.long * config.width * config.height;
    }
    return cube;
};
const Opshell = createCube({ title: 'bigCube', long: 20, width: 20, height: 20 });
console.log(Opshell.title); // Opshell is 30 years old.
console.log(Opshell.volume); // 60
console.log(Opshell.weight); // 60
//# sourceMappingURL=Hello.js.map