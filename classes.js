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
        // let rowArray = [];
        let initializedGrid = [];
        for(let j = 0; j < numberOfRows; j++) {
            let newRowArray = [];
            for(let i = 0; i < numberOfColumns; i++) {
                newRowArray.push("empty");
            }
            initializedGrid.push(newRowArray);
        }
        // for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        //     for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        //         initializedGrid[rowIndex][columnIndex] = `R${rowIndex} C${columnIndex}`;
                
        //     }
            
        // }
        return initializedGrid;
    }

    getGrid() {
        return this.grid;
    }

    placeCounterInColumn(columnNumber) {
        console.log(`placeCounterInColumn: called with column ${columnNumber}.`);
        let filledCell = false;
        for (let rowIndex = this.grid.length - 1; filledCell === false; rowIndex--) {
            // TODO - write loop to only place counter in the first free position
            const currentValue = this.grid[rowIndex][columnNumber];
            console.log(`placeCounterInColumn: in for loop - R${rowIndex} C${columnNumber} filledCell = ${filledCell} currentValue is ${currentValue}.`);
            if (this.grid[rowIndex][columnNumber] === "filled") {
                console.log(`placeCounterInColumn: grid R${rowIndex} C${columnNumber} is ${currentValue} - moving to the next row.`)
            } else {
                console.log(`placeCounterInColumn: grid R${rowIndex} C${columnNumber} is ${currentValue} - filling the cell.`);
                this.grid[rowIndex][columnNumber] = "filled";
                console.log(`placeCounterInColumn: grid R${rowIndex} C${columnNumber} is now ${currentValue}.`);
                filledCell = true;
            } 
        }
        console.log(`placeCounterInColumn: end of loop.`);
        console.log(`placeCounterInColumn: grid is ${this.grid.toString()}`);
    }
}

module.exports = {
    Player,
    connectFourGrid,
}