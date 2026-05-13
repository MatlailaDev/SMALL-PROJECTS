let productsContainer = document.getElementById("productsContainer")



let productsArray = [
    {
        productName: "Broccoli",
        productPrice: 30,
        productDescription:"",
        productImage: "./assets/products/broccoli.jpg",
    },
    {
        productName: "Peppers",
        productPrice: 10,
        productDescription: "",
        productImage: "./assets/products/green-red-yellow-pepper.jpg",
    },
    {
        productName: "Eggplant",
        productPrice: 68,
        productDescription: "",
        productImage: "./assets/products/eggplant.jpg",
    },
    {
        productName: "Cucumber",
        productPrice: 40,
        productDescription: "",
        productImage: "./assets/products/cucumber.jpg",
    },
    {
        productName: "Lettuce",
        productPrice: 29,
        productDescription: "",
        productImage: "./assets/products/lettuce.jpg",
    },
    {
        productName: "Red Pepper",
        productPrice: 18,
        productDescription: "",
        productImage: "./assets/products/red-pepper.jpg",
    },
    {
        productName: "Garlic",
        productPrice: 36,
        productDescription: "",
        productImage: "./assets/products/garlic.jpg",
    },
    {
        productName: "Onions",
        productPrice: 19,
        productDescription: "",
        productImage:"./assets/products/Onions.jpg",
    },
    {
        productName: "Beetroot",
        productPrice: 29,
        productDescription: "",
        productImage:"./assets/products/beetroot.jpg",
    },
    {
        productName: "Carrots",
        productPrice: 35,
        productDescription: "",
        productImage:"./assets/products/carrots.jpg",
    }
]

// let cartArray = JSON.parse(localStorage.getItem(cartArray)) || []

function openSideCart(){
    document.getElementById("sideCart").style.width = "350px"
    document.querySelector("main").style.marginRight = "350px"
}

function closeSideCart(){
    document.getElementById("sideCart").style.width = "0"
    document.querySelector("main").style.marginRight = "0"
}

// create productCard element
function createProduct(productObjectParameter){
    return `<div class = "productCard" data-id = "${productObjectParameter.id}">
                            <img src = "${productObjectParameter.productImage}">
                            <div class = "productDetails">
                                <h4>${productObjectParameter.productName}</h4>
                                <p>${productObjectParameter.productPrice}</p>
                            </div>
                       </div>`

    
}

// Display products with forEach innerHTML
productsArray.forEach(product => {
    // Save the return of createProduct in productCard variable
    let productCard = createProduct(product)
    productsContainer.innerHTML += productCard
})

