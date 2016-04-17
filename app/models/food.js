var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    text: {
        type: String,
        default: ''
	},
	Price:{
		type: Number,
		default:'0'
	}
});
