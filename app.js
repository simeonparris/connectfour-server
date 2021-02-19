if (typeof exports === 'object') {
    console.log("Running app.js in Node");
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    const { checkForWinner } = require("./pure-functions");
} else {
    console.log("Running app.js in Browser");
}

console.log('Running app.js');
// variables available in the global scope
let playerOneObject = undefined;
let playerTwoObject = undefined;

let currentConnectFourGridObject;

let lastPositionPlayed = [];

// functions
function startGame () {
    const playerOneNameInput = document.getElementById('player-one-name-input').value;
    const playerTwoNameInput = document.getElementById('player-two-name-input').value;
    playerOneObject = addPlayer(playerOneNameInput, 1);
    playerTwoObject = addPlayer(playerTwoNameInput, 2);
    console.log(`Player One's name is ${playerOneObject.playerName} and Player Two's name is ${playerTwoObject.playerName}.`);
    const newGridObject = generateNewGrid(6, 7);
    currentConnectFourGridObject = newGridObject;
    const newGrid = newGridObject.getGrid();
    console.log(`startGame: the new grid to draw is ${newGrid}.`);
    console.log(`startGame: the length of the new grid is ${newGrid.length}.`);
    hideNameInputBoxes();
    drawGrid(newGrid);
}

function hideNameInputBoxes() {
    document.getElementById('player-one-name-display').append(playerOneObject.playerName);
    document.getElementById('player-two-name-display').append(playerTwoObject.playerName);
    document.getElementById('player-name-input-form').hidden = true;
    document.getElementById('start-button').hidden = true;
    document.getElementById('player-name-display-area').display = "block";
}

function drawGrid(gridToDraw) {
    // TODO make this function draw a full-sized grid
    console.log(`drawGrid: Drawing a grid with ${gridToDraw.length} rows...`)
    let currentGridBody = document.getElementById("grid-body");
    for (let rowIndex = 0; rowIndex < gridToDraw.length; rowIndex++) {
        console.log(`drawGrid: populating row ${rowIndex}.`);
        let gridRow = document.createElement("tr");
        gridRow.id = `row-${rowIndex}`;
        gridRow.classList.add("row");
        currentGridBody.appendChild(gridRow);
        for (let columnIndex = 0; columnIndex < gridToDraw[rowIndex].length; columnIndex++) {
            console.log(`drawGrid: populating cell ${columnIndex} of row ${rowIndex} with ${gridToDraw[rowIndex][columnIndex]}.`);
            let gridCell = document.createElement("td");
            gridCell.classList.add("grid-cell");
            gridCell.id = `row-${rowIndex}-column-${columnIndex}`;
            const cellText = document.createTextNode(gridToDraw[rowIndex][columnIndex]);
            gridCell.appendChild(cellText);
            gridCell.addEventListener("click", () => handleCellClick(rowIndex, columnIndex));
            gridRow.appendChild(gridCell);
        } 
    }
}

function clearGrid() {
    const currentGridBody = document.getElementById("grid-body");
    console.log(`clearGrid: the number of child nodes is ${currentGridBody.childNodes.length}.`);
    while (currentGridBody.firstChild) {
        console.log(`clearGrid: removing the child node ${currentGridBody.lastChild}.`);
        currentGridBody.removeChild(currentGridBody.lastChild);
    }
}

function takeTurn(columnNumber) {
    console.log(`takeTurn: the grid before placing a counter is ${currentConnectFourGridObject.getGrid()}.`);
    // place a counter in the chosen column and update the grid
    const resultOfPlacingCounter = currentConnectFourGridObject.placeCounterInColumn(columnNumber);
    console.log(`takeTurn: the grid is now ${currentConnectFourGridObject.getGrid()}.`);
    console.log(`takeTurn: the grid returned by placeCounterInColumn is ${resultOfPlacingCounter[0]}.`);
    const updatedGrid = resultOfPlacingCounter[0];
    const lastUpdatedRow = resultOfPlacingCounter[1];
    const lastUpdatedColumn = resultOfPlacingCounter[2];
    const winnerExists = checkForWinner(updatedGrid, [lastUpdatedRow, lastUpdatedColumn]);
    if (winnerExists[0] === true) {
        console.log(`takeTurn: There is a winner! The winning four is [${winnerExists[1]}], [${winnerExists[2]}],[${winnerExists[3]}],[${winnerExists[4]}].`);
        alert(`We have a winner! Winning row is [${winnerExists[1]}], [${winnerExists[2]}],[${winnerExists[3]}],[${winnerExists[4]}].`);
        return;
    } else {
        console.log("takeTurn: There is NOT a winner.")
        return updatedGrid;
    }
}

function handleCellClick(rowIndex, columnIndex) {
    console.log(`handleCellClick: you clicked on cell R${rowIndex} C${columnIndex}.`);
    takeTurn(columnIndex);
    const updatedGrid = currentConnectFourGridObject.getGrid();
    clearGrid()
    drawGrid(updatedGrid);
}

// Bindings for click events
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => startGame());

module.exports = { 
    startGame,
    playerOneObject,
    playerTwoObject,
};


