'use strict';

var fileNames = ['bag.jpg', 'boots.jpg','chair.jpg',
  'dragon.jpg', 'scissors.jpg', 'tauntaun.jpg',
  'water-can.jpg', 'banana.jpg', 'breakfast.jpg',
  'cthulhu.jpg', 'pen.jpg', 'shark.jpg',
  'unicorn.jpg', 'wine-glass.jpg', 'bathroom.jpg',
  'bubblegum.jpg', 'dog-duck.jpg', 'pet-sweep.jpg',
  'sweep.png', 'usb.gif'];

function Product(imgFileName, itemNum) {
  this.imgFilePath = 'img/' + imgFileName;
  this.productName = imgFileName.substring(0, imgFileName.lastIndexOf('.'));
  this.itemNum = itemNum;
  this.altText = '';
  this.timesShown = 0;
  this.timesChosen = 0;
  Product.allProducts.push(this);
  // console.log(this);
}

// This list holds all our Product objects
Product.allProducts = [];

// Create new Product objects from fileNames
for (let i = 0; i < fileNames.length; i++) {
  var imgFileName = fileNames[i];
  new Product(imgFileName, i);
}

// Let's log these to the console to see what they look like
// for (let i = 0; i < Product.allProducts.length; i++) {
// console.log(Product.allProducts[i]);
// }

// Need code to randomize the images
// Need code to ensure images selected this round are unique
// Need code to track the previous images selected


// function getAllChoices() {
//   // return an array representing the productName property of all items in Product.allProducts
//   var allChoices = [];
//   for (let i = 0; i < Product.allProducts.length; i++) {
//     allChoices.push(Product.allProducts[i].productName);
//   }
//   console.log('allChoices:', allChoices);
//   return allChoices;
// }

// function removeChosenProduct(availableChoices, prodName) {
//   console.log('Trying to remove:', prodName);
//   for (let i = 0; i < availableChoices.length; i++) {
//     if (availableChoices[i].prodName === prodName) {
//       console.log('Found', availableChoices[i]);
//       availableChoices[i] = '';
//       break;
//     }
//   }
//   return availableChoices;
// }

function getRandomInRange(max) {
  var randInt = Math.floor(Math.random() * max);
  return randInt;
}

function vote(event) {
  // was this click a vote?
  if ((event.target.id === 'img1') || (event.target.id === 'img2') || (event.target.id === 'img3')) {
    console.log(event.target.id);
    console.log(event);
    // I can get the src of the clicked image like this:
    var targetImgSrc = document.getElementById(event.target.id).src;
    console.log(targetImgSrc);
    // I can then use that to id the Product object
    targetImgSrc = targetImgSrc.replace('http://127.0.0.1:8080/', '');
    var chosen = getObjectByImgSrc(targetImgSrc);
    console.log(chosen);
    // find out which img was clicked

    // increment that object's value

    randomizeImages();
    showImages();
  }
}

function getObjectByImgSrc(imgSrc) {
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (Product.allProducts[i].imgFilePath === imgSrc) {
      return Product.allProducts[i];
    }
  }
}


function randomizeImages() {
  var blacklist = []; // values that are off limits this time
  // add prevChoices to blacklist
  blacklist = blacklist.concat(Product.prevChoices);
  // get a list with all the possible choices
  var randProd1Idx = getRandomProductIndex(blacklist);
  var randProd2Idx = getRandomProductIndex(blacklist);
  var randProd3Idx = getRandomProductIndex(blacklist);
  // console.log(randProd1Idx, randProd2Idx, randProd3Idx, blacklist);
  Product.prevChoices = [randProd1Idx, randProd2Idx, randProd3Idx];

}

function getRandomProductIndex(blacklist) {
  var numToTry;
  // keep trying until we get a random # not in blacklist
  do {
    numToTry = Math.floor(Math.random() * Product.allProducts.length);
  }
  while (blacklist.indexOf(numToTry) >= 0);
  blacklist.push(numToTry);
  console.log(numToTry, blacklist);
  return numToTry;
}


function showImages() {
  document.getElementById('img1').src = Product.allProducts[Product.prevChoices[0]].imgFilePath;
  document.getElementById('img2').src = Product.allProducts[Product.prevChoices[1]].imgFilePath;
  document.getElementById('img3').src = Product.allProducts[Product.prevChoices[2]].imgFilePath;
  // randomizeImages();
}


// Need an event listener for each image element
var img1 = document.getElementById('img1');
img1.addEventListener('click', vote);
var img2 = document.getElementById('img2');
img2.addEventListener('click', vote);
var img3 = document.getElementById('img3');
img3.addEventListener('click', vote);


// This holds the choices from the previous round
Product.prevChoices = []; // initialize with values we'll never see at runtime
// This holds choices in the current round
Product.currentChoices = [];

randomizeImages();
showImages();
