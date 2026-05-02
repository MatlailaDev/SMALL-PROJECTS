"use strict"

// Form variable
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
let diploma = document.getElementById("diploma")
let degree = document.getElementById("degree")
let masters = document.getElementById("masters")
let phd = document.getElementById("phd")

// Button Variables
let registerBtn = document.getElementById("registerBtn")

// localStorage variable
let studentArray = JSON.parse(localStorage.getItem("studentArray")) || []


function createStudent(){
    let student = {}
    let formLabel = document.querySelectorAll("main section form fieldset p label")
    let formInput = document.querySelectorAll("main section form fieldset p input")

    for(let i=0; i<formInput.length; i++){ 
        let key = formLabel[i].innerText.replace(/ /g, "_")
        let value = formInput[i].value
        // var student = `{${formLabel[i].innerHTML.replace(" ", "_").replace(" ", "_")}: '${formInput[i].value}'}`
        student[key] = key
        student[value] = value
        console.log(student)
    }

    return student
}


registerBtn.addEventListener('click', function(event){
    event.preventDefault()

    let newStudent = createStudent()

    if(newStudent){
        studentArray.push(newStudent)

        localStorage.setItem("studentArray", JSON.stringify(studentArray))

        console.log(studentArray)
    }

    console.log("student added")
})