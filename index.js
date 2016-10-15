global.__products_base = __dirname;

var express = require('express');
var multer = require('multer');

var app = express();
var uploadImage = multer().single('image');
var routeValidation = require('./middlewares/routeValidation');

/**
 * Rest:: Products
 */
app.get('/:product/search', routeValidation, require('./controller/search'));

app.get('/:product', routeValidation, require('./controller/fetch'));
app.get('/:product/:id', routeValidation, require('./controller/fetch'));
app.post('/:product', routeValidation, uploadImage, require('./controller/create'));
app.patch('/:product/:id', routeValidation, uploadImage, require('./controller/update'));
app.delete('/:product/:id', routeValidation, uploadImage, require('./controller/delete'));

module.exports = {
	app: app,
	model: require('./models/product')
};
