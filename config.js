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
		app.mongoose.connect('mongodb://ustapi:hLutekbxrgVXXnPQ@ds037698.mongolab.com:37698/keroku_app17438787');
	});

	app.configure('production', function() {
		app.use(express.errorHandler());
	});

	return config;
};