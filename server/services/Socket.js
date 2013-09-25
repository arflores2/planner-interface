module.exports = function(server, io, Session, sessionStore, SECRET) {

	var ioServer = io.listen(server);

	var cookie = require('cookie');
	var signature = require("cookie-signature");

	var _sockets = {};
	var _idKey = '_id';

	ioServer.set('authorization', function(data, callback) {
		var prefix = 's:',
				clearSid;	
		if(data.headers.cookie) {
			data.cookie = cookie.parse(data.headers.cookie);
			data.sessionId = data.cookie['connect.sid'];
			clearSid = data.sessionId.replace(prefix, "");
			clearSid = signature.unsign(clearSid, SECRET);

			data.sessionStore = sessionStore;
			sessionStore.get(clearSid, function(err, session) {
				if(err || !session) return callback('Error while getting session from SessionStore', false);

				data.session = new Session.Session(data, session);
				return callback(null, true);
			});
		}
		else {
			return callback('No cookie transmitted', false);	
		}

	});

	ioServer.sockets.on('connection', function(socket) {

		_addSocket(socket.handshake.session.user, socket);

		socket.on('disconnect', function() {
			console.log('Socket with sessionId ' + socket.handshake.sessionId + ' disconnected');
			_removeSocket(this.session.user, this);
		});

		console.log(_sockets);
	});

	function _addSocket(user, socket) {
		console.log('user', user);
		var userId = user[_idKey],
				userSockets;
		
		if(_sockets.hasOwnProperty(userId)) {
			userSockets = _sockets[userId];
			if(typeof userSockets != 'object') {
				userSockets = {};
			}
		}
		else {
			userSockets = _sockets[userId] = {};
		}

		userSockets[socket.id] = socket;
	}

	function _removeSocket(user, socket) {
		delete _sockets[user.id][socket.id];
	}

	function emit(user, event, msg) {
		var userSockets = _sockets[user[_idKey]],
				id;

		console.log(userSockets);
		if(userSockets) {
			for(id in userSockets) {
				userSockets[id].emit(event, msg);
			}
		}
	}

	return {
		emit: emit
	};
}