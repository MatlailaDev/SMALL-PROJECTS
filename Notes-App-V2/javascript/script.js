"use strict"

let titleEl = document.getElementById("titleEl")
let note = document.getElementById("note")
let saveBtn = document.getElementById("save")
let clearBtn = document.getElementById("clear")
let notesList = document.getElementById("notesList")
let DisplayNote = document.getElementById("displayNote")
let addNoteBtn = document.getElementById("add-note-btn")
let viewNotesBtn = document.getElementById("view-notes-btn")
let main = document.querySelector("main")
let mainSection = document.querySelector('main section')
let notesForm = document.getElementById("notesForm")


let notesArray = JSON.parse(localStorage.getItem("notesArray")) || []

// Helper funtion to covert File inputs to Base64 string
function convertToBase64(file){
   return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // Create a URl like string out of raw image
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
   }) 
}

// Handle form

notesForm.addEventListener('submit', async(e) =>{
    // e.preventDefault() 

    // Create a formData object from the form
    const formData = new FormData(e.target)

    const noteObject = Object.fromEntries(formData.entries())

    // Create a unique id for each new note object
    const newNoteObject = {
        ...noteObject,
        id: crypto.randomUUID()
    }

    // Find and convert any File objects to Base64
    for(const[key,value] of formData.entries()){
        if(value instanceof File && value.name){
            newNoteObject[key] = await convertToBase64(value)
        }
    }

    // Retrieve , update and save the localStorage array

    // The above part I add ontop with JSON.parse(...) to load the notes on page load

    // Push object into array
    notesArray.push(newNoteObject)

    localStorage.setItem("notesArray", JSON.stringify(notesArray))

    // Add to UI before reload...I wonder if removing e.preventDefault would not work just as well
    displayNotesFromLocalStorage(newNoteObject)

    // Alert user
    alert("Note Added")

    // Clear the form
    e.target.reset()
})

// Helper for creating note to display
function displayNotesFromLocalStorage(noteObjectParameter){
    let listedNote = `<div class = "note" data-id = "${noteObjectParameter.id}"><h3>${noteObjectParameter.title}</h3><span><i class="fa-solid fa-trash-can delete"></i></span></div>`
    notesList.innerHTML += listedNote
}

// Runs on load
notesArray.forEach(note => {
    displayNotesFromLocalStorage(note)
});

// What to display when notesArray is empty
if(notesArray.length < 0 || notesArray.length ===0){
    notesList.innerHTML = `<h2 class = "noNotes">No notes available press the "Add Notes +" button to add notes </h2>`
}

// Helper function to delete 
function deleteNote(targetNoteId){
    // Remove object from localStorage
    let notesArray = JSON.parse(localStorage.getItem("notesArray")) || []

    notesArray = notesArray.filter(note => String(note.id) !== String(targetNoteId))

    localStorage.setItem("notesArray", JSON.stringify(notesArray))
}

// Add an eventListener to the parent container to delete on click of delete icon
notesList.addEventListener('click', function(e){
    if(e.target.classList.contains("delete")){

        // Get the id from the parent
        const noteObjectElement = e.target.closest("[data-id]")

        const targetNoteId = noteObjectElement.dataset.id

        let deleteCheck = prompt("Are you sure you want to delete your note? enter Y/N")

        if(deleteCheck == "Y" || deleteCheck == "y"){
            deleteNote(targetNoteId)

            // Remove from UI
            noteObjectElement.remove()
        }else{
            return
        }
    }
})

// Now I want to click on the note title and display the specific note object value
notesList.addEventListener('click', function(e){
    if(e.target.closest(".note h3")){
        // Get the id from the parent container
        const targetId = e.target.closest(".note").dataset.id

        // Access the specific object
        const specificNoteObject = notesArray.find(obj => obj.id === targetId)

        // Call function where display is created
        displaySingleNote(specificNoteObject)

        
    }
})

function displaySingleNote(specificNoteObjectParameter){
    notesList.style.display = 'none'
    mainSection.style.backgroundColor = '#EEE'

    let specificNote = `<div class="close-note">X</div>
                        <div class = "openedNote">
                            <h2>${specificNoteObjectParameter.title}</h2>
                            <p>${specificNoteObjectParameter.note}</p>
                            <img src = "${specificNoteObjectParameter.picture}">
                        </div>`


    DisplayNote.innerHTML = specificNote

    const closeNote = document.querySelector(".close-note")
    const openedNote = document.querySelector(".openedNote")
    
    closeNote.style.display = 'block'

    closeNote.addEventListener('click', function(){
        notesList.style.display = 'block'
        closeNote.style.display = 'none'
        mainSection.style.backgroundColor = '#E98A15'
        openedNote.style.display = 'none'
    })
}

addNoteBtn.addEventListener('click', function(){
    mainSection.style.display = 'none'
    addNoteBtn.style.display = 'none'
    viewNotesBtn.style.display = 'flex'
    notesForm.style.display = 'block'
})

viewNotesBtn.addEventListener('click', function(){
    mainSection.style.display = 'block'
    addNoteBtn.style.display = 'flex'
    viewNotesBtn.style.display = 'none'
    notesForm.style.display = 'none'
})