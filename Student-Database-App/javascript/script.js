"use strict"

// Navigation variables
let searchForm = document.getElementById("searchForm")


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