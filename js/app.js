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
    this.timesShown = 0;
    this.timesChosen = 0;
    Product.allProducts.push(this);
}

Product.allProducts = [];

// Create new Product objects from fileNames
for (let i = 0; i < fileNames.length; i++) {
    var filePath = 'img/' + fileNames[i];
    new Product(filePath);
}

// Create new Product objects from fileNames
for (let i = 0; i < Product.allProducts.length; i++) {
    console.log(Product.allProducts[i]);
}



// Need code to randomize the images
    // Need code to ensure images selected this round are unique
    // Need code to track the previous images selected
    
    