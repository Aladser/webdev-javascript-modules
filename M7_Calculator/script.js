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
    if (operation!='input' && operation!=null && !isNaN(last_sign)){
        let second_number = parseInt(inputWindow.textContent.slice(position));
        inputWindow.textContent =  calc(operation, first_number, second_number);
        operation = null;
    }
})

// -------ввод цифры--------
function press_digit(){
    inputWindow.textContent = operation==null ? this.textContent : inputWindow.textContent + this.textContent;
    operation = operation==null ? 'input' : operation;  
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
                let second_number = parseInt(inputWindow.textContent.slice(position))
                first_number = calc(operation, first_number, second_number);
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
    // игнорирование пустой строки
    if( inputWindow.textContent != '' ){
        // последний знак - число
        let x;
        if(!isNaN(last_sign)){
            // _число_ или _число-операция-число_
            let second_number = parseInt(inputWindow.textContent.slice(position))
            x = !isNaN(inputWindow.textContent) ? inputWindow.textContent : calc(operation, first_number, second_number);
        }
        // последний знак - арифм.операция
        else
            x = inputWindow.textContent.slice(0, inputWindow.textContent.length-1);

        inputWindow.textContent = Math.sqrt(x).toFixed(3);
        operation = null;
        last_sign = inputWindow.textContent[inputWindow.textContent.length-1];
    }
})