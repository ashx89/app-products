global.__products_base = __dirname;

var express = require('express');
var multer = require('multer');

var app = express();
var uploadImage = multer().single('image');

/**
 * Rest:: Products
 */
app.get('/products/search', require('./controller/search'));

app.get('/products', require('./controller/fetch'));
app.get('/products/:id', require('./controller/fetch'));
app.post('/products', uploadImage, require('./controller/create'));
app.patch('/products/:id', uploadImage, require('./controller/update'));
app.delete('/products/:id', uploadImage, require('./controller/delete'));

module.exports = {
	app: app,
	model: require('./models/product')
};
