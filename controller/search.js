var _ = require('underscore');

/**
 * Search products
 */
var search = function onSearch(req, res, next) {
	var opts = {
		req: req,
		query: {},
		model: require(global.__base + '/manager').ProductModel,
		sort: req.query.sort || 'title'
	};

	if (req.query.type) {
		opts.query = _.extend(opts.query, { type: req.query.type });
	}

	if (req.query.id) {
		opts.query = _.extend(opts.query, { _id: req.query.id });
	}

	require('app-search')(opts).runSearch(function onSearch(err, result) {
		return res.status(200).json(result);
	});
};

module.exports = search;
