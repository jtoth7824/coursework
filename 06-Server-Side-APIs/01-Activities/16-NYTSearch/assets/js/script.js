
var apiKey = "AOpUlM707uLyq347qjzG4AMASfR7YXmE"
var searchTerm = "";
var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + apiKey;


var cntRecords;
var startYr;
var endYr;
var term;

function displayArticles() {



    for(var i=0; i<cntRecords; i++) {

        var article = $("<div>");

        $(article) = response.data[i];
        $("#results-content").append(article);


    }



}

$("#submit").on("click", function (event) {
    event.preventDefault

    term = $("#search-input").val().trim();
    cntRecords = $("#cntRecords").val();
    startYr = $("#start-year").val().trim();
    endYr = $("#end-year").val().trim();

    if (term !== null) {
        searchTerm = searchTerm + term;
    }
    else if (cntRecords !== null) {
        searchTerm = searchTerm + "&records=" + cntRecords;
    }
    else if (startYr !== null) {
        searchTerm = searchTerm + "&begin_date=" + startYr;
    }
    else {
        searchTerm = searchTerm + "&end_date=" + endYr;
    }
    nytURL = nytURL + searchTerm + apiKey;

console.log(nytURL);
    $.ajax({
        type: "GET",
        url: nytURL,
        success: function (response) {
            
        
            console.log(response);
    
        }
    });


});


$("#clear").on("click", function (event) {
    event.preventDefault

    $("#articles").empty();

});

