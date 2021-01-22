require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser'); //non richiesto, c'è il bodyparser incluso in express
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
// const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const User = require('./models/user');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const staffRouter = require('./routes/area-riservata');
//const adminRouter = require('./routes/admin');
const comunicazioniRouter = require('./routes/comunicazioni');
const prenotazioniRouter = require('./routes/prenotazioni');

const app = express();

// database connection
mongoose.connect(
	process.env.DB_URL ||
		'mongodb+srv://admin:admin@cluster0.k1jgs.mongodb.net/HAP?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Server connected to db.');
});

// set ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// express session configuration
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'team23 secret',
		resave: false,
		saveUninitialized: true //,cookie: { secure: true }
	})
);

// passport and session configuration
app.use(passport.initialize());
app.use(passport.session());

// metodo semplificato, controlla la documentazione di passport-local-mongoose
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* app.use((req, res, next) => {
	//utente di default per evitare di fare il login ogni volta in fase di sviluppo
	req.user = {
		_id: '5fde4f06daaf85411806aa35',
		username: 'FRNRLA02P21F205Y',
		email: 'aurelio.franceschini@gmail.com',
		tipo: 'Paziente',
		idRef: {_id:'5fde4f05daaf85411806aa34',
		medico: '5fde4c4322ab894cdcffcaf1'}
	};
	res.locals.currentUser = req.user;
	next();
}); */

// set local variables middleware
app.use(function (req, res, next) {
	/* // default page title
	res.locals.title = 'HAP'; */

	// set success flash message
	res.locals.success = req.session.success || '';
	delete req.session.success;
	// set error flash message
	res.locals.error = req.session.error || '';
	delete req.session.error;

	next();
});

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/admin', adminRouter);
app.use('/area-riservata', staffRouter);
app.use('/comunicazioni', comunicazioniRouter);
app.use('/prenotazioni', prenotazioniRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	/* // set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error'); */

	res.status(err.status || 500);
	if (err.status != 404) console.log(err);
	req.session.error = err.message;
	res.redirect('back');
});

module.exports = app;
