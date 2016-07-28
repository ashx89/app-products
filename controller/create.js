var upload = require('app-util').upload;

var Product = require(global.__products_base + '/models/product');

/**
 * Save the updated product
 * @param {object} product. New product created
 */
function databaseOperation(product, req, res, next) {
	product.user = req.user._id;

	product.save(function onProductSave(err) {
		if (err) return next(err);
		return res.status(200).json(product);
	});
}

/**
 * Create a product item
 */
var create = function onCreate(req, res, next) {
	var product = new Product(req.body);

	product.url = '/products/' + product._id;
	product.type = req.body.product;

	if (req.file) {
		upload({
			req: req,
			model: product,
			folder: 'products/'
		}, function onImageUpload(err, result) {
			if (err) return next(err);

			product.image = result;

			return databaseOperation(product, req, res, next);
		});
	} else {
		return databaseOperation(product, req, res, next);
	}
};

module.exports = create;
