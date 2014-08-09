/**
 ** !!!!!!!!!!!!!!!!!!!
 ** !!!! SINGLETON !!!!
 ** !!!!!!!!!!!!!!!!!!!
 **
 ** Singleton - это объект, который есть в системе в одном экземпляре.
 **************************************************************************************************************/
console.log("** SINGLETON **");

 /** Способ первый — тривиальный **/

 var singleton_A = {
    log: function( text ){ 
    	console.log(text); 
    }
 }
 /** Это простой наглядный и эффективный метод, который, даже, в объяснении, по-моему, не нуждается.
 **************************************************************************************************************/






 /** Способ второй — выпендрежный **/

 /** Основная его задача — это показать какой ты крутой однокурсникам или другим джуниорам. 
  ** Кроме этого он, конечно, может быть действительно полезен — с таким подходом проще перестраиваться 
  ** если планы изменились и где-то в середине проекта синглетон решили заменить несколькими объектами
  **/
 var Singleton_B;
 (function(){
     var instance;
     var anticlone_proxy;
 
     Singleton_B = function(){
         if( instance ){ return instance; }
 
         instance = 
         {
             _counter: 0,
             log: function( text ){ this._counter++; console.log( text + this._counter ); }
         }
 
         anticlone_proxy =
         {
             log: function( text ){ return instance.log( text ); }
         }
 
         return anticlone_proxy;
     };
 })();
 /** Его фишка в том что мы просто создаем объект, 
  ** а синглетон он, или нет — нас в общем-то не очень волнует: 
  **/

 function NonSingleton() {};

 NonSingleton.prototype = {
        consturctor: NonSingleton,
        scream: function(){console.log("Woooohoooooo!")}
 };

 var singleton = new Singleton_B();
 var nonsingleton = new NonSingleton();
        
 singleton.log("3..2..1... ignition!");
 nonsingleton.scream();

 /** Если этот код выполнить, то в консоли мы увидим: 
  **
  ** "3..2..1... ignition!"
  ** "Woooohoooooo!"
  **/