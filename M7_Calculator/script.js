let operation = null; // текущая операция
const inputWindow = document.querySelector('#inputWindow'); // поле ввода
let first_number = null;
let position = null; // начало второго числа

// -------кнопка сброса-------
document.querySelector('#btn_clr').addEventListener('click', function () {
    operation = null;
    position = null;
    inputWindow.value = '';
})
// --------Нажатия цифр-------
function press_digit(event){
    // ввод цифры после предыдущей операции
    if(operation == null){
        inputWindow.value = this.textContent;
        operation = 'input';
    }
    // ввод цифры
    else
        inputWindow.value += this.textContent;
}
// цифровые кнопки
let digit_buttons = document.querySelectorAll('.btn-digit');
// назначение событий нажатия цифр
for(let i=0; i<digit_buttons.length; i++){
    digit_buttons[i].addEventListener('click', press_digit);
} 
// -------арифметические операции-------
// вычисление
function calc(oprt, first_number, second_number){
    switch(oprt){
        case '+':
            return first_number + second_number;
        case '-':
            return first_number - second_number;  
        case '*':
            return first_number * second_number;  
        case '/':
            return first_number / second_number; 
    }
}
// ввод вычисления +-*/
function select_operation(event){
    // игнор пустого поля 
    if (inputWindow.value != ''){
        let last_number = inputWindow.value[inputWindow.value.length-1];
        // введено число
        if( !isNaN(last_number) ){
            // число
            if( !isNaN(inputWindow.value) ){
                first_number = parseInt( inputWindow.value );
                inputWindow.value += this.textContent;
                operation = this.textContent;
                position = inputWindow.value.length;
            }
            // число + операция + число
            else{
                first_number = calc(operation, first_number, parseInt(inputWindow.value.slice(position)));
                inputWindow.value =  first_number + this.textContent;
                operation = this.textContent;
                position = inputWindow.value.length;
            }
        }
        // введен знак - смена знака
        else
            inputWindow.value = inputWindow.value.slice(0, inputWindow.value.length-1) + oprt;
    }
}
// кнопки вычислений
let calc_buttons = document.querySelectorAll('.btn-oprt');
// назначение событий вычислений
for(let i=0; i<calc_buttons.length; i++){
    calc_buttons[i].addEventListener('click', select_operation);
} 
// -------квадратный корень-------
document.querySelector('#btn_sqrt').addEventListener('click', function () {
    let last_number = inputWindow.value[inputWindow.value.length-1];
    // игнорирование пустой строки, последним знака арифм.операции
    if(inputWindow.value!='' && !isNaN(last_number)){
        // число
        if(!isNaN(inputWindow.value))
            inputWindow.value = Math.sqrt(inputWindow.value);
            // √ на будущее
        // число + операция + число
        else{
            let second_number = parseInt(inputWindow.value.slice(position))
            let val = calc(operation, first_number, second_number);
            inputWindow.value =  Math.sqrt(val).toFixed(3);
        }
        operation = null;
    }
})
// -------равно------- 
document.querySelector('#btn_equals').addEventListener('click', function () {
    // игнорирование пустого поля, арифм.знака
    let last_number = inputWindow.value[inputWindow.value.length-1];
    if (operation!='input' && operation!=null && !isNaN(last_number)){
        inputWindow.value =  calc(operation, first_number, parseInt(inputWindow.value.slice(position)));
        operation = null;
    }
})
// кнопки меню
let pages = document.querySelectorAll('header div');
pages[0].addEventListener('click', function(){
    window.open("../M6_TrafficLight/index.html", "_self");
});
pages[1].addEventListener('click', function(){
    window.open("../index.html", "_self");
});
pages[2].addEventListener('click', function(){
    window.open("../M8_GuessNumber/index.html", "_self");
})