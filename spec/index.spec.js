const index = require('../index');

describe("Testing addPlayer function", () => {
    test("accepts an empty player name string and valid player number", () => {
        const newPlayerName = '';
        const newPlayerNumber = 2;
        const functionOutput = index.addPlayer(newPlayerName, newPlayerNumber);
        console.log(`testing addPlayer: the function output is ${functionOutput.toString()}.`);
        expect(functionOutput.playerName).toStrictEqual("Little Miss No-Name");
        expect(functionOutput.playerNumber).toStrictEqual(2);
    });
    test("accepts a valid player name and valid number", () => {
        const newPlayerName = 'Fred';
        const newPlayerNumber = 1;
        const functionOutput = index.addPlayer(newPlayerName, newPlayerNumber);
        expect(functionOutput.playerName).toStrictEqual("Fred");
        expect(functionOutput.playerNumber).toStrictEqual(1);
    });
    test("does not accept an invalid player name and a valid number", () => {
        const newPlayerName = 1;
        const newPlayerNumber = 1;
        const functionOutput = index.addPlayer(newPlayerName, newPlayerNumber);
        const expectedOutput = undefined;
        expect(functionOutput).toStrictEqual(expectedOutput);
    });
});

describe("test connectFourGrid class", () => {
    test("the grid attribute has an empty grid when the class is instantiated", () => {
        let classInstance = new index.connectFourGrid(6, 7);
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
});

// cannot test startGame function as it manipulates the DOM
// describe('test the startGame function', () => {
//     test('reassigns player*Object variables with a player Object', () => {
//         index.startGame();
//         expect(typeof index.playerOneObject).toStrictEqual('object');
//         expect(typeof index.playerTwoObject).toStrictEqual('object');
//     });
// });
