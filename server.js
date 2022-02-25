const express = require('express'); // no file path 'cus this is a core module dude

const hostname = 'localhost';
const port = 3000;

const app = express(); // calls the express function which gives us a server, now we can call it using 'app'

app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
}); // use method gives us server responses, accepts callback middleware functions: req, res, and next which is a function

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}); // creates http server class instance, and starts listening to it