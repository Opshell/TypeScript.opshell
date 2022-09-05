class AryInOut<T> {
    private list: T[] = [];

    push = (item: T) => this.list.push(item);
    pop = (): T | undefined => this.list.shift();
  }

  const MayaTeam = new AryInOut<string>();
  const TeamIDList = new AryInOut<number>();

  MayaTeam.push('Opshell');
  TeamIDList.push(1);