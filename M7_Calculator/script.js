const inputWindow = document.querySelector('#input-field'); // поле ввода
let digit_buttons = document.querySelectorAll('.digit-btn');
let calc_buttons = document.querySelectorAll('.oprt-btn');
for(let i=0; i<digit_buttons.length; i++){digit_buttons[i].addEventListener('click', press_digit);}
for(let i=0; i<calc_buttons.length; i++){calc_buttons[i].addEventListener('click', select_operation);} 

let operation = null; // текущая операция
let last_sign = null; // последний введенный символ
let first_number = null;
let position = null; // начало второго числа

// -------Кнопка сброса-------
document.querySelector('#btn_clr').addEventListener('click', function () {
    operation = null;
    position = null;
    inputWindow.textContent = '';
})

// -------Кнопка равно------- 
document.querySelector('#btn_equals').addEventListener('click', function () {
    // игнорирование пустого поля, арифм.знака
    let last_sign = inputWindow.value[inputWindow.value.length-1];
    if (operation!='input' && operation!=null && !isNaN(last_sign)){
        inputWindow.value =  calc(operation, first_number, parseInt(inputWindow.value.slice(position)));
        operation = null;
    }
})

// -------цифры--------
function press_digit(){
    // ввод цифры после выполненного вычисления
    if(operation == null){
        inputWindow.textContent = this.textContent;
        operation = 'input';
    }
    // ввод цифры
    else
        inputWindow.textContent += this.textContent;
    last_sign = parseInt(this.textContent, 10);
}

// -------кнопки + - */-------
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
    if (inputWindow.textContent != ''){

        // введено число
        if( !isNaN(last_sign) ){
            // число
            if( !isNaN(inputWindow.textContent)){
                first_number = parseInt(inputWindow.textContent);
                inputWindow.textContent += this.textContent;
            }
            // число|операция|число
            else{
                first_number = calc(operation, first_number, parseInt(inputWindow.textContent.slice(position)));
                inputWindow.textContent =  first_number + this.textContent;
            }
            position = inputWindow.textContent.length;
        }
        // введен знак
        else{
            console.log('событие')
            inputWindow.textContent = inputWindow.textContent.slice(0, inputWindow.textContent.length-1) +this.textContent;
        }
        operation = this.textContent;
        last_sign = inputWindow.textContent;          
    }
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