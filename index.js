console.log('Running index.js');
console.log(document.documentElement.innerHTML);
// variables available in the global scope
let playerOneObject = undefined;
let playerTwoObject = undefined;

let currentConnectFourGrid = [];
// classes
class Player {
    playerName = "";
    playerNumber = 0;

    constructor(newPlayerName, newPlayerNumber) {
        this.playerName = newPlayerName;
        this.playerNumber = newPlayerNumber;
    }
}

class connectFourGrid {

    constructor(numberOfRows, numberOfColumns) {
        this.grid = this.initializeGrid(numberOfRows, numberOfColumns);
    }

    initializeGrid(numberOfRows, numberOfColumns) {
        let gridWidthArray = [];
        let initializedGrid = [];
        for(let i = 0; i < numberOfColumns; i++) {
            gridWidthArray.push("empty");
        }
        for(let j = 0; j < numberOfRows; j++) {
            initializedGrid.push(gridWidthArray);
        }
        return initializedGrid;
    }

    getGrid() {
        return this.grid;
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
    const playerOneNameInput = document.getElementById('player-one-name-input').value;
    const playerTwoNameInput = document.getElementById('player-two-name-input').value;
    playerOneObject = addPlayer(playerOneNameInput, 1);
    playerTwoObject = addPlayer(playerTwoNameInput, 2);
    console.log(`Player One's name is ${playerOneObject.playerName} and Player Two's name is ${playerTwoObject.playerName}.`);
    currentConnectFourGrid = generateNewGrid(6, 7);
    hideNameInputBoxes();
}

function hideNameInputBoxes() {
    document.getElementById('player-one-name-display').append(playerOneObject.playerName);
    document.getElementById('player-two-name-display').append(playerTwoObject.playerName);
    document.getElementById('player-name-input-form').hidden = true;
    document.getElementById('start-button').hidden = true;
    document.getElementById('player-name-display-area').hidden = false;
    document.getElementById('box-to-fill').append('Here be TEXT!');

}

function generateNewGrid(numberOfRows, numberOfColumns) {
    let newGrid = new connectFourGrid(numberOfRows, numberOfColumns);
    return newGrid.grid;
}

console.log(`The Current Game Grid: is coming up...`);
console.log(`The Current Game Grid: ${currentConnectFourGrid}`);
// Bindings for click events
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => startGame());

// init starts the program.
// const init = () => {
//     document
//         .getElementById('start-button')
//         .addEventListener('click', startGame);
//         console.log("clicking start button");
// }

// document.addEventListener('DOMContentLoaded', init);

// document.getElementById('box-to-fill').append('Here be TEXT!');


module.exports = {
    addPlayer, 
    startGame,
    playerOneObject,
    playerTwoObject,
    connectFourGrid,
    Player,
};


