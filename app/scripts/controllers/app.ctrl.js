/*global jQuery:false */

'use strict';

angular.module('recyclefunWebApp')
.controller('ApplicationCtrl', function($http, $location, $scope, $rootScope, $timeout, Facebook, appConfig) {

  /*
   * Application Configurations
   */
  $rootScope._app = appConfig;
  ($rootScope._loading = $rootScope._loading || {});

  /*
   * Facebook Initializations
   */
  if (typeof Facebook !== 'undefined') {
    Facebook.init($rootScope._app.facebook);
  }

  $scope.FBLogin = function() {
    $rootScope._loading.FBLogin = true;
    Facebook.login();
  };

  $rootScope.$on('event.fb.auth.login', function(event, args) {
    $rootScope._loading.FBLogin = true;
    var authResponse = args.authResponse;
    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'auth/',
      params: {
        //callback: 'JSON_CALLBACK',
        'accessToken': authResponse.accessToken,
        'type': 'Facebook',
        'fb_userID': authResponse.userID
      }
    }).success(function(data) {
      // this callback will be called asynchronously
      // when the response is available
      $rootScope.auth = data;
      $rootScope._loading.FBLogin = false;
    }).error(function(data) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      window.alert(data.message);
      $rootScope._loading.FBLogin = false;
    });

  });

  // Connect to backend for authentication
  $rootScope.GetAuth = function() {
    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'auth/',
      params: {
        //callback: 'JSON_CALLBACK'
      }
    }).success(function(data) {
      $rootScope.auth = data;
    }).error(function(data) {
      console.warn(data.message);
    });
  };

  $scope.$watch('auth', function() {
    if ($rootScope.auth && $rootScope.auth.user) {
      console.log('Welcome ' + $rootScope.auth.user.name.display_name);
      var notAllowedURL = ['/login', '/register'];
      if (notAllowedURL.indexOf($location.path()) > -1) {
        $location.path('/user/' + $rootScope.auth.user.user_id);
      }
    }
  });

  $scope.Login = function() {
    var $this = this;
    if ($this.loginForm.$valid) {
      $http({
        method: 'POST',
        withCredentials: true,
        url: $rootScope._app.url.api + 'auth/login',
        data: {
          identity: $this.loginForm.inputEmail.$modelValue,
          password: $this.loginForm.inputPassword.$modelValue,
          remember: $this.loginForm.inputRemember.$modelValue
        }
      }).success(function() {
        $rootScope.GetAuth();
      }).error(function(data) {
        $this.loginForm._errorMessage = (data.message);
      });
    }
    return false;
  };

  /* Initialize */
  (function() {
    $rootScope.GetAuth();

    jQuery.backstretch([
      'images/bg/1.jpg',
      'images/bg/2.jpg',
      'images/bg/3.jpg',
      'images/bg/4.jpg',
      'images/bg/5.jpg'
    ], {
      fade: 1000,
      duration: 8000
    });
  })();

})
.controller('FacebookCtrl', function() {

});