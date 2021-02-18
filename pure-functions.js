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

function checkForWinner(gridToCheck, lastPositionPlayed) {
    // check each of the cardinal and ordinal points around the last position played for four of the same 
    const lastRowPlayed = lastPositionPlayed[0];
    console.log(`checkForWinner: the last row played is ${lastRowPlayed} and its type is ${typeof lastRowPlayed}.`);
    const lastColumnPlayed = lastPositionPlayed[1];
    console.log(`checkForWinner: the last column played is ${lastColumnPlayed} and its type is ${typeof lastColumnPlayed}.`);
    const playerToCheck = gridToCheck[lastRowPlayed][lastColumnPlayed];
    console.log(`checkForWinner: the player to check is ${gridToCheck[lastRowPlayed][lastColumnPlayed]}`);
    let winningArray;
    const undefinedArray = [undefined, undefined, undefined, undefined];

    // win condition arrays
    let N_Array = [];
    let NE_Array = [];
    let E_Array = [];
    let SE_Array = [];
    let S_Array = [];
    let SW_Array = [];
    let W_Array = [];
    let NW_Array = [];

    if (lastRowPlayed >= gridToCheck.length -3) {
        N_Array = [
            gridToCheck[lastRowPlayed -1][lastColumnPlayed],
            gridToCheck[lastRowPlayed -2][lastColumnPlayed],
            gridToCheck[lastRowPlayed -3][lastColumnPlayed],
        ];
    } else {
        N_Array = undefinedArray;
    }
    if (lastRowPlayed >= gridToCheck.length -3 && lastColumnPlayed <= gridToCheck[0].length - 4) {
        NE_Array = [
            gridToCheck[lastRowPlayed -1][lastColumnPlayed +1],
            gridToCheck[lastRowPlayed -2][lastColumnPlayed +2],
            gridToCheck[lastRowPlayed -3][lastColumnPlayed +3],
        ];
    } else {
        NE_Array = undefinedArray;
    }
    if (lastColumnPlayed < gridToCheck.length[0] -4) {
        E_Array = [
            gridToCheck[lastRowPlayed][lastColumnPlayed +1],
            gridToCheck[lastRowPlayed][lastColumnPlayed +2],
            gridToCheck[lastRowPlayed][lastColumnPlayed +3],
        ];
    } else {
        E_Array = undefinedArray;
    }
    if (lastRowPlayed <= gridToCheck.length - 4 && lastColumnPlayed <= gridToCheck[0].length - 4) {

        SE_Array = [
            gridToCheck[lastRowPlayed +1][lastColumnPlayed +1],
            gridToCheck[lastRowPlayed +2][lastColumnPlayed +2],
            gridToCheck[lastRowPlayed +3][lastColumnPlayed +3],
        ];
    } else {
        SE_Array = undefinedArray;
    }
    if (lastRowPlayed <= gridToCheck.length - 4) {
        S_Array = [
            gridToCheck[lastRowPlayed +1][lastColumnPlayed],
            gridToCheck[lastRowPlayed +2][lastColumnPlayed],
            gridToCheck[lastRowPlayed +3][lastColumnPlayed],
        ];
    } else {
        S_Array = undefinedArray;
    }
    if (lastRowPlayed <= gridToCheck.length - 4 && lastColumnPlayed  >= 3) {

        SW_Array = [
            gridToCheck[lastRowPlayed +1][lastColumnPlayed -1],
            gridToCheck[lastRowPlayed +2][lastColumnPlayed -2],
            gridToCheck[lastRowPlayed +3][lastColumnPlayed -3],
        ];
    } else {
        SW_Array = undefinedArray;
    }
    if (lastColumnPlayed  >= 3) {

        W_Array = [
            gridToCheck[lastRowPlayed][lastColumnPlayed -1],
            gridToCheck[lastRowPlayed][lastColumnPlayed -2],
            gridToCheck[lastRowPlayed][lastColumnPlayed -3],
        ];
    } else {
        W_Array = undefinedArray;
    }
    if (lastRowPlayed >= 3 && lastColumnPlayed  >= 3) {

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

    let theWinner = undefined;

    // TODO find a better solution using a for loop
    // arraysToCheck.forEach((array, index) => {
    //     const arrayCondition = array.includes(undefined);
    //     if (arrayCondition === true) {
    //         continue;
    //     }
    //     const stateOfTruth = array.every((cell) => {
    //         return cell === playerToCheck;
    //     });
    //     if (stateOfTruth) {
    //         theWinner = [playerToCheck, index];
    //         break;
    //     }
    // });

    for (let index = 0; index < arraysToCheck.length; index++) {
        console.log(`checkForWinner: currently checking index ${index}. Contents: ${arraysToCheck[index]}`);
        const arrayCondition = arraysToCheck[index].includes(undefined);
        if (arrayCondition === true) {
            continue;
        }
        const stateOfTruth = arraysToCheck[index].every((cell) => {
            return cell === playerToCheck;
        });
        console.log(`checkForWinner: stateOfTruth${arraysToCheck[index]}`);
        if (stateOfTruth) {
            theWinner = [playerToCheck, index];
            break;
        }
    }

    function outputWinningArrayIndices(winningArrayIndex) {
        switch (winningArrayIndex) {
            case 0:
                winningArray = [
                    [lastRowPlayed, lastColumnPlayed],
                    [lastRowPlayed + 1, lastColumnPlayed],
                    [lastRowPlayed + 2, lastColumnPlayed],
                    [lastRowPlayed + 3, lastColumnPlayed],
                ]
                break;
            case 1: // N_Array,
                winningArray = [
                    [lastRowPlayed, lastColumnPlayed],
                    [lastRowPlayed + 1, lastColumnPlayed],
                    [lastRowPlayed + 2, lastColumnPlayed],
                    [lastRowPlayed + 3, lastColumnPlayed],
                ]
                break;
                case 2: // NE_Array,
                winningArray = [
                    [lastRowPlayed, lastColumnPlayed],
                    [lastRowPlayed + 1, lastColumnPlayed + 1],
                    [lastRowPlayed + 2, lastColumnPlayed + 2],
                    [lastRowPlayed + 3, lastColumnPlayed + 3],
                ]
                break;
            case 3: // E_Array,
                winningArray = [
                    [lastRowPlayed, lastColumnPlayed],
                    [lastRowPlayed + 1, lastColumnPlayed],
                    [lastRowPlayed + 2, lastColumnPlayed],
                    [lastRowPlayed + 3, lastColumnPlayed],
                ]
                break;
            case 4: // SE_Array,
            winningArray = [
                [lastRowPlayed, lastColumnPlayed],
                [lastRowPlayed + 1, lastColumnPlayed - 1],
                [lastRowPlayed + 2, lastColumnPlayed - 2],
                [lastRowPlayed + 3, lastColumnPlayed - 3],
            ]
                break;
            case 5: // S_Array,
                winningArray = [
                    [lastRowPlayed, lastColumnPlayed],
                    [lastRowPlayed - 1, lastColumnPlayed],
                    [lastRowPlayed - 2, lastColumnPlayed],
                    [lastRowPlayed - 3, lastColumnPlayed],
                ]
                break;
            case 6: // SW_Array,
            winningArray = [
                [lastRowPlayed, lastColumnPlayed],
                [lastRowPlayed - 1, lastColumnPlayed - 1],
                [lastRowPlayed - 2, lastColumnPlayed - 2],
                [lastRowPlayed - 3, lastColumnPlayed - 3],
            ]
                break;
            case 7: // W_Array,
            winningArray = [
                [lastRowPlayed, lastColumnPlayed],
                [lastRowPlayed, lastColumnPlayed - 1],
                [lastRowPlayed, lastColumnPlayed - 2],
                [lastRowPlayed, lastColumnPlayed - 3],
            ]
                break;
            case 8: // NW_Array,
            winningArray = [
                [lastRowPlayed, lastColumnPlayed],
                [lastRowPlayed + 1, lastColumnPlayed - 1],
                [lastRowPlayed + 2, lastColumnPlayed - 2],
                [lastRowPlayed + 3, lastColumnPlayed - 3],
            ]
                break;
            // default:
            //     break;
        }
    }

    if (theWinner !== undefined) {
        return outputWinningArrayIndices(theWinner[1]);
    } else {
        return false;
    }
}

module.exports = {
    addPlayer,
    generateNewGrid,
    checkForWinner,
}