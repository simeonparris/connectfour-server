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

    placeCounterInColumn(columnNumber) {
        for (let rowIndex = this.grid.length - 1; rowIndex > 0; rowIndex--) {
            // TODO - write loop to only place counter in the first free position
            if (this.grid[rowIndex][columnNumber] === "filled") {
                console.log(`placeCounterInColumn: grid R${rowIndex} C${columnNumber} is filled - moving to the next row.`)
            } else {
                console.log(`placeCounterInColumn: grid R${rowIndex} C${columnNumber} is empty - filling the cell.`);
                this.grid[rowIndex][columnNumber] = "filled";
                console.log(`placeCounterInColumn: grid R${rowIndex} C${columnNumber} is now ${this.grid[rowIndex][columnNumber]}.`);
                break;
            }
            
        }
    }
}

module.exports = {
    Player,
    connectFourGrid,
}