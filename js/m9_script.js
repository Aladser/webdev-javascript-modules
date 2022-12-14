/** isNewData
 * 
 * true - генерирует новые данные, 
 * 
 * false - очищает поля
 */
function createData(isNewData){
    const person = isNewData ? personGenerator.getPerson() : null;
    document.querySelector('.card-row__data-name').innerText = isNewData ? person.name : '';
    document.querySelector('.card-row__data-surname').innerHTML = isNewData ? person.surname : '';
    document.querySelector('#genderAndDateOutput').innerHTML = isNewData ? `${person.gender} ${person.dateOfBirth}`: '';
    document.querySelector('#profession').innerHTML = isNewData ? person.profession: '';
}
window.onload = () => createData(true); // инициализация
document.querySelector('#updateData').addEventListener('click', () => createData(true)); // обновление даных
document.querySelector('#clearData').addEventListener('click',() => createData(false)); // очистка полей