/*global Morris:false */

'use strict';

angular.module('recyclefunWebApp')
.controller('PwcOverviewCtrl', function($http, $scope, $rootScope, $routeParams) {

  $scope._loading = {};
  $scope._error = {};

  $scope.userid = $routeParams.userid;

  $scope.IsPageOwner = function() {
    if ($rootScope.auth && !$routeParams.userid) {
      return true;
    }
  };

  $scope.binsStatus = [
    {
      id: '1',
      address: '102, Jurong East Street 13',
      status: '55'
    },
    {
      id: '2',
      address: '105, Jurong East Street 13',
      status: '97'
    },
    {
      id: '3',
      address: '112, Jurong East Street 13',
      status: '71'
    },
    {
      id: '4',
      address: '203, Jurong East Street 21',
      status: '63'
    },
    {
      id: '5',
      address: '207, Jurong East Street 21',
      status: '35'
    },
    {
      id: '6',
      address: '210, Jurong East Street 21',
      status: '61'
    },
    {
      id: '7',
      address: '219A, Jurong East Street 21',
      status: '20'
    },
    {
      id: '8',
      address: '223A, Jurong East Street 21',
      status: '22'
    },
    {
      id: '9',
      address: '228, Jurong East Avenue 1',
      status: '43'
    },
    {
      id: '10',
      address: '230, Jurong East Street 21',
      status: '92'
    }
  ];




})
.controller('PwcBinCtrl', function($http, $scope, $rootScope, $routeParams) {

  $scope._loading = {};
  $scope._error = {};

  $scope.userid = $routeParams.userid;

  $scope.IsPageOwner = function() {
    if ($rootScope.auth && !$routeParams.userid) {
      return true;
    }
  };

  Morris.Line({
    element: 'line-fill-level',
    data: [
      {y: '2013-09-23', a: 23},
      {y: '2013-09-23', a: 24},
      {y: '2013-09-24', a: 30},
      {y: '2013-09-25', a: 48},
      {y: '2013-09-26', a: 68},
      {y: '2013-09-27', a: 90},
      {y: '2013-09-28', a: 92}
    ],
    xkey: 'y',
    ykeys: ['a'],
    labels: ['Fill level']
  });





});