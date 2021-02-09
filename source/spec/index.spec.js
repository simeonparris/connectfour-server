const index = require('../index');

describe("Testing addPlayer function", () => {
    test("accepts an empty player name string and valid player number", () => {
        const newPlayerName = '';
        const newPlayerNumber = 2;
        const functionOutput = index.addPlayer(newPlayerName, newPlayerNumber);
        const expectedOutput = {name: "Little Miss No-Name"};
        expect(functionOutput.toString()).toStrictEqual(expectedOutput.toString());
    });
    test("accepts a valid player name and valid number", () => {
        const newPlayerName = 'Fred';
        const newPlayerNumber = 1;
        const functionOutput = index.addPlayer(newPlayerName, newPlayerNumber);
        const expectedOutput = {name: "Fred"};
        expect(functionOutput.toString()).toStrictEqual(expectedOutput.toString());
    });
    test("does not accept an invalid player name and a valid number", () => {
        const newPlayerName = 1;
        const newPlayerNumber = 1;
        const functionOutput = index.addPlayer(newPlayerName, newPlayerNumber);
        const expectedOutput = undefined;
        expect(functionOutput).toStrictEqual(expectedOutput);
    });
});
