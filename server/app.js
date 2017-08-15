const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const volleyball = require('volleyball');
const path = require('path');
const db = require('./models').db;
const router = require('./routes.js')

var app = express();

app.use(express.static(path.join(__dirname, '..', 'public')))


// logging and body-parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// static file-serving middleware
app.use(express.static(path.join(__dirname,'..', 'public')))

//connecting to routes.js
app.use('/', router)

// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// handle any errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send(
    'There was an error'
  );
})


// listen on a port
var port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db
    .sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});
