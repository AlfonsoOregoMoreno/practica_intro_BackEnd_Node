var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/**
 * 
 * 
 * CONECTAR a BDD
 */
const mongoose = require('mongoose'); 

mongoose.connection.on('error', err => {
    console.log('====================>> ERROR de conexión!!!', err);
    process.exit(1);
  });
  
mongoose.connection.once('open', () => {
    console.log('Conectado OK a MongoDB en', mongoose.connection.name);
});
  
//mongoose.connect('mongodb://localhost/nodepop/databases/nodepopDB/anuncios', {
mongoose.connect('mongodb://localhost/anuncios', {
    useNewUrlParser: true,
    useUnifiedTopology: true  
}); 





/**
 * RUTAS del API
 */
app.use('/api/anuncios', require('./routes/api/anuncios'));




/**
 * RUTAS del website
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
