const localUrl = "localhost:8080";

function getGrid(localUrl) {

    fetch(localUrl + "/grid")
    .then(response => {
        if (response.status !== 200) {
            console.log(`Something went wrong: http-status=${response.status}`)
            return
        }
        response.text()
            .then(data => {
                console.log(`fetch response: getGrid data=${data}`)
                responseDisplay.innerText = `${data}`
            })
    }, error => {
        console.log(`There was an error: error=${error}`)
    })
}

function updatePlayer(playerName, playerNumber) {
    fetch(localUrl + "/player", {
        method: "POST",
        body: {
            playerName: playerName,
            playerNumber: playerNumber,
        },
        mode: 'same-origin',
    })
        .then(response => {
            if (response.status !== 200) {
                console.log(`Something went wrong: http-status=${response.status}`)
                return
            }
            response.text()
            .then(data => {
                console.log(`updatePlayer: request successful - data is ${data}.`)
            })

        } ,error => {
            console.log(`There was an error: error=${error}`)
        }
    );
}

function initializeGame(numberOfRows, numberOfColumns) {
    fetch(localUrl + "/start", {
        method: "POST",
        body: {
            numberOfRows: numberOfRows,
            numberOfColumns: numberOfColumns,
        },
        mode: 'same-origin',
    })
    .then(response => {
        response.text()
            .then(data => {
                return data;
            })
    })
}

function putCounterInColumn(columnNumber, player) {
    fetch(localUrl + "/grid/counter", {
        method: "POST",
        body: {
            columnNumber: columnNumber,
            player: player,
        },
        mode: 'same-origin',
    })
    .then(response => {
        response.text()
            .then(data => {
                return data;
            })
    })
}

function checkGridForWinner(gridToCheck, lastPositionPlayed, player) {
    fetch(localUrl + "/grid/winner", {
        method: "POST",
        body: {
            gridToCheck: gridToCheck,
            lastPositionPlayed: lastPositionPlayed,
            player: player,
        },
        mode: 'same-origin',
    })
    .then(response => {
        response.text()
            .then(data => {
                return data;
            })
    })
}


module.exports = {
    updatePlayer,
    getGrid,
    initializeGame,
    putCounterInColumn,
    checkGridForWinner,
}