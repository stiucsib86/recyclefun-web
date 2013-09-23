'use strict';

angular.module('recyclefunWebApp')
.controller('LoginCtrl', function($http, $location, $scope, $rootScope, $routeParams, $timeout) {
  $rootScope.GetAuth();
})
.controller('RegisterCtrl', function($http, $location, $scope, $rootScope, $routeParams, $timeout) {
  $rootScope.GetAuth();

  $scope.Register = function() {
    var $this = this;

    if (!jQuery('form[name=registerForm]').valid()) {
      return false;
    }

    $http({
      method: 'POST',
      withCredentials: true,
      url: $rootScope._app.url.api + 'auth/register',
      data: $scope.regFrm
    }).success(function(data, status, headers, config) {
      $rootScope.GetAuth();
    }).error(function(data, status, headers, config) {
      console.warn(data);
      console.log($this, $this);
      $this.registerForm._errorMessage = data.message;
    });
  };

  $scope.InitializePage = function() {
    jQuery('form[name=registerForm]').validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          minlength: 8,
          required: true
        },
        confirmPassword: {
          equalTo: "[name=password]"
        }
      },
      highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
      },
      success: function(element) {
        element.html('<i class="icon-ok"></i>').addClass('valid')
        .closest('.form-group').removeClass('has-error').addClass('has-success');
      }
    });
  };

  (function() {
    $scope.InitializePage();
  })();

})
.controller('LogoutCtrl', function($http, $location, $scope, $rootScope, $routeParams, $timeout) {

  $scope.Logout = function() {
    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'auth/logout'
    }).success(function(data, status, headers, config) {
      $rootScope.auth = {};
      $location.path('/');
    }).error(function(data, status, headers, config) {
      console.warn(data);
    });
  };

  $scope.Logout();

});