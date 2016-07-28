module.exports = function onCheckProductParameter(req, res, next) {
	return (process.env.APPLICATION_PRODUCTS.split(',').indexOf(req.params.product) === -1) || next();
};
