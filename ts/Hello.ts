interface cubeConfig {
  title?: string;
  long?: number;
  width?: number;
  height?: number;
  weight?: number;
}

// 接受 memberConfig 做為參數，回傳 {summary: string; weight: number | null}
const createCube = (config: cubeConfig): { title: string, volume: number, weight: number | null } => {
  let cube: { // 複習 物件型別 註記
    title: string;
    volume: number;
    weight: number | null;
  } = {
    title: 'cube',
    volume: 1000,
    weight: null
  };

  if (config.title) { cube.title = config.title; }
  if (config.weight) { cube.weight = config.weight; } // 上面沒註記 這邊會出事 number 不能塞進null

  if (config.long && config.width && config.height) {
    cube.volume = config.long * config.width * config.height;
  }

  return cube;
};

const Opshell = createCube({ title: 'bigCube', long: 20, width: 20, height: 20 });
console.log(Opshell.title); // bigCube
console.log(Opshell.volume); // 8000
console.log(Opshell.weight); // null