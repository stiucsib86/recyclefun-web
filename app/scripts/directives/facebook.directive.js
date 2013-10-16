/*global FB:false */

'use strict';

angular.module('recyclefunWebApp')
.directive('fbElm', function() {
  return {
    restrict: 'A',
    link: function() {
      if (typeof FB !== 'undefined') {
        FB.XFBML.parse();
      }
    }
  };
});