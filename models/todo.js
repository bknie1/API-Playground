const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: "Item must have a name."
	},
	isComplete: {
		type: Boolean,
		default: false
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Todo", todoSchema);