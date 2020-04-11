const express 			= require("express");
const mongoose 			= require("mongoose");
const bp				= require("body-parser");
const methodOverride 	= require("method-override"); // Required for PUT

// Models
const Todo 				= require("./models/todo");

// Express Configuration
const app = express()

app.use(bp.urlencoded({extended: true}));
app.use(methodOverride("_method")); // For PUT requests
app.use(express.static("public")); // js, css, etc.

// Globals ------------------------------------------------------
const port = 3000;
// ==============================================================
// ROUTES
// ==============================================================
const apiRoutes = require("./routes/todos");

app.get("/", (req, res) => {
	res.send({
		message: "Hello from Root!"
	});
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