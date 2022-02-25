const express = require('express'); // no file path 'cus this is a core module dude
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');
const hostname = 'localhost';
const port = 3000;

const app = express(); // calls the express function which gives us a server, now we can call it using 'app'

app.use(morgan('dev')); // dev causes morgan to log using the development version, which logs additional info to the screen
app.use(express.json()); // parses JSON data into JS properties so we can use the data

app.use('/campsites', campsiteRouter); // here we provide the ROOT path for campsiteRouter and that is why we don't need to specify it in campsiteRouter.js under campsiteRouter.route('/')

// IMPORTANT: see commit history - we moved our routing methods FROM here, into campsiteRouter.js

// IMPORTANT: see commit history - we also deleted all of our campsiteId methods for the upcoming workshop, goodbye precious work!

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