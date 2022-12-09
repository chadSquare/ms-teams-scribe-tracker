// ==UserScript==
// @name         Scribe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://teams.microsoft.com/*
// @match        https://teams.microsoft.com/_#/calendarv2/*
// @match        https://teams.microsoft.com/_#/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

 //  create buttons
 const summaryBtn = document.createElement('button');
 summaryBtn.innerText = 'Get Summary';
 summaryBtn.setAttribute('id', 'summaryBtn');
 summaryBtn.style.backgroundColor = "rgb(91, 95, 199)";
 summaryBtn.style.color = "rgb(255, 255, 255)";
 summaryBtn.style.borderRadius = "3px";
 summaryBtn.style.border = "none";
 summaryBtn.style.padding = "5px";
 summaryBtn.style.marginLeft = "5px";
 summaryBtn.style.marginRight = "5px";
 summaryBtn.style.height = "32px";

 const updateScribeBtn = document.createElement('button');
 updateScribeBtn.innerText = 'Update Scribe';
 updateScribeBtn.setAttribute('id', 'updateScribeBtn');
 updateScribeBtn.style.backgroundColor = "rgb(91, 95, 199)";
 updateScribeBtn.style.color = "rgb(255, 255, 255)";
 updateScribeBtn.style.borderRadius = "3px";
 updateScribeBtn.style.border = "none";
 updateScribeBtn.style.padding = "5px";
 updateScribeBtn.style.marginRight = "5px";
 updateScribeBtn.style.height = "32px";

 // button hover effects
 summaryBtn.addEventListener("mouseover", () => {
     summaryBtn.style.backgroundColor = "rgb(68, 71, 145)";
 });
 summaryBtn.addEventListener("mouseleave", () => {
     summaryBtn.style.backgroundColor = "rgb(91, 95, 199)";
 });
 updateScribeBtn.addEventListener("mouseover", () => {
     updateScribeBtn.style.backgroundColor = "rgb(68, 71, 145)";
 });
 updateScribeBtn.addEventListener("mouseleave", () => {
     updateScribeBtn.style.backgroundColor = "rgb(91, 95, 199)";
 });

const teamMembers = [
 'Liubomyr',
 'Jaco',
 'Nazar',
 'Hendri',
 'Waseem',
 'Marindi',
 'Chad',
 'Bala'
 ];

//  methods for script
function getCurrentScribe() {
 return localStorage.getItem('currentScribe');
}

function getNextScribe() {
 const currentScribe = getCurrentScribe();
 const currentScribeIndex = teamMembers.indexOf(currentScribe);
 if (currentScribeIndex >= teamMembers.length - 1) {
     return teamMembers[0];
 }
 return teamMembers[currentScribeIndex + 1];
}

function setNextScribe() {
 const newPerson = getNextScribe();
 localStorage.setItem('currentScribe', newPerson);
 localStorage.setItem('lastScribeUpdate', new Date);
}

function getLastUpdateDate() {
 return localStorage.getItem('lastScribeUpdate');
}

function getSummary(e) {
 if(e !== 'remove') {
     e.preventDefault();
 }
 alert(`-The last Scribe was: ${getCurrentScribe()}, \n-The next Scribe should be: ${getNextScribe()}, \n-The last update was: ${getLastUpdateDate()}`);
}

function runUpdate() {
 setNextScribe();
 alert(`-The new Scribe is: ${getCurrentScribe()}`);
}



(function() {
 'use strict';
 waitForKeyElements (".power-bar-margin", () => {
     const powerBarMargin = document.querySelector(".power-bar-margin");
     console.log(powerBarMargin);
     powerBarMargin.insertAdjacentElement('afterend', summaryBtn)
     summaryBtn.insertAdjacentElement('afterend', updateScribeBtn)

     document.querySelector("#summaryBtn").addEventListener("click", (e) => getSummary(e));
     document.querySelector("#updateScribeBtn").addEventListener("click", () => runUpdate());
   });

})();
