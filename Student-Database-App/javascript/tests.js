
// let arr = ["squirrel", 5, "Tjed", new Date(), true]

// function checkString(element, index){
//     return typeof element === "string"
// }

// let filterArr = arr.filter(checkString)
// console.log(filterArr)


let dataArray = [{name : 'Tshepo', surname: 'Matlaila', email: 'matlailadev@gmail.com' }, {name : 'Macmillan', surname: 'Kekana', email: 'macmillankekana@gmail.com' }]

const searchTerm = "tshepo matlaila"

const searchResults = dataArray.filter(person => {
    // Convert both the data and the search term to lowercase for a better match
    const nameMatch = person.name.toLowerCase().includes(searchTerm.toLowerCase())
    const surnameMatch = person.surname.toLowerCase().includes(searchTerm.toLowerCase())
    let concatNameSurname = `${person.name} ${person.surname}`
    const concatMatch = concatNameSurname.toLowerCase().includes(searchTerm.toLowerCase())

    return nameMatch || surnameMatch || concatMatch
})

console.log(searchResults)

