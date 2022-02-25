const express = require('express');
const campsiteRouter = express.Router();

campsiteRouter.route('/') // single argument of a path, also note we converted these routes into a single long crazy chain method, check commit history for before and after in server.js
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // pass control of the application routing to the next relevant routing method, otherwise it would stop here.

}) // catch all routing method, needs a path as the first parameter, second parameter is callbacks
.get((req, res) => { // no need for statusCode or header because app.all already set those for us
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => { // note: this is super dangerous and in the real world needs to be limited to only priviledged users
    res.end('Deleting all campsites');
});

module.exports = campsiteRouter; // don't forget to export so we can use this elsewhere!