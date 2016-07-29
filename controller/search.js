var _ = require('underscore');

var search = function onSearch(req, res, next) {
	var opts = {
		req: req,
		query: _.extend({}, req.query),
		model: require('app-products').model,
		sort: req.query.sort || 'title'
	};

	if (req.query.priceMin || req.query.priceMax) {
		delete opts.query.priceMin;
		delete opts.query.priceMax;

		opts.query.price = {
			'$gte': parseInt(req.query.priceMin, 10) || 0,
			'$lte': parseInt(req.query.priceMax, 10) || 100000
		};
	}

	require('app-search')(opts).runSearch(function onSearch(err, result) {
		return res.status(200).json(result);
	});
};

module.exports = search;
