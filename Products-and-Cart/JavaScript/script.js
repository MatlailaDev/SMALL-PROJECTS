let productsContainer = document.getElementById("productsContainer")
let sideCartItemsContainer = document.getElementById("sideCartItemsContainer")
let numberOfItemsInCart = document.querySelector(".cart-heading")
let productPage = document.getElementById("productPage")



let productsArray = [
    {
        id: crypto.randomUUID(),
        productName: "Broccoli",
        productPrice: 30,
        productDescription:"Lorem.",
        productImage: "./assets/products/broccoli.jpg",
        quantity : 1
    },
    {
        id: crypto.randomUUID(),
        productName: "Peppers",
        productPrice: 10,
        productDescription: "Lorem ipsum.",
        productImage: "./assets/products/green-red-yellow-pepper.jpg",
        quantity : 1
    },
    {
        id: crypto.randomUUID(),
        productName: "Eggplant",
        productPrice: 68,
        productDescription: "Lorem, ipsum dolor.",
        productImage: "./assets/products/eggplant.jpg",
        quantity : 1
    },
    {
        id: crypto.randomUUID(),
        productName: "Cucumber",
        productPrice: 40,
        productDescription: "Lorem ipsum dolor sit.",
        productImage: "./assets/products/cucumber.jpg",
        quantity : 1
    },
    {
        id: crypto.randomUUID(),
        productName: "Lettuce",
        productPrice: 29,
        productDescription: "",
        productImage: "./assets/products/lettuce.jpg",
        quantity : 1
    },
    {
        id: crypto.randomUUID(),
        productName: "Red Pepper",
        productPrice: 18,
        productDescription: "",
        productImage: "./assets/products/red-pepper.jpg",
        quantity : 1
    },
    {
        id: crypto.randomUUID(),
        productName: "Garlic",
        productPrice: 36,
        productDescription: "",
        productImage: "./assets/products/garlic.jpg",
        quantity : 1
    },
    {
        id: crypto.randomUUID(),
        productName: "Onions",
        productPrice: 19,
        productDescription: "",
        productImage:"./assets/products/Onions.jpg",
        quantity : 1
    },
    {
        id: crypto.randomUUID(),
        productName: "Beetroot",
        productPrice: 29,
        productDescription: "",
        productImage:"./assets/products/beetroot.jpg",
        quantity : 1
    },
    {
        id: crypto.randomUUID(),
        productName: "Carrots",
        productPrice: 35,
        productDescription: "",
        productImage:"./assets/products/carrots.jpg",
        quantity : 1
    }
]

const cartArray = JSON.parse(localStorage.getItem("cartArray")) || []


// create productCard element
function createProduct(productObjectParameter){
    return `<div class = "productCard" data-id = "${productObjectParameter.id}">
                        <div class = "cardContents">    
                            <img src = "${productObjectParameter.productImage}">
                            <div class = "productDetails">
                                <h4>${productObjectParameter.productName}</h4>
                                <p>R${productObjectParameter.productPrice}</p>
                            </div>
                            <div class = "wrapper">
                                <a id = "add-to-cart" class = "add-to-cart" onclick = "openSideCart()">Add to cart</a>
                                <div class = "quantity_display">${productObjectParameter.quantity}</div>
                                <span>
                                    <button class = "increment">+</button>
                                    <button class = "decrement">-</buttton>
                                </span>
                            </div>
                        </div>
            </div>`

    
}

// Display products with forEach innerHTML
productsArray.forEach(product => {
    // Save the return of createProduct in productCard variable
    let productCard = createProduct(product)
    productsContainer.innerHTML += productCard
})

//Onclick functions for cart
function openSideCart(){
    document.getElementById("sideCart").style.width = "450px"
    document.querySelector("main").style.marginRight = "450px"
}

function closeSideCart(){
    document.getElementById("sideCart").style.width = "0"
    document.querySelector("main").style.marginRight = "0"
}

// Onclick functions to increment and decrement product quantity
if(productsContainer){

    productsContainer.addEventListener('click', function(e){
        if(e.target.classList.contains("increment")){
            const display = e.target.closest(".productCard").querySelector(".quantity_display")
            display.textContent = parseInt(display.textContent) + 1
        }

        if(e.target.classList.contains("decrement")){
            const display = e.target.closest(".productCard").querySelector(".quantity_display")
            const current = parseInt(display.textContent)
           if(current > 1){
                display.textContent = current - 1
           }
        }  
        
    })
}




// I want to click addToCart and add the clicked product to cart by accessing its original object and pushing it to cartArray then using it to create a cart item
// So the first thing is to access the original object

if(productsContainer){
    productsContainer.addEventListener('click', function(e){
        if(e.target.classList.contains("add-to-cart")){
            // Get the id from the parent card element
            const targetId = e.target.closest(".productCard").dataset.id

            // target the Parent element itself, I want to target the input value for increment/decrement
            const targetElement = e.target.closest("[data-id]")

            // Now that I have the Id, I can access the specific productObject
            const specificProductObject = productsArray.find(obj => obj.id == targetId)

            // Add Quantity key/value to object
            specificProductObject.quantity = e.target.closest(".productCard").querySelector(".quantity_display").textContent
            // newSpecificProductObject = {
            //     ...specificProductObject,
            //     newQuantity: e.target.closest(".productCard").document.querySelector(".quantity_display").value
            // }
            
            // Call the function that pushes this object to the cart array
            pushToCart(specificProductObject)
        

            
        }
    })
}

// Helper for pushing items to cartArray and storing them in localStorage when add-to-cart is clicked
function pushToCart(specificProductObject){
    // let cartArray = JSON.parse(localStorage.getItem("cartArray")) || []


    cartArray.push(specificProductObject)

    localStorage.setItem("cartArray", JSON.stringify(cartArray))


    console.log(cartArray)
}

// Time to create cart items 
function createCartItems(specificProductObject){
    return `<div class = "cartProductCard" data-id = "${specificProductObject.id}">
                <div class = "cartProductCardContents">
                    <img src = "${specificProductObject.productImage}">
                    <div class = "cartProductDetails">
                        <h4>${specificProductObject.productName}</h4>
                        <p>R${parseFloat(specificProductObject.productPrice*specificProductObject.quantity)}</p>
                        <div class = "wrapper">
                            <div class = "x">X</div>
                            <div class = "quantity_display">${specificProductObject.quantity}</div>
                            <span>
                                <button class = "increment">+</button>
                                <button class = "decrement">-</buttton>
                            </span>
                        </div>
                    </div>
                </div>
            </div>`
}

cartArray.forEach(cartProduct => {
    let cartProductItem = createCartItems(cartProduct)
    sideCartItemsContainer.innerHTML += cartProductItem
    // Although fror now it makes sense to count the number of items in cart array the true count will be the count of items including their quantity
    numberOfItemsInCart.innerHTML = `<h4>There are <span>${cartArray.length} items</span> in your cart</h4>`
})


if(sideCartItemsContainer){
    sideCartItemsContainer.addEventListener('click', function(e, specificProductObject){
        if(e.target.classList.contains("increment")){
            const display = e.target.closest(".cartProductCard").querySelector(".quantity_display")
            display.textContent = Number(display.textContent) + 1
            
        }

        if(e.target.classList.contains("decrement")){
            const display = e.target.closest(".cartProductCard").querySelector(".quantity_display")
            const current = parseInt(display.textContent)
            if(current > 1){
                display.textContent = current - 1
            }
        }

        


    })
}





// Product Page Functionality
if(productPage || productsContainer){

    productsContainer.addEventListener('click', function(e){
        if(e.target.classList.contains(".productCard")){
            // Get the id from the parent container
            const targetId = e.target.closest(".productCard").dataset.id

            const specificProductObject = productsArray.find(obj => obj.id == targetId)

            displaySpecificProduct(specificProductObject)
        }
    })
}

function displaySpecificProduct(specificProductObject){
    let specificProductInformation = `<div>${specificProductObject.description}</div>`

    productPage.innerHTML = specificProductInformation
}

