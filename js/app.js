'use strict';

var fileNames = ['bag.jpg', 'boots.jpg','chair.jpg',     
'dragon.jpg', 'scissors.jpg', 'tauntaun.jpg',  
'water-can.jpg', 'banana.jpg', 'breakfast.jpg',  
'cthulhu.jpg', 'pen.jpg', 'shark.jpg',     
'unicorn.jpg', 'wine-glass.jpg', 'bathroom.jpg', 
'bubblegum.jpg', 'dog-duck.jpg', 'pet-sweep.jpg',  
'sweep.png', 'usb.gif'];

function Product(filePath) {
    this.filePath = filePath;
    this.altText = '';
    this.timesShown = 0;
    this.timesChosen = 0;
    Product.allProducts.push(this);
}

// This list holds all our Product objects
Product.allProducts = [];

// Create new Product objects from fileNames
for (let i = 0; i < fileNames.length; i++) {
    var filePath = 'img/' + fileNames[i];
    new Product(filePath);
}


// Need code to randomize the images
    // Need code to ensure images selected this round are unique
    // Need code to track the previous images selected


function getAllChoices() {
    // return an array representing the indices of all items in Product.allProducts
    var allChoices = [];
    for (let i = 0; i < Product.allProducts.length; i++) {
        allChoices.push(i);
    }
    return allChoices;
}

function removeChosenProduct(remainingChoices, index) {
    return remainingChoices.splice(remainingChoices.indexOf(index), 1);
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
    

function randomizeImages(prevImgs) {
    // get a list with all the possible choices
    var availableChoices = getAllChoices();
    // for every previously chosen item, remove that choice
    for (let i = 0; i < Product.prevChoices.length; i++) {
        availableChoices = removeChosenProduct(availableChoices, i);
    }
    var img1Index = getRandomInRange(0, availableChoices.length);
    availableChoices = removeChosenProduct(availableChoices, img1Index);
    var img2Index = getRandomInRange(0, availableChoices.length);
    availableChoices = removeChosenProduct(availableChoices, img2Index);
    var img3Index = getRandomInRange(0, availableChoices.length);
    availableChoices = removeChosenProduct(availableChoices, img3Index);
    Product.prevChoices = [img1Index, img2Index, img3Index];
}



// Need an event listener for each image element
var img1 = document.getElementById('img1');


// Need an action to display new images

// We need to do this a set number (25) of times
var rounds = 0;
var currentChoices = [];
// This holds the choices from the previous round
Product.prevChoices = [-1, -1, -1]; // initialize with values we'll never see at runtime
for (let i = 0; i < rounds; i++) {
    // Do all the stuff
    randomizeImages(prevChoices);
}