/*global Morris:false, alert:false */

'use strict';

angular.module('recyclefunWebApp')
.controller('UserProfileCtrl', function($http, $scope, $rootScope, $routeParams, $timeout) {

  $scope._loading = {};
  $scope._error = {};

  $scope.current_date = new Date();
  $scope.current_year_month = $scope.current_date.getFullYear() + '-' + ("0" + ($scope.current_date.getMonth() + 1)).slice(-2);

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
      $scope.GetUserTransactions();
    }).error(function(data) {
      $scope._loading.GetUser = false;
      $scope._error.message = data.error;
      console.warn(data.error);
    });
  };

  $scope.GetUserTransactions = function() {
    $scope._loading.GetUserTransactions = true;

    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'user/transactions',
      params: {
        user_id: $routeParams.userid
      }
    }).success(function(data) {
      $scope._loading.GetUserTransactions = false;
      $scope._error.message = false;
      $scope.user.transactions = data.data;
      $scope.RenderTransactionBar();
    }).error(function(data) {
      $scope._loading.GetUserTransactions = false;
      $scope._error.message = data.error;
      $scope.user.transactions = [];
      console.warn(data.error);
    });

    $http({
      method: 'GET',
      withCredentials: true,
      url: $rootScope._app.url.api + 'user/transactions_by_months',
      params: {
        user_id: $routeParams.userid,
        month: $scope.current_date.getMonth() + 1,
        year: $scope.current_date.getFullYear()
      }
    }).success(function(data) {
      $scope._loading.GetUserTransactionsByMonth = false;
      $scope._error.message = false;
      if (data.data) {
        $scope.user.transactionsByMonths = data.data;
      } else {
        $scope.user.transactionsByMonths = [];
      }
    }).error(function(data) {
      $scope._loading.GetUserTransactionsByMonth = false;
      $scope._error.message = data.error;
      $scope.user.transactionsByMonths = [];
      console.warn(data.error);
    });
  };

  $scope.GetUser();

  $scope.$watch('user.transactionsByMonths', function(newValue) {
    if (newValue && typeof newValue[$scope.current_year_month] !== 'undefined') {
      $scope.user.transactionsCurrentMonth = newValue[$scope.current_year_month];
    }
    $scope.RenderTransactionsByMonthsBar();
  });

  $scope.$watch('user.transactionsByMonths', function(newValue) {
    $scope.RenderTransactionsByCurrentMonth();
  });

  $scope.RenderTransactionBar = function() {
    if (!$scope.user || !$scope.user.transactions) {
      return;
    }

    var graph_data = $scope.user.transactions.reduce(function(data, transaction_detail) {
      var item = {
        'y': transaction_detail.transactiondate,
        'a': parseFloat(transaction_detail.recyclable_amount)
      };
      data.push(item);
      return data;
    }, []);

    if (jQuery('#bar-transaction').length > 0) {
      $timeout(function() {
        Morris.Bar({
          element: 'bar-transaction',
          data: graph_data.reverse(),
          barColors: ['green'],
          xkey: 'y',
          ykeys: ['a'],
          labels: ['kg']
        });
      }, 1000);
    }
  };

  $scope.RenderTransactionsByCurrentMonth = function() {
    // CURRENT MONTH GRAPH - MORRIS BAR
    if (!$scope.user || !$scope.user.transactionsCurrentMonth) {
      return;
    }
    // Map "transactionsCurrentMonth" to Morris "label,value" format
    var graph_data = $scope.user.transactionsCurrentMonth.reduce(function(data, transaction_detail) {
      var item = {
        'label': transaction_detail.recyclable_type_name,
        'value': transaction_detail.recyclable_amount
      };
      data.push(item);
      return data;
    }, []);
    // Render Graph if exist
    if (jQuery('#morris-donut-current-month').length > 0) {
      Morris.Donut({
        element: 'morris-donut-current-month',
        data: graph_data
      });
    }
  };

  //Dan's code: to generate dynamic data.
  $scope.RenderTransactionsByMonthsBar = function() {
    // MONTHLY GRAPH - MORRIS BAR
    if (!$scope.user || !$scope.user.transactionsByMonths) {
      return;
    }
    var graph_data = [];
    // Map "transactionsByMonths" to Morris 'y: label, a: value' format
    var transactionsByMonths = $scope.user.transactionsByMonths;
    for (var k in transactionsByMonths) {
      if (transactionsByMonths.hasOwnProperty(k)) {
        var monthly_data = transactionsByMonths[k];
        if (monthly_data) {
          var monthly_total = monthly_data.reduce(function(result, d) {
            result += parseFloat(d.recyclable_amount || 0);
            return result;
          }, 0);
          graph_data.push({
            y: k,
            a: monthly_total
          });
        }
      }
    }
    // Render Graph if exist
    if (jQuery('#morris-bar-monthly').length > 0) {
      Morris.Bar({
        element: 'morris-bar-monthly',
        data: graph_data.reverse(),
        xkey: 'y',
        ykeys: ['a'],
        labels: ['Total']
      });
    }
  };

  $scope.RenderTransactionBar();

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
      if (data.error) {
        alert(data.error);
      }
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
