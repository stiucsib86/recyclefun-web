'use strict';

angular.module('recyclefunWebApp')
.controller('UserProfileCtrl', function($http, $scope, $rootScope, $routeParams, $timeout) {

  $scope.IsPageOwner = function() {
    if (!$routeParams.userid) {
      return true;
    }
  };

  $scope.GetUser = function() {
    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'user',
      params: {
        user_id: $routeParams.userid
      }
    }).success(function(data, status, headers, config) {
      $scope.user = data.data;
    }).error(function(data, status, headers, config) {
      console.warn(data);
    });
  };

  $scope.GetUser();

  Morris.Donut({
    element: 'donut-example',
    data: [
      {label: "Paper", value: 6},
      {label: "Can", value: 3},
      {label: "Glass", value: 7},
      {label: "Plastic", value: 4},
      {label: "Cloth", value: 4},
      {label: "Garden", value: 2},
      {label: "misc", value: 1}
    ]
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

})
.controller('UserSettingsCtrl', function($http, $scope, $rootScope, $routeParams, $timeout) {

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
    }).success(function(data, status, headers, config) {
      $scope._loading.GetUserSettings = false;
      $scope.user = data.data;
    }).error(function(data, status, headers, config) {
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
    }).success(function(data, status, headers, config) {
      $scope._loading.SaveUserSettings = false;
      alert('Settings saved.');
    }).error(function(data, status, headers, config) {
      console.warn(data);
    });
  };

  (function() {
    $scope.GetUserSettings();
  })();


})
.controller('UserBadgesCtrl', function($http, $scope, $routeParams, $timeout) {

})
.controller('UserNotificationsCtrl', function($http, $scope, $routeParams, $timeout) {

});
