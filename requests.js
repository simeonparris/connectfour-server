const localUrl = "localhost:8080";

function getGrid(localUrl) {

    fetch(localUrl)
    .then(response => {
        if (response.status !== 200) {
            console.log(`Something went wrong: http-status=${response.status}`)
            return
        }
        response.text()
            .then(data => {
                console.log(`data=${data}`)
                responseDisplay.innerText = `${data}`
            })
    }, error => {
        console.log(`There was an error: error=${error}`)
    })
}