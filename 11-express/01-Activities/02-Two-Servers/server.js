const http = require('http');

const PORT1 = 7000;
const PORT2 = 7500;

const handleRequest1 = (request , response) => {
    response.end(`It works!!  Path hit: ${request.url}`);
}

const handleRequest2 = (request, response) => {
    response.end(`Wow #2 works!! Path hit: ${request.url}`);
}

const server1 = http.createServer(handleRequest1);
const server2 = http.createServer(handleRequest2);

server1.listen(PORT1, () => {
    console.log(`Server listening on: http://localhost: ${PORT1}`);
});

server2.listen(PORT2, () => {
    console.log(`Server listening on: http://localhost: ${PORT2}`);
});
