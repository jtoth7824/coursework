var textdom = document.getElementById("articles");
var maindom = document.getElementById("main");

textdom.children[0].lastElementChild.style.color = "blue";
textdom.children[0].style.fontSize = "50px";
textdom.previousElementSibling.style.background = "black";

maindom.childNodes[1].style.textDecoration = "underlined";
maindom.lastElementChild.style.fontSize = "50px";
maindom.firstElementChild.style.color = "orange";
maindom.lastElementChild.parentElement.style.fontSize = "40px";
