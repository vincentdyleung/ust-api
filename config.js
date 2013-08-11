module.exports = function(app, express) {
	var config = this;
	var path = require('path');
	// all environments
	app.configure(function() {
		app.set('port', process.env.PORT || 3000);
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
	});

	//dev env
	app.configure('development', function() {
		app.use(express.errorHandler({
			dumpException: true,
			showStack: true
		}));

		app.mongoose.connect('mongodb://localhost/ustapi');
	});

	//prod env
	app.configure('production', function() {
		app.use(express.errorHandler());
		var mongoUri = process.env.MONGOLAB_URI;
		var mongoOptions = {
			user: process.env.MONGO_USER,
			pass: process.env.MONGO_PASS
		};
		app.mongoose.connect(mongoUri, mongoOptions);
	});

	app.configure('production', function() {
		app.use(express.errorHandler());
	});

	return config;
};