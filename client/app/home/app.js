angular.module("home", ["ui.bootstrap"])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: '/app/home/index.html'})
			.when('/plans/new', {templateUrl: '/app/home/plans/new.html'})

			.otherwise({redirectTo: '/'})
	});