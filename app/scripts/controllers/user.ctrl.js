'use strict';

angular.module('recyclefunWebApp').controller('UserProfileCtrl', function($http, $scope, $routeParams, $timeout) {

	if ($routeParams.userid != null) {
	    $scope.user = $scope.users.getUser($routeParams.userid);
	    console.log($routeParams.userid);
	}



});
