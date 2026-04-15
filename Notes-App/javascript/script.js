"use strict"

let titleEl = document.getElementById("titleEl")
let noteEl = document.getElementById("note-el")
let saveBtn = document.getElementById("save")
let clearBtn = document.getElementById("clear")
let notesList = document.getElementById("notesList")
let DisplayNote = document.getElementById("displayNote")


let notesArray = JSON.parse(localStorage.getItem("notesArray")) || []

if(notesArray){
    
    notesArray.forEach((item, index) => {
        const cleanItem = item.replace('{', '').replace('}', '')
        const [key, value] = cleanItem.split(':').map(part => part.trim().replace(/'/g,''))

        console.log(`${key.replace("_", " ")}`)

        notesList.innerHTML += `<li class="note-item">${key.replace("_", " ")}
                                    <br>
                                    <pre style = 'display:none'>${value}</pre>
                                </li>`
    })
    
    document.querySelectorAll('.note-item').forEach(item => {
        const cleanItem = item.textContent.replace('{', '').replace('}', '')
        const [key, value] = cleanItem.split(':').map(part => part.trim().replace(/'/g,''))
        let mainSection = document.querySelector('main section')

        item.addEventListener('click', function(){
            document.querySelectorAll('pre').forEach(pre => {
                pre.style.display = 'none'

            })

            const targetPre = this.querySelector('pre')

            if(targetPre){
                targetPre.style.display = 'block'
                notesList.style.display = 'none'
                mainSection.style.backgroundColor = '#ECE5F0'

                DisplayNote.style.backgroundColor = '#ECE5F0'
                DisplayNote.innerHTML = `<li class="note-item"> ${key}
                                        </li>`

                DisplayNote.style.whiteSpace = "pre-line"
                
    
            }
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














