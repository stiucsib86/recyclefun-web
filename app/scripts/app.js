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
      .when('/auth/change-password', {
        templateUrl: 'views/auth/password-change.html',
        controller: 'PasswordChangeCtrl'
      })
      
      .when('/notifications', {
        templateUrl: 'views/user/notifications.html',
        controller: 'UserNotificationsCtrl'
      })
      // -----------------------------------------------------------------------
      //                    User
      // -----------------------------------------------------------------------
      .when('/user/', {
        templateUrl: 'views/user/view.html',
        controller: 'UserProfileCtrl'
      })
      .when('/user/:userid', {
        templateUrl: 'views/user/view.html',
        controller: 'UserProfileCtrl'
      })
      .when('/user/:userid/profile', {
        templateUrl: 'views/user/view.html',
        controller: 'UserProfileCtrl'
      })
      .when('/user/:userid/edit', {
        templateUrl: 'views/user/edit.html',
        controller: 'UserEditCtrl'
      })
      .when('/user/:userid/settings', {
        templateUrl: 'views/user/settings.html',
        controller: 'UserSettingsCtrl'
      })
      .when('/user/:userid/detailed-transactions', {
        templateUrl: 'views/user/detailed-transactions.html',
        controller: 'UserProfileCtrl'
      })
      .when('/user/:userid/badges', {
        templateUrl: 'views/user/badges.html',
        controller: 'UserProfileCtrl'
      })
      // -----------------------------------------------------------------------
      //                    PWC Dashboard
      // -----------------------------------------------------------------------
      .when('/manage', {
        templateUrl: 'views/pwc-manage/overview.html',
        controller: 'PwcOverviewCtrl'
      })
      .when('/manage/pwc', {
        templateUrl: 'views/pwc-manage/overview.html',
        controller: 'PwcOverviewCtrl'
      })
      .when('/manage/pwc/bin/:binId', {
        templateUrl: 'views/pwc-manage/bin.html',
        controller: 'PwcBinCtrl'
      })
      // -----------------------------------------------------------------------
      //                    Badges
      // -----------------------------------------------------------------------
      .when('/badge/:badgeId', {
        templateUrl: 'views/badges/badge.html',
        controller: 'BadgeCtrl'
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
