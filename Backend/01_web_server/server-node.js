const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200; // OK
        res.setHeader('Content-Type', 'text/plain');// MIME type  it is used to tell the browser what type of file it is receiving
        // // text/html IT IS USED FOR HTML //it is also called header of the response
        res.end('Hello ice tea\n'); // it is also called body of the response
            
    }else if (req.url === '/ice-tea') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Thanks for ordering ice tea\n');
    }else {
        res.statusCode = 404; // Not Found
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found\n');
    }
});

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
        });