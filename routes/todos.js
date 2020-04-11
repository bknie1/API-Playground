const express = require("express");
const router = express.Router();
const db = require("../models");
const todoHelper = require("../helpers/todos");

// /api/todos
router.route("/")
	.get(todoHelper.getTodos)
	.post(todoHelper.createTodo)

// /api/todos/:id
router.route("/:id")
	.get(todoHelper.getTodo)
	.put(todoHelper.updateTodo)
	.delete(todoHelper.deleteTodo)

module.exports = router;