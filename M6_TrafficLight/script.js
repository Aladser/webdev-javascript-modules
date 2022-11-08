// Светофор
const trafficLight = document.querySelectorAll('.trafficLight');
// зеленый цвет
function makeGreen() {
    trafficLight[2].style.background = ('black');
    trafficLight[0].style.background = ('green');
    for(i=0; i<trafficLight.length; i++){
        trafficLight[i].removeEventListener('click', makeGreen);
        trafficLight[i].addEventListener('click', makeYellow);
    }
}
// оранжевый цвет
function makeYellow() {
    trafficLight[0].style.background = ('black');
    trafficLight[1].style.background = ('yellow');
    for(i=0; i<trafficLight.length; i++){
        trafficLight[i].removeEventListener('click', makeYellow);
        trafficLight[i].addEventListener('click', makeRed);
    }
}
// красный цвет
function makeRed() {
    trafficLight[1].style.background = ('black');
    trafficLight[2].style.background = ('red');
    for(i=0; i<trafficLight.length; i++){
        trafficLight[i].removeEventListener('click', makeRed);
        trafficLight[i].addEventListener('click', makeGreen);
    }
}
// навешивание первого обработчика
for(i=0; i<trafficLight.length; i++){
    trafficLight[i].addEventListener('click', makeGreen);
}
// кнопки меню
let pages = document.querySelectorAll('header div');
pages[0].addEventListener('click', function(){
    window.open("../M8_GuessNumber/index.html", "_self");
});
pages[1].addEventListener('click', function(){
    window.open("../index.html", "_self");
});
pages[2].addEventListener('click', function(){
    window.open("../M7_Calculator/index.html", "_self");
})