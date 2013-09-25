module.exports = function(config, mongoose, emitter, planner) {

	var crypto = require('crypto');

	var PlanSchema = new mongoose.Schema({
		tip: { type: String, required: true }
	});

	var UserSchema = new mongoose.Schema({
		email: { type: String, unique: true, required: true },
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		role: { type: String, required: true },
		status: { type: String, required: true },
		password: { type: String, required: true },

		plans: [PlanSchema]
	});

	var User = mongoose.model('User', UserSchema);

	function changePassword() {}

	function forgotPassword() {}

	function login(credentials, callback) {
		var sha = crypto.createHash('sha256');
		sha.update(credentials.password);
		credentials.password = sha.digest('hex');

		User.findOne(credentials, function(err, doc) {
			callback(err, doc);		
		});
	}

	function register(user, callback) {
		var sha = crypto.createHash('sha256');
		sha.update(user.password);

		console.log('Registering ' + user.email);

		var _user = new User({
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			role: user.role,
			status: "pending",
			password: sha.digest('hex')
		});

		_user.save(function(err) {
			callback(err);
			registerCallback(err);
		});
	}

	function registerCallback(err) {
		if(err) {
			return console.log(err);
		}	
		return console.log('User was created');
	}

	function addPlan(user, plan, callback) {
		console.log('user add plan');
		User.findOne({_id: user._id}, function(err, doc) {
			// database err
			if(err) callback(err);

			// user not found
			if(doc === null) callback('User not found');

			doc.plans.push(plan);

			doc.save(function(err) {
				callback(err, plan);	
				addPlanCallback(err, user, plan);
			})
		})		
	}

	function addPlanCallback(err, user, plan) {
		if(err) {
			console.log(err);
		}
		//return emitter.emit('newplan', plan);
		console.log(planner);
		return planner.finalize(user, plan);
	}

	return {
		addPlan: addPlan,
		changePassword: changePassword,
		forgotPassword: forgotPassword,
		login: login,
		register: register,
		registerCallback: registerCallback
	};
}