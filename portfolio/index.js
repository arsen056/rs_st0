// ----- Burger -----
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

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
    languague = lang;
    const words = document.querySelectorAll('[data-i18]');
    words.forEach(txt => txt.textContent = i18Obj[lang][txt.dataset.i18]);
}

function changeColorLink(event) {  
    if (event.target.classList.contains('lang')) {
        langs.forEach(btn => { btn.classList.remove('nav-link-active') });
        event.target.classList.add('nav-link-active');
    }    
}

// ----- light theme ----- 
const theme = document.querySelector('.toggle-theme');
const body = document.querySelector('body');

theme.addEventListener('click', changeTheme);

function changeTheme (){
    if (body.getAttribute('data-theme') === 'light') { 
        body.setAttribute('data-theme', 'dark')
        currentTheme = 'dark';
    } else {
        body.setAttribute('data-theme', 'light')
        currentTheme = 'light';
    }
}

// Function for local storage
function changeLoadTheme(theme) {
    body.setAttribute('data-theme', theme);
}

// Save settings
let languague = 'en';
let currentTheme = 'light';
function setLocalStorage() {
    localStorage.setItem('languague', languague);
    localStorage.setItem('currentTheme', currentTheme);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('languague')) {
        const lang = localStorage.getItem('languague');
        const theme = localStorage.getItem('currentTheme');
        getTranslate(lang);
        changeLoadTheme(theme);
    }
}
window.addEventListener('load', getLocalStorage)