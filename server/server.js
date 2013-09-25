var express = require('express'),
		app = express(),
		https = require('https'),
		fs = require('fs'),
		uuid = require('node-uuid'),
		MemoryStore = require('connect').session.MemoryStore,
		Session = require('connect').session,
		sessionStore = new MemoryStore,
		events = require('events'),
		emitter = new events.EventEmitter(),
		io = require('socket.io'),
		cfg = require('./config');

var mongoose = require('mongoose');

var server = https.createServer({
	key: fs.readFileSync('cert/server-key.pem'),
	cert: fs.readFileSync('cert/server-cert.pem')
}, app);

var	Socket = require('./services/Socket.js')(server, io, Session, sessionStore, cfg.SESSION_SECRET),
		Planner = require('./services/Planner.js')({}, mongoose, Socket),
		UserModel = require('./models/User.js')({}, mongoose, emitter, Planner);

var WelcomeRoutes = require('./routes/Welcome.js')(),
		HomeRoutes = require('./routes/Home.js')(),
		PlanRoutes = require('./routes/Plan.js')(UserModel),
		UserRoutes = require('./routes/User.js')(UserModel);

app.configure(function() {
	app.set('view engine', 'jade');
	app.use(express.static(cfg.PUBLIC_PATH));
	app.use(express.limit('1mb'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: cfg.SESSION_SECRET, store: sessionStore
	}));
	mongoose.connect(cfg.MONGOOSE.CONNECT);
	app.use(function(err, req, res, next) {
		console.err(err.stack);
		res.send(500, 'Something went wrong');
	});
});

function auth(req, res, next) {
	if(!req.session.loggedIn) {
		res.redirect('/welcome');
	}
	else {
		if(req.session.user.role === "admin") {
			req.session.user.isAdmin = true;
		}
		next();
	}
}

// landing pages
app.get('/', auth, HomeRoutes.index);
app.get('/welcome', WelcomeRoutes.index);
app.get('/home', auth, HomeRoutes.home);

app.post('/login', UserRoutes.login);
app.get('/logout', UserRoutes.logout);
app.post('/register', UserRoutes.register);


// plan pages
app.post('/plan', auth, PlanRoutes.add);

server.listen(cfg.PORT.HTTPS);
