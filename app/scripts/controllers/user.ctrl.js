/*global Morris:false, alert:false */

'use strict';

angular.module('recyclefunWebApp')
.controller('UserProfileCtrl', function($http, $scope, $rootScope, $routeParams) {

  $scope._loading = {};
  $scope._error = {};

  $scope.userid = $routeParams.userid;

  $scope.IsPageOwner = function() {
    if ($rootScope.auth && !$routeParams.userid) {
      return true;
    }
  };

  $scope.GetUser = function() {
    $scope._loading.GetUser = true;
    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'user',
      params: {
        user_id: $routeParams.userid
      }
    }).success(function(data) {
      $scope._loading.GetUser = false;
      $scope._error.message = false;
      $scope.user = data.data;
    }).error(function(data) {
      $scope._loading.GetUser = false;
      $scope._error.message = data.error;
      console.warn(data.error);
    });
  };

  $scope.GetUser();
  
  if (jQuery('#donut-example').length > 0) {
    Morris.Donut({
      element: 'donut-example',
      data: [
        {label: 'Paper', value: 6},
        {label: 'Can', value: 3},
        {label: 'Glass', value: 7},
        {label: 'Plastic', value: 4},
        {label: 'Cloth', value: 4},
        {label: 'Garden', value: 2},
        {label: 'misc', value: 1}
      ]
    });

    Morris.Bar({
      element: 'bar-transaction',
      data: [
        {y: '1', a: 0.8},
        {y: '2', a: 0},
        {y: '3', a: 0},
        {y: '4', a: 0.4},
        {y: '5', a: 0},
        {y: '6', a: 0},
        {y: '7', a: 0},
        {y: '8', a: 0},
        {y: '9', a: 0},
        {y: '10', a: 0},
        {y: '11', a: 0},
        {y: '12', a: 0},
        {y: '13', a: 0},
        {y: '14', a: 0},
        {y: '15', a: 0},
        {y: '16', a: 0},
        {y: '17', a: 0},
        {y: '18', a: 0},
        {y: '19', a: 0},
        {y: '20', a: 0},
        {y: '21', a: 1.2},
        {y: '22', a: 0},
        {y: '23', a: 0.7},
        {y: '24', a: 0},
        {y: '25', a: 0},
        {y: '26', a: 0},
        {y: '27', a: 0},
        {y: '28', a: 1.5},
        {y: '29', a: 0},
        {y: '30', a: 0},

      ],
      barColors: ['green'],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['kg']
    });

    Morris.Bar({
      element: 'bar-example',
      data: [
        {y: 'April', a: 5, b: 40},
        {y: 'May', a: 4, b: 65},
        {y: 'Jun', a: 6, b: 40},
        {y: 'July', a: 7, b: 65},
        {y: 'Aug', a: 9, b: 90}
      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Series A']
    });
  }

})
.controller('UserSettingsCtrl', function($http, $scope, $rootScope) {

  $scope.user = {};
  $scope._loading = {
    GetUserSettings: true,
    SaveUserSettings: false
  };

  $scope.GetUserSettings = function() {
    $scope._loading.GetUserSettings = true;
    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'user'
    }).success(function(data) {
      $scope._loading.GetUserSettings = false;
      $scope.user = data.data;
    }).error(function(data) {
      console.warn(data);
    });
  };

  $scope.SaveUserSettings = function() {
    $scope._loading.SaveUserSettings = true;
    $http({
      method: 'POST',
      withCredentials: true,
      url: $rootScope._app.url.api + 'user',
      data: $scope.user
    }).success(function() {
      $scope._loading.SaveUserSettings = false;
      alert('Settings saved.');
    }).error(function(data) {
      console.warn(data);
    });
  };

  (function() {
    $scope.GetUserSettings();
  })();


})
.controller('UserBadgesCtrl', function() {

})
.controller('UserNotificationsCtrl', function() {

});
