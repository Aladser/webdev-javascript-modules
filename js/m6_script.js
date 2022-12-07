// -------Светофор------
function setDevice(){
    let trafficLight = document.querySelectorAll('.signal');
    let color = ['red','yellow','green'];
    let number = 2;
    return function(){
        trafficLight[number].style.background = 'black';
        number = number==2 ? 0 : ++number;
        trafficLight[number].style.background = color[number];
    }
}
const changeColor = setDevice(); // изменение цвета. Единая функция для цветов
document.querySelectorAll('.signal').forEach( elem => elem.addEventListener('click', changeColor));