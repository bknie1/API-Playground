const mongoose = require("mongoose");

// Mongoose ----------------------------------------------------
mongoose.connect('mongodb://localhost/todo-api', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('useFindAndModify', false);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database.");
});