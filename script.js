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
      
      function filterStoreItems() {
        let searchValue = searchInput.value;
        let maxPrice = priceLimitElement.value;
        if (isNaN(maxPrice)) {
          maxPrice = 0;
        }

        // loop over all cards
        cards.forEach(function (element) {
          const cardInnerText = element.innerText;
          const cardInnerTextParts = cardInnerText.split('$');
          const cardPrice = cardInnerTextParts[1];
          // above is equivalent to const cardPrice = element.innerText.split('$')[1]

          // either add or remove class hidden
          // if card text content matches search value, remove class hidden
          // hide the ones that are not matching search
          // & show the matching ones
          if (element.innerText.toLowerCase().includes(searchValue.toLowerCase()) && (0 == maxPrice || cardPrice < maxPrice)) {
            console.log('entered block to show card', cardPrice, maxPrice);
            element.classList.remove('hidden');
          } else {
            element.classList.add('hidden');
          }
        });
      }
      const cards = document.querySelectorAll('.card');
      // store search filtering
      let searchInput = document.querySelector('#store-search input[type=text]');
      searchInput.addEventListener('input', filterStoreItems);
      // get reference of the price limit input
      const priceLimitElement = document.querySelector('#price-limit');
      priceLimitElement.addEventListener('change', filterStoreItems);