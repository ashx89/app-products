var path = require('path');
var s3 = require('app-util').s3();
var Product = require(global.__products_base + '/models/product');

/**
 * Delete a product item
 */
var remove = function onDelete(req, res, next) {
	var id = req.params.id;

	var query = { _id: id, user: req.user._id };

	Product.findOneAndRemove(query, function onRemove(err, product) {
		if (err) return next(err);
		if (!product) return next(new Error('No products found'));

		var ext = path.extname(product.image);

		s3.delete([{ Key: 'users/' + req.user._id + '/products/' + req.params.product + '/' + req.params.id + ext }], function onDelete(err, result) {
			if (err) return next(err);
			return res.status(200).json(result);
		});
	});
};

module.exports = remove;
