let imageSources = ['images/cover.jpg','images/cover2.jfif','images/cover3.jfif']
let script = ['Stipy Zig Zag Jigsaw Pillow and Duvet Set','Real Bambo Wall Clock','Brown and Blue Hardbound Book']


let imgIndex = 0;
let scriptIndex = 0;
updateUI();

function moveRight() {
    // move pointer one step to the right
    imgIndex = imgIndex + 1;
    if(imgIndex>imageSources.length - 1){
        imgIndex= 0;
    }
    scriptIndex = scriptIndex + 1;
    if(scriptIndex>script.length - 1){
        scriptIndex= 0;
    }
    updateUI();
}


function moveLeft() {
    imgIndex = imgIndex - 1;
    if(imgIndex<0){
        imgIndex= imageSources.length - 1;
    }
    scriptIndex = scriptIndex - 1;
    if(scriptIndex<0){
        scriptIndex= script.length - 1;
    }
    
    updateUI();
}

function updateUI() {
    document.querySelector('#cover-image img').src = imageSources[imgIndex];
    document.querySelector('#cover-image .text').textContent = script[scriptIndex];
}

let leftBtn = document.querySelector('#button1')
leftBtn.addEventListener('click', moveLeft )

let rightBtn = document.querySelector('#button2')
rightBtn.addEventListener('click',  moveRight )

// let script = ['Stipy Zig Zag Jigsaw Pillow and Duvet Set','Real Bambo Wall Clock','Brown and Blue Hardbound Book']

// let scriptIndex = 0;
// updateUI2();

// function moveRight() {
//     // move pointer one step to the right
//     imgIndex = imgIndex + 1;
//     if(scriptIndex=script.length - 1){
//         scriptIndex= 0;
//     }
//     updateUI2();
// }


// function moveLeft() {
//     scriptIndex = scriptIndex - 1;
//     if(scriptIndex<0){
//         scriptIndex= script.length - 1;
//     }
//     updateUI2();
// }

// function updateUI2() {
//     document.querySelector('#cover-image .text').textContent = script[scriptIndex];
// }

// let leftButton = document.querySelector('#button1')
// leftButton.addEventListener('click', moveLeft )

// let rightButton = document.querySelector('#button2')
// rightButton.addEventListener('click',  moveRight )
