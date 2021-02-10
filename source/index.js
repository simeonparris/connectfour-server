console.log('Running index.js');
console.log(document.documentElement.innerHTML);
// variables available in the global scope
let playerOneObject = undefined;
let playerTwoObject = undefined;
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
    if (playerNumber === 1 && playerOneObject === undefined) {
        // assign player 1 name from HTML input or random name
        if (playerName === "") playerName = "Mr No-Name";
        return new Player(playerName, playerNumber);
    } else if (playerNumber === 2 && playerTwoObject === undefined) {
        // assign player 2 name from HTML input or random name
        if (playerName === "") playerName = "Little Miss No-Name";
        return new Player(playerName, playerNumber);
    } else {
        console.log('addPlayer: something has gone seriously wrong!');
    }
}

function startGame () {
    const playerOneName = $('#player-one-name-input').value;
    const playerTwoName = $('#player-two-name-input').value;
    playerOneObject = addPlayer(playerOneName, 1);
    playerTwoObject = addPlayer(playerTwoName, 2);

}

// Bindings for click events
const startButton = $("#start-button");
startButton.click(startGame);

// init starts the program.
const init = () => {
    document
        .getElementById('start-button')
        .addEventListener('click', addPlayer);
        console.log("clicking start button");
}

document.addEventListener('DOMContentLoaded', init);

module.exports = {addPlayer};


