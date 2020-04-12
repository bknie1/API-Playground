const express 			= require("express");
const mongoose 			= require("mongoose");
const bp				= require("body-parser");

// Models
const Todo 				= require("./models/todo");

// Express Configuration
const app = express()

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bp.urlencoded({extended: true}));
// Globals ------------------------------------------------------
const port = 3000;
// ==============================================================
// ROUTES
// ==============================================================
const apiRoutes = require("./routes/todos");

app.get("/", (req, res) => {
	res.sendFile("index.html");
});

app.use("/api/todos", apiRoutes);

// Default ------------------------------------------------------
app.get("*", (req, res) => {
	res.redirect("/");
});
// ==============================================================
// START/LISTEN
// ==============================================================
app.listen(port, () => { console.log(`Listening on port ${port}`); });