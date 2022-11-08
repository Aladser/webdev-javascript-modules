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