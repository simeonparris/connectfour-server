if (typeof exports === 'object') {
    console.log("Running pure-functions.js in Node");
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    global.Player = require('./classes').Player;
} else {
    console.log("Running pure-functions.js in Browser");
}

function addPlayer(playerName, playerNumber) {
    // returns undefined if an invalid data type is entered
    if (typeof playerName !== 'string' || typeof playerNumber !== 'number') {
        console.log('Please enter a valid player name and/or player number!');
        return;
    }
    if (playerNumber === 1) {
        // assign player 1 name from HTML input or random name
        if (playerName === "") playerName = "Mr No-Name";
        return new Player(playerName, playerNumber);
    } else if (playerNumber === 2) {
        // assign player 2 name from HTML input or random name
        if (playerName === "") playerName = "Little Miss No-Name";
        return new Player(playerName, playerNumber);
    } else {
        console.log('addPlayer: something has gone seriously wrong!');
        return;
    }
}

function generateNewGrid(numberOfRows, numberOfColumns) {
    let newGrid = new ConnectFourGrid(numberOfRows, numberOfColumns);
    return newGrid;
}

function checkRowForWinner(currentRowArray, player) {
    let winningCount = 0;
    let winningCells = [];
    currentRowArray.forEach((cellContents, index) => {
        if (cellContents === player) {
            winningCells.push(index);
        }
    });
    console.log(`checkRowForWinner: winningCells is ${winningCells}.`);
    
    // for (let index = 0; index < currentRowArray.length; index++) {
    //     console.log(`checkRowForWinner: entering for loop - index is ${index} and cell contains ${currentRowArray[index]}.`);
    //     if (winningCount === 4) return winningCells;
    //     if (currentRowArray[index] === "empty") continue;
    //     if (index === currentRowArray.length -1 && currentRowArray[index] === currentRowArray[index - 1]) {
    //         winningCells.push(index);
    //         continue;
    //     } 
    //     if (index === 0 && currentRowArray[index] === currentRowArray[index + 1]) {
    //         console.log(`checkRowForWinner: same as next - pushing ${index} into ${winningCells}.`);
    //         winningCount++;
    //         winningCells.push(index);
    //         console.log(`checkRowForWinner: winningCells is now ${winningCells}.`);
    //     } else if (currentRowArray[index] !== currentRowArray[index + 1] && currentRowArray[index] === currentRowArray[index - 1]) {
    //         console.log(`checkRowForWinner: same as next but not previous - pushing ${index} into ${winningCells}.`);
    //         winningCount++;
    //         winningCells.push(index);
    //         console.log(`checkRowForWinner: winningCells is now ${winningCells}.`);
    //     } else if (currentRowArray[index] !== currentRowArray[index + 1] && currentRowArray[index] === currentRowArray[index - 1]) {
    //         console.log(`checkRowForWinner: same as previous but not next- pushing ${index} into ${winningCells}.`);
    //         winningCount++;
    //         winningCells.push(index);
    //         console.log(`checkRowForWinner: winningCells is now ${winningCells}.`);
    //     } else {
    //         console.log(`checkRowForWinner: resetting count because - index is ${index} and cell contains ${currentRowArray[index]}.`);
    //         winningCount = 0;
    //         winningCells = [];
    //     }
    // }
    return winningCells;
}

function checkForWinner(gridToCheck, lastPositionPlayed, player) {
    // check each of the cardinal and ordinal points around the last position played for four of the same 
    const lastRowPlayed = lastPositionPlayed[0];
    console.log(`checkForWinner: the last row played is ${lastRowPlayed} and its type is ${typeof lastRowPlayed}.`);
    const lastColumnPlayed = lastPositionPlayed[1];
    console.log(`checkForWinner: the last column played is ${lastColumnPlayed} and its type is ${typeof lastColumnPlayed}.`);
    const playerToCheck = gridToCheck[lastRowPlayed][lastColumnPlayed];
    console.log(`checkForWinner: the gridToCheck row count is ${gridToCheck.length} and the column count is ${gridToCheck[0].length}.`);
    console.log(`checkForWinner: the player to check is ${gridToCheck[lastRowPlayed][lastColumnPlayed]}`);
    let winningArray;
    const undefinedArray = [undefined, undefined, undefined,];

    // win condition arrays
    let N_Array = [];
    let NE_Array = [];
    let E_Array = [];
    let SE_Array = [];
    let S_Array = [];
    let SW_Array = [];
    let W_Array = [];
    let NW_Array = [];

    let rowArray = [];
    let columnArray = [];
    let NWtoSEArray = [];
    let SWtoNEArray = [];

    if (lastRowPlayed >= gridToCheck.length -3) {
        console.log("checkForWinner: N_Array is valid.");
        N_Array = [
            gridToCheck[lastRowPlayed -1][lastColumnPlayed],
            gridToCheck[lastRowPlayed -2][lastColumnPlayed],
            gridToCheck[lastRowPlayed -3][lastColumnPlayed],
        ];
    } else {
        N_Array = undefinedArray;
    }
    if (lastRowPlayed >= gridToCheck.length -3 && lastColumnPlayed <= gridToCheck[0].length - 4) {
        console.log("checkForWinner: NE_Array is valid.");
        NE_Array = [
            gridToCheck[lastRowPlayed -1][lastColumnPlayed +1],
            gridToCheck[lastRowPlayed -2][lastColumnPlayed +2],
            gridToCheck[lastRowPlayed -3][lastColumnPlayed +3],
        ];
    } else {
        NE_Array = undefinedArray;
    }
    if (lastColumnPlayed < gridToCheck[0].length -4) {
        console.log("checkForWinner: E_Array is valid.");
        E_Array = [
            gridToCheck[lastRowPlayed][lastColumnPlayed +1],
            gridToCheck[lastRowPlayed][lastColumnPlayed +2],
            gridToCheck[lastRowPlayed][lastColumnPlayed +3],
        ];
    } else {
        E_Array = undefinedArray;
    }
    if (lastRowPlayed <= gridToCheck.length - 4 && lastColumnPlayed <= gridToCheck[0].length - 4) {
        console.log("checkForWinner: SE_Array is valid.");
        SE_Array = [
            gridToCheck[lastRowPlayed +1][lastColumnPlayed +1],
            gridToCheck[lastRowPlayed +2][lastColumnPlayed +2],
            gridToCheck[lastRowPlayed +3][lastColumnPlayed +3],
        ];
    } else {
        SE_Array = undefinedArray;
    }
    if (lastRowPlayed <= gridToCheck.length - 4) {
        console.log("checkForWinner: S_Array is valid.");
        S_Array = [
            gridToCheck[lastRowPlayed +1][lastColumnPlayed],
            gridToCheck[lastRowPlayed +2][lastColumnPlayed],
            gridToCheck[lastRowPlayed +3][lastColumnPlayed],
        ];
    } else {
        S_Array = undefinedArray;
    }
    if (lastRowPlayed <= gridToCheck.length - 4 && lastColumnPlayed  >= 3) {
        console.log("checkForWinner: SW_Array is valid.");
        SW_Array = [
            gridToCheck[lastRowPlayed +1][lastColumnPlayed -1],
            gridToCheck[lastRowPlayed +2][lastColumnPlayed -2],
            gridToCheck[lastRowPlayed +3][lastColumnPlayed -3],
        ];
    } else {
        SW_Array = undefinedArray;
    }
    if (lastColumnPlayed  >= 3) {
        console.log("checkForWinner: W_Array is valid.");
        W_Array = [
            gridToCheck[lastRowPlayed][lastColumnPlayed -1],
            gridToCheck[lastRowPlayed][lastColumnPlayed -2],
            gridToCheck[lastRowPlayed][lastColumnPlayed -3],
        ];
    } else {
        W_Array = undefinedArray;
    }
    if (lastRowPlayed >= 3 && lastColumnPlayed  >= 3) {
        console.log("checkForWinner: NW_Array is valid.");
        NW_Array = [
            gridToCheck[lastRowPlayed +1][lastColumnPlayed -1],
            gridToCheck[lastRowPlayed +2][lastColumnPlayed -2],
            gridToCheck[lastRowPlayed +3][lastColumnPlayed -3],
        ];
    } else {
        NW_Array = undefinedArray;
    }
    const arraysToCheck = [
        N_Array,
        NE_Array,
        E_Array,
        SE_Array,
        S_Array,
        SW_Array,
        W_Array,
        NW_Array,
    ];

    console.log(`checkForWinner: arraysToCheck is currently - ${arraysToCheck}.`);

    let theWinner = undefined;

    for (let index = 0; index < arraysToCheck.length; index++) {
        console.log(`checkForWinner: currently checking index ${index}. Contents: ${arraysToCheck[index]}`);
        const arrayCondition = arraysToCheck[index].includes(undefined);
        if (arrayCondition === true) {
            continue;
        }
        const stateOfTruth = arraysToCheck[index].every((cell) => {
            return cell === playerToCheck;
        });
        console.log(`checkForWinner: stateOfTruth is ${stateOfTruth}`);
        if (stateOfTruth) {
            theWinner = [playerToCheck, index];
            break;
        }
    }

    function outputWinningArrayIndices(winningArrayIndex) {
        let winningArray = [];
        switch (winningArrayIndex) {
            case 0: // N_Array,
                winningArray = [
                    [lastRowPlayed, lastColumnPlayed],
                    [lastRowPlayed - 1, lastColumnPlayed],
                    [lastRowPlayed - 2, lastColumnPlayed],
                    [lastRowPlayed - 3, lastColumnPlayed],
                ]
                break;
                case 1: // NE_Array,
                winningArray = [
                    [lastRowPlayed, lastColumnPlayed],
                    [lastRowPlayed - 1, lastColumnPlayed + 1],
                    [lastRowPlayed - 2, lastColumnPlayed + 2],
                    [lastRowPlayed - 3, lastColumnPlayed + 3],
                ]
                break;
            case 2: // E_Array,
                winningArray = [
                    [lastRowPlayed, lastColumnPlayed],
                    [lastRowPlayed, lastColumnPlayed + 1],
                    [lastRowPlayed, lastColumnPlayed + 2],
                    [lastRowPlayed, lastColumnPlayed + 3],
                ]
                break;
            case 3: // SE_Array,
            winningArray = [
                [lastRowPlayed, lastColumnPlayed],
                [lastRowPlayed + 1, lastColumnPlayed + 1],
                [lastRowPlayed + 2, lastColumnPlayed + 2],
                [lastRowPlayed + 3, lastColumnPlayed + 3],
            ]
                break;
            case 4: // S_Array,
                winningArray = [
                    [lastRowPlayed, lastColumnPlayed],
                    [lastRowPlayed + 1, lastColumnPlayed],
                    [lastRowPlayed + 2, lastColumnPlayed],
                    [lastRowPlayed + 3, lastColumnPlayed],
                ]
                break;
            case 5: // SW_Array,
            winningArray = [
                [lastRowPlayed, lastColumnPlayed],
                [lastRowPlayed + 1, lastColumnPlayed - 1],
                [lastRowPlayed + 2, lastColumnPlayed - 2],
                [lastRowPlayed + 3, lastColumnPlayed - 3],
            ]
                break;
            case 6: // W_Array,
            winningArray = [
                [lastRowPlayed, lastColumnPlayed],
                [lastRowPlayed, lastColumnPlayed - 1],
                [lastRowPlayed, lastColumnPlayed - 2],
                [lastRowPlayed, lastColumnPlayed - 3],
            ]
                break;
            case 7: // NW_Array,
            winningArray = [
                [lastRowPlayed, lastColumnPlayed],
                [lastRowPlayed - 1, lastColumnPlayed - 1],
                [lastRowPlayed - 2, lastColumnPlayed - 2],
                [lastRowPlayed - 3, lastColumnPlayed - 3],
            ]
                break;
            // default:
            //     break;
        }
        if (winningArray.length > 0) {
            return winningArray;
        }
    }

    if (theWinner !== undefined) {
        return [true, ...outputWinningArrayIndices(theWinner[1])];
    } else {
        return [false];
    }
}

module.exports = {
    addPlayer,
    generateNewGrid,
    checkForWinner,
    checkRowForWinner,
}