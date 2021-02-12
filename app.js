console.log('Running app.js');
// variables available in the global scope
let playerOneObject = undefined;
let playerTwoObject = undefined;

let currentConnectFourGrid = [];

// functions
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
    document.getElementById('player-name-display-area').display = "block";
    document.getElementById('box-to-fill').append('Here be TEXT!');
}

function generateNewGrid(numberOfRows, numberOfColumns) {
    let newGrid = new connectFourGrid(numberOfRows, numberOfColumns);
    return newGrid.getGrid();
}

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

module.exports = { 
    startGame,
    playerOneObject,
    playerTwoObject,
};


