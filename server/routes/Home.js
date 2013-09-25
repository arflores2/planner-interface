module.exports = function() {

	function index(req, res) {
		res.redirect('/home');
	}
	
	function home(req, res) {
		res.render('home.jade', {
			user: req.session.user
		});	
	}

	return {
		index: index,
		home: home
	}
}