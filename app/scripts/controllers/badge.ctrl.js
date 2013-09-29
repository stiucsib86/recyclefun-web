'use strict';

angular.module('recyclefunWebApp')
.controller('BadgeCtrl', function($scope, $routeParams) {
  $scope.badgeId = $routeParams.badgeId;

  $scope.badgeIdList = ['1', '2'];

  $scope.GetBadgeTemplateURL = function(badgeId) {
    return 'views/badges/badge-' + badgeId + '.tpl.html';
  };

});