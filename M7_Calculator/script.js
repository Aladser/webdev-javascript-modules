const inputWindow = document.querySelector('#inputWindow'); // поле ввода

let operation = null; // текущая операция
let first_number = null;
let position = null; // начало второго числа

// -------кнопка сброса-------
document.querySelector('#btn_clr').addEventListener('click', function () {
    operation = null;
    position = null;
    inputWindow.value = '';
})
/** Нажатие цифры */
function press_digit(event){
    // ввод цифры после выполненного вычисления
    if(operation == null){
        inputWindow.value = this.textContent;
        operation = 'input';
    }
    // ввод цифры
    else
        inputWindow.value += this.textContent;
}
let digit_buttons = document.querySelectorAll('.btn-digit');
for(let i=0; i<digit_buttons.length; i++){
    digit_buttons[i].addEventListener('click', press_digit);
}

// -------арифметические операции-------
/** Вычисление */
function calc(operation, first_number, second_number){
    switch(operation){
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
/** Ввод знака арифметической операции*/
function select_operation(){
    // игнор пустого поля 
    if (inputWindow.value != ''){
        let last_sign = inputWindow.value[inputWindow.value.length-1]; // последний знак
        // введено число
        if( !isNaN(last_sign) ){
            // число
            if( !isNaN(inputWindow.value) ){
                first_number = parseInt(inputWindow.value);
                inputWindow.value += this.textContent;
            }
            // число|операция|число
            else{
                first_number = calc(operation, first_number, parseInt(inputWindow.value.slice(position)));
                inputWindow.value =  first_number + this.textContent;
            }
            position = inputWindow.value.length;
        }
        // введен знак
        else
            inputWindow.value = inputWindow.value.slice(0, inputWindow.value.length-1) +this.textContent;
        operation = this.textContent;          
    }
}
// кнопки + - * /
let calc_buttons = document.querySelectorAll('.btn-oprt');
for(let i=0; i<calc_buttons.length; i++){
    calc_buttons[i].addEventListener('click', select_operation);
} 
// -------квадратный корень-------
document.querySelector('#btn_sqrt').addEventListener('click', function () {
    let last_sign = inputWindow.value[inputWindow.value.length-1];
    // игнорирование пустой строки
    if( inputWindow.value!='' ){
        // последний знак - число
        let rslt;
        if(!isNaN(last_sign))
            // _число_ или _число-операция-число_
            rslt = !isNaN(inputWindow.value) ? inputWindow.value : calc(operation, first_number, parseInt(inputWindow.value.slice(position)));
        // последний знак - арифм.операция
        else
            rslt = inputWindow.value.slice(0, inputWindow.value.length-1);
        inputWindow.value = Math.sqrt(rslt).toFixed(3);
        operation = null;
    }
})
// -------равно------- 
document.querySelector('#btn_equals').addEventListener('click', function () {
    // игнорирование пустого поля, арифм.знака
    let last_sign = inputWindow.value[inputWindow.value.length-1];
    if (operation!='input' && operation!=null && !isNaN(last_sign)){
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