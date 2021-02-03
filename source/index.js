console.log('Running index.js');
// variables available in the global scope
let player1 = undefined;
let player2 = undefined;
// classes
class Player {
    name = "";

    constructor(playerName) {
        this.name = playerName;
    }
}

// functions
const addPlayer = function(playerName, playerNumber) {
    if (playerNumber === 1 && player1 === undefined) {
        if (playerName === "") playerName = "Mr No-Name";
        player1 = new Player(playerName);
    } else if (playerNumber === 2 && player2 === undefined) {
        if (playerName === "") playerName = "Little Miss No-Name";
        player2 = new Player(playerName);
    } else {
        console.log('Please enter a valid player name and/or player number!');
    }
}

addPlayer('bob', 1);
addPlayer('fred', 2);
addPlayer('fred', 3);
console.log(`Player One's name is ${player1.name}`);
console.log(`Player Two's name is ${player2.name}`);
