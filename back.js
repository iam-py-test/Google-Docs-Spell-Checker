/*
Old unneeded code

var pause = function(time,word){
	return new Promise(res => {
		
		chrome.tts.speak(word,{enqueue:true,onEvent:function(e){
			console.debug(e)
			if(e.type === 'end'){
			res(true)
			}
			}})
			res(true)
	})
}
var isS = function(){
	return new Promise(res => {
		chrome.tts.isSpeaking(res)
	})
}
chrome.contextMenus.create({title:"Read aloud",id:"ra",contexts:["browser_action"]})
chrome.contextMenus.onClicked.addListener(function(d,tab){
	console.log(d,tab)
	if(d.menuItemId === 'ra'){
		chrome.tabs.executeScript(tab.id,{code:`
		"use strict";
		var q = document.querySelectorAll('.kix-wordhtmlgenerator-word-node')
var txt = ''
q.forEach(function(e){txt += e.innerText})
var split1 = txt;
console.log(txt)
split1;
		`},async function(txt){
			//console.log(txt)
			var words = ["Error"]
			try{
				words = txt[0].split(".")
			}
			catch(err){
				console.log("Error:",err)
			}
			window.current = 1
			console.log(words)
			
			chrome.tts.onEvent.addListener("end",function(){
				console.log('end')
				if(window.current > words.length){return;}
				chrome.tts.speak(words[window.current],function(){
					window.current += 1
				})
			})
			//chrome.tts.speak(words[0],function(){window.current = 1;console.log(2)})
		
			for(var t = 0;t < words.length;t++){
				console.log(words[t])
				var p = await pause(0,words[t])
				console.log(t,p)
				/\*console.log(t,words[t])
				if(await isS()){await pause((words[t - 1]||"").length)}
			chrome.tts.speak(words[t] + ".",function(){
				console.log('done')
				window.current += 1
			})*\/
			
			}
		})
	}
})*/
//the new code

//get the original background color
chrome.browserAction.getBadgeBackgroundColor({},function(r){
	window.bc = r
})
//create the menu items
chrome.contextMenus.create({"title":"Check for the word \"like\"","contexts":["browser_action"],"id":"like"}) /*the id is the word we are looking for*/
chrome.contextMenus.create({"title":"Check for the word \"thing\"","contexts":["browser_action"],"id":"thing"})
chrome.contextMenus.create({"title":"Check for the word \"maybe\"","contexts":["browser_action"],"id":"maybe"})
chrome.contextMenus.create({"title":"Check your Google Doc for issues","contexts":["browser_action"],"id":"check"}) /*this does not check for a word but will soon run a basic spell check*/ 
chrome.contextMenus.onClicked.addListener(function(e,tab){
	//if it is not the item we want or it is not on docs.google.com 
	try{
		
	if(e.menuItemId === 'check' || new URL(tab.url).hostname !== 'docs.google.com'){return}
	}
	catch(err){
		//if we have an error - log it and return
		console.log("Error:",err)
		return;
	}
	//console.log(e,tab)
	//get the text of the Google Doc
	chrome.tabs.executeScript(tab.id,{file:`spellcheck.js`},async function(txt){
		//make sure it returned something
			if(txt[0] !== undefined){
				//check for the word
				if(txt[0].toLowerCase().includes(e.menuItemId)){
					//if we found it
					chrome.browserAction.setBadgeText({text:"!",tabId:tab.id})
					chrome.browserAction.setBadgeBackgroundColor({color:"#F00",tabId:tab.id})
				}
				else{
					//if not, reset the icon
					chrome.browserAction.setBadgeText({text:"Ok",tabId:tab.id})
					chrome.browserAction.setBadgeBackgroundColor({color:window.bc,tabId:tab.id})
				}
			}
		})
})
chrome.contextMenus.onClicked.addListener(function(e,tab){
	if(e.menuItemId!=='check'){return;}
	//this is still being worked on and is buggy
		chrome.tabs.executeScript(tab.id,{file:`spellcheck.js`},async function(txt){
			if(txt[0] !== undefined){
				var issuewords = new Map([["prinipal","principal"],["i","I"]])
				var overuse = ['like',"maybe",'thing']
				var words = txt[0].toLowerCase().replaceAll(/\n/g, " " ).replaceAll("\\n"," ").split(" ")
				var issuem = `<html><head><title>Issue report</title></head><body><h1>Issues</h1>`
			
				chrome.windows.create({url:URL.createObjectURL(new Blob([issuem],{type:"text/html"}))})
			}
		})
})
