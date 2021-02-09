console.log('Running index.js');
console.log(document.documentElement.innerHTML);
// variables available in the global scope
let player1 = undefined;
let player2 = undefined;
// classes
class Player {
    playerName = "";
    playerNumber = 0;

    constructor(newPlayerName, newPlayerNumber) {
        this.playerName = newPlayerName;
        this.playerNumber = newPlayerNumber;
    }
}

// functions


function addPlayer(playerName, playerNumber) {
    // returns undefined if an invalid data type is entered
    if (typeof playerName !== 'string' || typeof playerNumber !== 'number') {
        console.log('Please enter a valid player name and/or player number!');
        return;
    }
    if (playerNumber === 1 && player1 === undefined) {
        // assign player 1 name from HTML input or random name
        if (playerName === "") playerName = "Mr No-Name";
        return new Player(playerName, playerNumber);
    } else if (playerNumber === 2 && player2 === undefined) {
        // assign player 2 name from HTML input or random name
        if (playerName === "") playerName = "Little Miss No-Name";
        return new Player(playerName, playerNumber);
    } else {
        console.log('addPlayer: something has gone seriously wrong!');
    }
}

// Bindings for click events
// const startButton = $("#start-button");
// startButton.click(addPlayer);

// init starts the program.
const init = () => {
    document
        .getElementById('start-button')
        .addEventListener('click', addPlayer);
        console.log("clicking start button");
}

document.addEventListener('DOMContentLoaded', init);

module.exports = {addPlayer};


