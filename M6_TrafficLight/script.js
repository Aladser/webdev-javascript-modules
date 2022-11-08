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
