console.log("Разобраться в чужом коде - 10 баллов");
console.log("Бесконечный слайдер - 10 баллов");
console.log("Пролистывание слайдера колёсиком мышки - 10 баллов");

const container = document.querySelector('.container');
const mainSlide = document.querySelector('.main-slide');
const leftSlide = document.querySelector('.left-slide');
const upBtn = document.querySelector('.up-btn');
const downBtn = document.querySelector('.down-btn');
const slidesLength = leftSlide.querySelectorAll('div').length;
const leftItems =  document.getElementById('left-slide');
const mainItems =  document.getElementById('main-slide');
const sliderHeight = container.clientHeight;
let isEnabled = true;
const slidesMain = document.getElementsByClassName('main-item');
const firstMain = slidesMain[0];
const lastMain = slidesMain[slidesLength - 1];
const cloneFirstMain = firstMain.cloneNode(true);
const cloneLastMain = lastMain.cloneNode(true);
document.getElementById('main-slide').appendChild(cloneFirstMain)
document.getElementById('main-slide').insertBefore(cloneLastMain, firstMain);

const slidesLeft = document.getElementsByClassName('left-item');
const firstLeft = slidesLeft[0];
const lastLeft = slidesLeft[slidesLength - 1];
document.getElementById('left-slide').appendChild(firstLeft.cloneNode(true));
document.getElementById('left-slide').insertBefore(lastLeft.cloneNode(true), firstLeft);

let activeSlideIndex = 0;

leftSlide.style.top = `-${(slidesLength) * 100}vh`;
mainSlide.style.top = `-${(slidesLength - (slidesLength - 1)) * 100}vh`;

upBtn.addEventListener('click', () => changeSlide ('up'));
downBtn.addEventListener('click', () => changeSlide ('down'));

container.addEventListener('mousewheel', onWheel);
function onWheel(e) {
  e = e || window.event;
  if (e.deltaY > 0) {
    changeSlide ('up');
  } else {
    changeSlide ('down');
  }
}

leftItems.classList.add('shift');
mainItems.classList.add('shift');
mainItems.addEventListener('transitionend', checkIndex);
leftItems.addEventListener('transitionend', checkIndex);

const changeSlide = (direction) => {
  leftItems.classList.add('shift');
  mainItems.classList.add('shift');
  if (isEnabled) {
    if (direction === 'up') {
      activeSlideIndex++
  } else if (direction === 'down') {
      activeSlideIndex--
      if (activeSlideIndex < 0) {
        mainSlide.style.transform = `translateY(${sliderHeight}px)`
      }    
    }
  }
    mainSlide.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    leftSlide.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    isEnabled = false;
}

function checkIndex (){
    leftItems.classList.remove('shift');
    mainItems.classList.remove('shift');

    if (activeSlideIndex == -1) {      
      activeSlideIndex = slidesLength - 1;
      mainSlide.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
      leftSlide.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    }

    if (activeSlideIndex == slidesLength) {
      activeSlideIndex = 0;
      mainSlide.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
      leftSlide.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    }
    isEnabled = true;
  }