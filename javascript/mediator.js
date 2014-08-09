/**
 ** !!!!!!!!!!!!!!!!!!
 ** !!!! MEDIATOR !!!!
 ** !!!!!!!!!!!!!!!!!!
 **
 ** Mediator — это такая штука, которая помогает в особо запущенных случаях взаимодействия между обьектами,
 ** например, когда у нас, скажем, 5 обьектов более-менее разного типа, и все почему-то знают друг о друге,
 ** стоит серьезно задуматься о медиаторе.
 **************************************************************************************************************/
 console.log("** MEDIATOR **");
 
/** В качестве подготовки сначала сделаем несколько классов, которые в перспективе медиатор будут использовать
 ** (подсказка в данном случае медиатор будет называтья kitchen:) **/
 
function Daddy() {};
Daddy.prototype = {
    constructor: Daddy,

    getBeer: function (){
        if (!kitchen.tryToGetBeer()) {
            console.log("Daddy: Who the hell drank all my beer?");
            return false;
        }

        console.log("Daddy: Yeeah! My beer!");
        kitchen.oneBeerHasGone();
        return true;
    },
    argue_back: function () { 
    	console.log("Daddy: it's my last beer, for shure!"); 
    }
};

function Mammy() {};
Mammy.prototype = {
    constructor: Mammy,

    argue: function () {
        console.log("Mammy: You are f*king alconaut!");
        kitchen.disputeStarted();
    }
};

function BeerStorage(beer_bottle_count) {
    this._beer_bottle_count = beer_bottle_count;
};
BeerStorage.prototype = {
    constructor: BeerStorage,

    takeOneBeerAway: function (){
        if (this._beer_bottle_count == 0) {
        	return false;
        }

        this._beer_bottle_count--;
        return true;
    }
};

/** А теперь пора написать и сам медиатор: **/

var kitchen = {
    daddy: new Daddy(),
    mammy: new Mammy(),
    refrigerator: new BeerStorage(3),
    stash: new BeerStorage(2),

    tryToGetBeer: function () {
        if (this.refrigerator.takeOneBeerAway()) {
        	return true;
        }
        if (this.stash.takeOneBeerAway()) {
        	return true;
        }
        return false
    },
    oneBeerHasGone: function (){ 
    	this.mammy.argue();
    },
    disputeStarted: function (){ 
    	this.daddy.argue_back(); 
    }
};

/** И так, у нас есть 4 объекта работа со взаимодействием между которыми, 
 ** могла бы превратиться в неплохое наказание, если бы проходила не через Mediator. **/