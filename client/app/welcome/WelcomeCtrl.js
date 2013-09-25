angular.module("welcome", [])
	.controller("WelcomeCtrl", function($scope, ViewChannel, $http, $location, $window) {

		$scope.welcome = {
			views: ["Login", "Register"],
			selected: "Login"
		};

		$scope.toggleView = function(view) {
			//ViewChannel.change(view);
		};

		$scope.login = function(email, password) {

			$http.post('/login', {email: email, password: password})
				.success(function(data, status, headers, config) {
					console.log('login success', arguments);

					if(data.redirect) {
						$window.location = data.redirect;
					}
				})
				.error(function(data, status, header, config) {
					console.log('login error', arguments);

					if(data.redirect) {
						//send alert "invalid credentials"
						if(status === 500) {
							alert("server error");	
						}
						else {
							alert("invalid credentials")
						}
					}
				});
		};

		$scope.register = function(user) {

			$http.post('/register', user)
				.success(function(data, status, headers, config) {
					console.log('register success', arguments);
				})
				.error(function(data, status, header, config) {
					console.log('register error', arguments);
				});
		};
	});

