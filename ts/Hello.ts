type stringArray = string | null;

    function teamUp(team: stringArray[], ...members: stringArray[]) {
      members.forEach((member) => {
         team.push(member);
      });
    }

    let Maya: stringArray[] = [];
    teamUp(Maya, 'Opshell', 'Bear');

    console.log(Maya);