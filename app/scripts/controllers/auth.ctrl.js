/*global jQuery:false */

'use strict';

angular.module('recyclefunWebApp')
.controller('LoginCtrl', function($rootScope) {
  $rootScope.GetAuth();
})
.controller('RegisterCtrl', function($http, $rootScope, $scope) {
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
    }).success(function() {
      $rootScope.GetAuth();
    }).error(function(data) {
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
          equalTo: '[name=password]'
        }
      },
      highlight: function(element) {
        jQuery(element).closest('.form-group').removeClass('has-success').addClass('has-error');
      },
      success: function(element) {
        jQuery(element).html('<i class="icon-ok"></i>').addClass('valid')
        .closest('.form-group').removeClass('has-error').addClass('has-success');
      }
    });
  };

  (function() {
    $scope.InitializePage();
  })();

})
.controller('LogoutCtrl', function($http, $location, $scope, $rootScope) {

  $scope.Logout = function() {
    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'auth/logout'
    }).success(function() {
      $rootScope.auth = {};
      $location.path('/');
    }).error(function(data) {
      console.warn(data);
    });
  };

  $scope.Logout();

})
.controller('PasswordForgetCtrl', function($http, $location, $rootScope, $scope) {

  $scope.PasswordForget = function() {
    $http({
      method: 'POST',
      withCredentials: true,
      url: $rootScope._app.url.api + 'auth/password_forget',
      data: {
        email: $scope.inputEmail
      }
    }).success(function(data) {
      $scope.passwordForgetForm._completed = true;
      $scope.passwordForgetForm._successMessage = data.message;
    }).error(function(data) {
      $scope.passwordForgetForm._errorMessage = data.message;
    });
  };

})
.controller('PasswordResetCtrl', function($http, $scope, $rootScope, $routeParams) {

  $scope.frmInput = {};
  $scope.passwordResetForm = {};

  if ($routeParams.passcode) {
    $scope.frmInput.passcode = $routeParams.passcode;
  }

  $scope.PasswordResetCodeCheck = function() {
    $http({
      method: 'POST',
      withCredentials: true,
      url: $rootScope._app.url.api + 'auth/passcode_check',
      data: {
        passcode: $scope.frmInput.passcode
      }
    }).success(function(data) {
      $scope.passwordResetCodeForm._completed = true;
      $scope.passwordResetCodeForm._successMessage = data.message;
    }).error(function(data) {
      $scope.passwordResetCodeForm._errorMessage = data.message;
    });
  };

//  $scope.PasswordReset = function() {
//    $http({
//      method: 'POST',
//      withCredentials: true,
//      url: $rootScope._app.url.api + 'auth/password_reset',
//      data: frmInput
//    }).success(function(data) {
//      $scope.passwordResetForm._completed = true;
//      $scope.passwordResetForm._successMessage = data.message;
//    }).error(function(data) {
//      $scope.passwordResetForm._errorMessage = data.message;
//    });
//  };

  (function() {
    if ($routeParams.passcode) {
      //$scope.CheckPasswordResetCode();
    }
  })();

})
.controller('PasswordChangeCtrl', function($http, $scope, $rootScope, $routeParams) {

  $scope.frmInput = {};
  $scope.passwordChangeForm = {};

  $scope.PasswordChangeFormSubmit = function() {
    var $this = this;

    if (!jQuery('form[name=passwordChangeForm]').valid()) {
      return false;
    }

    $http({
      method: 'POST',
      withCredentials: true,
      url: $rootScope._app.url.api + 'auth/password_change',
      data: {
        password: $scope.frmInput.password
      }
    }).success(function(data) {
      $scope.passwordChangeForm._completed = true;
      $scope.passwordChangeForm._successMessage = data.message;
      $scope.frmInput.password = '';
      $scope.frmInput.confirmPassword = '';
      $scope.passwordChangeForm._errorMessage = '';
    }).error(function(data) {
      $scope.passwordChangeForm._errorMessage = data.message || 'Error occurred while changing password.';
    });
  };

  $scope.InitializePage = function() {
    jQuery('form[name=passwordChangeForm]').validate({
      rules: {
        password: {
          minlength: 8,
          required: true
        },
        confirmPassword: {
          equalTo: '[name=password]'
        }
      },
      highlight: function(element) {
        jQuery(element).closest('.form-group').removeClass('has-success').addClass('has-error');
      },
      success: function(element) {
        jQuery(element).html('<i class="icon-ok"></i>').addClass('valid')
        .closest('.form-group').removeClass('has-error').addClass('has-success');
      }
    });
  };

  (function() {
    $scope.InitializePage();
  })();

});