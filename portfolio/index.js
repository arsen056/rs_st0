console.log('Вёрстка соответствует макету. Ширина экрана 768px +48')
console.log('Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15')
console.log('На ширине экрана 768рх и меньше реализовано адаптивное меню +22')
console.log('Итого: 75 баллов')

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