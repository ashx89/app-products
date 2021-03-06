var mongoose = require('mongoose');
var paginate = require('mongoose-paginate');
var validator = require('mongoose-validators');

function validTextLength(value) {
	return value.length < 300;
}

var productSchema = new mongoose.Schema({
	account: { type: mongoose.Schema.Types.ObjectId },
	title: {
		type: String,
		required: [true, 'Missing Title'],
		validate: [validator.isAlpha, 'Invalid Title']
	},
	image: {
		type: String
	},
	description: {
		type: String,
		validate: [validTextLength, 'Description is too long']
	},
	extra: {
		type: String,
		validate: [validTextLength, 'Extra Information is too long']
	},
	price: {
		type: Number,
		validate: [validator.isNumeric, 'Invalid Price']
	},
	options: Array,
	type: String,
	tags: Array,
	url: String
});

productSchema.set('toJSON', {
	virtuals: true,
	transform: function onTransform(doc, ret) {
		delete ret.id;
		delete ret.__v;
		return ret;
	}
});

/**
 * Pagination defaults
 * Add paginate to model
 */
paginate.paginate.options = {
	sort: 'title',
	lean: true,
	limit: 10
};

productSchema.plugin(paginate);
module.exports = mongoose.model('Product', productSchema);
