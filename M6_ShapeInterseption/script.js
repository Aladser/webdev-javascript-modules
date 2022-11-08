// дублирование текста поля ввода в текстовый блок
let inputElm = document.querySelector('input');
function doubleValue(){
    document.querySelector('#duplicateField').textContent = inputElm.value;
}
inputElm.addEventListener('input',doubleValue);
// перемещение текста в консоль
let buttonElm = document.querySelector('button');
function moveText(){
    console.log(inputElm.value);
    inputElm.value = "";
    document.querySelector('#duplicateField').textContent = "";
}
buttonElm.addEventListener('click', moveText);
// кнопки меню
let pages = document.querySelectorAll('header div');
pages[0].addEventListener('click', function(){
    window.open("../index.html", "_self");
});
pages[1].addEventListener('click', function(){
    window.open("../index.html", "_self");
});
pages[2].addEventListener('click', function(){
    window.open("../M6_TrafficLight/index.html", "_self");
})