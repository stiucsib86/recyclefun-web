'use strict';

angular.module('recyclefunWebApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/users.html',
        controller: 'MainCtrl'
      })
      .when('/setting', {
        templateUrl: 'views/setting.html',
        controller: 'MainCtrl'
      })
      .when('/profile/view/:userid', {
        templateUrl: 'views/profile/view.html',
        controller: 'MainCtrl'
      })
      .when('/profile/edit/:userid', {
        templateUrl: 'views/profile/edit.html',
        controller: 'MainCtrl'
      })
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });
