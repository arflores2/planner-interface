module.exports = function() {

	function index(req, res) {
		if(req.session.loggedIn) {
			res.redirect('/');
		}
		else {
			res.render('welcome.jade');
		}	
	}

	return {
		index: index
	}
}