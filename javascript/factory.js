/**
 ** !!!!!!!!!!!!!!!!!!!
 ** !!!!  FACTORY  !!!!
 ** !!!!!!!!!!!!!!!!!!!
 **
 ** Oсновной задачей фабрики является создание разных объектов с одинаковым интерфейсом,
 ** в зависимости от ситуаций, в JavaScript этак проблема так остро не стоит, 
 ** так что появляется вопрос — зачем эта фабрика тут вообще нужна? 

 ** Все просто — помимо этой, первой, цели, у нее есть еще и вторая — фабрика может проводить 
 ** какую-то первичную инициализацию объектов. Например, предположим, у нас есть объекты Daddy, Mammy, и lad, 
 ** создавая их с помощью фабрики мы можем просто сказать:
 ** 		familyfactory.createLad(); 
 ** 		familyfactory.createDaddy(); 
 ** а уж то, что они оба рыжие и 210см. роста, за нас решит фабрика — эти параметры мы не задаем.

 ** Собственно, для того чтобы фабрика могла создавать какие-то объекты, для них сначала 
 ** неплохо бы задать конструкторы (в этом примере объекты, к сожалению, 
 ** не такие интересные как несколькими строками выше ):
 **************************************************************************************************************/
console.log("** FACTORY **");


var Shapes = {
    Circle: function (param) {
        console.log("new " + param.color + " circle created with radius " + param.radius + "px");
    },
    Square: function (param) {
        console.log("new " + param.color + " square created with " + param.side + "px on a side ");
    },
    Triangle: function (param) {
        console.log("new " + param.color + " triangle created with " + param.side + "px on a side ");
    }
};

/** А теперь можно сделать и саму фабрику — выглядеть она может так: **/

function ShapeFactory(size, color) {
    this.size = size;
    this.color = color;
}

ShapeFactory.prototype = {
    constructor: ShapeFactory,

    makeCircle: function () { 
    	return new Shapes.Circle({ radius: this.size / 2, color: this.color }); 
    },
    makeSquare: function () { 
    	return new Shapes.Square({ side: this.size, color: this.color }); 
    },
    makeTrinagle: function () { 
    	return new Shapes.Triangle({ side: this.size, color: this.color }); 
    }
}