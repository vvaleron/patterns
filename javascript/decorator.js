/**
** !!!!!!!!!!!!!!!!!!!
** !!!! DECORATOR !!!!
** !!!!!!!!!!!!!!!!!!!
**
** приятный паттерн, с его помощью можно менять поведение объекта на лету, 
** в зависимости от каких-нибудь условий.
***************************************************************************************************************/
console.log("** DECORATOR **");


/** Допустим, у нас есть такой код **/

function Ball( param ) {
    this._radius = param.radius;
    this._color = param.color;
};

Ball.prototype = {
    constructor: Ball,

    INCREMENTATION_STEP: 5,

    draw: function(){
        console.log("ball drawn with radius:" + this._radius + " and color: " + this._color);
    },
    inc: function(){ 
        this._radius += this.INCREMENTATION_STEP; 
    }
};

new Ball({ radius:100, color:"red"});

/** Здесь мы создаем новый красный мячик, а что делать если мячик нужен не просто красный, а красный в полоску? 
 ** Вот тут на сцену и выходит Decorator.
 ** Особый шарм ему придает то, что первоначальный Ball вообще не подозревает о том,
 ** что он может быть в полоску, или что у него могут быть какие-то там декораторы.
 ** Реализовать паттерн можно несколькими способами:
 **************************************************************************************************************/





/** Способ первый — комплексный **/

function StripedBall( ball ){
    this._ball = ball;    
};

StripedBall.prototype = {
    constructor: StripedBall,

    draw: function() {
        this._ball.draw();
        console.log("and with stripes");
    },
    inc: function() {
        return this._ball.inc();
    }
};

function SpeckledBall( ball ) {
    this._ball = ball;    
};

SpeckledBall.prototype = {
    constructor: SpeckledBall,

    draw: function() {
        this._ball.draw();
        console.log("and with dots!");
    },
    inc: function() {
        return this._ball.inc();
    }
};    

/** В каждом декораторе нужно воссоздать все функции которые должны быть в объекте родителе, 
 ** и в тех из них, поведение которых мы менять не хотим, нужно просто перенаправлять запрос родителю. 
 ** Этот способ лучше применять когда происходят серьезные изменения, которые затрагивают > 1 — 2 функций
 **************************************************************************************************************/


 /** Способ второй — легковесный **/

function MakeStripedBall( ball ) {
    var function_name = "draw";
    var prev_func = ball[ function_name ];

    ball[ function_name ] = function() {
        prev_func.apply( this, arguments );
        console.log("and with stripes");
    };

    return ball;
};

function MakeSpeckledBall( ball ) {
    var function_name = "draw";
    var prev_func = ball[function_name];

    ball[function_name] = function () {
        prev_func.apply(this, arguments);
        console.log("and with dots!");
    };

    return ball;
};

/** Кода, конечно, нужно меньше чем в первом случае, зато, если изменяемых функций больше чем 1-2, 
 ** или изменения комплексные — разобраться во всем этом будет намного сложнее.
 **************************************************************************************************************/