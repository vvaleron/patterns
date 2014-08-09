/**
 ** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 ** !!!! SELF DEFINING FUNCTIONS !!!!
 ** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 **
 **************************************************************************************************************/
console.log("** self-defining functions **");

var selfDefining = function() {
	console.log("some really heavy initialization occured");
	console.log("f*ck yeah!");

	selfDefining = function() {
		console.log("job done!");
	};
};

selfDefining();
selfDefining();

/** Если этот код выполнить, то в консоли мы увидим:
 **
 ** some really heavy initialization occured VM80:3
 ** f*ck yeah! VM80:4
 ** job done!
 **
 **/ 