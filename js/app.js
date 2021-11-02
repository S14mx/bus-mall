'use strict';

//global variables/arrays
const container = document.querySelector('#imgs');
let button = document.querySelector('.button');
let imageOne = document.querySelector('.img-one');
let imageTwo = document.querySelector('.img-two');
let imageThree = document.querySelector('.img-three');
const results = document.querySelector('ul');

let allImgs = [];
let imgNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let clicks = 0;
const clicksAllowed = 25;

//constructor
function Image(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.likes = 0;
  this.views = 0;
  allImgs.push(this);
}

//creating image instances with jpg format
for (let i = 0; i < imgNames.length; i++) {
  new Image(imgNames[i]);
}

//manually creating instance for png image
new Image('sweep', 'png');

//random number/image function
function selectRandomImg() {
  return Math.floor(Math.random() * allImgs.length + 1);
}

//render image function
function renderImg() {
  let images = [];
  let img1 = selectRandomImg();
  images.push(img1);
  let img2 = selectRandomImg();
  while (images.includes(img2)) {
    img2 = selectRandomImg();
  }
  images.push(img2);
  let img3 = selectRandomImg();
  while (images.includes(img3)) {
    img3 = selectRandomImg();
  }
  images.push(img3);
  imageOne.src = allImgs[img1].src;
  imageOne.alt = allImgs[img1].name;
  allImgs[img1].views++;

  imageTwo.src = allImgs[img2].src;
  imageTwo.alt = allImgs[img2].name;
  allImgs[img2].views++;

  imageThree.src = allImgs[img3].src;
  imageThree.alt = allImgs[img3].name;
  allImgs[img3].views++;
}

//event handler
function handleImageClick(event) {
  if (event.target === container) {
    alert('Please click on an image');
    return false;
  } else {
    clicks++;
  }

  let clickedImage = event.target.alt;
  for (let i = 0; i < allImgs.length; i++) {
    if (clickedImage === allImgs[i].name) {
      allImgs[i].likes++;
    }
  }

  renderImg();

  if (clicks === clicksAllowed) {
    container.removeEventListener('click', handleImageClick);
    button.addEventListener('click', handleButtonClick);
    button.className = 'clicks-allowed';

  }
}

//render results
function handleButtonClick() {
  for (let i = 0; i < allImgs.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allImgs[i].name} had ${allImgs[i].likes} likes and was viewed ${allImgs[i].views} times.`;
    results.appendChild(li);
  }
}

renderImg();

container.addEventListener('click', handleImageClick);
