let productsContainer = document.getElementById("productsContainer")
let sideCartItemsContainer = document.getElementById("sideCartItemsContainer")
let cartIconNumber = document.querySelector("header .cartBtn i span")
let numberOfItemsInCart = document.querySelector(".cart-heading")
let productPage = document.getElementById("productPage")
// let totalAmount = document.getElementById("total-amount")



let productsArray = [
    {
        id: "001",
        productName: "Broccoli",
        productPrice: 30,
        productDescription:"Lorem.",
        productImage: "./assets/products/broccoli.jpg",
        quantity : 1
    },
    {
        id: "002",
        productName: "Peppers",
        productPrice: 10,
        productDescription: "Lorem ipsum.",
        productImage: "./assets/products/green-red-yellow-pepper.jpg",
        quantity : 1
    },
    {
        id: "003",
        productName: "Eggplant",
        productPrice: 68,
        productDescription: "Lorem, ipsum dolor.",
        productImage: "./assets/products/eggplant.jpg",
        quantity : 1
    },
    {
        id: "004",
        productName: "Cucumber",
        productPrice: 40,
        productDescription: "Lorem ipsum dolor sit.",
        productImage: "./assets/products/cucumber.jpg",
        quantity : 1
    },
    {
        id: "005",
        productName: "Lettuce",
        productPrice: 29,
        productDescription: "",
        productImage: "./assets/products/lettuce.jpg",
        quantity : 1
    },
    {
        id: "006",
        productName: "Red Pepper",
        productPrice: 18,
        productDescription: "",
        productImage: "./assets/products/red-pepper.jpg",
        quantity : 1
    },
    {
        id: "007",
        productName: "Garlic",
        productPrice: 36,
        productDescription: "",
        productImage: "./assets/products/garlic.jpg",
        quantity : 1
    },
    {
        id: "008",
        productName: "Onions",
        productPrice: 19,
        productDescription: "",
        productImage:"./assets/products/Onions.jpg",
        quantity : 1
    },
    {
        id: "009",
        productName: "Beetroot",
        productPrice: 29,
        productDescription: "",
        productImage:"./assets/products/beetroot.jpg",
        quantity : 1
    },
    {
        id: "0010",
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
    return `<div class = "productCard" data-id = "${productObjectParameter.id}" data-url = "product_page.html?id=${productObjectParameter.id}">
                        <div class = "cardContents">    
                            <img src = "${productObjectParameter.productImage}">
                            <div class = "productDetails">
                                <h4>${productObjectParameter.productName}</h4>
                                <p>R${productObjectParameter.productPrice}</p>
                            </div>
                            <div class = "wrapper">
                                <button id = "add-to-cart" class = "add-to-cart">Add to cart</button>
                                <button href= "#" class = "added-to-cart">Added to cart</button>
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
if(productsContainer){
    productsArray.forEach(product => {
        // Save the return of createProduct in productCard variable
        let productCard = createProduct(product)
        productsContainer.innerHTML += productCard
    })
}

//Onclick functions for cart
function openSideCart(){
    numberOfItemsInCart.style.display = 'block'
    sideCartItemsContainer.style.display = 'block'
    if(window.innerWidth < 450){
        document.getElementById("sideCart").style.width = "100%"
        // document.querySelector("main").style.marginRight = "450px"
    }else if(window.innerWidth > 450){
        document.getElementById("sideCart").style.width = "450px"
    }
}

function closeSideCart(){
    numberOfItemsInCart.style.display = 'none'
    sideCartItemsContainer.style.display = 'none'
    document.getElementById("sideCart").style.width = "0"
    // document.querySelector("main").style.marginRight = "0"
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


//number of items in the cart must show near the cart icon in header]
// I must figure out how to increment number of carts on cart button icon when new item is added to cart but for now I will simply show it
if(numberOfItemsInCart){
    cartIconNumber.innerHTML = cartArray.length
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
            let cartArray = JSON.parse(localStorage.getItem("cartArray")) || []

            const objectInCartArray = cartArray.find(item => item.id == targetId)

            if(cartArray.includes(objectInCartArray)){
                alert(`${specificProductObject.productName} already in cart`)
                
            }else{
                    // Swap out add to cart button with added to cart button
                    e.target.closest(".productCard").querySelector(".added-to-cart").style.display = 'block'
                    e.target.closest(".productCard").querySelector(".add-to-cart").style.display = 'none'
                
                    pushToCart(specificProductObject)
                }

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
    if(specificProductObject){
        return `<div class = "cartProductCard" data-id = "${specificProductObject.id}" data-url = "product_page.html?id=${specificProductObject.id}">
                    <div class = "cartProductCardContents">
                        <img src = "${specificProductObject.productImage}">
                        <div class = "cartProductDetails">
                            <h4>${specificProductObject.productName}</h4>
                            <div class = "wrapper">
                                <div class = "x">X</div>
                                <div class = "quantity_display">${specificProductObject.quantity}</div>
                                <span>
                                    <button class = "increment">+</button>
                                    <button class = "decrement">-</buttton>
                                </span>
                            <p class = "cartProductAmount">R${parseFloat(specificProductObject.productPrice*specificProductObject.quantity)}</p>
                            </div>
                        </div>
                        <div class = "delete-cart-item">x</div>
                    </div>
                </div>`
    
        }
}

if(sideCartItemsContainer || numberOfItemsInCart){
    cartArray.forEach(cartProduct => {
        let cartProductItem = createCartItems(cartProduct)
        
        sideCartItemsContainer.innerHTML += cartProductItem
        // Although fror now it makes sense to count the number of items in cart array the true count will be the count of items including their quantity
        numberOfItemsInCart.innerHTML = `<h4>There are <span>${cartArray.length} items</span> in your cart</h4>`


    })

}


// Calculate total amount
if(sideCartItemsContainer){
    function calculateTotalAmount(){
        for(let i=0; i<cartArray.length; i++){
            console.log(cartArray[i].productPrice)
        }
    }

    calculateTotalAmount()

    // let totalAmount = calculateTotalAmount()

}

// Delete cart items
if(sideCartItemsContainer){
    sideCartItemsContainer.addEventListener('click', function(e){
        if(e.target.classList.contains("delete-cart-item")){
            // target element
            const targetCartElement = e.target.closest("[data-id]")

            // Use element to target
            const targetCartObjectId = targetCartElement.dataset.id

            deleteCartItem(targetCartObjectId)

            // Remove from UI
            targetCartElement.remove()
        }
    })
}

function deleteCartItem(targetCartObjectId){
    let cartArray = JSON.parse(localStorage.getItem("cartArray")) || []

    cartArray = cartArray.filter(obj => String(obj.id) !== String(targetCartObjectId))

    localStorage.setItem("cartArray", JSON.stringify(cartArray))
}

// Now I want to click on a cart item and open product page
if(sideCartItemsContainer){
    sideCartItemsContainer.addEventListener('click', function(e){
        if(e.target.closest(".increment") || e.target.closest(".decrement") || e.target.closest(".delete-cart-item")){
            return
        }

        if(e.target.closest(".cartProductCard")){
            const productUrl = e.target.closest(".cartProductCard").dataset.url
            window.location.href = productUrl
        }
    })
}

if(productPage){
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')

    const clickedProductObject = cartArray.find(obj => String(obj.id) === String(productId))

    if(clickedProductObject){

        productPage.innerHTML = `<div>
                                    <img  src = "${clickedProductObject.productImage}">
                                    <div>${clickedProductObject.productName}</div>
                                    <div>${clickedProductObject.productPrice}</div>
                                    <div>${clickedProductObject.productDescription}</div>
                                </div>`
    }
}


if(sideCartItemsContainer){
    sideCartItemsContainer.addEventListener('click', function(e){
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
if(productsContainer){

    productsContainer.addEventListener('click', function(e){
        if(e.target.closest(".add-to-cart") || e.target.closest(".added-to-cart") || e.target.closest(".increment") || e.target.closest(".decrement")){
            
            return;
        }

        if(e.target.closest(".productCard")){
            // open product page showing more information of the clicked product
            const productUrl = e.target.closest(".productCard").dataset.url

            window.location.href = productUrl
        }
    })
}


if(productPage){
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')

    const clickedProductObject = productsArray.find(obj => String(obj.id) === String(productId))

    if(clickedProductObject){

        productPage.innerHTML = `<div>
                                    <img  src = "${clickedProductObject.productImage}">
                                    <div>${clickedProductObject.productName}</div>
                                    <div>${clickedProductObject.productPrice}</div>
                                    <div>${clickedProductObject.productDescription}</div>
                                </div>`
    }
}

