const itemsList = document.querySelector('.vegetable__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const minWeightInput = document.querySelector(".minweight__input"); // поле минимального значения фмльтра
const maxWeightInput = document.querySelector(".maxweight__input"); // поле максимального значения фильтра
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('#color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// цвета
let colors = [
  {name:'красный', value:'#ff0000', index:0},
  {name:'розово-красный', value:'#c41e3a', index:1},
  {name:'оранжевый', value:'#ff8000', index:2},
  {name:'светло-коричневый', value:'#cd853f', index:3},
  {name:'коричневый', value:'#804030', index:4},
  {name:'желтый', value:'#ffff00', index:5},
  {name:'белый', value:'#eeeeee', index:6},
  {name:'светло-зеленый', value:'#90ee90', index:7},
  {name:'зеленый', value:'#00cc00', index:8},
  {name:'пурпурный', value:'#ff00ff', index:9},
  {name:'фиолетовый', value:'#8b00ff', index:10}
];
const findColorByName = name => colors.find(element => element.name === name);
const findColorByIndex = index => colors.find(element => element.index === index);
// добавление option цветов
colors.forEach((color)=>{
  let option = document.createElement('option');
  option.style.backgroundColor = color.value;
  option.textContent = color.name;
  colorInput.appendChild(option);
});
colorInput.selectedIndex = 8;
colorInput.addEventListener('change',function(){this.style.backgroundColor = colors[this.selectedIndex].value;}) // изменение цвета select

// список овощей
let vegetablesJSON = `[
  {"kind": "Морковь", "color": "оранжевый", "weight": 125},
  {"kind": "Редис", "color": "розово-красный", "weight": 55},
  {"kind": "Перец", "color": "зеленый", "weight": 225},
  {"kind": "Картофель", "color": "желтый", "weight": 192},
  {"kind": "Брюква", "color": "коричневый", "weight": 400},
  {"kind": "Лук", "color": "светло-коричневый", "weight": 132},
  {"kind": "Баклажан", "color": "фиолетовый", "weight": 225},
  {"kind": "Дайкон", "color": "белый", "weight": 2000},
  {"kind": "Капуста", "color": "светло-зеленый", "weight": 2500},
  {"kind": "Капуста краснокочанная", "color": "пурпурный", "weight": 1200},
  {"kind": "Помидор", "color": "красный", "weight": 145}
]`;
let allVegetables = JSON.parse(vegetablesJSON);
allVegetables.forEach(elem => elem.color = findColorByName(elem.color).index); // преобразование цвета в индекс объекта цвета
let vegetables = allVegetables.slice(0);

/** показать ошибку заполнения */
function showError(elem){
  let nativeColor = elem.style.backgroundColor;
  elem.style.backgroundColor = 'red';
  setTimeout(() => elem.style.backgroundColor = nativeColor, 200);
}

/**   ОТОБРАЖЕНИЕ   **/
/** добавить карточку овоща в vegetabls__list */
function addElement(item){
  let liElem = document.createElement('li'); // LI .vegetable__item
  liElem.className = "vegetable__item";
  liElem.style.backgroundColor = findColorByIndex(item.color).value;

  let itemInfoElem = document.createElement('div'); // div .vegetable__info
  itemInfoElem.className = "vegetable__info";
  for(j=0; j<2; j++)  itemInfoElem.appendChild( document.createElement('div') ); // .vegetable__info: внутрениие div'ы
  itemInfoElem.childNodes[0].textContent = `Вид: ${item.kind}`;
  itemInfoElem.childNodes[1].textContent = `Вес: ${item.weight}г`;

  liElem.appendChild(itemInfoElem);
  itemsList.appendChild(liElem);
}

/** отрисовать карточки овощей */
function display(){
  itemsList.querySelectorAll('.vegetable__item').forEach( elem => elem.remove() );
  vegetables.forEach( fruit => addElement(fruit) );
}
display();

/**   ПЕРЕМЕШИВАНИЕ   **/
/** генерация случайного числа */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
/** перемешать массив */
function shuffle(){
  let result = [];
  let index;
  while(vegetables.length > 0){
    index = getRandomInt(0, vegetables.length-1);
    result.push(vegetables[index]);
    vegetables.splice(index, 1);
  }
  vegetables = result;
}
// событие кнопки Перемешивание
shuffleButton.addEventListener('click', () => {
  shuffle();
  display();
  sortActionButton.textContent = "Сортировка";
  isActiveSort = false;
});

/**   ФИЛЬТРАЦИЯ   **/
const getMinWeight = () => allVegetables.reduce((acum, elem) => elem.weight < acum ? elem.weight : acum, allVegetables[0].weight); // минимальный вес
const getMaxWeight = () => allVegetables.reduce((acum, elem) => elem.weight > acum ? elem.weight : acum, allVegetables[0].weight); // максимальный вес
minWeightInput.addEventListener('click', () => minWeightInput.value = '');
maxWeightInput.addEventListener('click', () => maxWeightInput.value = '');

// фильтрация массива
function filter(){
  minWeightInput.value = parseInt(minWeightInput.value, 10);
  maxWeightInput.value = parseInt(maxWeightInput.value, 10);

  if(isNaN(minWeightInput.value)){
    showError(minWeightInput);
    minWeightInput.value = getMinWeight();
  }
  if(isNaN(maxWeightInput.value)){
    showError(maxWeightInput);
    maxWeightInput.value = getMaxWeight();
  }

  vegetables = allVegetables.filter( elem => elem.weight>=minWeightInput.value && elem.weight<=maxWeightInput.value);
  if(isActiveSort){
    isActiveSort = false;
    sort(); 
   }
}

// событие кнопки фильтрация
filterButton.addEventListener('click', () => {
  filter(); 
  display();
  sortActionButton.textContent = "Сортировка";
});

/***   СОРТИРОВКА   ***/
let isActiveSort = false; // флаг сортировки
let sortType; // тип сортировки: возрастание или убывание

/** сортировать массив */
function sort() {
  isActiveSort = true;
  vegetables = SortAPI.quickSort(vegetables, 'color', sortType);
}

// нажатие кнопки Сортировка
// возрастание - \u{2191}; убывание - \u{2193}
sortActionButton.addEventListener('click', function(){
  if(!isActiveSort){
    this.textContent = "Сортировка\u{2191}";
    sortType = SortAPI.INCREASE;
    isActiveSort = true;
  }
  else{
    if(sortType == SortAPI.INCREASE){
      this.textContent = "Сортировка\u{2193}";
      sortType = SortAPI.DESCENDING;
    }
    else{
      this.textContent = "Сортировка\u{2191}";
      sortType = SortAPI.INCREASE;    
    }
  }

  sort();
  display();
});

/***    ДОБАВИТЬ ОВОЩ   ***/
kindInput.addEventListener('click', () => kindInput.value = '');
weightInput.addEventListener('click', () => weightInput.value = '');
// проверка ввода цифр в поле для веса
weightInput.addEventListener('input', function(){
  let last_sign = parseInt(this.value[this.value.length-1], 10); 
  if(isNaN(last_sign)){
    showError(this);
    this.value = this.value.slice(0, this.value.length-1);
  }
})

// событие ввода данных овоща
addActionButton.addEventListener('click', () => {
  // проверка полей на пустоту
  if(kindInput.value == "" && weightInput.value == ""){
    showError(kindInput);
    showError(weightInput);
  }
  else if(kindInput.value == "")
    showError(kindInput);
  else if(weightInput.value == "")
    showError(weightInput);
  // добавление овоща
  else{
      let fruit = {kind: kindInput.value, color: colorInput.selectedIndex, weight: parseInt(weightInput.value, 10)};

      allVegetables.push(fruit);
      vegetables.push(fruit);

      kindInput.value = "";
      weightInput.value = "";
      colorInput.selectedIndex = 8;
      colorInput.style.backgroundColor = colors[colorInput.selectedIndex].value;
      display();
  }
});
