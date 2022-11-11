const inputGameFrame = document.querySelector('#input-game-frame'); // модальное окно ввода данных
const startGameFrame = document.querySelector('#start-game-frame'); // модальное окно запуска игры
const gameFrame = document.querySelector('.card'); // окно игры
const minValueInput = inputGameFrame.querySelector('.input-text').childNodes[1]; // поле минимального значения
const maxValueInput = inputGameFrame.querySelector('.input-text').childNodes[3]; // поле максимального значения
const orderNumberField = document.getElementById('orderNumberField'); // поле номера вопроса
const answerField = document.getElementById('answerField'); // поле ответа

minValueInput.addEventListener('focus', function(){this.value = ''}) // очистка поля при фокусе
maxValueInput.addEventListener('focus', function(){this.value = ''}) // очистка поля при фокусе
inputGameFrame.style.display = "block";
gameFrame.style.display = "none";

let minValue, maxValue, minusK, orderNumber, gameRun;
let questions = ['Вы загадали число', 'Может быть, это число', 'Легко! Это число', 'Думаю, это число', 'Интуиция подсказывает, это число'];
let сongratulations = ['Красавчик!\u{1F60A}','Так держать!\u{1F44C}','Дай пять!\u{1F590}','Молодец! Сыграем еще?\u{1F60F}','Это было легко.\u{1F611}'];

// кнопка получения минимального и максимального значений
inputGameFrame.querySelector('.input-buttons').childNodes[1].addEventListener('click', function(){
    if(minValueInput.value == '' || maxValueInput.value == '') return;     // проверка пустых полей

    maxValue = parseInt(maxValueInput.value, 10) || 100;
    maxValue = maxValue>999 ? 999 : maxValue;
    minValue = parseInt(minValueInput.value, 10) || -100;
    minValue = minValue<-999 ? -999 : minValue;
    // поправочный коэффициент. Если область поиска включает отрицательные числа, то область поиска переносится на [0:..]
    minusK = minValue < 0 ? -1 * minValue : 0;

    startGameFrame.querySelector('p').innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
    inputGameFrame.style.display = "none";
    startGameFrame.style.display = "block";
})
// кнопка отмены игры
inputGameFrame.querySelector('.input-buttons').childNodes[3].addEventListener('click', function(){
    inputGameFrame.style.display = "none";
    gameFrame.style.display = "block";
    answerField.innerText = 'Начать игру?';
    
    gameRun = false;
})
// кнопка запуска игры
startGameFrame.querySelector('input[type=button]').addEventListener('click', function(){
    orderNumber = 1; 
    answerNumber  = minValue + Math.round(Math.random()*(maxValue-minValue)); // предположенное число

    startGameFrame.style.display = 'none';
    gameFrame.style.display = 'block';
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${answerNumber}?`;
    
    gameRun = true;
})
// кнопка заново
document.querySelector('#btnRetry').addEventListener('click', function () {
    gameFrame.style.display = "none";
    inputGameFrame.style.display = "block";   
})

// Обработчик кнопок Меньше и Больше
function reduceSearchField(arrow){
        if (gameRun){
            if (minValue === maxValue || minValue > maxValue){
                const phraseRandom = Math.round( Math.random());
                const answerPhrase = (phraseRandom === 1) ?
                    `Вы загадали неправильное число!\n\u{1F914}` :
                    `Я сдаюсь..\n\u{1F92F}`;
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                if(arrow == '<')
                    maxValue = answerNumber  - 1;
                else
                    minValue = answerNumber  + 1;
                answerNumber = (2*minusK + minValue + maxValue)/2;
		        answerNumber = minValue<0 && maxValue<0 ? Math.ceil(answerNumber) : Math.floor(answerNumber);
		        answerNumber = answerNumber - minusK;
                
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                answerField.innerText =  `${questions[Math.round(Math.random()*4)]} ${answerNumber} ?`;
        }
        console.log(minValue, answerNumber, maxValue);
    }
}
gameFrame.querySelector('#btnLess').addEventListener('click', function () {reduceSearchField('<')}) // кнопка меньше
gameFrame.querySelector('#btnOver').addEventListener('click', function () {reduceSearchField('>')}) // кнопка больше
// кнопка заново
gameFrame.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText =  сongratulations[Math.round(Math.random()*4)];
        gameRun = false;
    }
})
// вывести число строкой
// rank2 - второй разряд, rank3 - третий разряд. Соотвествуют индексу в нужном массиве
function printNumberAsString(number){
    let twelweNumbers = ['один','два','три','четыре','пять','шесть','семь','восемь','девять','десять',
    'одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать','двадцать'];
    let ten = ['двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
    let hundreds = ['сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот']
    let rslt = "";

    let mod_number = Math.abs(number); // модуль числа
    // 0
    if(mod_number==0)
        rslt = 0
    // 0..20
    else if(mod_number<21)
        rslt = twelweNumbers[mod_number-1]
    // 21..99
    else if(mod_number < 100){
        let rank2 = Math.floor(mod_number/10) - 2;
        rslt =  mod_number%10!=0 ? `${ten[rank2]} ${twelweNumbers[mod_number%10-1]}` : ten[rank2]; 
    }
    // 100 ... 999
    else{
        rank3 = Math.floor(mod_number / 100) - 1; 
        rem = mod_number%100; // остаток от деления на 100
        // x00
        if(rem == 0)
            rslt =  hundreds[rank3];
        // x01..x20
        else if(rem<=20){
            rslt = `${hundreds[rank3]} ${twelweNumbers[rem-1]}`; 
        }
        // x21..x99
        else{
            let rank2 = Math.floor(mod_number%100/10) - 2;
            if(number%10 == 0)
                rslt = `${hundreds[rank3]} ${ten[rank2]}`;
            else
                rslt = `${hundreds[rank3]} ${ten[rank2]} ${twelweNumbers[number%10-1]}`;
        } 
    }
    return number < 0 ? `минус ${rslt}` : rslt;
}
// -------кнопки меню-------
let pages = document.querySelectorAll('header div');
pages[0].addEventListener('click', function(){window.open("../M7_Calculator/m7_index.html", "_self");});
pages[1].addEventListener('click', function(){window.open("../index.html", "_self");});
pages[2].addEventListener('click', function(){window.open("../M6_TrafficLight/m6_index.html", "_self");})