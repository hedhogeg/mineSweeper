let row_num = 0
let col_num = 0
let mine_num = 0
let custom = false
let selected = false

const setSelected = (dif) => {
    const last_selected = document.querySelector(".selected")
    if (last_selected) {
        last_selected.classList.remove("selected")
    }
    const current_selected = document.getElementById(`${dif}`)
    current_selected.className = "selected"
    selected = true
}

const setGame = (row, col, mine) => {
    const row_set = document.getElementById("row")
    const col_set = document.getElementById("col")
    const mine_set = document.getElementById("mine")
    row_set.value = row
    col_set.value = col
    mine_set.value = mine
}

const select = (dif) => {
    const doc_custom = document.getElementById("custom_box")
    if (dif == 'easy') {
        setGame(9, 9, 10)
        doc_custom.setAttribute("style", "visibility: hidden;")
    } else if (dif == 'normal') {
        setGame(16, 16, 40)
        doc_custom.setAttribute("style", "visibility: hidden;")
    } else if (dif == 'hard') {
        setGame(16, 30, 99)
        doc_custom.setAttribute("style", "visibility: hidden;")
    } else if (dif == 'custom') {
        custom = true
        doc_custom.setAttribute("style", "visibility: visible;")
    }
    setSelected(dif)
}

const gameStart = () => {
    if (!selected) {
        alert("Select difficulty")
    } else {
        const form = document.getElementById("custom_box")
        if (custom) {
            if (!row_num || !col_num || !mine_num) {
                alert("If you want custom game, enter all")
            }
        }
        
        form.submit()
    }
    
}

// const setMaxMine = () => {
    // max number of mine
//     row_num = document.getElementById("row").value
//     col_num = document.getElementById("col").value
//     const mine_max = Math.floor(row_num * col_num / 4.5)
//     const doc_mine = document.getElementById("mine")
// }

// const init = () => {
//     const doc_row = document.getElementById("row")
//     const doc_col = document.getElementById("col")
//     doc_row.addEventListener("change", setMaxMine)
//     doc_col.addEventListener("change", setMaxMine)
// }

// init()