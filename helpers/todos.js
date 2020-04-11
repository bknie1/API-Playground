var db = require("../models");

exports.getTodos = (req, res) => {
	/// Gets all Todo items
	db.Todo.find().then((data) => {
		console.log(data);
		res.json(data)
	}).catch((err) => {
		res.send(err);
	});
}

exports.createTodo = (req, res) => {
	db.Todo.create(req.body).then((data) => {
		console.log(data);
		res.json(data);
	})
	.catch( (err) => {
		res.send(err);
	});
}

exports.getTodo = (req, res) => {
	/// Gets a specific Todo
	db.Todo.findById({_id: req.params.id}).then((data) => {
		console.log(data);
		res.json(data);
	}).catch((err) => {
		res.send(err);
	});
}

exports.updateTodo = (req, res) => {
	// Note: The request body contains our update info.
	db.Todo.findOneAndUpdate({_id: req.params.id}, req.body).then((data) => {
		res.json(data);
	}).catch((err) => {
		res.send(err);
	});
}

exports.deleteTodo = (req, res) => {
	db.Todo.findByIdAndRemove({_id: req.params.id}).then((data) => {
		console.log(`Deleted ${data}`);
		res.json(data);
	})
	.catch((err) => {
		res.send(err);
	});
}