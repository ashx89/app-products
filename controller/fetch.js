var _ = require('underscore');
var Product = require(global.__products_base + '/models/product');

var fetch = function onFetch(req, res, next) {
	var query = { user: req.user._id };

	(req.params.id) ? _.extend(query, { _id: req.params.id }) : {};

	Product.find(query, function onFind(err, doc) {
		if (err) return next(err);
		if (!doc || !doc.length) return next(new Error('No products found'));

		return (doc.length === 1) ? res.status(200).json(doc[0]) : res.status(200).json(doc);
	});
};

module.exports = fetch;
