const express = require('express');
const app = express();

const { generateNewGrid } = require('./pure-functions');
const {addPlayer, checkForWinner} = require('./pure-functions');

let playerOneObject = undefined;
let playerTwoObject = undefined;

let currentConnectFourGridObject;

// Allows same-site origin - for use locally with FETCH session
// You can also use the CORS plugin for express https://expressjs.com/en/resources/middleware/cors.html
app.use(function(request, response, next) {
    if (request.headers.origin) {
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        response.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (request.method === 'OPTIONS') return response.send(200)
    }
    next()
})

app.listen(8080);
console.log("Listening on port 8080...");

app.get('/', (request, response) => {
    response.send('Hello World!')
});

app.post('/player', (request, response) => {
    const {playerName, playerNumber } = request.params;
    if (playerNumber === 1 && playerOneObject === undefined) {
        playerOneObject = addPlayer(playerName, playerNumber);
        response.status = 200;
        response.msg = "Player 1 created";
        response.send();
    } else if (playerNumber === 2 && playerTwoObject === undefined) {
        playerTwoObject = addPlayer(playerName, playerNumber);
        response.status = 200;
        response.msg = "Player 2 created";
        response.send();
    } else {
        response.status = 400;
        response.msg = "Player already created and/or player number is invalid."
        response.send();
    }
});

app.get('/player', (request, response) => {
    const {playerNumber} = request.params;
    if (playerNumber === 1 && playerOneObject !== undefined) {
        response.send(playerOneObject);
    } else if (playerNumber === 2 && playerTwoObject !== undefined) {
        response.send(playerTwoObject);
    } else {
        response.status = 400;
        response.send("error: playerNumber is invalid and/or player has not yet been created.");
    }
});

// app.post('/move', (request, response) => {
//     const currentIndex = request.params.currentIndex;
//     const currentPlayer = request.params.currentPlayer;
//     const takeTurnResult = app.takeTurn(currentIndex, currentPlayer);
//     response.send(takeTurnResult);
// });

app.post('/start', (request, response) => {
    const {numberOfRows, numberOfColumns} = request.params;
    currentConnectFourGridObject = generateNewGrid(numberOfRows, numberOfColumns);
    response.send(currentConnectFourGridObject.getGrid());
});

app.post('/grid/counter', (request, response) => {
    if (currentConnectFourGridObject) {
        const {columnNumber, player} = request.params;
        currentConnectFourGridObject.placeCounterInColumn(columnNumber, player);
        console.log(`server.js: place ${player}'s counter into column ${columnNumber}.`)
        response.send(currentConnectFourGridObject.getGrid());
    } else {
        console.log ('server.js: cannot place counter in grid object.')
    }

});

app.post('/grid/winner', (request, response) => {
    if (currentConnectFourGridObject) {
        const {gridToCheck, lastPositionPlayed, player} = request.params;
        currentConnectFourGridObject.placeCounterInColumn(columnNumber, player);
        console.log(`server.js: checking grid ${grid} for a winner.`)
        response.send(checkForWinner(gridToCheck, lastPositionPlayed, player));
    } else {
        console.log ('server.js: cannot check this grid.');
    }

});


app.get('/grid', (request, response) => {
    if (currentConnectFourGridObject) {
        response.send(currentConnectFourGridObject.getGrid());
    } else {
        response.send("There is not currently a connect four game running...");
    }
});
