let burger = document.querySelector('.header-burger');
let headerMenu = document.querySelector('.header-menu');
let body = document.querySelector('body');

//console.log(burger);
burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    headerMenu.classList.toggle('active');
    body.classList.toggle('lock');
})


let headerMenuItems = document.querySelectorAll('.header-menu--item');

for (let i = 0; i < headerMenuItems.length; i++) {
    headerMenuItems[i].addEventListener('click', function () {
        burger.classList.toggle('active');
        headerMenu.classList.toggle('active');
    })
}


