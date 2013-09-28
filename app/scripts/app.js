'use strict';

angular.module('recyclefunWebApp', ['FacebookProvider'])
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
        templateUrl: 'views/auth/password-forget.html',
        controller: 'PasswordForgetCtrl'
      })
      .when('/reset-password/:code', {
        templateUrl: 'views/auth/password-reset.html',
        controller: 'PasswordResetCtrl'
      })
      .when('/auth/reset-password/:passcode', {
        templateUrl: 'views/auth/password-reset.html',
        controller: 'PasswordResetCtrl'
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
      .when('/user/notifications', {
        templateUrl: 'views/user/notifications.html',
        controller: 'UserNotificationsCtrl'
      })
      .when('/user/edit', {
        templateUrl: 'views/user/edit.html',
        controller: 'UserEditCtrl'
      })
      .when('/user/settings', {
        templateUrl: 'views/user/settings.html',
        controller: 'UserSettingsCtrl'
      })
      .when('/user/detailed-transactions', {
        templateUrl: 'views/user/detailed-transactions.html',
        controller: 'UserProfileCtrl'
      })
      .when('/user/badges', {
        templateUrl: 'views/user/badges.html',
        controller: 'UserBadgesCtrl'
      })
      // -----------------------------------------------------------------------
      //                    User Public Profile
      // -----------------------------------------------------------------------
      .when('/user/:userid', {
        templateUrl: 'views/user/view.html',
        controller: 'UserProfileCtrl'
      })
      .when('/user/:userid/badges', {
        templateUrl: 'views/user/badges.html',
        controller: 'UserProfileCtrl'
      })
      // -----------------------------------------------------------------------
      //                    PWC Dashboard
      // -----------------------------------------------------------------------
      .when('/manage/pwc', {
        templateUrl: 'views/user/view.html',
        controller: 'UserProfileCtrl'
      })
      .when('/manage/pwc/bin/:binId', {
        templateUrl: 'views/user/badges.html',
        controller: 'UserProfileCtrl'
      })
      // -----------------------------------------------------------------------
      //                    Misc
      // -----------------------------------------------------------------------
      .when('/leaderboard', {
        templateUrl: 'views/home/leaderboard.html',
        controller: 'LeaderboardCtrl'
      })
      .when('/bins-search', {
        templateUrl: 'views/home/bins-search.html',
        controller: 'BinsSearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
