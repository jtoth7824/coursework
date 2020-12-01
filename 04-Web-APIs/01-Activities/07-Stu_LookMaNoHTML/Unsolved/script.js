// Create your HTML Page via DOM Methods here!

var tagName = document.createElement("h1");
tagName.textContent = "Hello World";
document.body.appendChild(tagName);

var h1Tag = document.querySelector("h1");
h1Tag.style.textAlign = "center";
h1Tag.style.fontSize = "44px";
h1Tag.style.color = "green";

tagName = document.createElement("h2");
tagName.textContent = "This is my text";
document.body.appendChild(tagName);

var h2Tag = document.querySelector("h2");
h2Tag.style.textAlign = "center";
h2Tag.style.fontSize = "36px";
h2Tag.style.color = "blue";

tagName = document.createElement("div");
document.body.appendChild(tagName);

var divTag = document.querySelector("div");
divTag.style.textAlign = "center";

tagName = document.createElement("img");
tagName.src = "https://images-na.ssl-images-amazon.com/images/I/61dvVN2aOGL._AC_SX679_.jpg"
document.body.lastChild.appendChild(tagName);

var imgTag = document.querySelector("img");
imgTag.style.height = "300px";
imgTag.style.width = "200px";

tagName = document.createElement("figcaption");
tagName.textContent = "Figure 1: Frog";
document.body.lastChild.appendChild(tagName);

tagName = document.createElement("div");
document.body.appendChild(tagName);

var divTag = document.querySelector("div");
divTag.nextSibling.style.textAlign = "center";
divTag.nextSibling.style.color = "red";
divTag.nextSibling.style.fontSize = "20px";

tagName = document.createElement("ul");
document.body.lastChild.appendChild(tagName);

var ulTag = document.querySelector("ul");
ulTag.style.textAlign = "center";
/*ulTag.style.color = "red";
ulTag.style.fontSize = "20px";*/

tagName = document.createElement("li");
tagName.textContent = "Pizza";
document.body.lastChild.lastChild.appendChild(tagName);

var liTag = document.querySelector("li");
liTag.style.marker.textAlign = "center";
liTag.style.textAlign = "center";
liTag.style.color = "red";
liTag.style.fontSize = "20px";

tagName = document.createElement("li");
tagName.textContent = "Wings";
document.body.lastChild.lastChild.appendChild(tagName);

tagName = document.createElement("li");
tagName.textContent = "Lasagna";
document.body.lastChild.lastChild.appendChild(tagName);




