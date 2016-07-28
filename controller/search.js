var _ = require('underscore');

var search = function onSearch(req, res, next) {
	var opts = {
		req: req,
		query: _.extend({}, req.query),
		model: require(global.__base + '/manager').ProductModel,
		sort: req.query.sort || 'title'
	};

	if (req.query.price.min || req.query.price.max) {
		opts.query.price = {
			'$gt': parseInt(req.query.price.min, 10) || 0,
			'$lt': parseInt(req.query.price.max, 10) || 0
		};
	}

	require('app-search')(opts).runSearch(function onSearch(err, result) {
		return res.status(200).json(result);
	});
};

module.exports = search;
