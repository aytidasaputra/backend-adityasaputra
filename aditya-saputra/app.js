require('dotenv').config()

let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

let mongoose = require("mongoose");

let url = process.env.MONGO_URI;
mongoose.connect(url, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
