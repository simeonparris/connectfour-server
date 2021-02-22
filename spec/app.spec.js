const {ConnectFourGrid} = require('../classes');
const pf = require('../pure-functions');

describe("Testing addPlayer function", () => {
    test("accepts an empty player name string and valid player number", () => {
        const newPlayerName = '';
        const newPlayerNumber = 2;
        const functionOutput = pf.addPlayer(newPlayerName, newPlayerNumber);
        console.log(`testing addPlayer: the function output is ${functionOutput.toString()}.`);
        expect(functionOutput.playerName).toStrictEqual("Little Miss No-Name");
        expect(functionOutput.playerNumber).toStrictEqual(2);
    });
    test("accepts a valid player name and valid number", () => {
        const newPlayerName = 'Fred';
        const newPlayerNumber = 1;
        const functionOutput = pf.addPlayer(newPlayerName, newPlayerNumber);
        expect(functionOutput.playerName).toStrictEqual("Fred");
        expect(functionOutput.playerNumber).toStrictEqual(1);
    });
    test("does not accept an invalid player name and a valid number", () => {
        const newPlayerName = 1;
        const newPlayerNumber = 1;
        const functionOutput = pf.addPlayer(newPlayerName, newPlayerNumber);
        const expectedOutput = undefined;
        expect(functionOutput).toStrictEqual(expectedOutput);
    });
});

describe("test ConnectFourGrid class", () => {
    test("initialize grid creates the correct structure", () => {
        let classInstance = new ConnectFourGrid(2, 3);
        let newGrid = classInstance.getGrid();
        let expectedGrid = [
            ["empty","empty","empty"],
            ["empty","empty","empty"],
        ];
        expect(newGrid).toStrictEqual(expectedGrid);
    });

    test("the grid attribute has an empty grid when the class is instantiated", () => {
        let classInstance = new ConnectFourGrid(6, 7);
        console.log(`TESTING ConnectFourGrid: the grid attribute is ${classInstance.grid}.`);
        let newGrid = classInstance.getGrid();
        let expectedGrid = [
            ["empty","empty","empty","empty","empty","empty","empty"],
            ["empty","empty","empty","empty","empty","empty","empty"],
            ["empty","empty","empty","empty","empty","empty","empty"],
            ["empty","empty","empty","empty","empty","empty","empty"],
            ["empty","empty","empty","empty","empty","empty","empty"],
            ["empty","empty","empty","empty","empty","empty","empty"],
        ];
        expect(newGrid).toStrictEqual(expectedGrid);
    });

    test("clicking on a column adds filled at the bottom of an empty row", () => {
        let classInstance = new ConnectFourGrid(4, 4);
        classInstance.placeCounterInColumn(0, "filled");
        let newGrid = classInstance.getGrid();
        let expectedGrid = [
            ["empty", "empty","empty", "empty"],
            ["empty", "empty","empty", "empty"],
            ["empty", "empty","empty", "empty"],
            ["filled", "empty","empty", "empty"],
        ];
        expect(newGrid).toStrictEqual(expectedGrid);
    });

    test("clicking on a column adds filled above an existing filled cell.", () => {
        let classInstance = new ConnectFourGrid(4, 4);
        classInstance.placeCounterInColumn(0, "filled");
        classInstance.placeCounterInColumn(0, "filled");
        let newGrid = classInstance.getGrid();
        let expectedGrid = [
            ["empty", "empty","empty", "empty"],
            ["empty", "empty","empty", "empty"],
            ["filled", "empty","empty", "empty"],
            ["filled", "empty","empty", "empty"],
        ];
        expect(newGrid).toStrictEqual(expectedGrid);
    });

    describe("test checkForWinner function", () => {
        test("a winner is not declared if only one move has been taken", () => {
            let gridToCheck = [
                ["empty", "empty","empty", "empty"],
                ["empty", "empty","empty", "empty"],
                ["empty", "empty","empty", "empty"],
                ["filled", "empty","empty", "empty"],
            ];
            let lastPositionPlayed = [3, 0];
            expect(pf.checkForWinner(gridToCheck, lastPositionPlayed)[0]).toStrictEqual(false);
        });
    });

    describe("test checkForWinner function", () => {
        test("a winner is declared when four counters are placed in a single column", () => {
            let gridToCheck = [
                ["filled", "empty","empty", "empty"],
                ["filled", "empty","empty", "empty"],
                ["filled", "empty","empty", "empty"],
                ["filled", "empty","empty", "empty"],
            ];
            let lastPositionPlayed = [0, 0];
            expect(pf.checkForWinner(gridToCheck, lastPositionPlayed)[0]).toStrictEqual(true);
        });
    });

});
