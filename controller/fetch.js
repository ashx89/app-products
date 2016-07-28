var Product = require(global.__products_base + '/models/product');

/**
 * Fetch a product
 */
var fetch = function onFetch(req, res, next) {
	Product.find({ _id: req.params.id }, function onFind(err, doc) {
		if (err) return next(err);
		if (!doc || !doc.length) return next(new Error('No products found'));

		return (doc.length === 1) ? res.status(200).json(doc[0]) : res.status(200).json(doc);
	});
};

module.exports = fetch;
