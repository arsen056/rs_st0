// ----- Burger -----
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const links =  nav.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
    document.body.classList.toggle('lock');
    burger.classList.toggle('burger-active');
    nav.classList.toggle('nav-active');

});

nav.addEventListener('click', closeMenu);

function closeMenu() {
    if (nav.classList.contains('nav-active')) {
        document.body.classList.remove('lock');
        burger.classList.remove('burger-active');
        nav.classList.remove('nav-active');
    }
}

// ----- Portfolio img -----
const portfolioBtns = document.querySelector('.button-list');
const portfolioImages = document.querySelectorAll('.portfolio-img');
const portfolioButtons = document.querySelectorAll('.portfolio-btn');

portfolioBtns.addEventListener('click', changeImage);

function changeImage(event) {
    let target = event.target;

    // Delete highlite btn
    portfolioButtons.forEach(btn => {
        btn.classList.remove('btn-active')
    })

    if (event.target.classList.contains('portfolio-btn')) {     
        event.target.classList.add('btn-active');         
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${target.dataset.season}/${index + 1}.jpg`);
    }
}

// ----- Translate -----
import i18Obj from './js/translate.js';

const enLang = document.querySelector('.nav-link-en');
const ruLang = document.querySelector('.nav-link-ru');
const langCont = document.querySelector('.lang-btn');
const langs = document.querySelectorAll('.lang')

langCont.addEventListener('click', changeColorLink);
enLang.addEventListener('click', () => { getTranslate('en') });
ruLang.addEventListener('click', () => { getTranslate('ru') });

function getTranslate(lang) {    
    langs.forEach(btn => { btn.classList.remove('nav-link-active') });

    const words = document.querySelectorAll('[data-i18]');
    words.forEach(txt => txt.textContent = i18Obj[lang][txt.dataset.i18]);
}

function changeColorLink(event) {  
    if (event.target.classList.contains('lang')) {
        event.target.classList.add('nav-link-active');
    }    
}