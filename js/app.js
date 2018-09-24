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


function getAllChoices() {
  // return an array representing the productName property of all items in Product.allProducts
  var allChoices = [];
  for (let i = 0; i < Product.allProducts.length; i++) {
    allChoices.push(Product.allProducts[i].productName);
  }
  console.log('allChoices:', allChoices);
  return allChoices;
}

function removeChosenProduct(availableChoices, prodName) {
  console.log('Trying to remove:', prodName);
  for (let i = 0; i < availableChoices.length; i++) {
    if (availableChoices[i].prodName === prodName) {
      console.log('Found', availableChoices[i]);
      availableChoices[i] = '';
      break;
    }
  }
  return availableChoices;
}

function getRandomInRange(min, max) {
  var randInt = Math.floor(Math.random() * (max - min) + min);
  console.log(min, max, randInt);
  return randInt;
}

function getRandomImage(availableChoices) {
  console.log('availableChoices in getRandomImage:', availableChoices);
  var choice = '';
  while (choice === '') {
    choice = availableChoices[getRandomInRange(0, availableChoices.length)];
    console.log('choice:', choice);
  }
  // remove the image from availableImages
  removeChosenProduct(availableChoices, choice);
  return choice;
}

function getProductId(prodName) {
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (Product.allProducts[i].productName === prodName) {
      return Product.allProduct[i].itemNum;
    }
  }
}

function randomizeImages() {
  // get a list with all the possible choices
  var availableChoices = getAllChoices();
  // for every previously chosen item, remove that choice
  for (let i = 0; i < Product.prevChoices.length; i++) {
    availableChoices = removeChosenProduct(availableChoices, Product.prevChoices[i]);
    console.log('availableChoices:', availableChoices);
  }

  var img1Name = getRandomImage(availableChoices);
  console.log('availableChoices:', availableChoices);
  var img2Name = getRandomImage(availableChoices);
  console.log('availableChoices:', availableChoices);
  var img3Name = getRandomInRange(0, availableChoices);
  console.log('availableChoices:', availableChoices);
  
  // capture the previous round's choices as Product.prevChoices
  Product.prevChoices = Product.currentChoices;
  // assign new choices to Product.currentChoices;
  Product.currentChoices = [img1Name, img2Name, img3Name];
  // console.log(Product.allProducts[img1Index]);
  // console.log(Product.allProducts[img2Index]);
  // console.log(Product.allProducts[img3Index]);
  document.getElementById('img1').src = Product.allProducts[getProductId(img1Name)].imgFilePath;
  // console.log(document.getElementById('img1'));
  document.getElementById('img2').src = Product.allProducts[getProductId(img2Name)].imgFilePath;
  // console.log(document.getElementById('img2'));  
  document.getElementById('img3').src = Product.allProducts[getProductId(img3Name)].imgFilePath;
  // console.log(document.getElementById('img3'));
}

function doChoice(event) {
  console.log(event);
}


// Need an event listener for each image element
var img1 = document.getElementById('img1');
img1.addEventListener('click', doChoice);
var img2 = document.getElementById('img2');
img2.addEventListener('click', doChoice);
var img3 = document.getElementById('img3');
img3.addEventListener('click', doChoice);

// Some test stuff


// Need an action to display new images

// We need to do this a set number (25) of times
var rounds = 0;
var currentChoices = [];
// This holds the choices from the previous round
Product.prevChoices = ['placeholder', 'placeholder', 'placeholder']; // initialize with values we'll never see at runtime
// This holds choices in the current round
Product.currentChoices = ['', '', ''];

randomizeImages();
