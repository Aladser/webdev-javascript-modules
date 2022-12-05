// -------Светофор------
function setDevice(){
    let trafficLight = document.querySelectorAll('.traffic-light-device__signal');
    let color = ['red','yellow','green'];
    let number = 2;
    return function(){
        trafficLight[number].style.background = 'black';
        number = number==2 ? 0 : number + 1;
        trafficLight[number].style.background = color[number];
    }
}
const changeColor = setDevice(); // изменение цвета. Единая функция для цветов
document.querySelectorAll('.traffic-light-device__signal').forEach( elem => elem.addEventListener('click', changeColor));