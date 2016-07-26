global.__products_base = __dirname;

var express = require('express');
var multer = require('multer');

var app = express();
var uploadImage = multer().single('image');

/**
 * Rest:: Products
 */
app.get('/:product/:id?', require('./middlewares/routeValidation'), require('./controller/fetch'));
app.post('/:product', require('./middlewares/routeValidation'), uploadImage, require('./controller/create'));
app.patch('/:product/:id', require('./middlewares/routeValidation'), uploadImage, require('./controller/update'));
app.delete('/:product/:id', require('./middlewares/routeValidation'), uploadImage, require('./controller/delete'));

module.exports = {
	app: app,
	model: require('./models/product')
};
