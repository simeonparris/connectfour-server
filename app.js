console.log('Running app.js');
// variables available in the global scope
let playerOneObject = undefined;
let playerTwoObject = undefined;

let currentConnectFourGridObject;

// functions
function startGame () {
    const playerOneNameInput = document.getElementById('player-one-name-input').value;
    const playerTwoNameInput = document.getElementById('player-two-name-input').value;
    playerOneObject = addPlayer(playerOneNameInput, 1);
    playerTwoObject = addPlayer(playerTwoNameInput, 2);
    console.log(`Player One's name is ${playerOneObject.playerName} and Player Two's name is ${playerTwoObject.playerName}.`);
    currentConnectFourGridObject = generateNewGrid(6, 7);
    hideNameInputBoxes();
    drawGrid(3, 4);
}

function hideNameInputBoxes() {
    document.getElementById('player-one-name-display').append(playerOneObject.playerName);
    document.getElementById('player-two-name-display').append(playerTwoObject.playerName);
    document.getElementById('player-name-input-form').hidden = true;
    document.getElementById('start-button').hidden = true;
    document.getElementById('player-name-display-area').display = "block";
}

function drawGrid(numberOfRows, numberOfColumns) {
    console.log(`drawGrid: Drawing a grid with ${numberOfRows} rows and ${numberOfColumns} columns...`)
    let currentGridBody = document.getElementById("grid-body");
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        let gridRow = document.createElement("tr");
        gridRow.id = `row-${rowIndex}`;
        gridRow.classList.add("row");
        currentGridBody.appendChild(gridRow);
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
            let gridCell = document.createElement("td");
            gridCell.classList.add("grid-cell");
            gridCell.id = `row-${rowIndex}-column-${columnIndex}`;
            const emptyCellText = document.createTextNode("empty");
            gridCell.appendChild(emptyCellText);
            gridRow.appendChild(gridCell);
        } 
    }
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


