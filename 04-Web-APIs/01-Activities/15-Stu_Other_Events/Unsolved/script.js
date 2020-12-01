var eventType = document.querySelector("#event-type"); 
var mouseEventsEl = document.querySelector("#click-events");
var keyEventsEl = document.querySelector("#key-events");

function toggleDisplay(event) {
  var value = event.target.value;
  if(value === "keydown") {
    mouseEventsEl.classList.add("hide");
    keyEventsEl.classList.remove("hide");
  }
  else {
    mouseEventsEl.classList.remove("hide");
    keyEventsEl.classList.add("hide");
  }
}

function keyDown(event) {
  var key = event.key;
  var code = event.code;

  document.querySelector("#key").textContent = key;
  document.querySelector("#code").textContent = code;
  document.querySelector("#status").textContent = "KeyPressDown";

}

function keyUp(event) {
  var value = event.key.value;
  document.querySelector("#status").textContent = "KeyPressUp";

}

function clickButton(event) {
  var target = event.target.textContent;
  var x = event.x;
  var y = event.y;

  document.querySelector("#target").textContent = target;
  document.querySelector("#x").textContent = x;
  document.querySelector("#y").textContent = y;


}

eventType.addEventListener("change", toggleDisplay);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
document.addEventListener("click", clickButton);