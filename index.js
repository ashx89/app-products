global.__products_base = __dirname;

var express = require('express');
var multer = require('multer');

var app = express();

var uploadImage = multer().single('image');

/**
 * Rest:: Account
 */
app.get('/products', require('./components/meals/fetch'));
app.get('/products/:id', require('./components/meals/fetch'));
app.post('/products', uploadImage, require('./components/meals/create'));
app.patch('/products/:id', uploadImage, require('./components/meals/update'));

module.exports = {
	app: app,
	model: require('./models/meal')
};
