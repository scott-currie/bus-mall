'use strict';

var fileNames = ['bag.jpg', 'boots.jpg','chair.jpg',
  'dragon.jpg', 'scissors.jpg', 'tauntaun.jpg',
  'water-can.jpg', 'banana.jpg', 'breakfast.jpg',
  'cthulhu.jpg', 'pen.jpg', 'shark.jpg',
  'unicorn.jpg', 'wine-glass.jpg', 'bathroom.jpg',
  'bubblegum.jpg', 'dog-duck.jpg', 'pet-sweep.jpg',
  'sweep.png', 'usb.gif'];

function Product(imgFileName, itemNum) {
  this.imgFilePath = 'img/products/' + imgFileName;
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
  console.log(Product.allProducts[i]);
}

function vote(event) {
  // get a reference to the clicked element id
  var targetId = event.target.id;
  // Here's our image id's
  var imgTagIds = ['img1', 'img2', 'img3'];
  // was this click a vote?
  if ((targetId === 'img1') || (targetId === 'img2') || (targetId === 'img3')) {
    // get the index of the tag that was chosen
    var chosenIdx = imgTagIds.indexOf(targetId);
    // loop through all the img tags
    for (let i = 0; i < 3; i++) {
      // get the src attribute of the current tag
      var targetImgName = document.getElementById(imgTagIds[i]).alt;
      // strip off the url part
      console.log('targetImgName', targetImgName);
      // use the img src to find the object associated with the image
      var thisProduct = getProductByName(targetImgName);
      // increment timesShown
      thisProduct.timesShown++;
      if (i === chosenIdx) {
        // increment timesChosen if this was the tag at chosenIdx
        thisProduct.timesChosen++;
      }
    }

    // decrement trials
    trials--;
    // set up the next trio of images if we're not out of trials
    if (trials > 0) {
      // Randomize the images
      randomizeImages();
      // Display the next 3 images
      showImages();
    }
    else {
      disableEventListeners();
      summarizeResults();
    }
  }
}

function getProductByName(prodName) {
  for (var product of Product.allProducts) {
    if (product.productName === prodName) {
      return product;
    }   
  }
}

function randomizeImages() {
  var blacklist = []; // values that are off limits this time
  // add prevChoices to blacklist
  blacklist = blacklist.concat(Product.prevChoices);
  // get 3 random indices that are not in blacklist
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
  // Get each img element and change its src attribute to match the currently selected random indices
  document.getElementById('img1').src = Product.allProducts[Product.prevChoices[0]].imgFilePath;
  document.getElementById('img1').alt = Product.allProducts[Product.prevChoices[0]].productName;
  document.getElementById('img2').src = Product.allProducts[Product.prevChoices[1]].imgFilePath;
  document.getElementById('img2').alt = Product.allProducts[Product.prevChoices[1]].productName;
  document.getElementById('img3').src = Product.allProducts[Product.prevChoices[2]].imgFilePath;
  document.getElementById('img3').alt = Product.allProducts[Product.prevChoices[2]].productName;
}

function disableEventListeners() {
  var imgEls = [img1, img2, img3];
  for (let i = 0; i < imgEls.length; i++) {
    imgEls[i].removeEventListener('click', vote);
  }
}

function summarizeResults() {
  for (let i = 0; i < Product.allProducts.length; i++) {
    var thisProd = Product.allProducts[i];
    var result = 'Item ' + thisProd.productName + ' was seen ' + thisProd.timesShown + ' times and chosen ' + thisProd.timesChosen + ' times.';
    console.log(result);
    var resultP = document.getElementById('results').appendChild(document.createElement('p'));
    resultP.textContent = result;
  }
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

var trials = 25;

randomizeImages();
showImages();
