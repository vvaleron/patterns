/**
 ** !!!!!!!!!!!!!!!!!!
 ** !!!! OBSERVER !!!!
 ** !!!!!!!!!!!!!!!!!!
 **
 ** Это тот самый паттерн, который мы используем по пятьдесят раз в день даже особенно
 ** об этом незадумывасяь — $(#some_useful_button).click( blah_blah_blah ) — знакомая конструкция?
 ** В ней click — это событие, а blah_blah_blah какраз и есть тот самый Observer 
 ** который за этим событием наблюдает.
 **
 ** Для своих коварных планов, можно реализовать и собственную систему событий и наблюдателей,
 ** которая будет уметь реагировать не только на действия пользвоателя, но и на что-нибудь еще.
 **************************************************************************************************************/
console.log("** OBSERVER **");

/** Ключевым её компонентом является объект событие: **/

Event = function() {
    this._observers = [];
};

Event.prototype = {
    raise: function (data) {
        for (var i in this._observers) {
            var item = this._observers[i];
            item.observer.call(item.context, data);
        }
    },
    subscribe: function (observer, context) {
        var ctx = context || null;
        this._observers.push({ observer: observer, context: ctx });
    },
    unsubscribe: function (observer, context ) {
        for (var i in this._observers) {
            if ( this._observers[i].observer == observer && this._observers[i].context == context ) {
            	delete this._observers[i];
            }                    
        }
    }
};


/** Способ первый — простой **/

var someEvent = new Event();
someEvent.subscribe(function ( data ) { 
	console.log("wohoooooo " + data ) 
});

var someObject = {
    topSecretInfo: 42,
    observerFunction: function () { 
    	console.log("Top Secret:" + this.topSecretInfo) 
    }
};

someEvent.subscribe(someObject.observerFunction, someObject); 
someEvent.raise("yeaah!");
someEvent.raise();
/**************************************************************************************************************/

/** Способ второй **/

$(document).ready(function () {
    var event_textUpdated = new Event();

    function Preview(jQuery) {
        this._root = jQuery;
        this._text = this._root.find(".text");
        this._button = this._root.find(".updating_control");
        this._isSubscribed = false;

        this.init();
    };
    Preview.prototype = {

        constructor: Preview,

        _onButtonClick: function () {
            if (this._isSubscribed) {
                this.unsubscribe();
                this._button.text("Subscribe!");
                return;
            }

            this.subscribe();
            this._button.text("Unsubscribe!");
        },

        init: function () {
            this._button.click($.proxy(this._onButtonClick, this));
            this.subscribe();
        },
        update: function (data) {
            this._text.text(data);
        },
        subscribe: function () {
            event_textUpdated.subscribe(this.update, this);
            this._isSubscribed = true;
        },
        unsubscribe: function () {
            event_textUpdated.unsubscribe(this.update, this);
            this._isSubscribed = false;
        }
    };

    var preview1 = new Preview($("#preview1"));
    var preview2 = new Preview($("#preview2"));

    preview1.update($("#textbox").val());
    preview2.update($("#textbox").val());
    
    $("#textbox").keyup(function () { 
        event_textUpdated.raise($(this).val()); 
    });
});