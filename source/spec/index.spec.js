const index = require('../index');

describe("Testing addPlayer function", () => {
    test("accepts a valid player name and number", () => {
        const newPlayerName = 'Fred';
        const newPlayerNumber = 1;
        index.addPlayer(newPlayerName, newPlayerNumber);
        expect(index.playerName).toStrictEqual('Fred');
    });
});
