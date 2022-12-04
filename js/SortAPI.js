/**
 * Сортировочные методы                 
 * INCREASE - сортировка по возрастанию                 
 * DESCENDING - сортировка по убыванию
 */
class SortAPI{
    static INCREASE = () => 0; // возрастание
    static DESCENDING = () => 1; // убывание
    // -------Сортировка пузырьком-------
    static bubbleSort(arr, property, type){
        if(arr==null || !arr[0].hasOwnProperty(property) || (type!=this.INCREASE && type!=this.DESCENDING))
            return;
        arr = arr.slice(0);

        for(let i=0; i<arr.length; i++){
            for(let j=1; j<arr.length-i; j++){
                if(type === this.INCREASE){
                    if(arr[j-1][property]>arr[j][property]) 
                        [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
                }
                else{
                    if(arr[j-1][property]<arr[j][property]) 
                        [arr[j-1], arr[j]] = [arr[j], arr[j-1]];    
                }         
            }
        }

        return arr;
    }

    // -------Сортировка вставками-------
    static insertSort(arr, property, type){
        if(arr==null || !arr[0].hasOwnProperty(property) || (type!=this.INCREASE && type!=this.DESCENDING))
            return;
        arr = arr.slice(0);

        for(let i=1; i<arr.length; i++){
            const current = arr[i];
            let j = i;

            if(type === this.INCREASE){
                while (j > 0 && arr[j - 1][property] > current[property]) {
                    arr[j] = arr[j - 1]; // сдвиг места для вставки
                    j--;
                }
            }
            else{
                while (j > 0 && arr[j - 1][property] < current[property]) {
                    arr[j] = arr[j - 1]; // сдвиг места для вставки
                    j--;
                }
            }

            arr[j] = current; // вставка в свободную ячейку
        } 

        return arr;
    }

    // -------Сортировка выбором-------
    static selectionSort(arr, property, type){
        if(arr==null || !arr[0].hasOwnProperty(property) || (type!=this.INCREASE && type!=this.DESCENDING))
            return;
        arr = arr.slice(0);

        for(let i=0; i<arr.length; i++){
            // поиск минимума
            let minIndex = i;
            if(type === this.INCREASE){
                for(let j=i+1; j<arr.length; j++){
                    if(arr[j][property]<arr[minIndex][property]) minIndex = j;
                }
            }
            else{
                for(let j=i+1; j<arr.length; j++){
                    if(arr[j][property]>arr[minIndex][property]) minIndex = j;
                }
            }

            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }

        return arr;
    }

    // -------слияние-------
    // слияние малых частей
    static #merge(arrFirst, arrSecond, property, type){
        const arrSort = [];
        let i = 0;
        let j = 0;
        if(type === this.INCREASE){
            while (i < arrFirst.length && j < arrSecond.length) {
                arrSort.push( arrFirst[i][property]<arrSecond[j][property] ? arrFirst[i++] : arrSecond[j++] );
            }
        }
        else if(type === this.DESCENDING){
            while (i < arrFirst.length && j < arrSecond.length) {
                arrSort.push( arrFirst[i][property]>arrSecond[j][property] ? arrFirst[i++] : arrSecond[j++] );
            }
        }
        else
            return null;  
        return arrSort.concat(arrFirst.slice(i).length!=0 ? arrFirst.slice(i) : arrSecond.slice(j));
    };
    // рекурсивный алгоритм слияния
    static mergeSort(arr, property, type){
        if(arr==null || !arr[0].hasOwnProperty(property) || (type!=this.INCREASE && type!=this.DESCENDING))
            return null;
        arr = arr.slice(0);

        if (arr.length <= 1) {
            return arr;
        }
        const middle = Math.floor(arr.length / 2);
        const arrLeft = arr.slice(0, middle);
        const arrRight = arr.slice(middle);
        return this.#merge(this.mergeSort(arrLeft, property, type), this.mergeSort(arrRight, property, type), property, type);
    };

    // ------Быстрая сортировка -------
    // функция разделитель
    static #partition(items, property, type, left, right) {
        var pivot = items[Math.floor((right + left) / 2)], i = left, j = right;
        while (i <= j) {
            if(type === this.INCREASE){
                while (items[i][property] < pivot[property]) {
                    i++;
                }
                while (items[j][property] > pivot[property]) {
                    j--;
                }
            }
            else{
                while (items[i][property] > pivot[property]) {
                    i++;
                }
                while (items[j][property] < pivot[property]) {
                    j--;
                }                
            }
            
                if (i <= j) {
                [items[i], items[j]] = [items[j], items[i]];
                i++;
                j--;
            }
        }
        return i;
    }
    // внутренний алгоритм быстрой сортировки
    static #_quickSort(arr, property, type, left, right) {
        if(arr==null || !arr[0].hasOwnProperty(property) || (type!=this.INCREASE && type!=this.DESCENDING))
            return null;
        if(arr.length == 1) return arr;  

        left = left == undefined ? 0 : left;
        right = right == undefined ? arr.length-1 : right;
        let index = this.#partition(arr, property, type, left, right);
        if (left < index - 1) {
            this.#_quickSort(arr,  property, type, left, index - 1);
        }
        if (index < right) {
            this.#_quickSort(arr,  property, type, index, right);
        }
        return arr;
    }
    // алгоритм быстрой сортировки
    static quickSort = (arr, property, type, left, right) => this.#_quickSort(arr.slice(0), property, type, left, right);


}