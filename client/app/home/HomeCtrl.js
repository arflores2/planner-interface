angular.module("home")
	.controller("HomeCtrl", function($scope, socket) {

		console.log('homecontroller');
		socket.on('newplan', function(data) {
			console.log(data);
			$scope.alert = {
				type: 'info',
				msg: 'New Plan'
			};
		});
		
	});