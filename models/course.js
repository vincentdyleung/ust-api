module.exports = function(mongoose) {
	var collection = 'courses';
	var Schema = mongoose.Schema;

	var schema = new Schema({
		dept: String,
		code: String,
		title: String,
		credit: Number,
		sections: [{
			id: Number,
			code: String,
			timeslot_room: [{
				day: Number,
				start_time: String,
				end_time: String,
				start_date: Date,
				end_date: Date,
				room: String
			}],
			instructors: [String],
			quota: Number,
			enrolled: Number,
			available: Number,
			waiting: Number,
			remark: String
		}],
		info: {
			prereq: String,
			exclustion: String,
			prev_code: String,
			attributes: String,
			description: String
		}
	});

	this.model = mongoose.model(collection, schema);
	return this;
};