const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const links =  nav.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
    document.body.classList.toggle('lock');
    burger.classList.toggle('burger-active');
    nav.classList.toggle('nav-active');

});

links.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            document.body.classList.remove('lock');
            burger.classList.remove('burger-active');
            nav.classList.remove('nav-active');
        }
    })
})