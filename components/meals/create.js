var upload = require('app-util').upload;

var Meal = require(global.__products_base + '/models/meal');

/**
 * Save the updated model
 * @param {object} meal. New model created
 */
function databaseOperation(meal, req, res, next) {
	meal.user = req.user._id;

	meal.save(function onMealSave(err) {
		if (err) return next(err);
		return res.status(200).json(meal);
	});
}

/**
 * Create a meal item
 */
var create = function onCreate(req, res, next) {
	var meal = new Meal(req.body);

	meal.url = '/meals/' + meal._id;

	if (req.file) {
		upload({
			req: req,
			model: meal,
			folder: 'meals'
		}, function onImageUpload(err, result) {
			if (err) return next(err);

			meal.image = result;

			return databaseOperation(meal, req, res, next);
		});
	} else {
		return databaseOperation(meal, req, res, next);
	}
};

module.exports = create;
