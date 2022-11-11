// Светофор
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
document.querySelectorAll('.trafficLight').forEach((elem)=>{elem.addEventListener('click', changeColor)});

// -------кнопки меню-------
let pages = document.querySelectorAll('header div');
pages[0].addEventListener('click', function(){window.open("../M8_GuessNumber/index.html", "_self")});
pages[1].addEventListener('click', function(){window.open("../index.html", "_self")});
pages[2].addEventListener('click', function(){window.open("../M7_Calculator/index.html", "_self")})