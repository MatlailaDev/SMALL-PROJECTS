"use strict"

let titleEl = document.getElementById("titleEl")
let noteEl = document.getElementById("note-el")
let saveBtn = document.getElementById("save")
let clearBtn = document.getElementById("clear")
let notesList = document.getElementById("notesList")
let noNotesAvailableEl = document.getElementById("no-notes-available-el")


let notesArray = JSON.parse(localStorage.getItem("notesArray"))  || []

if(notesArray){
    for(let i=0; i<notesArray.length; i++){
        notesList.innerHTML = notesArray.join('')
    }
}else{
    noNotesAvailableEl.textContent = "No notes available, please add a note."
}


function createNote(){
    return `<li>${titleEl.value}</li>`
}


saveBtn.addEventListener('click', function(e){
    e.preventDefault()
    
    let newNote = createNote()

    notesList.innerHTML += newNote

    
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














