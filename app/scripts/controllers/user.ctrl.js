/*global Morris:false, alert:false */

'use strict';

angular.module('recyclefunWebApp')
.controller('UserProfileCtrl', function($http, $scope, $rootScope, $routeParams) {

  $scope._loading = {};
  $scope._error = {};

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

    // get summary in current month
    var api_url = 'http://recyclefun-api-php.azurewebsites.net/';//$rootScope._app.url.api;
    var current_month = 9;
    var perfect_data = {
     'Paper':0,
     'Can':0,
     'Glass':0,
     'Plastic':0,
     'Cloth':0,
     'Garden':0,
     'misc':0
    };
     //'http://recyclefun-api-php.azurewebsites.net/';//
    $http({
      method: 'GET',
      withCredentials: true,
      url: api_url + 'user/transactions_by_month',
      params: {
        user_id: $routeParams.userid,
        month: current_month,
        year:2013
      }
    }).success(function(data) {
      $scope._loading.GetUserTransactionsByMonth = false;
      $scope._error.message = false;
      //to fill empty field in recyclable_type_name of data.data
      var tmp_data = data.data.map(function(ele){
        perfect_data[ele.recyclable_type_name]=1;
        return ele;
      });
      for (var obj in perfect_data) {
        if(perfect_data.hasOwnProperty(obj) && !perfect_data[obj])
          {
            tmp_data.push({recyclable_type_name: obj,recyclable_amount:0});
          }
      }
      
      console.log(tmp_data);
      $scope.user.transactionsByMonth = tmp_data;
      $scope.RenderTransactionsByMonthBar();
    }).error(function(data) {
      $scope._loading.GetUserTransactionsByMonth = false;
      $scope._error.message = data.error;
      $scope.user.transactionsByMonth = [];
      console.warn(data.error);
    });
  };

  $scope.GetUser();

  $scope.RenderTransactionBar = function() {
    if (!$scope.user || !$scope.user.transactions) {
      return;
    }
    var graph_data = $scope.user.transactions.reduce(function(data, transaction_detail) {
      var item = {
        'y': transaction_detail.transactiondate,
        'a': transaction_detail.recyclable_amount
      };
      data.push(item);
      return data;
    }, []);
    
    Morris.Bar({
      element: 'bar-transaction',
      data: graph_data.reverse(),
      barColors: ['green'],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['kg']
    });
  };

  //Dan's code: to generate dynamic data.
  $scope.RenderTransactionsByMonthBar = function() {
    if (!$scope.user || !$scope.user.transactionsByMonth || !($scope.user.transactionsByMonth).length) {
      return;
    }
    
    var graph_data = $scope.user.transactionsByMonth.reduce(function(data, transaction_detail) {
      var item = {
        'label': transaction_detail.recyclable_type_name,
        'value': transaction_detail.recyclable_amount
      };
      
      data.push(item);
      return data;
    }, []);

    var total_this_month = graph_data.reduce(function(result, d){result+=d.value;return result;},0);
    
    Morris.Donut({
      element: 'donut-example',
      data: graph_data
    });

    Morris.Bar({
      element: 'bar-example',
      data: [
        {y: 'April', a: 5, b: 40},
        {y: 'May', a: 4, b: 65},
        {y: 'Jun', a: 6, b: 40},
        {y: 'July', a: 7, b: 65},
        {y: 'Aug', a: 9, b: 90},
        {y: 'Sept', a: 11, b: 90},
        {y: 'Oct', a: total_this_month, b: 90} //total amount of October is here. Other month are hard coded
      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Total']
    });
    
  };

  // if (jQuery('#donut-example').length > 0) {
  //   Morris.Donut({
  //     element: 'donut-example',
  //     data: [
  //       {label: 'Paper', value: 6},
  //       {label: 'Can', value: 3},
  //       {label: 'Glass', value: 7},
  //       {label: 'Plastic', value: 4},
  //       {label: 'Cloth', value: 4},
  //       {label: 'Garden', value: 2},
  //       {label: 'misc', value: 1}
  //     ]
  //   });
    
    $scope.RenderTransactionBar();
    $scope.RenderTransactionsByMonthBar();

    // Morris.Bar({
    //   element: 'bar-example',
    //   data: [
    //     {y: 'April', a: 5, b: 40},
    //     {y: 'May', a: 4, b: 65},
    //     {y: 'Jun', a: 6, b: 40},
    //     {y: 'July', a: 7, b: 65},
    //     {y: 'Aug', a: 9, b: 90},
    //     {y: 'Sept', a: 11, b: 90},
    //     {y: 'Oct', a: 9, b: 90}
    //   ],
    //   xkey: 'y',
    //   ykeys: ['a'],
    //   labels: ['Total']
    // });
  // }

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
