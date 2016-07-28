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

	opts.query = _.extend(opts.query, req.query);

	require('app-search')(opts).runSearch(function onSearch(err, result) {
		return res.status(200).json(result);
	});
};

module.exports = search;
