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

const randomLocation = (row_num, col_num) => {
    const mine_row = Math.floor(Math.random() * row_num)
    const mine_col = Math.floor(Math.random() * col_num)
    const mine_location = [mine_row,mine_col]
    return mine_location
}

const previewScreen = () => {
    const doc_row_input = document.getElementById('row').value
    const doc_col_input = document.getElementById('col').value
    const doc_mine_input = document.getElementById('mine').value

    const doc_preview_screen = document.getElementById('preview_screen')
    while (doc_preview_screen.hasChildNodes()) {
        doc_preview_screen.firstChild.remove()
    }
    for (let i = 0; i < doc_row_input; i++) {
        const preview_row = document.createElement("div")
        preview_row.className = "preview_row"
        for (let j = 0; j < doc_col_input; j++) {
            const preview_space = document.createElement("div")
            preview_space.id = `${i},${j}`
            preview_space.className = "preview_space"
            preview_row.appendChild(preview_space)
        }
        doc_preview_screen.appendChild(preview_row) 
    }
    
    let mine_location_list = []
    for (let i = doc_mine_input; i > 0; i--) {
        let current_location = randomLocation(doc_row_input, doc_col_input)
        while (mine_location_list.some(loc => loc[0] == current_location[0] && loc[1] == current_location[1])) {
            current_location = randomLocation(doc_row_input, doc_col_input)
        }
        mine_location_list.push(current_location)
        const current_space = document.getElementById(`${current_location[0]},${current_location[1]}`)
        current_space.classList.add("preview_mine")
    }
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
    previewScreen()
}

const showValue = (string) => {
    const doc_target = document.getElementById(`${string}`)
    const label = document.getElementById(`${string}_label`)
    label.innerText = doc_target.value
}

const changeRange = (string) => {
    showValue(string)
    previewScreen()
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