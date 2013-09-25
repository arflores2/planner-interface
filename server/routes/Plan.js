module.exports = function(User) {
	
	function add(req, res) {
		var plan = {
			tip: req.param('tip', null)
		};

		User.addPlan(req.session.user, plan, function(err) {
			if(err) {
				res.send(500, err);
				return;
			}	

			res.send(200, 'success');

		});
	}

	return {
		add: add
	};

}