"use strict"

// Search variables
let mainElement = document.getElementById("main") 
let searchSection = document.querySelector(".searchSection")
let searchForm = document.getElementById("searchForm")
let searchBtn = document.getElementById("searchBtn")
let searchFormInput = document.getElementById("search")
let studentCardsSection = document.getElementById("studentCardsSection")
let numberOfStudentsFound = document.querySelector("main #studentCardsSection h2")
let cardsContainer = document.querySelector("main #studentCardsSection span")
let close = document.getElementById("close")
let specificStudentInformationSection = document.getElementById("specificStudentInformationSection")


// Form variables
let form = document.querySelector("main section form")

// Personal Info Variables
let name = document.getElementById("name")
let surname = document.getElementById("surname")
let identityNumber = document.getElementById("id")
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

if(studentsArray){
    studentsArray.forEach(student => {
        if(tbody){
            let row = `<tr>
                                <td>${student.name}</td>
                                <td>${student.surname}</td>             
                                <td>${student.id}</td>  
                                <td>${student.age}</td>  
                                <td>${student.gender}</td>  
                                <td>${student.race}</td>  
                                <td>${student.student_number}</td>  
                                <td>${student.number}</td>  
                                <td>${student.email}</td>  
                                <td>${student.faculty}</td>  
                                <td>${student.course}</td>  
                                <td>${student.level}</td>  
                                <td>${student.year_of_study}</td>  
                        </tr>`

            tbody.innerHTML += row
        }
    })


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
                                                        <h4>Javascript University</h4>
                                                    </div>

                                                    <div class="details">
                                                        <ul>
                                                            <li>${result.name} ${result.surname}</li>
                                                            <li>${result.student_number}</li>
                                                            <li>${result.course}</li>
                                                        </ul>
                                                        <img class="profile-image" src="/Student-Database-App/assets/profile-images/1.jpg" alt="myimage">
                                                    </div>

                                                
                                                    <h5>Student Card 2018</h5>
                                                </div>    
                                            </div>`
                        
                            cardsContainer.innerHTML += studentCard

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

cardsContainer.addEventListener('click', function(e){
                            if(e.target.classList.contains("profile-image")){
                                // Get the id from the parent card
                                const targetId = e.target.closest(".studentCard").dataset.id

                                // Access the specific object
                                const specificStudentObject = studentsArray.find(obj => obj.id == targetId)

                                displaySpecificStudentInformation(specificStudentObject)



                            }
})

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
                                                <tr>
                                                    <td class="student-picture">${specificStudentObject.image}</td>
                                                    <td>${specificStudentObject.name}</td>
                                                    <td>${specificStudentObject.surname}</td>
                                                    <td>${specificStudentObject.id}</td>
                                                    <td>${specificStudentObject.age}</td>
                                                    <td>${specificStudentObject.gender}</td>
                                                    <td>${specificStudentObject.race}</td>
                                                    <td>${specificStudentObject.student_number}</td>
                                                    <td>${specificStudentObject.contact_number}</td>
                                                    <td>${specificStudentObject.email}</td>
                                                    <td>${specificStudentObject.faculty}</td>
                                                    <td>${specificStudentObject.course}</td>
                                                    <td>${specificStudentObject.level}</td>
                                                    <td>${specificStudentObject.year_of_study}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                      </div>`
                                      
    specificStudentInformationSection.innerHTML = specificStudentInformation
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


if(form && !searchForm){
    form.addEventListener('submit', function(e){
        e.preventDefault()

        // 1. Create a formData object from the form
        const formData = new FormData(e.target)

        // 2. Convert entries to a single object
        const studentObject = Object.fromEntries(formData.entries())

        // 3. Push object into array

        if(studentObject){
            studentsArray.push(studentObject)

            localStorage.setItem("studentsArray", JSON.stringify(studentsArray))
        }

        if(tbody){
            // Displaying the object data using a method better than innerHTML to avoid injection

            const newRow = tbody.insertRow(-1) // "-1" means last, so each row is added last

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

            nameCell.textContent = studentObject.name.toUpperCase()
            surnameCell.textContent = studentObject.surname.toUpperCase()
            idCell.textContent = studentObject.id
            ageCell.textContent = studentObject.age
            genderCell.textContent = studentObject.gender.toUpperCase()
            raceCell.textContent = studentObject.race
            studentNumberCell.textContent = studentObject.student_number
            contactNumberCell.textContent = studentObject.number
            emailCell.textContent = studentObject.email.toUpperCase()
            faculty.textContent = studentObject.faculty.toUpperCase()
            courseCell.textContent = studentObject.course.toUpperCase()
            courseLevelCell.textContent = studentObject.level.toUpperCase()
            yearOfStudyCell.textContent = studentObject.year_of_study

        }

        console.log(studentsArray)
        e.target.reset()

    })

}