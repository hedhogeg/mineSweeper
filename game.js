let gaming = false
let End = false
let board = []
const doc_screen = document.getElementById("js-table")
const row_num = 9
const col_num = 9
const mine_num = 10

let mine_location_list = []

const regame = () => {
    location.reload()
}

const showMine = () => {
    mine_location_list.forEach(location => {
        document.getElementById(`${location[0]},${location[1]}`).className = "mine"
    })
    document.querySelector("table").style = "pointer-events: none;"
}

//Numbers next to mine
const setNumber = (location, row_num, col_num) => {
    const location_of_row = location[0]
    const location_of_col = location[1]
    for (let i = location_of_row - 1; i < location_of_row + 2; i++) {
        for (let j = location_of_col - 1; j < location_of_col + 2; j++) {
            if (0 <= i && i < row_num && 0 <= j && j < col_num) {
                if (!(board[i][j] == "M")){
                    const number = Number(board[i][j])
                    board[i][j] = String(number + 1)
                }
            }
        }
    }
}

//Get random location in board
const randomLocation = (row_num, col_num) => {
    const mine_row = Math.floor(Math.random() * row_num)
    const mine_col = Math.floor(Math.random() * col_num)
    const mine_location = [mine_row,mine_col]
    return mine_location
}

//Set mines in board
const setMine = (first_around, row_num, col_num) => {
    for (let i = mine_num; i > 0; i--) {
        let current_location = randomLocation(row_num, col_num)
        while ((mine_location_list.some(loc => loc[0] == current_location[0] && loc[1] == current_location[1])) || (first_around.some(loc => loc[0] == current_location[0] && loc[1] == current_location[1]))) {
            current_location = randomLocation(row_num, col_num)
        }
        mine_location_list.push(current_location)
        board[current_location[0]][current_location[1]] = "M"
        setNumber(current_location, row_num, col_num)
    }
}

const openAround = (location) => {
    const location_row = location[0]
    const location_col = location[1]
    if (board[location_row][location_col] = "0") {
        board[location_row][location_col] = ""
        document.getElementById(`${location_row},${location_col}`).className = "open"
    } else {
        document.getElementById(`${location_row},${location_col}`).innerText = board[i][j]
        document.getElementById(`${location_row},${location_col}`).className = "open"
    }
    let empty_space_list = []
    for (let i = location_row - 1; i < location_row + 2; i++) {
        for (let j = location_col - 1; j < location_col + 2; j++) {
            if (0 <= i && i < row_num && 0 <= j && j < col_num) {
                if (board[i][j]) {
                    if (board[i][j] != "M") {
                        if (i != location_row || j != location_col) {
                            if (board[i][j] == "0") {
                                empty_space_list.push([i,j])
                                board[i][j] = ""
                            } else {
                                document.getElementById(`${i},${j}`).innerText = board[i][j]
                            }
                            document.getElementById(`${i},${j}`).className = "open"
                    }
                    }
                }
            }
        }
    }
    empty_space_list.forEach(location => {openAround(location)})
}

const endGame = () => {
    //End
    mine_location_list.forEach(location => {
        document.getElementById(`${location[0]},${location[1]}`).className = "mine"
    })
    let restart = false
    if (End) {
        restart = confirm("Congratulation! restart?")
    } else {
        restart = confirm("Boom! restart?")
    }
    if (!restart) {
        document.querySelector("table").style = "pointer-events: none;"
    } else {
        regame()
    }
}

const checkEnd = () => {
    const open_list = document.getElementsByClassName("open")
    const target_open_space = Number(row_num) * Number(col_num) - Number(mine_num)
    if (open_list.length == target_open_space) {
        End = true
        endGame()
    }
}

const leftClick = (event) => {
    if (!gaming) {
        //First Click
        const first_location = event.target.id.split(",")
        const first_row = Number(first_location[0])
        const first_col = Number(first_location[1])
        let first_around = []
        for (let i = first_row - 1; i < first_row + 2; i++) {
            for (let j = first_col - 1; j < first_col + 2; j++) {
                first_around.push([i,j])
            }
        }
        setMine(first_around, row_num, col_num)
        gaming = true
        leftClick(event)

    } else if (event.target.className != "open") {
        // Gaming
        const clicked_location_row = Number(event.target.id.split(",")[0])
        const clicked_location_col = Number(event.target.id.split(",")[1])
        const clicked_location = [clicked_location_row,clicked_location_col]
        if (board[clicked_location_row][clicked_location_col] == "M") {
            endGame()
        } else if (board[clicked_location_row][clicked_location_col] == "0") {
            openAround(clicked_location)
        } else {
            event.target.innerText = `${board[clicked_location_row][clicked_location_col]}`
            event.target.className = "open"
            checkEnd()
        }
    }
}

const rightClick = (event) => {
    event.preventDefault()
    const right_clicked = event.target.id.split(",")
    const right_clicked_row = Number(right_clicked[0])
    const right_clicked_col = Number(right_clicked[1])
    if (event.target.className == "open") {
        let opened_space = 0
        for (let i = right_clicked_row - 1; i < right_clicked_row + 2; i++) {
            for (let j = right_clicked_col - 1; j < right_clicked_col + 2; j++) {
                if (0 <= i && i < row_num && 0 <= j && j < col_num) {
                    if (document.getElementById(`${i},${j}`).className == "flaged") {
                        if (board[i][j] != "M") {
                            endGame()
                        }
                        opened_space += 1
                    }
                }
            }
        }
        if (opened_space == Number(board[right_clicked_row][right_clicked_col])) {
            openAround([right_clicked_row,right_clicked_col])
        }
        checkEnd()
    } else {
        if (board[right_clicked_row][right_clicked_col] != "") {
            let right_target = event.target.className
            if (right_target == "flaged") {
                event.target.className = "question"
            } else if (right_target == "question") {
                event.target.className = ""
            } else {
                event.target.className = "flaged"
            }
        }
    }
}

//Set board
for (let i = 0; i < row_num; i++) {
    const doc_row = document.createElement("tr")
    doc_row.id = i
    let row = []

    for (let j = 0; j < col_num; j++) {
        const doc_space = document.createElement("td")
        doc_space.id = `${i},${j}`
        doc_space.addEventListener("click", leftClick)
        doc_space.addEventListener("contextmenu", rightClick)
        doc_row.appendChild(doc_space)
        row.push("0")
    }

    doc_screen.appendChild(doc_row)
    board.push(row)
}