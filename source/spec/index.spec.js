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
