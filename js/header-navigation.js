// ------- создание html-элементов -------
let headerElement = document.createElement('header');
headerElement.className = 'header-navigation';

for(let i=0; i<3; i++){
    let headerNavigation__link = document.createElement('div');
    headerNavigation__link.className = 'header-navigation__link';
    headerElement.appendChild(headerNavigation__link);
}
headerElement.childNodes[0].textContent = 'Назад';
headerElement.childNodes[1].textContent = 'Меню';
headerElement.childNodes[2].textContent = 'Вперед';

document.querySelector('body').appendChild(headerElement);

// ------- создание переходов на страницы --------
let titlePages = ['Светофор','Калькулятор','Угадайка','Генератор случайных пользователей','Овощи'];
let urlPages = ['../pages/m6_index.html', '../pages/m7_index.html', '../pages/m8_index.html', '../pages/m9_index.html', '../pages/m10_index.html'];
let index = titlePages.indexOf(document.title);
let lastIndex = titlePages.length - 1;

let pages = document.querySelectorAll('.header-navigation__link');
pages[0].addEventListener('click', () => window.open(urlPages[index==0 ? lastIndex : index-1], "_self"));
pages[1].addEventListener('click', () => window.open("../index.html", "_self"));
pages[2].addEventListener('click', () => window.open(urlPages[index==lastIndex ? 0 : index+1], "_self"));