// Первая функция вызова случайного числа из диапазона

function  getRandomInt (from, to){
    const min = Math.floor(Math.min(from, to));
    const max = Math.floor(Math.max(from, to));
    return  Math.floor(Math.random() * (max - min + 1)) + min;
    };
getRandomInt(0, 100);
//источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

// Вторая функция проверки  максимальной длины строки

function getCheckLength (string, maxLength){
    return string.length <= maxLength;
}
getCheckLength(0, 140);