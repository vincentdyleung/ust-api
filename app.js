
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	course = require('./models/course'),
	http = require('http');

var app = express();
app.mongoose = require('mongoose');

var config = require('./config.js')(app, express);

var models = {};
models.course = course(app.mongoose).model;

routes(app, models);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
