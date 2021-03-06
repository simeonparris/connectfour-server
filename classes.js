// classes
class Player {
    playerName = "";
    playerNumber = 0;

    constructor(newPlayerName, newPlayerNumber) {
        this.playerName = newPlayerName;
        this.playerNumber = newPlayerNumber;
    }
}

class ConnectFourGrid {

    constructor(numberOfRows, numberOfColumns) {
        this.grid = this.initializeGrid(numberOfRows, numberOfColumns);
    }

    initializeGrid(numberOfRows, numberOfColumns) {
        // let rowArray = [];
        let initializedGrid = [];
        for(let j = 0; j < numberOfRows; j++) {
            let newRowArray = [];
            for(let i = 0; i < numberOfColumns; i++) {
                newRowArray.push("empty");
            }
            initializedGrid.push(newRowArray);
        }
        return initializedGrid;
    }

    getGrid() {
        return this.grid;
    }

    placeCounterInColumn(columnNumber, player) {
        console.log(`placeCounterInColumn: called with column ${columnNumber} for player ${player}.`);
        let filledCell = false;
        let filledCellRow = null;
        for (let rowIndex = this.grid.length - 1; filledCell === false; rowIndex--) {
            const currentValue = this.grid[rowIndex][columnNumber];
            console.log(`placeCounterInColumn: in for loop - R${rowIndex} C${columnNumber} and filledCell = ${filledCell} currentValue is ${currentValue}.`);
            if (this.grid[rowIndex][columnNumber] !== "empty") {
                console.log(`placeCounterInColumn: grid R${rowIndex} C${columnNumber} is ${currentValue} - moving to the next row.`)
            } else {
                console.log(`placeCounterInColumn: grid R${rowIndex} C${columnNumber} is ${currentValue} - filling the cell.`);
                this.grid[rowIndex][columnNumber] = player;
                console.log(`placeCounterInColumn: grid R${rowIndex} C${columnNumber} is now ${this.grid[rowIndex][columnNumber]}.`);
                filledCell = true;
                filledCellRow = rowIndex;
            } 
        }
        console.log(`placeCounterInColumn: end of loop.`);
        console.log(`placeCounterInColumn: updated grid is now ${this.grid.toString()}`);
        return [this.grid, filledCellRow, columnNumber];
    }
}

module.exports = {
    Player,
    ConnectFourGrid,
}