declare namespace Member {
    interface Info {
       title: string;
       age: number;
    }

    namespace Team {
       function getTeam(): Array<string>;
    }

    function getSummary(title: string, age: number): string;
}
