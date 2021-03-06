/**
 ** !!!!!!!!!!!!!!!!!!!!!
 ** !!!! MEMOIZATION !!!!
 ** !!!!!!!!!!!!!!!!!!!!!
 **
 ** Очень простая и полезная техника — суть её в том, что для функции которая может долго вычислять результат,
 ** мы создаем небольшой кэш ответов. Работает это, разумеется, только в том случае, когда при одинаковых 
 ** входных параметрах результат функции тоже должен быть одинаковый.
 **************************************************************************************************************/
 console.log("** MEMOIZATION **");
 
 /** Создаем какую-нибудь медленную функцию, которая использует эту технику: **/

 function calculation(x, y) {
    var key = x.toString() + "|" + y.toString();
    var result = 0;

    if (!calculation.memento[key]) {
        for (var i = 0; i < y; ++i) {
        	result += x;
        }
        calculation.memento[key] = result;
    }
    return calculation.memento[key];
 };
 calculation.memento = {};