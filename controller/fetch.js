var _ = require('underscore');

var Product = require(global.__products_base + '/models/product');

/**
 * Fetch a product
 */
var fetch = function onFetch(req, res, next) {
	var id = req.params.id;

	var query = (id) ? { _id: id } : {};

	Product.find(query, function onFind(err, doc) {
		if (err) return next(err);
		if (!doc || !doc.length) return next(new Error('No products found'));

		return (doc.length === 1) ? res.status(200).json(doc[0]) : res.status(200).json(doc);
	});
};

module.exports = fetch;
