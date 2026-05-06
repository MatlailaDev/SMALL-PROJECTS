"use strict"

// Navigation variables
let registerStudentBtn = document.getElementById("registerStudent")
let viewStudentsBtn = document.getElementById("viewStudents")
let search = document.getElementById("search")
let mainSectionForm = document.querySelector("main section")


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


let studentsArray = JSON.parse(localStorage.getItem("studentsArray")) || []

if(studentsArray){
    studentsArray.forEach(student => {
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
    })
}

// Hide Table on page load
tableDiv.style.display = "none"

// Hide Form on load
mainSectionForm.style.display = "none"



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

    nameCell.textContent = studentObject.name
    surnameCell.textContent = studentObject.surname
    idCell.textContent = studentObject.id
    ageCell.textContent = studentObject.age
    genderCell.textContent = studentObject.gender
    raceCell.textContent = studentObject.race
    studentNumberCell.textContent = studentObject.student_number
    contactNumberCell.textContent = studentObject.number
    emailCell.textContent = studentObject.email
    faculty.textContent = studentObject.faculty
    courseCell.textContent = studentObject.course
    courseLevelCell.textContent = studentObject.level
    yearOfStudyCell.textContent = studentObject.year_of_study



    console.log(studentsArray)
    e.target.reset()

})


registerStudentBtn.addEventListener('click', function(e){
    e.preventDefault()

    search.style.display = 'none'
    mainSectionForm.style.display = 'block'
    document.body.style.backgroundSize = '0%'
    registerStudentBtn.style.display = 'none'
})

viewStudentsBtn.addEventListener('click', function(e){
    search.style.display = 'none'
    mainSectionForm.style.display = 'none'
    registerStudentBtn.style.display = 'block'
    viewStudentsBtn.style.display = 'none'
    tableDiv.style.display = "block"
    document.body.style.backgroundSize = '0%'
    

})