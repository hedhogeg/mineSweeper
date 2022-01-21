let row_num = 0
let col_num = 0
let mine_num = 0
let custom = false

const select = (dif) => {
    if (dif == 'easy') {
        row_num = 9
        col_num = 9
        mine_num = 9
    } else if (dif == 'normal') {
        row_num = 16
        col_num = 16
        mine_num = 40
    } else if (dif == 'hard') {
        row_num = 16
        col_num = 30
        mine_num = 99
    } else if (dif == 'custom') {
        custom = true
    }
}

const gameStart = () => {
    if (custom) {
        row_num = document.getElementById("js-row").value
        col_num = document.getElementById("js-col").value
        mine_num = document.getElementById("js-mine").value
    }
    
}