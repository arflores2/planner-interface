angular.module("home")
	.controller("PlanCtrl", function($scope, socket, $http, $window) {

		$scope.alert = {
			type: 'info',
			msg: 'Somthing'
		};

		console.log('plancontroller');
		socket.on('newplan', function(data) {
			console.log(data);
			$scope.alert = {
				type: 'info',
				msg: data
			};
		});

		$scope.newPlan = function(plan) {
			$http.post('/plan', plan)
				.success(function(data, status, headers, config) {
					//$window.location = '/';
				})
				.error(function(data, status, headers, config) {
					console.log('error creating plan');
				});
		};


	});