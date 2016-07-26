var Product = require(global.__products_base + '/models/product');

/**
 * Delete a product item
 */
var remove = function onDelete(req, res, next) {
	var id = req.params.id;

	var query = { _id: id, user: req.user._id };

	Product.remove(query, function onRemove(err, result) {
		if (err) return next(err);
		return res.status(200).json(result);
	});
};

module.exports = remove;
