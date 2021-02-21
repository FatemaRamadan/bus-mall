'use strict';


let leftImageIndex;
let rightImageIndex;
let middleImageIndex;
let leftImageElement = document.getElementById('leftImage');
let middleImageElement = document.getElementById('middleImage');
let rightImageElement = document.getElementById('rightImage');
let userAttemptCounter = 0;
let maxAttempt = 25;
//idefntify the function that will have the images attr.

function BusMall(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.show = 0;
    BusMall.allImages.push(this);
}
BusMall.allImages = [];

//adding new instances
new BusMall('bag', 'img/assets/bag.jpg');
new BusMall('banana', 'img/assets/banana.jpg');
new BusMall('bathroom', 'img/assets/bathroom.jpg');
new BusMall('boots', 'img/assets/boots.jpg');
new BusMall('breakfast', 'img/assets/breakfast.jpg');
new BusMall('bubblegum', 'img/assets/bubblegum.jpg');
new BusMall('chair', 'img/assets/chair.jpg');
new BusMall('cthulhu', 'img/assets/cthulhu.jpg');
new BusMall('dog-duck', 'img/assets/dog-duck.jpg');
new BusMall('dragon', 'img/assets/dragon.jpg');
new BusMall('pet-sweep', 'img/assets/pet-sweep.jpg');
new BusMall('scissors', 'img/assets/scissors.jpg');
new BusMall('shark', 'img/assets/shark.jpg');
new BusMall('sweep', 'img/assets/sweep.png');
new BusMall('tauntaun', 'img/assets/tauntaun.jpg');
new BusMall('unicorn', 'img/assets/unicorn.jpg');
new BusMall('usb', 'img/assets/usb.gif');
new BusMall('water-can', 'img/assets/water-can.jpg');
new BusMall('wine-glass', 'img/assets/wine-glass.jpg');
console.log(BusMall.allImages);

//making random images function

function generateRandomImages() {
    let gererator = Math.floor(Math.random() * BusMall.allImages.length);
    return gererator;
}
console.log(Math.floor(Math.random() * BusMall.allImages.length));

// creat the rendered images 
function renderThreeImages() {
    middleImageIndex = generateRandomImages();

    do {
        rightImageIndex = generateRandomImages();
        leftImageIndex = generateRandomImages();
    } while (leftImageIndex === rightImageElement || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex)

    BusMall.allImages;

    leftImageElement.src = BusMall.allImages[leftImageIndex].source;
    middleImageElement.src = BusMall.allImages[middleImageIndex].source;
    rightImageElement.src = BusMall.allImages[rightImageIndex].source;

}
//rightImageElement.src=BusMall.allImages[0].source;
console.log(rightImageElement);
renderThreeImages();


let images = document.getElementById('images');
images.addEventListener('click', handleUserClicks);


function handleUserClicks(event) {
    userAttemptCounter++;
    if (userAttemptCounter < maxAttempt) {
        if (event.target.id === 'leftImage' || event.target.id === 'middleImage' || event.target.id === 'rightImage') {
            console.log(event.target.id);
            if (event.target.id === 'leftImage') {
                BusMall.allImages[leftImageIndex].votes++;
            } else if (event.target.id === 'middleImage') {
                BusMall.allImages[middleImageIndex].votes++;
            } else {
                BusMall.allImages[rightImageIndex].votes++;
            }
            renderThreeImages();
        }
    }
    else {
        let list = document.getElementById('resultList');
        let userResult;
        for (let i = 0; i < BusMall.allImages.length; i++) {
            userResult = document.createElement('li');
            list.appendChild(userResult);
            userResult.textContent = BusMall.allImages[i].name + 'has Earned :    ' + BusMall.allImages[i].votes + '       votes';
            console.log(list);
        }
    images.removeEventListener('click',handleUserClicks);
   // middleImageIndex.removeEventListner('click', handleUserClicks);
   // leftImageIndex.removeEventListner('click', handleUserClicks);
    }
}

