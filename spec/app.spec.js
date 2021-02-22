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
        test("a winner is declared when four counters are placed in a single row", () => {
            let gridToCheck = [
                ["empty", "empty","empty", "empty"],
                ["empty", "empty","empty", "empty"],
                ["empty", "empty","empty", "empty"],
                ["filled", "filled","filled", "filled"],
            ];
            let lastPositionPlayed = [0, 0];
            expect(pf.checkForWinner(gridToCheck, lastPositionPlayed)[0]).toStrictEqual(true);
        });
    });
    describe.only("tests checkRowForWinner", () => {
        test("returns an one element array when passed a row of empty cells", () => {
            inputRow = ["empty", "empty", "empty", "empty", "empty", "empty", "empty",];
            const checkedRow = pf.checkRowForWinner(inputRow, "P1");
            expect(checkedRow.length).toStrictEqual(0);
        });
        test("returns an empty array when passed a loosing row", () => {
            inputRow = ["empty", "P1", "P1", "P1", "empty", "empty", "empty",];
            const checkedRow = pf.checkRowForWinner(inputRow, "P1");
            expect(checkedRow.length).toStrictEqual(0);
        });
        test("does not return an array length 4 when passed a loosing row containing four of the same", () => {
            inputRow = ["P1", "P2", "P2", "P1", "P1", "P1", "P2",];
            const checkedRow = pf.checkRowForWinner(inputRow, "P1");
            expect(checkedRow.length).toStrictEqual(0);
        });
        test("returns an array length 4 when passed a winning row", () => {
            inputRow = ["P2", "P2", "P1", "P1", "P1", "P1", "P2",];
            const checkedRow = pf.checkRowForWinner(inputRow, "P1");
            expect(checkedRow.length).toStrictEqual(4);
            expect(checkedRow).toStrictEqual([2,3,4,5]);
        });
    });
});
