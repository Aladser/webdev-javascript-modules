// -------Светофор------
function setDevice(){
    let trafficLight = document.querySelectorAll('.trafficLight');
    let color = ['red','yellow','green'];
    let number = 2;
    return function(){
        trafficLight[number].style.background = 'black';
        number = number==2 ? 0 : number + 1;
        trafficLight[number].style.background = color[number];
    }
}
const changeColor = setDevice(); // изменение цвета
document.querySelectorAll('.trafficLight').forEach( elem => elem.addEventListener('click', changeColor));