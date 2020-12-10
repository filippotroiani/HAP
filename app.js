const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser'); //non richiesto, c'è il bodyparser incluso in express
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
//const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const User = require('./models/paziente');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const comunicazioniRouter = require('./routes/comunicazioni');
const prenotazioniRouter = require('./routes/prenotazioni');

const app = express();

//database connection
mongoose.connect(
	'mongodb+srv://admin:admin@cluster0.k1jgs.mongodb.net/HAP?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("we're connected!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session configuration
app.use(
	session({
		secret: 'team23 secret',
		resave: false,
		saveUninitialized: true //,cookie: { secure: true }
	})
);

//passport and session configuration
app.use(passport.initialize());
app.use(passport.session());

//metodo semplificato, controlla la documentazione di passport-local-mongoose
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comunicazioni', comunicazioniRouter);
app.use('/prenotazioni', prenotazioniRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
