type tMember = {
   title: string;
   age: number;
}
class Member implements tMember {
   title = 'Opshell';
   age = 30;
}

type StrNumUnion = string | number;
class Member2 implements StrNumUnion {
   title = 'Opshell';
   age = 30;
}