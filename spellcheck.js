//use strict to make this code safer
"use strict";
//query all the text
var q = document.querySelectorAll('.kix-wordhtmlgenerator-word-node')
//make var to store the text
var txt = ''
//loop throught each of the elements adding their text content
q.forEach(function(e){txt += e.innerText})
//log the text
console.log(txt,q)
//get all the links - just for testing purpuses - this extention does not use this but you could make one that does
var links = document.querySelectorAll("a.kix-link")
//log how many links there are
console.log(links.length)
//return the text
txt;
		
