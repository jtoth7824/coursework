var decrj = document.querySelector("#decrement");
var incrj = document.querySelector("#increment");
var spantag = document.querySelector("#count");
var count = 0;

decrj.addEventListener("click", function() {
    if (count > 0) {
        count--;
        spantag.textContent = count;
    }
});


incrj.addEventListener("click", function () {
    count++;
    spantag.textContent = count;
});

