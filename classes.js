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

module.exports = {
    Player,
    connectFourGrid,
}