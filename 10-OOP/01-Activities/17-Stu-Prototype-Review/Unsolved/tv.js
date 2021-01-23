const axios = require("axios");
const fs = require("fs");

// Create the TV constructor
const TV = function() {};

// Find a tv show actor

TV.prototype.findActor = function(people) {
  const URL = "http://api.tvmaze.com/search/people?q=" + people;

  axios.get(URL).then(response => {
    const actorData = [
      "Actor: " + response.data[0].person.name,
      "Birthday: " + response.data[0].person.birthday,
      "Gender " + response.data[0].person.gender,
      "Country: " + response.data[0].person.country.name,
      "URL: " + response.data[0].url,
      "-".repeat(60)
    ].join("\n\n");

    fs.appendFile("log.txt", actorData, err => {
      if (err) throw err;

      console.log(actorData);
    });
  });
};

// Find a tv show
TV.prototype.findShow = function(show) {
  const URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;

  axios.get(URL).then(response => {
    const showData = [
      "Show: " + response.data.name,
      "Genre(s): " + response.data.genres.join(", "),
      "Rating: " + response.data.rating.average,
      "Network: " + response.data.network.name,
      "Summary: " + response.data.summary,
      "-".repeat(60)
    ].join("\n\n");

    fs.appendFile("log.txt", showData, err => {
      if (err) throw err;

      console.log(showData);
    });
  });
};

module.exports = TV;
