'use strict';

angular.module('recyclefunWebApp')
.controller('ApplicationCtrl', function($http, $location, $scope, $rootScope, $timeout, Facebook) {

  if (window.location.href.indexOf('localhost') > 0) {
    // Localhost Environment
    $rootScope._app = {
      url: {
        api: jQuery.url().attr('protocol') + '://' + 'api.recyclefun.localhost/'
      }
    };
    /*
     * Facebook Initializations
     */
    if (typeof Facebook !== 'undefined') {
      Facebook.init({
        appId: '516418235114060', // App ID
        channelUrl: '/channel.html', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
        permissions: 'read_stream, publish_stream, email'
      });
    }
  } else {
    // Production Environment
    $rootScope._app = {
      url: {
        api: jQuery.url().attr('protocol') + '://' + 'recyclefun-api-php.azurewebsites.net/'
      }
    };
    /*
     * Facebook Initializations
     */
    if (typeof Facebook !== 'undefined') {
      Facebook.init({
        appId: '637970952903072', // App ID
        channelUrl: '/channel.html', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
        permissions: 'read_stream, publish_stream, email'
      });
    }
  }

  $scope.fb_login = function() {
    Facebook.login();
  };

  $rootScope.$on('event.fb.auth.login', function(event, args) {
    var authResponse = args.authResponse;
    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'auth/',
      params: {
        //callback: 'JSON_CALLBACK',
        accessToken: authResponse.accessToken,
        type: 'Facebook',
        fb_userID: authResponse.userID
      }
    }).success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $rootScope.auth = data;
      console.log('$rootScope.auth', $rootScope.auth);
    }).error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
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
    }).success(function(data, status, headers, config) {
      $rootScope.auth = data;
    }).error(function(data, status, headers, config) {
      console.warn(data);
    });
  };
  
  $scope.$watch('auth', function() {
    if ($rootScope.auth && $rootScope.auth.user) {
      console.log("Welcome " + $rootScope.auth.user.name.display_name);
      var notAllowedURL = ['/login', '/register'];
      console.log(notAllowedURL);
      if (notAllowedURL.indexOf($location.path()) > -1) {
        $location.path('/user/profile');
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
      }).success(function(data, status, headers, config) {
        $rootScope.GetAuth();
      }).error(function(data, status, headers, config) {
        $this.loginForm._errorMessage = (data.message);
      });
    }
    return false;
  };

  /* Initialize */
  (function() {
    $rootScope.GetAuth();
  })();

})
.controller('FacebookCtrl', function($http, $scope, $rootScope, $timeout, Facebook) {

});