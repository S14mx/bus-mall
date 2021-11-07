'use strict';

//global variables/arrays
const container = document.querySelector('#imgs');
let imageOne = document.querySelector('.img-one');
let imageTwo = document.querySelector('.img-two');
let imageThree = document.querySelector('.img-three');

let allImgs = [];
let images = [];
let imgNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let clicks = 0;
const clicksAllowed = 25;

//constructor
function Image(name, src, likes = 0, views = 0) { //fileExtension = 'jpg'
  this.name = name;
  this.src = src; //`img/${name}.${fileExtension}`
  this.likes = likes;
  this.views = views;
  allImgs.push(this);
}

//creating image instances with jpg format
function createProductInstances() {
  for (let i = 0; i < imgNames.length; i++) {
    new Image(imgNames[i], `img/${imgNames[i]}.jpg`);
  }
  //manually creating instance for png image
  new Image('sweep', 'img/sweep.png');
  capitalizeNames();
}
createProductInstances();

//function that capitalizes names
function capitalizeNames() {
  let firstLetter = '';
  let combine = '';
  for (let i = 0; i < allImgs.length; i++) {
    firstLetter = allImgs[i].name.charAt(0);
    combine = firstLetter.toUpperCase() + allImgs[i].name.slice(1);
    allImgs[i].name = combine;
  }
}

//random number/image function
function selectRandomImg() {
  return Math.floor(Math.random() * allImgs.length);
}

//render image function (first 6 are unique)
function renderImg() {
  while (images.length < 6) {
    let randNum = selectRandomImg();
    if (!images.includes(randNum)) {
      images.push(randNum);
    }
  }

  let img1 = images.shift();
  let img2 = images.shift();
  let img3 = images.shift();

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

//Store products
function setProducts() {
  let stringifiedImgs = JSON.stringify(allImgs);
  localStorage.setItem('product', stringifiedImgs);
}


//Reinstanciate function
function reinstanciate(name, src, likes, views) {
  new Image(name, src, likes, views);
  allImgs.shift();
}

//Retrieve products
function getProducts() {
  let potentialProducts = localStorage.getItem('product');
  if (potentialProducts) {
    let parsedProducts = JSON.parse(potentialProducts);
    for (let order of parsedProducts) {
      let name = order.name;
      let src = order.src;
      let likes = order.likes;
      let views = order.views;
      reinstanciate(name, src, likes, views);
    }
  }
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

  //stop clicks function
  if (clicks === clicksAllowed) {
    container.removeEventListener('click', handleImageClick);
    renderChart();
  }
}

//chart render function with bar chart from chart.js
function renderChart() {
  let imgNames = [];
  let imgViews = [];
  let imgLikes = [];
  for (let i = 0; i < allImgs.length; i++) {
    imgNames.push(allImgs[i].name);
    imgViews.push(allImgs[i].views);
    imgLikes.push(allImgs[i].likes);
  }
  const labels = imgNames;
  const data = {
    labels: labels,
    datasets: [{
      label: 'Views',
      data: imgViews,
      minBarLength: 10,
      hoverBackgroundColor: 'rgba(255, 162, 139, 0.8)',
      backgroundColor: [
        'rgba(234, 240, 178, 1)'
      ],
      borderColor: [
        'rgb(234, 240, 178)',
      ],
      borderWidth: 1
    },
    {
      label: 'Likes',
      data: imgLikes,
      minBarLength: 10,
      hoverBackgroundColor: 'rgba(255, 162, 139, 0.8)',
      backgroundColor: [
        'rgba(88, 247, 86, 1)'
      ],
      borderColor: [
        'rgb(88, 247, 86)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  let footer = document.querySelector('.footer');
  footer.textContent = 'Thank you for participating!';
  setProducts();
}

renderImg();


container.addEventListener('click', handleImageClick);
getProducts();

