const {connectFourGrid} = require('../classes');
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

describe("test connectFourGrid class", () => {
    test("initialize grid creates the correct structure", () => {
        let classInstance = new connectFourGrid(2, 3);
        let newGrid = classInstance.getGrid();
        let expectedGrid = [
            ["empty","empty","empty"],
            ["empty","empty","empty"],
        ];
        expect(newGrid).toStrictEqual(expectedGrid);
    });

    test("the grid attribute has an empty grid when the class is instantiated", () => {
        let classInstance = new connectFourGrid(6, 7);
        console.log(`TESTING connectFourGrid: the grid attribute is ${classInstance.grid}.`);
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
        let classInstance = new connectFourGrid(2, 3);
        classInstance.placeCounterInColumn(0);
        let newGrid = classInstance.getGrid();
        let expectedGrid = [
            ["empty","empty","empty"],
            ["filled","empty","empty"],
        ];
        expect(newGrid).toStrictEqual(expectedGrid);
    });

    test("clicking on a column adds filled above an existing filled cell.", () => {
        let classInstance = new connectFourGrid(2, 3);
        classInstance.placeCounterInColumn(0);
        classInstance.placeCounterInColumn(0);
        let newGrid = classInstance.getGrid();
        let expectedGrid = [
            ["filled","empty","empty"],
            ["filled","empty","empty"],
        ];
        expect(newGrid).toStrictEqual(expectedGrid);
    });
});
