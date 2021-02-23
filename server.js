const express = require('express');
const app = express();

const { generateNewGrid } = require('./pure-functions');

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

// app.post('/move', (request, response) => {
//     const currentIndex = request.params.currentIndex;
//     const currentPlayer = request.params.currentPlayer;
//     const takeTurnResult = app.takeTurn(currentIndex, currentPlayer);
//     response.send(takeTurnResult);
// });

app.get('/grid', (request, response) => {
    const currentGrid = generateNewGrid(6, 7);
    response.send(currentGrid.getGrid());
});
