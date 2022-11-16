const personGenerator = {
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Плеханов",
            "id_2": "Антонов",
            "id_3": "Рыкалов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Анастасия",
            "id_2": "Софья",
            "id_3": "Диана",
            "id_4": "Людмила",
            "id_5": "Ирина",
            "id_6": "Светлана",
            "id_7": "Алёна",
            "id_8": "Александра",
            "id_9": "Ольга",
            "id_10": "Елена"
        }
    }`,
    patronymJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александров",
            "id_2": "Максимов",
            "id_3": "Иванов",
            "id_4": "Артемов",
            "id_5": "Дмитриев",
            "id_6": "Никитьев",
            "id_7": "Михайлов",
            "id_8": "Данилов",
            "id_9": "Егорьев",
            "id_10": "Андреев"
        }
    }`,
    maleProfessionJson: `{
        "count": 10,
        "list": {     
            "id_1": "шахтер",
            "id_2": "солдат",
            "id_3": "водитель",
            "id_4": "слесарь",
            "id_5": "пожарный",
            "id_6": "инженер",
            "id_7": "лоцман",
            "id_8": "спасатель",
            "id_9": "прораб",
            "id_10": "пилот"
        }
    }`,
    femaleProfessionJson:`{
        "count": 10,
        "list": {     
            "id_1": "стилист",
            "id_2": "педагог",
            "id_3": "продавщица",
            "id_4": "косметолог",
            "id_5": "секретарь",
            "id_6": "дизайнер",
            "id_7": "стюардесса",
            "id_8": "маркетолог",
            "id_9": "швея",
            "id_10": "врач"
        }
    }`,
    GENDER_MALE: 'мужчина',
    GENDER_FEMALE: 'женщина',

    randomIntNumber: (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1) + min),
    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },
    // пол
    randomGender: function(){
        return this.randomIntNumber()==0 ? this.GENDER_MALE : this.GENDER_FEMALE;
    },
    // фамилия
    randomSurname: function(gender) {
        return gender == this.GENDER_MALE ? this.randomValue(this.surnameJson) : `${this.randomValue(this.surnameJson)}а`; 
    },
    // имя и отчество
    randomName: function(gender) {
        if(gender == this.GENDER_MALE)
            return `${this.randomValue(this.firstNameMaleJson)} ${this.randomValue(this.patronymJson)}ич`;
        else
            return `${this.randomValue(this.firstNameFemaleJson)} ${this.randomValue(this.patronymJson)}на`;
    },
    // профессия
    randomProfession: function(gender){
        return gender == this.GENDER_MALE ? this.randomValue(this.maleProfessionJson) : this.randomValue(this.femaleProfessionJson); 
    },
    // дата рождения
    randomdDate: function(){
        let months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        let daysInMonth = [31,28,31,30,31,30,30,31,30,31,30,31];

        let year = this.randomIntNumber(1975, 2005);
        daysInMonth[1] = year%4==0 || year%100==0 && year%400==0 ? 29 : 28;
        let monthIndex = this.randomIntNumber(0, 11);
        let day = this.randomIntNumber(1, daysInMonth[monthIndex]);
        return `${day} ${months[monthIndex]} ${year} г.р.`;
    },

    getPerson: function(){
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.name = this.randomName(this.person.gender);
        this.person.surname = this.randomSurname(this.person.gender);
        this.person.dateOfBirth = this.randomdDate();
        this.person.profession = this.randomProfession(this.person.gender);
        return this.person;
    }
};