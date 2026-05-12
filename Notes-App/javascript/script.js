"use strict"

let titleEl = document.getElementById("titleEl")
let noteEl = document.getElementById("note-el")
let saveBtn = document.getElementById("save")
let clearBtn = document.getElementById("clear")
let notesList = document.getElementById("notesList")
let DisplayNote = document.getElementById("displayNote")
let addNoteBtn = document.getElementById("add-note-btn")
let viewNotesBtn = document.getElementById("view-notes-btn")
let main = document.querySelector("main")
let mainSection = document.querySelector('main section')
let closeNote = document.querySelector(".close-note")
let notesForm = document.getElementById("notesForm")


let notesArray = JSON.parse(localStorage.getItem("notesArray")) || []

if(notesArray){

    function displayNotesFromLocalStorage(){
        notesArray.forEach((item, index) => {
        const cleanItem = item.replace('{', '').replace('}', '')
        const [key, value] = cleanItem.split(':').map(part => part.trim().replace(/'/g,''))

        console.log(`${key.replace("_", " ")}`)

        notesList.innerHTML += `<li class="note-item">${key.replace("_", " ").replace("_", " ").replace("_", " ")}
                                    <br>
                                    <pre style = 'display:none'>${value}</pre>
                                </li>`

        
        })
    }

    displayNotesFromLocalStorage()

    
    
    document.querySelectorAll('.note-item').forEach(item => {
        const cleanItem = item.textContent.replace('{', '').replace('}', '')
        const [key, value] = cleanItem.split(':').map(part => part.trim().replace(/'/g,''))

        item.addEventListener('click', function(){
            // document.querySelectorAll('pre').forEach(pre => {
            //     pre.style.display = 'none'

            // })

            const targetPre = this.querySelector('pre')

            function displayPre(){
               if(targetPre){
                    DisplayNote.innerHTML = `<div class="note-item"> ${key}
                                            </div>`
                    
                    DisplayNote.style.display = 'block'                   
                    // targetPre.style.display = 'block'
                    notesList.style.display = 'none'
                    mainSection.style.backgroundColor = '#ECE5F0'
                    mainSection.style.height = '80vh'
                    

                    DisplayNote.style.whiteSpace = "pre-line"
                    DisplayNote.style.textAlign = 'left'

                    DisplayNote.style.padding = '10px'
                    DisplayNote.style.marginTop = '50px'

                    closeNote.style.display = 'block'
                    closeNote.style.marginTop = '10px'
                    addNoteBtn.style.display = "block"
                    
        
                } 
            }

            displayPre()
            

            

            closeNote.addEventListener('click', function(){
                
                DisplayNote.style.display = 'none'
                targetPre.style.display = 'none'
                closeNote.style.display = 'none'

                notesList.style.display = 'block'
                mainSection.style.backgroundColor = '#E98A15'

                
            })
        })
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




addNoteBtn.addEventListener('click', function(){

    mainSection.style.display = "none"
    form.style.display = "block"
    form.style.width = '100%'
    
    
    addNoteBtn.style.display = "none"
    viewNotesBtn.style.display = "block"

})

viewNotesBtn.addEventListener('click', function(){
    viewNotesBtn.style.display = "none"
    addNoteBtn.style.display = "flex"

    mainSection.style.display = "block"
    form.style.display = "none"
    
})








