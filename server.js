const express = require('express'); // no file path 'cus this is a core module dude
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;

const app = express(); // calls the express function which gives us a server, now we can call it using 'app'

app.use(morgan('dev')); // dev causes morgan to log using the development version, which logs additional info to the screen
app.use(express.json()); // parses JSON data into JS properties so we can use the data

app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // pass control of the application routing to the next relevant routing method, otherwise it would stop here.

}); // catch all routing method, needs a path as the first parameter, second parameter is callbacks

app.get('/campsites', (req, res) => { // no need for statusCode or header because app.all already set those for us
    res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => { // note: this is super dangerous and in the real world needs to be limited to only priviledged users
    res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + '/public')); // __dirname is a special variable in node, when used it refers to the absolute path of the current directory of the file that it's in

app.use((req, res) => {
    // console.log(req.headers); // removed because morgan handles this for us now
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
}); // use method gives us server responses, accepts callback middleware functions: req, res, and next which is a function

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}); // creates http server class instance, and starts listening to it