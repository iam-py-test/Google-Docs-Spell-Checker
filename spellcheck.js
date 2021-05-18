"use strict";
var q = document.querySelectorAll('.kix-wordhtmlgenerator-word-node')
var txt = ''
q.forEach(function(e){txt += e.innerText})
var split1 = txt;
console.log(txt,q)
var links = document.querySelectorAll("a.kix-link")
console.log(links.length)
split1;
		