'use strict';

angular.module('recyclefunWebApp').controller('UserProfileCtrl', function($http, $scope, $routeParams, $timeout) {
	// $scope.
	if ($routeParams.userid != null) {
	    $scope.user = $scope.users.getUser($routeParams.userid);
	    console.log($routeParams.userid);
	}

	$http({
		url: '',
		method: 'GET',
		param: {
			input1: ''
		}
	}).success(function(data) {
		console.log(data);
	});

});
  