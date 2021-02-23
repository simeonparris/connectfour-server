const playerOneNameInput = document.getElementById('player-one-name-input').value;
const playerTwoNameInput = document.getElementById('player-two-name-input').value;

// Bindings for click events
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => startGame());

function drawGrid(gridToDraw) {
    console.log(`drawGrid: Drawing a grid with ${gridToDraw.length} rows and ${gridToDraw[0].length}`);
    let currentGridBody = document.getElementById("grid-body");
    for (let rowIndex = 0; rowIndex < gridToDraw.length; rowIndex++) {
        //console.log(`drawGrid: populating row ${rowIndex}.`);
        let gridRow = document.createElement("tr");
        gridRow.id = `row-${rowIndex}`;
        gridRow.classList.add("row");
        currentGridBody.appendChild(gridRow);
        for (let columnIndex = 0; columnIndex < gridToDraw[rowIndex].length; columnIndex++) {
            //console.log(`drawGrid: populating cell ${columnIndex} of row ${rowIndex} with ${gridToDraw[rowIndex][columnIndex]}.`);
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
    //console.log(`clearGrid: the number of child nodes is ${currentGridBody.childNodes.length}.`);
    while (currentGridBody.firstChild) {
        //console.log(`clearGrid: removing the child node ${currentGridBody.lastChild}.`);
        currentGridBody.removeChild(currentGridBody.lastChild);
    }
}

function hideNameInputBoxes() {
    document.getElementById('player-one-name-display').append(playerOneObject.playerName);
    document.getElementById('player-two-name-display').append(playerTwoObject.playerName);
    document.getElementById('player-name-input-form').hidden = true;
    startButton.hidden = true;
    document.getElementById('player-name-display-area').display = "block";
}

function getPlayerNameInputValue(playerNameInputId) {
    return document.getElementById(playerNameInputId).value;
}

module.exports = { 
    startButton,
    drawGrid,
    clearGrid,
    hideNameInputBoxes,
    getPlayerNameInputValue,
};