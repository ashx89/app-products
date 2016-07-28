global.__products_base = __dirname;

var express = require('express');
var multer = require('multer');

var app = express();
var uploadImage = multer().single('image');

/**
 * Rest:: Products
 */
app.get('/product/search', require('./controller/search'));

app.get('/product', require('./controller/fetch'));
app.get('/product/:id', require('./controller/fetch'));
app.post('/product', uploadImage, require('./controller/create'));
app.patch('/product/:id', uploadImage, require('./controller/update'));
app.delete('/product/:id', uploadImage, require('./controller/delete'));

module.exports = {
	app: app,
	model: require('./models/product')
};
