"use strict"

// Search variables
let searchSection = document.querySelector(".searchSection")
let searchForm = document.getElementById("searchForm")
let searchBtn = document.getElementById("searchBtn")
let searchFormInput = document.getElementById("search")
let studentCardsSection = document.getElementById("studentCardsSection")
let numberOfStudentsFound = document.querySelector("#studentCardsSection h2")
let cardsContainer = document.querySelector("main #studentCardsSection span")
let close = document.getElementById("close")
let specificStudentInformationSection = document.getElementById("specificStudentInformationSection")


// Form variables
let registerForm = document.getElementById("registerForm")

// Personal Info Variables
let name = document.getElementById("name")
let surname = document.getElementById("surname")
let identityNumber = document.getElementById("id_number")
let age = document.getElementById("age")
let gender = document.getElementById("gender")
let race = document.getElementById("race")
let studentNumber = document.getElementById("student_number")
let contact = document.getElementById("contact")
let email = document.getElementById("email")

// Course Details Variables
let faculty = document.getElementById("faculty")
let course = document.getElementById("course")
let level = document.getElementById("level")
let yearOfStudy = document.getElementById("year_of_study")


// Table Variables
let tableDiv = document.getElementById("tableDiv")
let tbody = document.getElementById("tbody")

// Runs on page load
let studentsArray = JSON.parse(localStorage.getItem("studentsArray")) || []

function displayStudents(student){
                // let row = `<tr data-id = "${student.id}" class = "studentRow">
                //                 <td>${student.name}</td>
                //                 <td>${student.surname}</td>             
                //                 <td>${student.id_number}</td>  
                //                 <td>${student.age}</td>  
                //                 <td>${student.gender}</td>  
                //                 <td>${student.race}</td>  
                //                 <td>${student.student_number}</td>  
                //                 <td>${student.number}</td>  
                //                 <td>${student.email}</td>  
                //                 <td>${student.faculty}</td>  
                //                 <td>${student.course}</td>  
                //                 <td>${student.level}</td>  
                //                 <td>${student.year_of_study}</td> 
                //                 <td><i class="fa-solid fa-trash-can delete"></i></td>
                //            </tr>`

                // tbody.innerHTML += row


                if(tbody){
                    // Displaying the object data using a method better than innerHTML to avoid injection

                    const newRow = tbody.insertRow(-1) // "-1" means last, so each row is added last
                    // Add data-id to each newRow
                    newRow.dataset.id = student.id

                    const nameCell = newRow.insertCell(0)
                    const surnameCell = newRow.insertCell(1)
                    const idCell = newRow.insertCell(2)
                    const ageCell = newRow.insertCell(3)
                    const genderCell = newRow.insertCell(4)
                    const raceCell = newRow.insertCell(5)
                    const studentNumberCell = newRow.insertCell(6)
                    const contactNumberCell = newRow.insertCell(7)
                    const emailCell = newRow.insertCell(8)
                    const facultyCell = newRow.insertCell(9)
                    const courseCell = newRow.insertCell(10)
                    const courseLevelCell = newRow.insertCell(11)
                    const yearOfStudyCell = newRow.insertCell(12)
                    const deleteCell = newRow.insertCell(13)
        

                    nameCell.textContent = student.name
                    surnameCell.textContent = student.surname
                    idCell.textContent = student.id_number
                    ageCell.textContent = student.age
                    genderCell.textContent = student.gender
                    raceCell.textContent = student.race
                    studentNumberCell.textContent = student.student_number
                    contactNumberCell.textContent = student.number
                    emailCell.textContent = student.email
                    facultyCell.textContent = student.faculty
                    courseCell.textContent = student.course
                    courseLevelCell.textContent = student.level
                    yearOfStudyCell.textContent = student.year_of_study
                    deleteCell.innerHTML = `<i class="fa-solid fa-trash-can delete"></i>`

                }
}

//Helper function to delete student object

function deleteStudentObject(targetStudentObjectId){
    // Remove object from localStorage
    let studentsArray = JSON.parse(localStorage.getItem("studentsArray")) || []
    studentsArray = studentsArray.filter(student => String(student.id) !== String(targetStudentObjectId))
    localStorage.setItem("studentsArray", JSON.stringify(studentsArray))

}

if(studentsArray){
    // Display items in localStorage array
    studentsArray.forEach(student => {
        if(tbody){
  
            displayStudents(student)
        }
    })

    if(tbody){
        // Delete using dynamially created delete icon in <td>
        tbody.addEventListener('click', function(e){
            if(e.target.classList.contains("delete")){
                
                // Get the id from the parent card
                const studentObjectElement = e.target.closest("[data-id]")
                const targetStudentObjectId = studentObjectElement.dataset.id

                deleteStudentObject(targetStudentObjectId)

                // Remove from UI
                studentObjectElement.remove()
            }
        })

    }


    // Use filter to search for items in localStorage, meaning in studentsArray.
    if(searchForm){
            searchBtn.addEventListener('click', function(e){
                e.preventDefault()

                const searchInput = searchFormInput.value 

                const searchResults = studentsArray.filter(student => {
                    // over both the data and search termto lowercase for better match
                    const nameMatch = student.name.toLowerCase().includes(searchInput.toLowerCase())
                    const surnameMatch = student.surname.toLowerCase().includes(searchInput.toLowerCase())
                    const concatMatch = `${student.name} ${student.surname}`.toLowerCase().includes(searchInput.toLowerCase())
                    const studentNumberMatch = student.student_number.includes(searchInput)
                    const courseMatch =student.course.toLowerCase().includes(searchInput.toLowerCase())

                    return nameMatch || surnameMatch || concatMatch || studentNumberMatch || courseMatch 
                })

                console.log(`Search input is ${searchInput}`)
                console.log(`${searchResults.length} results from array match your search`)



                
                
                if(searchInput !== ""){

                    studentCardsSection.style.display = 'block'


                    numberOfStudentsFound.textContent = `Students Found: ${searchResults.length}`

                    cardsContainer.replaceChildren()

                    searchResults.forEach(result => {
                        let studentCard = `<div class="studentCard" data-id="${result.id}">
                                                <div class = "cardContents">
                                                    <div class = "logo">
                                                        <i class="fa fa-university" aria-hidden="true"></i>
                                                        <h4>JavaScript University</h4>
                                                    </div>

                                                    <div class="details">
                                                        <ul>
                                                            <li>${result.name} ${result.surname}</li>
                                                            <li>${result.student_number}</li>
                                                            <li>${result.course}</li>
                                                        </ul>
                                                        <img class="profile-image" src="${result.student_picture}" alt="${result.name} ${result.surname} image">
                                                    </div>

                                                
                                                    <h5>Student Card 2018</h5>
                                                </div>    
                                            </div>`
                        
                            cardsContainer.innerHTML += studentCard
                            
                            console.log(typeof result.student_picture)

                    })
                        console.log(`${document.querySelectorAll(".studentCard").length} student cards were created, does this match the number of search results?`)
                        
                        

                }else{
                    studentCardsSection.style.display = 'none'
                    console.log(`search Input is ${searchInput.length} as such no results were shown`)
                } //This is the end of the if else statement

                
                
                if(searchResults.length > 0 && searchInput.length !== 0){
                    searchSection.style.display = 'none'
                    close.style.display = 'flex'
                    document.body.style.backgroundColor = '#EEE'
                }

            })
    }


}

if(cardsContainer){
    cardsContainer.addEventListener('click', function(e){
                                if(e.target.closest(".studentCard")){
                                    // Get the id from the parent card
                                    const targetId = e.target.closest(".studentCard").dataset.id

                                    // Access the specific object
                                    const specificStudentObject = studentsArray.find(obj => obj.id == targetId)

                                    displaySpecificStudentInformation(specificStudentObject)

                                }
    })
}

function displaySpecificStudentInformation(specificStudentObject){
    close.style.display = 'flex'
    specificStudentInformationSection.style.display = 'block'
    document.body.style.backgroundSize = '0%'
    document.body.style.backgroundColor = '#EEE'
    searchSection.style.display = 'none'
    studentCardsSection.style.display = 'none'

    let specificStudentInformation = `
                                      <h2>Student Information for <span>${specificStudentObject.name} ${specificStudentObject.surname}: ${specificStudentObject.student_number}</span></h2>
                                      <div class="specificStudentDetails">
                                        <table>
                                            <caption>Student Information</caption>

                                            <thead>
                                                <th>Student Picture</th>
                                                <th>Name</th>
                                                <th>Surname</th>
                                                <th>ID</th>
                                                <th>Age</th>
                                                <th>Gender</th>
                                                <th>Race</th>
                                                <th>Student Number</th>
                                                <th>Contact Number</th>
                                                <th>Email</th>
                                                <th>Faculty</th>
                                                <th>Course</th>
                                                <th>Course Level</th>
                                                <th>Year Of Study</th>
                                            </thead>

                                            <tbody>
                                                <tr data-id = ${specificStudentObject.id}>
                                                    <td class="student-picture"><img class = "profile-image-in-search-results-table" src = "${specificStudentObject.student_picture}" alt = "${specificStudentObject.name} ${specificStudentObject.surname} image"></td>
                                                    <td>${specificStudentObject.name}</td>
                                                    <td>${specificStudentObject.surname}</td>
                                                    <td>${specificStudentObject.id_number}</td>
                                                    <td>${specificStudentObject.age}</td>
                                                    <td>${specificStudentObject.gender}</td>
                                                    <td>${specificStudentObject.race}</td>
                                                    <td>${specificStudentObject.student_number}</td>
                                                    <td>${specificStudentObject.number}</td>
                                                    <td>${specificStudentObject.email}</td>
                                                    <td>${specificStudentObject.faculty}</td>
                                                    <td>${specificStudentObject.course}</td>
                                                    <td>${specificStudentObject.level}</td>
                                                    <td>${specificStudentObject.year_of_study}</td>
                                                    <td><i class="fa-solid fa-trash-can delete"></i></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                      </div>`
                                      
    specificStudentInformationSection.innerHTML = specificStudentInformation

    // delete from array but from the specific student information section
    specificStudentInformationSection.addEventListener('click', function(e){
        if(e.target.classList.contains("delete")){
                
                // Get the id from the parent card
                const specificStudentObjectElement = e.target.closest("[data-id]")
                const targetSpecificStudentObjectId = specificStudentObjectElement.dataset.id

                deleteStudentObject(targetSpecificStudentObjectId)

                // Remove from UI
                specificStudentObjectElement.remove()
            }
    })
}

if(close){
    close.addEventListener('click', function(){
        specificStudentInformationSection.style.display = 'none'
        searchSection.style.display = 'block'
        studentCardsSection.style.display = 'none'
        document.body.style.backgroundSize = '100%'
        document.body.style.backgroundColor = '#000000'
        close.style.display = 'none'

    })
}


// Helper to convert File to Base64 string
function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file) //Creates a URL like string out of raw image
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

if(registerForm && !searchForm){
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        // 1. Create a formData object from the form
        const formData = new FormData(e.target)

        // 2. Convert entries to a single object
        const studentObject = Object.fromEntries(formData.entries())

        //3. Create a new object with a unique ID

        const newStudentObject = {
            ...studentObject,
            id: crypto.randomUUID() //This generates a secure unique string ID
        }

        // 4. Find and convert any File objects into Base64
        for(const[key, value] of formData.entries()){
            if(value instanceof File && value.name){
                newStudentObject[key] = await convertToBase64(value)
            }
        }

        // 5.Retrieve, update and save the localStorage aray
        // This has been done up top with JSON.parse(...)

        // 6. Push object into array
        if(studentObject){
            
            studentsArray.push(newStudentObject) //Here I am pushing newStudentObject becuase it is the one with a unique ID

            localStorage.setItem("studentsArray", JSON.stringify(studentsArray))
            
        }

        console.log(studentsArray)
        e.target.reset()

    })

}

