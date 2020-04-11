const express = require("express");
const router = express.Router();
const db = require("../models");
const todoHelper = require("../helpers/todos");

// /api/todos
router.get("/", (req, res) => {
	todoHelper.getTodos(req, res);
});

// /api/todos
router.post("/", (req, res) => {
	todoHelper.createTodo(req, res);
});

// /api/todos/:id
router.get("/:id", (req, res) => {	
	todoHelper.getTodo(req, res);
});

// /api/todos/:id
router.put("/:id", (req, res) => {
	todoHelper.updateTodo(req, res);
});

// /api/todos/:id
router.delete("/:id", (req, res) => {
	todoHelper.deleteTodo(req, res);
});

module.exports = router;