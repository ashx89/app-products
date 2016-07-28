var _ = require('underscore');
var upload = require('app-util').upload;

var Product = require(global.__products_base + '/models/product');

/**
 * Save the updated model
 * @param {object} product. Data fetched from the database
 */
function databaseOperation(product, req, res, next) {
	product = _.extend(product, req.body);

	product.save(function onProductSave(err) {
		if (err) return next(err);
		return res.status(200).json(product);
	});
}

/**
 * Update a product item
 */
var update = function onUpdate(req, res, next) {
	var id = req.params.id;

	Product.findOne({ _id: id, user: req.user._id }, function onProductUpdate(err, product) {
		if (err) return next(err);
		if (!product) return next(new Error('No product item found'));

		if (req.file) {
			upload({
				req: req,
				model: product,
				folder: 'products/' + req.params.product
			}, function onImageUpload(err, result) {
				if (err) return next(err);

				req.body.image = result;

				return databaseOperation(product, req, res, next);
			});
		} else {
			return databaseOperation(product, req, res, next);
		}
	});
};

module.exports = update;
