var searchInfo = {
    author: {
        firstName: "",
        lastName: ""
    },
    bookTitle: "",
    bookisbn: "",
    authorEventId: "",
    authorID: ""
};
var startup = false;
var startupEvent = false;

// var movieeapiKey = "bea0d386";
// var bookapiKey = "tfugk99hpk2nt8sm3ve3peqy";
/* grab current day using day js to use to limit author events returned */
var currentDate = dayjs().format('M/DD/YYYY');

$("#searchBtn").on("click", function () {
    /* save user entered info to searchInfo object */
    searchInfo.author.firstName = $("#firstName").val().trim();
    searchInfo.author.lastName = $("#lastName").val().trim();
    /* save user entered search criteria to local storage */
    saveSearchInfo();
    /*clear search terms in input boxes */
//    $("#firstName").val("");
//    $("#lastName").val("");
    $("#dropdown1").empty();
    $("#authorEvents").empty();
    searchInfo.bookTitle = "";
    searchInfo.bookisbn = "";
    searchInfo.authorID = "";
    searchInfo.authorEventId = "";
    $("#movieCard").addClass("hidden");
    $("#movieNotFound").removeClass("hidden");
    $("#alternateMovieText").text("No movie found that matched the book selected.");
    $("#eventCard").addClass("hidden");
    $("#eventNotFound").removeClass("hidden");
    $("#alternateEventText").text("No event found that matched the book selected.");
    saveSearchInfo();
    clearBookInfo();
    clearAuthorInfo();
    clearMovieInfo();
    clearEventInfo();
    getAuthorInfo();

});

function clearBookInfo() {
    $("#title").val("");
    $("#saleDate").val("");
    $("#format").val("");
    $("#numPages").val("");
    $("#price").val("");
    $("#isbn").val("");
    $("#bookCover").removeAttr("src");
}

function clearAuthorInfo() {
    $("#authorSpotlight").text("");
    $("#authorSpotlight").removeAttr("src");
}

function clearMovieInfo() {
    $("#movieTitle").val("");
    $("#moviePlot").text("");
    $("#movieRated").val("");
    $("#movieRuntime").val("");
    $("#movieGenre").val("");
    $("#movieReleased").val("");
    $("moviePoster").removeAttr("src");
    $("#moviePoster").attr("src", "");
}

function clearEventInfo() {
    $("#eventLocation").val("");
    $("#eventDesc").val("");
    $("#eventDate").val("");
    $("#eventTime").val("");
    $("#eventAddress").val("");
    $("#eventCity").val("");
    $("#eventState").val("");
    $("#eventZip").val("");
}

/* function to save author name and book title to local storage */
function saveSearchInfo() {

    /* save book title and author name to local storage after changing object to String */
    localStorage.setItem("SearchInfo", JSON.stringify(searchInfo));
}

function convertSearchTerm(searchTerm) {
    /* split book title into individual word array based upon space character as separator */
    var convert = searchTerm.split(" ");
    /* rejoin each array element with + between each word in string */
    convert = convert.join("+");
    return convert;
}

function buildMovieQueryURL(bookTitle) {
    var queryURL = "https://www.omdbapi.com/?";

    var movieTitle = convertSearchTerm(bookTitle);
    var queryParams = {
        "apikey": "bea0d386"
    };
    queryParams.t = movieTitle;
    return queryURL + $.param(queryParams);
}

function buildAuthorQueryURL(author) {
    var queryURL = "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search/views/search-display?";

    var queryParams = {
        "api_key": "tfugk99hpk2nt8sm3ve3peqy"
    };
    console.log("author: " + author);
    queryParams.q = convertSearchTerm(author);
    queryParams.preferLanguage = "E";

    return queryURL + $.param(queryParams);
}

/*function buildAuthorContentQueryURL(forcedauthorid) {
    var queryURL = "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/";
    queryURL = queryURL + forcedauthorid + "?";
    var queryParams = {
        "api_key": "tfugk99hpk2nt8sm3ve3peqy"
    }
    queryParams.preferLanguage = "E";
    console.log("authorcontent query");
    return queryURL + $.param(queryParams);
}
*/
function buildAuthorTitlesQueryURL(forcedauthorid) {
    var queryURL = "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/";

    queryURL = queryURL + forcedauthorid + "/titles?";

    var queryParams = {
        "api_key": "tfugk99hpk2nt8sm3ve3peqy"
    }
    queryParams.preferLanguage = "E";
    queryParams.language = "E";
    queryParams.rows = 0;
    queryParams.contribRoleCode = "A";
    //   queryParams.format = "HC";
    return queryURL + $.param(queryParams);
}

function buildBookTitleQueryURL(isbn) {
    var queryURL = "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/";

    queryURL = queryURL + isbn + "?";
    var queryParams = {
        "api_key": "tfugk99hpk2nt8sm3ve3peqy"
    };

    queryParams.preferLanguage = "E";

    return queryURL + $.param(queryParams);
}

function buildEventQueryURL(authorid, authoreventisbn) {
    var queryURL = "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/";

    queryURL = queryURL + authorid + "/events?";

    var queryParams = {
        "api_key": "tfugk99hpk2nt8sm3ve3peqy"
    };

    queryParams.isbn = authoreventisbn;
    queryParams.eventDateFrom = currentDate;
    queryParams.sort = "eventdate";

    return queryURL + $.param(queryParams);
}

function buildPickedEventQueryURL(whichEvent) {
    var queryURL = "https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/events/";

    queryURL = queryURL + whichEvent + "?";

    var queryParams = {
        "api_key": "tfugk99hpk2nt8sm3ve3peqy"
    }

    queryParams.preferLanguage = "EN";
    return queryURL + $.param(queryParams);
}

function retrieveCoverArt(isbn) {
    var srcCoverArt = "https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg";

    return srcCoverArt;
}

function getAuthorInfo() {
    var url1;
    var author = searchInfo.author.firstName + " " + searchInfo.author.lastName;
    url1 = buildAuthorQueryURL(author);
    console.log("author: " + url1);
    $.ajax({
        type: "GET",
        url: url1,
        success: function (response) {
            if (!(response.recordCount === 0)) {
                $("#authorNotFound").addClass("hidden");
                $("#authorCard").removeClass("hidden");
//                response.data.results[0].authorPhotoUrl = null;
                if (response.data.results[0].authorBio === null || response.data.results[0].authorBio === "N/A") {
                    $("#authorBio").html("No author biography provided.");
                } else {
                    $("#authorBio").html(response.data.results[0].authorBio);
                }
                //                $("#authorPhoto").attr("src", response.data.results[0].authorPhotoUrl);
                if (response.data.results[0].authorPhotoUrl === null) {
                    $("#authorPhoto").addClass("hidden");
                    $("#noPhoto").removeClass("hidden");
                }
                else {
                    $("#noPhoto").addClass("hidden");
                    $("#authorPhoto").attr("src", response.data.results[0].authorPhotoUrl);
                    $("authorPhotoUrl").removeClass("hidden");
                }
//                $("#authorPhoto").attr("src", response.data.results[0].authorPhotoUrl);
                searchInfo.authorID = response.data.results[0].authorId;
                var url2;
                url2 = buildAuthorTitlesQueryURL(response.data.results[0].authorId);
                console.log("build book list: " + url2);
                $.ajax({
                    type: "GET",
                    url: url2,
                    success: function (response) {
                        /* build list of book titles for dropdown list */
                        for (var i = 0; i < response.data.titles.length; i++) {
                            var listEl = $("<li>");
                            var listDivEl = $("<li>");
                            var aEl = $("<a>");

                            $(aEl).attr("href", "#!");
                            /* save isbn number as attribute so future api call can happen based upon which book was clicked */
                            $(aEl).attr("isbn", response.data.titles[i].isbn);
                            $(aEl).text(response.data.titles[i].title);
                            $(aEl).addClass("book-list-item");
                            $(aEl).addClass("collection-item");
                            $(listEl).append(aEl);
                            //                            $(listDivEl).addClass("divider");
                            //                          $(listDivEl).attr("tabindex", "-1");
                            $("#dropdown1").append(listEl);
                            //                        $("#dropdown1").append(listDivEl);
                        }
                        $("#bookNotFound").addClass("hidden");
                        $("#bookCard").removeClass("hidden");
                    },
                    error: function () {
                        console.log("am I here?");
                        $("#bookCard").addClass("hidden");
                        $("#bookNotFound").removeClass("hidden");
                        $("#alternateBookText").text("No book found that matched the author selected.");
                        $("#authorCard").addClass("hidden");
                        $("#authorNotFound").removeClass("hidden");
                        $("#alternateAuthorText").text("No author info found that matched the author searched.");
                        //                searchInfo.authorEventId = "";
                        //                saveSearchInfo();
                    }
                });
            } else {
                searchInfo.authorID = "";
                saveSearchInfo();
                console.log("in author else error");
                $("#bookCard").addClass("hidden");
                $("#bookNotFound").removeClass("hidden");
                $("#alternateBookText").text("No book found that matched the author selected.");
                $("#authorCard").addClass("hidden");
                $("#authorNotFound").removeClass("hidden");
                $("#alternateAuthorText").text("No author info found that matched the author selected.");
            }
        }
    });
}

/* listener event for book dropdown list */
$(document).on("click", ".book-list-item", getBookInfo);
/* listener event for author event dropdown list */
$(document).on("click", ".event-list-item", getEventInfo);

$('.dropdown-trigger').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false,
    stopPropagation: false,
    hover: true, // Activate on hover
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
});

/* populate author event info based upon which event user selected */
function getEventInfo() {

    if (startupEvent) {
        whichEvent = searchInfo.authorEventId;
        startupEvent = false;
        console.log("eventId:  " + searchInfo.authorEventId);
        console.log("whichEvent:  " + whichEvent);
    } else {
        var whichEvent = $(this).attr("eventId");
        console.log("inside else");
        console.log(whichEvent);
        searchInfo.authorEventId = $(this).attr("eventId");
        saveSearchInfo();
    }
    if (!(whichEvent === "")) {
        var url;
        url = buildPickedEventQueryURL(whichEvent);
        console.log(url);
        /* call to retrieve single author event based upon eventId selected*/
        $.ajax({
            type: "GET",
            url: url,
            success: function (response) {

                $("#eventLocation").val(response.data.events[0].location);
                if (!(response.data.events[0].description === null)) {
                    $("#eventDescription").text(response.data.events[0].description);
                } else {
                    $("#eventDescription").text("N/A");
                }
                $("#eventDate").val(response.data.events[0].eventDate);
                if (!(response.data.events[0].address1 === null)) {
                    $("#eventAddress").val(response.data.events[0].address1);
                } else {
                    $("#eventAddress").val("N/A");
                }
                //                $("#eventAddress").val(response.data.events[0].address1);
                if (!(response.data.events[0].city === null)) {
                    $("#eventCity").val(response.data.events[0].city);
                } else {
                    $("eventCity").val("N/A");
                }
                //                $("#eventCity").val(response.data.events[0].city);
                if (!(response.data.events[0].state === null)) {
                    $("#eventState").val(response.data.events[0].state);
                } else {
                    $("#eventState").val("N/A");
                }
                //                $("#eventState").val(response.data.events[0].state);
                if (!(response.data.events[0].zip === null)) {
                    $("#eventZip").val(response.data.events[0].zip);
                } else {
                    $("#eventZip").val("N/A");
                }
                //                $("#eventZip").val(response.data.events[0].zip);
                // check if there is an event time returned otherwise display N/A
                console.log(response);
                console.log(response.data.events[0].eventTime);
                console.log(!(response.data.events[0].eventTime === null));
                if (!(response.data.events[0].eventTime === null)) {
                    $("#eventTime").val(response.data.events[0].eventTime);
                } else {
                    $("#eventTime").val("N/A");
                }
//                $("#eventTime").val(response.data.events[0].eventTime);
                M.updateTextFields();
            }
            //            error: function () {
            //                $("#eventCard").addClass("hidden");
            //                $("#eventNotFound").removeClass("hidden");
            //                $("#alternateEventText").text("No author event found that matched the book selected.");
            //                searchInfo.authorEventId = "";
            //                saveSearchInfo();
            //            }
        });
    } else {
        console.log("event else");
        $("#eventCard").addClass("hidden");
        $("#eventNotFound").removeClass("hidden");
        $("#alternateEventText").text("No author event found that matched the book selected.");
    }
}

function getBookInfo() {
    var whichBook;
    var url3;
    if (startup) {
        whichBook = searchInfo.bookisbn;
        startup = false;
        console.log("bookisbn:  " + searchInfo.bookisbn);
        console.log("whichBook:  " + whichBook);
    } else {
        whichBook = $(this).attr("isbn");
        console.log("inside else");
        console.log(whichBook);
        searchInfo.bookisbn = $(this).attr("isbn");
        saveSearchInfo();
    }
//    console.log("whichbook = " + whichBook);
    if (!(whichBook === "")) {
        url3 = buildBookTitleQueryURL(whichBook);
        console.log("url3 book title: " + url3);
        $.ajax({
            type: "GET",
            url: url3,
            success: function (response) {
                console.log(response);
                $("#authorEvents").empty();
                $("#bookNotFound").addClass("hidden");
                $("#bookCard").removeClass("hidden");
                searchInfo.bookTitle = response.data.titles[0].title;

                $("#title").val(response.data.titles[0].title);
                if (response.data.titles[0].pages === null) {
                    $("#numPages").val("N/A");
                } else {
                    $("#numPages").val(response.data.titles[0].pages);
                }
                $("#saleDate").val(response.data.titles[0].onsale);
                $("#format").val(response.data.titles[0].format.description);
                if (response.data.titles[0].price[0].currencyCode === "USD") {
                    $("#price").val("$" + response.data.titles[0].price[0].amount);
                } else {
                    $("#price").val("$" + response.data.titles[0].price[1].amount);
                }
                $("#isbn").val(String(response.data.titles[0].isbn));
                M.updateTextFields();
                $("#bookCover").attr("src", retrieveCoverArt(response.data.titles[0].isbn));
                console.log("calling display movie");
                displayMovieInfo();

                url4 = buildEventQueryURL(searchInfo.authorID, response.data.titles[0].isbn);
                console.log("url4 = " + url4);
                /* api call to retrieve author events to populate dropdown list */
                $.ajax({
                    type: "GET",
                    url: url4,
                    success: function (response) {
                        $("#eventNotFound").addClass("hidden");
                        $("#eventCard").removeClass("hidden");
                        /* add each event to list */
                        for (var i = 0; i < response.data.events.length; i++) {
                            var listEl = $("<li>");
                            //                            var listDivEl = $("<li>");
                            var aEl = $("<a>");

                            $(aEl).attr("href", "#!");
                            $(aEl).attr("eventId", response.data.events[i].eventId);
                            $(aEl).text(response.data.events[i].location);
                            $(aEl).addClass("event-list-item");
                            $(aEl).addClass("collection-item");
                            $(listEl).append(aEl);
                            //                            $(listDivEl).addClass("divider");
                            //                            $(listDivEl).attr("tabindex", "-1");
                            $("#authorEvents").append(listEl);
                            //                            $("#authorEvents").append(listDivEl);
                        }
                    },
                    error: function () {
                        console.log("inside event error");
                        $("#eventCard").addClass("hidden");
                        $("#eventNotFound").removeClass("hidden");
                        $("#alternateEventText").text("No author event found that matched the book selected.");
                        searchInfo.authorEventId = "";
                        saveSearchInfo();
                        //                        console.log("calling movie from within json error");
                        //                        displayMovieInfo();
                    }
                });
            }
        });
    } else {
        $("#eventCard").addClass("hidden");
        $("#eventNotFound").removeClass("hidden");
        $("#alternateEventText").text("No author event found that matched the book selected");
        searchInfo.authorEventId = "";
        saveSearchInfo();
        console.log("calling movie from within else");
        displayMovieInfo();
    }
}

function displayMovieInfo() {
    var url;
    console.log("searchInfo.bookTitle = " + searchInfo.bookTitle);
    if (!(searchInfo.bookTitle === "")) {
        /* build url for movie api call utilizing the book title chosen */
        url = buildMovieQueryURL(searchInfo.bookTitle);
        console.log(url);
        /* make ajax call to retrieve movie object */
        $.ajax({
            type: "GET",
            url: url,
            success: function (response) {
                console.log(response);
                if (response.Error === "Movie not found!") {
                    console.log("inside json response movie error")
                    $("#movieCard").addClass("hidden");
                    $("#movieNotFound").removeClass("hidden");
                    $("#alternateMovieText").text("No movie found that matched the book selected.");
                } else {
                    $("#movieNotFound").addClass("hidden");
                    $("#movieCard").removeClass("hidden");
                    clearMovieInfo();

                    $("#movieTitle").val(response.Title);
                    $("#moviePlot").text(response.Plot);
                    $("#movieRated").val(response.Rated);
                    $("#movieRuntime").val(response.Runtime);
                    $("#movieGenre").val(response.Genre);
                    $("#movieReleased").val(response.Released);
                    M.updateTextFields();
                    if (response.Poster === "N/A") {
                        $("#moviePoster").addClass("hidden");
                        $("#notAvailableText").removeClass("hidden");
                        $("#notAvailableText").text("No movie poster available");
                    } else {
                        $("#notAvailableText").addClass("hidden");
                        $("#moviePoster").removeClass("hidden");

                    }
                    $("#moviePoster").attr("src", response.Poster);
                }
            }
            //        error: function () {
            //            console.log("inside movie error");
            //            $("#movieCard").addClass("hidden");
            //            $("#movieNotFound").removeClass("hidden");
            //            $("#alternateMovieText").text("No movie found that matched the book selected.");
            //            searchInfo.authorEventId = "";
            //            saveSearchInfo();
            //        }
        })
    } else {
        console.log("else movie");
        $("#movieCard").addClass("hidden");
        $("#movieNotFound").removeClass("hidden");
        console.log("movie else")
        $("#alternateMovieText").text("No movie found that matched the book selected.");
    }
}

function init() {
    // Get stored events from localStorage
    // Parsing the JSON string to an object
    var savedInfo = JSON.parse(localStorage.getItem("SearchInfo"));


    startup = true;
    startupEvent = true;
    // If events were not retrieved from localStorage, update local storage to searchInfo object
    if (savedInfo === null) {
        localStorage.setItem("SearchInfo", JSON.stringify(searchInfo));
        getAuthorInfo();
        getBookInfo();
        getEventInfo();
    } else {
        searchInfo = savedInfo;
        console.log("in else at init");
        console.log("searchInfo");
        console.log(searchInfo);
        clearAuthorInfo();
        clearBookInfo();
        clearEventInfo();
        clearMovieInfo();
        getAuthorInfo();
        getBookInfo();
        getEventInfo();
    }
}

init();

$('.dropdown-trigger').dropdown();
$('.dropdown-trigger2').dropdown();
$('.dropdown-trigger3').dropdown();