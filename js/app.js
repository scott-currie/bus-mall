'use strict';

var fileNames = ['bag.jpg', 'boots.jpg','chair.jpg',
  'dragon.jpg', 'scissors.jpg', 'tauntaun.jpg',
  'water-can.jpg', 'banana.jpg', 'breakfast.jpg',
  'cthulhu.jpg', 'pen.jpg', 'shark.jpg',
  'unicorn.jpg', 'wine-glass.jpg', 'bathroom.jpg',
  'bubblegum.jpg', 'dog-duck.jpg', 'pet-sweep.jpg',
  'sweep.png', 'usb.gif'];

function Product(imgFilePath, itemNum) {
  this.imgFilePath = imgFilePath;
  this.itemNum = itemNum;
  this.altText = '';
  this.timesShown = 0;
  this.timesChosen = 0;
  Product.allProducts.push(this);
}

// This list holds all our Product objects
Product.allProducts = [];

// Create new Product objects from fileNames
for (let i = 0; i < fileNames.length; i++) {
  var imgFilePath = 'img/' + fileNames[i];
  new Product(imgFilePath, i);
}

// Let's log these to the console to see what they look like
for (let i = 0; i < Product.allProducts.length; i++) {
  // console.log(Product.allProducts[i]);
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
  console.log('allChoices:', allChoices);
  return allChoices;
}

function removeChosenProduct(remainingChoices, index) {
  var targetValue = remainingChoices.indexOf(index);
  if (targetValue >= 0) {
    remainingChoices.splice(remainingChoices.indexOf(index), 1);
    console.log('index:', index, 'remainingChoices:', remainingChoices);
    return remainingChoices.splice(remainingChoices.indexOf(index), 1);
  }
  else {
    console.log('index:', index, 'remainingChoices:', remainingChoices);
    return remainingChoices;
  }
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function randomizeImages() {
  // get a list with all the possible choices
  var availableChoices = getAllChoices();
  // for every previously chosen item, remove that choice
  for (let i = 0; i < Product.prevChoices.length; i++) {
    availableChoices = removeChosenProduct(availableChoices, i);
    console.log('availableChoices:', availableChoices);
  }
  var img1Index = getRandomInRange(0, availableChoices.length);
  availableChoices = removeChosenProduct(availableChoices, img1Index);
  console.log('availableChoices:', availableChoices);
  var img2Index = getRandomInRange(0, availableChoices.length);
  availableChoices = removeChosenProduct(availableChoices, img2Index);
  console.log('availableChoices:', availableChoices);
  var img3Index = getRandomInRange(0, availableChoices.length);
  availableChoices = removeChosenProduct(availableChoices, img3Index);
  console.log('availableChoices:', availableChoices);
  // capture the previous round's choices as Product.prevChoices
  Product.prevChoices = Product.currentChoices;
  // assign new choices to Product.currentChoices;
  Product.currentChoices = [img1Index, img2Index, img3Index];
  // console.log(Product.allProducts[img1Index]);
  // console.log(Product.allProducts[img2Index]);
  // console.log(Product.allProducts[img3Index]);
  document.getElementById('img1').src = Product.allProducts[img1Index].imgFilePath;
  // console.log(document.getElementById('img1'));
  document.getElementById('img2').src = Product.allProducts[img2Index].imgFilePath;
  // console.log(document.getElementById('img2'));  
  document.getElementById('img3').src = Product.allProducts[img3Index].imgFilePath;
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
Product.prevChoices = [0, 1, 2]; // initialize with values we'll never see at runtime
// This holds choices in the current round
Product.currentChoices = [];

randomizeImages();
