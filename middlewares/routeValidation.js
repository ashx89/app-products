module.exports = function onCheckProductParameter(req, res, next) {
	return (process.env.APPLICATION_PRODUCTS.split(',').indexOf(req.params.product) === -1) ? res.status(404).json({ title: 'Resource not found', status: 404, path: req.path }) : next();
};
