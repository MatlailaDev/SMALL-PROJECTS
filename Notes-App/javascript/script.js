"use strict"

let titleEl = document.getElementById("titleEl")
let noteEl = document.getElementById("note-el")
let saveBtn = document.getElementById("save")
let clearBtn = document.getElementById("clear")
let notesList = document.getElementById("notesList")
let noNotesAvailableEl = document.getElementById("no-notes-available-el")


let notesArray = JSON.parse(localStorage.getItem("notesArray")) || []

if(notesArray){
    
    notesArray.forEach((item, index) => {
        const cleanItem = item.replace('{', '').replace('}', '');
        const [key, value] = cleanItem.split(':').map(part => part.trim().replace(/'/g,''))

        console.log(`${key.replace("_", " ")}`)
        
        notesList.innerHTML += `<li>${key.replace("_", " ")}</li>`
    })
}


function createNote(){
    let input = titleEl.value;
    let inputToKey = input.replace(/\s+/g, "_");
    return `{${inputToKey}: '${noteEl.value}'}`
}


saveBtn.addEventListener('click', function(e){
    e.preventDefault()
    
    let newNote = createNote()

    notesList.innerHTML += `<li>${titleEl.value}</li>`

    
    if(newNote){
        notesArray.push(newNote)

        localStorage.setItem("notesArray", JSON.stringify(notesArray))

        console.log(notesArray)
    }

    console.log(notesArray)
    
})

clearBtn.addEventListener('click', function(e){
    e.preventDefault()
    
    noteEl.value = " "
})














