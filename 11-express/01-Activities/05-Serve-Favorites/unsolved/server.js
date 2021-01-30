// Dependencies
const http = require('http');
const fs = require('fs');

// Set our port to 8080
const PORT = 8080;

// split out read file function from handleRequest

const makeHtml = (path, res) => {
  return fs.readFile(`${__dirname}${path}`, (err, data) => {
    if(err) throw err;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}
// Create a function which handles incoming requests and sends responses

const handleRequest = (req, res) => {
    // Capture the url the request is made to
    const path = req.url;
  
    switch (path) {
      case '/food':
        return makeHtml(`${path}.html`, res);
//        return fs.readFile(`${__dirname}/food.html`, (err, data) => {
//          if (err) throw err;
//          res.writeHead(200, { 'Content-Type': 'text/html' });
//          res.end(data);
//        });
  
      case '/movie':
        return makeHtml(`${path}.html`, res);
//        return fs.readFile(`${__dirname}/movie.html`, (err, data) => {
//          if (err) throw err;
//          res.writeHead(200, { 'Content-Type': 'text/html' });
//          res.end(data);
//        });
  
      case '/framework':
        return makeHtml(`${path}.html`, res);
//        return fs.readFile(`${__dirname}/framework.html`, (err, data) => {
//          if (err) throw err;
//          res.writeHead(200, { 'Content-Type': 'text/html' });
//          res.end(data);
//        });
  
      // default to rendering index.html, if none of above cases are hit
      default:
        return makeHtml('/home.html', res);
//        return fs.readFile(`${__dirname}/home.html`, (err, data) => {
//          if (err) throw err;
//          res.writeHead(200, { 'Content-Type': 'text/html' });
//          res.end(data);
//        });
    }
  };

// Create our server
const server = http.createServer(handleRequest);

// Starts our server
server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
