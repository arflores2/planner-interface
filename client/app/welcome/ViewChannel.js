angular.module('welcome')
	.factory('ViewChannel', function($rootScope) {
		var viewChannel = {};
		viewChannel.view = '';

		viewChannel.change = function(view) {
			viewChannel.view = view;
			$rootScope.$broadcast('view');
		};

		return viewChannel;
	});
