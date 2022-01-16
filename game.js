const row_num = 9
const col_num = 9

const doc_screen = document.getElementById("js-table")

for (let i = 1; i < row_num + 1; i++) {
    const doc_row = document.createElement("tr")
    doc_row.id = i

    for (let j = 1; j < col_num + 1; j++) {
        const doc_col = document.createElement("td")
        doc_col.id = `${i},${j}`
        doc_row.appendChild(doc_col)
    }

    doc_screen.appendChild(doc_row)
}