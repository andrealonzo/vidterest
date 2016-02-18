'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var flash = require('express-flash');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(flash());

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretPoll',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
var server;

var boot = function() {
	server = app.listen(port, function() {
		console.log('Node.js listening on port ' + port + '...');
	});

}

var shutdown = function() {
	if (server) {
		server.close();
	}
}

var disconnectDB = function() {
    mongoose.connection.close();
    mongoose.disconnect();
}


if (require.main === module) {
	boot();
}
else {
	console.info('Running app as a module.')
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = port;
	exports.disconnectDB = disconnectDB;
}

module.exports = app;