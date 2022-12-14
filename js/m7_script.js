const inputWindow = document.querySelector('.output-field');
document.querySelectorAll('.btn-digit').forEach(button => button.addEventListener('click', press_digit));
document.querySelectorAll('.btn-oprt').forEach(button => button.addEventListener('click', run_operation));
/** текущая операция */
let operation = null;
/** последний введенный символ */
let last_sign = null;
/** первое число*/
let first_number = null;
/** индекс второго числа */
let position = null;

// -------кнопка Сброс-------
document.querySelector('.btn-clear').addEventListener('click', function () {
    operation = null;
    position = null;
    inputWindow.textContent = '';
})

// -------кнопка Равно------- 
document.querySelector('.btn-equal').addEventListener('click', function () {
    // игнорирование пустого поля, арифм.знака
    if (operation!='input' && operation!=null && !isNaN(last_sign)){
        let second_number = inputWindow.textContent.slice(position);
        inputWindow.textContent = calc(operation, first_number, second_number);
        operation = null;
    }
})

// ------ кнопка Точка -------
document.querySelector('.btn-dot').addEventListener('click', function(){
    // игнор пустой строки и последней не цифры
    if(inputWindow.textContent != '' && !isNaN(last_sign)){
        // если нет точки
        if(inputWindow.textContent.indexOf('.')==-1){
            inputWindow.textContent += '.';
            last_sign = '.';
        }
        // если есть точка и введен знак арифм.операции
        else if(getAriphOperationIndex() != -1){
            let secondDotIndex = inputWindow.textContent.slice(getAriphOperationIndex()).indexOf('.'); // поиск второй точки
            if( secondDotIndex == -1 && !isNaN(last_sign) ){ 
                inputWindow.textContent += '.'
                last_sign = '.';
            }
        }
    }
})

/** найти индекс знака арифметической операции
 *                                                          
 *  -1: не найдено
*/
function getAriphOperationIndex(){
    let str = inputWindow.textContent.split('');
    let ariphSign = str.filter(sign => ['+','-','*','/'].includes(sign));
    return ariphSign.length==0 ? -1 : str.indexOf(ariphSign[0]); 
}

/** ввести цифру */
function press_digit(){
    inputWindow.textContent = operation==null ? this.textContent : inputWindow.textContent + this.textContent;
    operation = operation==null ? 'input' : operation;  
    last_sign = parseInt(this.textContent);
}

/** выполнить арифметическую операцию */
function calc(operation, first_number, second_number){
    let rslt;
    switch(operation){
        case '+':
            rslt = parseFloat(first_number) + parseFloat(second_number);
            break;
        case '-':
            rslt = parseFloat(first_number) - parseFloat(second_number);
            break;  
        case '*':
            rslt = parseFloat(first_number) * parseFloat(second_number);
            break;  
        default:
            rslt = parseFloat(first_number) / parseFloat(second_number);
            break;
    }
    return roundNumber(rslt, 6);
}

/** ввести знак арифметической операции*/
function run_operation(){
    // игнор пустого поля 
    if (inputWindow.textContent != ''){
        // введено число
        if( !isNaN(last_sign) ){
            // число
            if( !isNaN(inputWindow.textContent)){
                first_number = inputWindow.textContent;
                inputWindow.textContent += this.textContent;
            }
            // число|операция|число
            else{
                let second_number = inputWindow.textContent.slice(position);
                first_number = calc(operation, first_number, second_number);
                inputWindow.textContent =  first_number + this.textContent;
            }
            position = inputWindow.textContent.length;
        }
        // введен знак - смена знака
        else{
            let lastSignIndex = inputWindow.textContent.length-1;
            inputWindow.textContent = inputWindow.textContent.slice(0, lastSignIndex) + this.textContent;
            last_sign = this.textContent;
        }
        operation = this.textContent;
        last_sign = inputWindow.textContent[inputWindow.textContent.length-1];          
    }
}

// -------квадратный корень-------
document.querySelector('.btn-sqrt').addEventListener('click', function () {
    // игнорирование пустой строки
    if( inputWindow.textContent != '' ){
        // последний знак - число
        let x;
        if(!isNaN(last_sign)){
            // _число_ или _число-операция-число_
            let second_number = inputWindow.textContent.slice(position);
            x = !isNaN(inputWindow.textContent) ? inputWindow.textContent : calc(operation, first_number, second_number);
        }
        // последний знак - арифм.операция
        else{
            let lastSignIndex = inputWindow.textContent.length-1;
            x = inputWindow.textContent.slice(0, lastSignIndex);
        }

        if(x >= 0){
            inputWindow.textContent = roundNumber(Math.sqrt(x), 6);
            operation = null;
            last_sign = inputWindow.textContent[inputWindow.textContent.length-1];
        }
    }
})

/** округлить число */
function roundNumber(number, remValue=3){
    if(number != parseInt(number)){
        let remSize = String(number).split('.')[1].length; // длина остатка
        return remSize>remValue ? number.toFixed(remValue) : number.toFixed(remSize);
    }
    else
        return number;
}