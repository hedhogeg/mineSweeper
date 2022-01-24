let row_num = 9
let col_num = 9
let mine_num = 10
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

const select = (dif) => {
    const doc_custom = document.getElementById("custom_box")
    if (dif == 'easy') {
        row_num = 9
        col_num = 9
        mine_num = 9
        doc_custom.setAttribute("style", "visibility: hidden;")
    } else if (dif == 'normal') {
        row_num = 16
        col_num = 16
        mine_num = 40
        doc_custom.setAttribute("style", "visibility: hidden;")
    } else if (dif == 'hard') {
        row_num = 16
        col_num = 30
        mine_num = 99
        doc_custom.setAttribute("style", "visibility: hidden;")
    } else if (dif == 'custom') {
        custom = true
        doc_custom.setAttribute("style", "visibility: visible;")
    }
    setSelected(dif)
}

const gameStart = () => {
    if (selected) {
        if (custom) {
            row_num = document.getElementById("row").value
            col_num = document.getElementById("col").value
            mine_num = document.getElementById("mine").value
        }
        
    }
    
}

const setMaxMine = () => {
    row_num = document.getElementById("row").value
    col_num = document.getElementById("col").value
    const mine_max = Math.floor(row_num * col_num / 4.5)
    const doc_mine = document.getElementById("mine")
    doc_mine.setAttribute("max", `${mine_max}`)
}

const init = () => {
    const doc_row = document.getElementById("row")
    const doc_col = document.getElementById("col")
    doc_row.addEventListener("change", setMaxMine)
    doc_col.addEventListener("change", setMaxMine)
}

init()