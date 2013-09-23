'use strict';

angular.module('recyclefunWebApp', ['ngCookies', 'FacebookProvider'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      // -----------------------------------------------------------------------
      //                    Auth
      // -----------------------------------------------------------------------
      .when('/login', {
        templateUrl: 'views/auth/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/auth/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/register', {
        templateUrl: 'views/auth/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/forget-password', {
        templateUrl: 'views/auth/forget-password.html',
        controller: 'MainCtrl'
      })
      .when('/reset-password', {
        templateUrl: 'views/auth/reset-password.html',
        controller: 'MainCtrl'
      })
      // -----------------------------------------------------------------------
      //                    User
      // -----------------------------------------------------------------------
      .when('/user/', {
        templateUrl: 'views/user/view.html',
        controller: 'UserProfileCtrl'
      })
      .when('/user/profile', {
        templateUrl: 'views/user/view.html',
        controller: 'UserProfileCtrl'
      })
      .when('/user/edit', {
        templateUrl: 'views/user/edit.html',
        controller: 'UserEditCtrl'
      })
      .when('/user/settings', {
        templateUrl: 'views/user/settings.html',
        controller: 'UserSettingsCtrl'
      })
      .when('/user/badges', {
        templateUrl: 'views/user/badges.html',
        controller: 'UserBadgesCtrl'
      })
      .when('/user/notifications', {
        templateUrl: 'views/user/notifications.html',
        controller: 'UserNotificationsCtrl'
      })
      .when('/user/:userid', {
        templateUrl: 'views/user/view.html',
        controller: 'UserProfileCtrl'
      })
      // -----------------------------------------------------------------------
      //                    Misc
      // -----------------------------------------------------------------------
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
