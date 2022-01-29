let row_num = 0
let col_num = 0
let mine_num = 0
let mine_max = 0
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
        custom = false
        setGame(9, 9, 10)
        doc_custom.setAttribute("style", "visibility: hidden;")
    } else if (dif == 'normal') {
        custom = false
        setGame(16, 16, 40)
        doc_custom.setAttribute("style", "visibility: hidden;")
    } else if (dif == 'hard') {
        custom = false
        setGame(16, 30, 99)
        doc_custom.setAttribute("style", "visibility: hidden;")
    } else if (dif == 'custom') {
        custom = true
        doc_custom.setAttribute("style", "visibility: visible;")
    }
    setSelected(dif)
}

const showValue = (string) => {
    const doc_target = document.getElementById(`${string}`)
    const label = document.getElementById(`${string}_label`)
    label.innerText = doc_target.value
}

const setMaxMine = () => {
    // max number of mine
    row_num = document.getElementById("row").value
    col_num = document.getElementById("col").value
    mine_max = Math.floor(row_num * col_num / 4.5)
    const doc_mine_max = document.getElementById("mine")
    const doc_mine_value = doc_mine_max.value
    doc_mine_max.setAttribute("max", mine_max)
    if (doc_mine_value > mine_max) {
        doc_mine_max.value = mine_max
        const label = document.getElementById('mine_label')
        label.innerText = mine_max
    }
}

const gameStart = () => {
    if (!selected) {
        alert("Select difficulty")
    } else {
        let error = false
        const form = document.getElementById("custom_box")
        if (custom) {
            row_num = document.getElementById("row").value
            col_num = document.getElementById("col").value
            mine_num = document.getElementById("mine").value
            if (!row_num || !col_num || !mine_num) {
                alert("If you want custom game, enter all")
                error = true
            } else if (row_num < 9 || row_num > 30) {
                alert("Rows can be 9 to 30")
                error = true
            } else if (col_num < 9 || col_num > 30) {
                alert("Columns can be 9 to 30")
                error = true
            } else if (mine_num < 10 || mine_num > mine_max) {
                alert(`Mines can be 10 to ${mine_max}`)
                error = true
            }
        }
        
        if (error) {
            location.reload()
        } else {
            form.submit()
        }
    }
    
}

const init = () => {
    const doc_row = document.getElementById("row")
    const doc_col = document.getElementById("col")
    doc_row.addEventListener("change", setMaxMine)
    doc_col.addEventListener("change", setMaxMine)
}

init()