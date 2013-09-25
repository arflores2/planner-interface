module.exports = function(config, mongoose, socket) {

	function finalize(user, plan) {

		console.log('this plan needs to be finalized', plan);
		socket.emit(user, 'newplan', 'test this');
	}

	return {
		finalize: finalize
	};

}