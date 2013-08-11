
module.exports = function(app, models) {
	var Course = models.course;

	// GET /
	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' });
	});

	// GET /courses
	app.get('/courses', function(req, res) {
		Course.find(function(err, courses) {
			res.send(courses);
		});
	});

	// GET /courses/:dept
	app.get('/courses/:dept', function(req, res) {
		Course.find({ dept: req.params.dept.toUpperCase() }, function(err, docs) {
			if (err) {
				res.json(500, { error: err });
			} else {
				res.json(200, docs);
			}
		});
	});

	// GET /courses/:dept/:code
	app.get('/courses/:dept/:code', function(req, res) {
		var query = {
			dept: req.params.dept.toUpperCase(),
			code: req.params.code
		};
		Course.find(query, {_id: 0}, function(err, docs) {
			if (err) {
				res.json(500, { error: err} );
			} else {
				res.json(200, docs);
			}
		});
	});

	// POST /courses
	app.post('/courses', function(req, res) {
		var course = new Course(req.body);
		course.save(function(err) {
			if (err) {
				res.json(500, { error: err });
			}
			res.json(200, course);
		});
	});
};
