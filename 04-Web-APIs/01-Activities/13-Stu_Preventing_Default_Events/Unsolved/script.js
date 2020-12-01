var priceEl = document.querySelector(".price");
var tipEl = document.querySelector(".tip");
var submitEl= document.querySelector("#submit");
var tipAmountEl = document.querySelector("#tip-amount");
var El = document.querySelector("#new-total");
var numPeopleEl = document.querySelector(".numPeople");
var submit2El = document.querySelector("#submit2");
var totalEl = document.querySelector("#total");

var tipCalc;
var tip;
var getTotal;

submitEl.addEventListener("click", function(event) {

    event.preventDefault();

    tip = parseFloat(priceEl.value) * parseFloat((tipEl.value/100));
    tipCalc = parseFloat(priceEl.value) + tip;

    tipAmountEl.textContent = tip;
    El.textContent = tipCalc;


    
});

submit2El.addEventListener("click", function(event) {

    event.preventDefault();

    var getTotal = El.textContent;

    console.log(numPeopleEl.value);
    console.log(getTotal);

    console.log(parseInt(getTotal));
    console.log(parseInt(getTotal.value));
    var splitTip = parseFloat(getTotal / numPeopleEl.value).toFixed(2);
    console.log(splitTip);

    totalEl.textContent = splitTip;
});