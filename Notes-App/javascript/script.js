"use strict"

let titleEl = document.getElementById("titleEl")
let noteEl = document.getElementById("note-el")
let saveBtn = document.getElementById("save")
let clearBtn = document.getElementById("clear")
let notesList = document.getElementById("notesList")
let noNotesAvailableEl = document.getElementById("no-notes-available-el")


let notesArray = JSON.parse(localStorage.getItem("notesArray")) || []

if(notesArray){
    for(let i=0; i<notesArray.length; i++){
         notesList.innerHTML = `<li>${notesArray.join('')}</li>`
    }

    console.log(notesArray)

    // notesArray.forEach((obj, index) => {
    //     let keys = Object.keys(obj)

    //     console.log(`Object at index ${index} has keys:`, keys);

    //     keys.forEach(key => {
    //         notesList.innerHTML = `<li>${obj[key]}</li>`
    //     })
        
    // });
}


function createNote(){
    let input = titleEl.value;
    let inputToKey = input.replace(/\s+/g, "");
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














