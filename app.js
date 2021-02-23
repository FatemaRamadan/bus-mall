'use strict';


let leftImageIndex;
let rightImageIndex;
let middleImageIndex;
let leftImageElement = document.getElementById('leftImage');
let middleImageElement = document.getElementById('middleImage');
let rightImageElement = document.getElementById('rightImage');
let userAttemptCounter = 0;
let maxAttempt = 25;
let ImagesShown = [];
let busImgName = [];
let imgVotes = [];
let firstSetArry = [];
//idefntify the function that will have the images attr.

function BusMall(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.show = 0;
    BusMall.allImages.push(this);
    busImgName.push(name);

}
// creating the array of imges
BusMall.allImages = [];

//creating function to transfer data into string
function setItem() {
    let data = JSON.stringify(BusMall.allImages);
    console.log(data);
    localStorage.setItem('busMall', data);
}

//now getting items from local storge
function getItems() {
    let backToString = localStorage.getItem('busMall');
    let normalObj = JSON.parse(backToString);
    console.log(normalObj);
    if (normalObj !== null) {
        BusMall.allImages = normalObj;
        for (let i = 0; i < BusMall.allImages.length; i++) {
            ImagesShown.push(BusMall.allImages[i].show);
            imgVotes.push(BusMall.allImages[i].votes);
        }
        viewCharts();
    }

    renderThreeImages();
}


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
    rightImageIndex = generateRandomImages();
    leftImageIndex = generateRandomImages();

    firstSetArry.push(leftImageIndex);
    firstSetArry.push(middleImageIndex);
    firstSetArry.push(rightImageIndex);
    //console.log(firstSetArry);
    do {
        middleImageIndex = generateRandomImages();
        rightImageIndex = generateRandomImages();
        leftImageIndex = generateRandomImages();
    } while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex || firstSetArry.includes(leftImageIndex) || firstSetArry.includes(middleImageIndex) || firstSetArry.includes(rightImageIndex))

    firstSetArry = [];
    firstSetArry.push(leftImageIndex);
    firstSetArry.push(middleImageIndex);
    firstSetArry.push(rightImageIndex);
    console.log(firstSetArry);

    BusMall.allImages;
    leftImageElement.src = BusMall.allImages[leftImageIndex].source;
    BusMall.allImages[leftImageIndex].show++;
    middleImageElement.src = BusMall.allImages[middleImageIndex].source;
    BusMall.allImages[leftImageIndex].show++;
    rightImageElement.src = BusMall.allImages[rightImageIndex].source;
    BusMall.allImages[leftImageIndex].show++;

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
        for (let i = 0; i < BusMall.allImages.length; i++) {
            ImagesShown.push(BusMall.allImages[i].show);
            imgVotes.push(BusMall.allImages[i].votes);
        }
        viewCharts();
        setItem();

        images.removeEventListener('click', handleUserClicks);
    }
}

let resultBtn = document.getElementById('resultsButton');
resultBtn.addEventListener('click', renderUl);


function renderUl() {
    let list = document.getElementById('resultList');
    let userResult;
    for (let i = 0; i < BusMall.allImages.length; i++) {
        userResult = document.createElement('li');
        list.appendChild(userResult);
        userResult.textContent = BusMall.allImages[i].name + 'has Earned :    ' + BusMall.allImages[i].votes + '       votes' + 'and has been disblayed   ' + BusMall.allImages[i].show;
        console.log(list);
    }
}



function viewCharts() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: busImgName,
            datasets: [{
                label: 'ImgesVote',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: imgVotes,
            },
            {
                label: 'Imge shown',
                backgroundColor: 'dark blue',
                borderColor: 'red',
                data: ImagesShown
            },]
        },
        // Configuration options go here
        options: {}
    });
}
getItems();