const row_num = 9
const col_num = 9

const mine_num = 5

//Set board
const doc_screen = document.getElementById("js-table")
let board = []

for (let i = 0; i < row_num; i++) {
    const doc_row = document.createElement("tr")
    doc_row.id = i
    let row = []

    for (let j = 0; j < col_num; j++) {
        const doc_space = document.createElement("td")
        doc_space.id = `${i},${j}`
        doc_row.appendChild(doc_space)
        row.push("0")
    }

    doc_screen.appendChild(doc_row)
    board.push(row)
}

//Numbers next to mine
const setNumber = (location, row_num, col_num) => {
    const location_row = Number(location[0])
    const location_col = Number(location[2])
    for (let i = location_row - 1; i < location_row + 2; i++) {
        for (let j = location_col - 1; j < location_col + 2; j++) {
            if (0 <= i && i < row_num && 0 <= j && j < col_num) {
                if (!(board[i][j] == "M")){
                    const number = Number(board[i][j])
                    board[i][j] = `${number + 1}`
                }
            }
        }
    }
}

//Get random location in board
const randomLocation = (row_num, col_num) => {
    const mine_row = Math.ceil(Math.random() * (row_num - 1))
    const mine_col = Math.ceil(Math.random() * (col_num - 1))
    const mine_location = `${mine_row},${mine_col}`
    return mine_location
}

//Set mines in board
const setMine = (row_num, col_num) => {
    let mine_location_list = []
    for (let i = mine_num; i > 0; i--) {
        let current_location = randomLocation(row_num, col_num)
        while (mine_location_list.includes(current_location)) {
            current_location = randomLocation(row_num, col_num)
        }
        
        mine_location_list.push(current_location)
        board[current_location[0]][current_location[2]] = "M"
        setNumber(current_location, row_num, col_num)
    }
}

setMine(row_num, col_num)
console.log(board)