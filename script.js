let imageSources = ['images/cover.jpg', 'images/cover2.jfif', 'images/cover3.jfif']
let script = ['Stipy Zig Zag Jigsaw Pillow and Duvet Set', 'Real Bambo Wall Clock', 'Brown and Blue Hardbound Book']


let imgIndex = 0;
let scriptIndex = 0;
updateUI();

function moveRight() {
  // move pointer one step to the right
  imgIndex = imgIndex + 1;
  if (imgIndex > imageSources.length - 1) {
    imgIndex = 0;
  }
  scriptIndex = scriptIndex + 1;
  if (scriptIndex > script.length - 1) {
    scriptIndex = 0;
  }
  updateUI();
}


function moveLeft() {
  imgIndex = imgIndex - 1;
  if (imgIndex < 0) {
    imgIndex = imageSources.length - 1;
  }
  scriptIndex = scriptIndex - 1;
  if (scriptIndex < 0) {
    scriptIndex = script.length - 1;
  }

  updateUI();
}

function updateUI() {
  document.querySelector('#cover-image img').src = imageSources[imgIndex];
  document.querySelector('#cover-image .text').textContent = script[scriptIndex];
}

let leftBtn = document.querySelector('#button1')
leftBtn.addEventListener('click', moveLeft)

let rightBtn = document.querySelector('#button2')
rightBtn.addEventListener('click', moveRight)

function toggleColor(element) {
  element.classList.toggle('clicked');
}


//or..
// const hearts = document.querySelectorAll('.fa-heart')
// function addEventHandler (HTMLElement){
//     HTMLElement.addEventListener('click', function(){
//         HTMLElement.classList.toggle('clicked')
//     })
// }
// hearts.forEach(addEventHandler)

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.fa-magnifying-glass').addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Button clicked!');
  });
});

// store search hide/show
// get search element
let storeSearch = document.querySelector('#store-search');
// get search icon
let searchIcon = document.querySelector('.fa-magnifying-glass');
function showSearch() {
  storeSearch.classList.remove('hidden');
}
searchIcon.addEventListener('click', showSearch);

let closeSearchIcon = document.querySelector('.fa-circle-xmark');
function hideSearch() {
  storeSearch.classList.add('hidden');
}
closeSearchIcon.addEventListener('click', hideSearch);

let products = [
  { name: "coffee", image: "images/coffee.jpg", price: "10.99", id: "product1" },
  { name: "lense", image: "images/lense.jpg", price: "20.99", id: "product2" },
  { name: "chair", image: "images/chair.jpg", price: "30.99", id: "product3" },
  { name: "printer", image: "images/printer.jpg", price: "40.99", id: "product4" },
  { name: "cup", image: "images/cup.jpg", price: "50.99", id: "product5" },
  { name: "cookies", image: "images/cookies.jpg", price: "60.99", id: "product6" },
  { name: "roll", image: "images/roll.jpg", price: "70.99", id: "product7" },
  { name: "dice", image: "images/dice.jpg", price: "80.99", id: "product8" }
]

let cardsGrid = document.querySelector('.cards-grid');
function populateProductsGrid(productsParam) {
  cardsGrid.innerHTML = '';
  productsParam.forEach(function (product) {
    let cardHTML = createHTMLProductCard(product);
    cardsGrid.innerHTML = cardsGrid.innerHTML + cardHTML;
  });
}
populateProductsGrid(products);

function filterProducts(products, maxPrice, searchTerm) {
  // filter by price
  let filteredProducts = products.filter(function (product) {
    if (maxPrice <= 0 || isNaN(maxPrice)) {
      return true;
    }

    // product.price
    if (product.price < maxPrice) {
      return true;
    } else {
      return false;
    }
  });

  // filter by search
  filteredProducts = filteredProducts.filter(function (product) {
    if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  return filteredProducts;
}

let maxPriceInputElement = document.querySelector('#price-limit');
let searchTermElement = document.querySelector('#text-input');

maxPriceInputElement.addEventListener('input', function () {
  let filteredProducts = filterProducts(products, maxPriceInputElement.value, searchTermElement.value);
  populateProductsGrid(filteredProducts);
});

searchTermElement.addEventListener('input', function () {
  populateProductsGrid(filterProducts(products, maxPriceInputElement.value, searchTermElement.value));
});

function createHTMLProductCard(product) {

  let cardHTML = ` 
    <div class="shadow-md card ">
        <div class= "overflow-hidden">
      <img src="${product.image}" alt="coffee" class="images">
      </div>
      <div class="flex justify-between m-5">
        <h6>${product.name}</h6>
        <i class="fa-regular fa-heart" id="icon" onclick="toggleColor(this)"></i>
      </div>
      <div class="flex justify-between">
      <p class="m-5"><b>$${product.price}</b></p>
      <button data-product-identifier = "${product.id}" class="bg-blue-200 p-1" onclick="addItemToCart('${product.id}')">add to cart</button>
      </div>
    </div>
    
    
     `;
  return cardHTML;
}

function sortPriceAsc(arrayOfItems) {
  let sortedArr = arrayOfItems.sort(function (prod1, prod2) {
    return prod1.price - prod2.price;
  });

  return sortedArr;
}

function sortPriceDesc(arrayOfItems) {
  let sortedArr = arrayOfItems.sort(function (prod1, prod2) {
    return prod2.price - prod1.price;
  });

  return sortedArr;
}
document.querySelector('.sort-asc').addEventListener('click', function () {
  let sortedArr = sortPriceAsc(products)
  populateProductsGrid(sortedArr)
})
document.querySelector('.sort-desc').addEventListener('click', function () {
  let sortedArr = sortPriceDesc(products)
  populateProductsGrid(sortedArr)
})



// add to cart functionality
// document.querySelectorAll('.card button').forEach(function(addToCartBtn){
//   addToCartBtn.addEventListener('click', function(){addItemToCart(addToCartBtn.dataset.productIdentifier)})
// })

let cart = [];

function addItemToCart(productId) {
  // add product to cart
  cart.push(productId)
  updateCartContentsUI()
  updateCartTotalUI()
}

function removeItemFromCart(productID) {
  let updatedCart = cart.filter(function (cartItemID) {
    return cartItemID !== productID
  })
  cart = updatedCart
  updateCartContentsUI()
  updateCartTotalUI()
}

// select div with class cart-contents
let cartContentsElement = document.querySelector('.cart-contents')

// select total price UI element
let totalPriceUIElement = document.querySelector('.cart-total')
function updateCartTotalUI() {

  let totalPrice = 0;
  // calculcate total price
  cart.forEach(function (cartItemID) {
    let product = products.find(function (product) {
      return product.id === cartItemID
    })

    if (!product) {
      return false;
    }

    const price = parseFloat(product.price);
    totalPrice += price;
  })

  // replace HTML
  totalPriceUIElement.innerHTML = `$${totalPrice}`
}
function updateCartContentsUI() {
  cartContentsElement.innerHTML = '';
  cart.forEach(function (cartItem) {
    let cartItemUIElement = generateCartItemHTML(cartItem)

    if (cartItemUIElement == false) {
      // TODO display message telling user that product was not found
      console.log("item not found")
    } else {
      cartContentsElement.innerHTML = cartContentsElement.innerHTML + cartItemUIElement
    }
  })
}

function generateCartItemHTML(itemID) {
  let product = products.find(function (product) {
    return product.id === itemID
  })

  if (!product) {
    return false;
  }

  let cartItemHTML = `

        <div class="shadow-md card ">
        <div class= "overflow-hidden">
      <img src="${product.image}" alt="coffee" class="images">
      </div>
      <div class="cart-item-details p-2">
            <h3 class="product-name">${product.name}</h3>
            <div class="price">$${product.price}</div>
          </div>
          <button onclick="removeItemFromCart('${product.id}')">Remove</button>
    </div>
        `
  return cartItemHTML;
}

let cartElement = document.querySelector('.cart')
// show cart UI when user click on checkout
function showCart() {
  // select cart element
  cartElement.classList.remove('hidden')
}

function hideCart() {
  cartElement.classList.add('hidden')
}