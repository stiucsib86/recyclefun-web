/*global GetOneMap:false, google:false, alert:false, Morris:false */

'use strict';

angular.module('recyclefunWebApp')
.controller('LeaderboardCtrl', function($scope) {

  $scope.recyclingStatistics = [
    {'id': 1, 'player': 'Jurong', 'wastetotal': '475,918', 'average_per_house': '0.5592', 'recycle_percentage': '5.48', 'paper': '330887', 'can': '9137', 'glass': '16653', 'plastic': '49460', 'cloth': '30347', 'misc': '39434', 'garden': '0', 'month': '1\/1\/2013', 'inc': 1, 'dec': 0, 'difference': '21', 'badge1': 1, 'badge2': 1, 'badge3': 1},
    {'id': 2, 'player': 'Clementi', 'wastetotal': '211,048', 'average_per_house': '0.3015', 'recycle_percentage': '2.35', 'paper': '117350', 'can': '13522', 'glass': '36548', 'plastic': '35094', 'cloth': '3401', 'misc': '5133', 'garden': '0', 'month': '1\/1\/2013', 'inc': 0, 'dec': 1, 'difference': '12', 'badge1': 1, 'badge2': 0, 'badge3': 1},
    {'id': 3, 'player': 'Bedok', 'wastetotal': '378,806', 'average_per_house': '0.5623', 'recycle_percentage': '4.16', 'paper': '165252', 'can': '9251', 'glass': '77517', 'plastic': '76018', 'cloth': '14347', 'misc': '36421', 'garden': '0', 'month': '1\/1\/2013', 'inc': 1, 'dec': 0, 'difference': '20', 'badge1': 0, 'badge2': 0, 'badge3': 1},
    {'id': 4, 'player': 'City', 'wastetotal': '98,223', 'average_per_house': '0.1087', 'recycle_percentage': '0.70', 'paper': '49501', 'can': '6818', 'glass': '18341', 'plastic': '17733', 'cloth': '2362', 'misc': '3468', 'garden': '0', 'month': '1\/1\/2013', 'inc': 1, 'dec': 0, 'difference': '20', 'badge1': 0, 'badge2': 0, 'badge3': 1},
    {'id': 5, 'player': 'HG-PG', 'wastetotal': '236,259', 'average_per_house': '0.3390', 'recycle_percentage': '1.11', 'paper': '142419', 'can': '13781', 'glass': '36216', 'plastic': '35521', 'cloth': '3952', 'misc': '4370', 'garden': '0', 'month': '1\/1\/2013', 'inc': 1, 'dec': 'FALSE', 'difference': '20', 'badge1': 0, 'badge2': 0, 'badge3': 1},
    {'id': 6, 'player': 'PRT', 'wastetotal': '339,657', 'average_per_house': '0.5639', 'recycle_percentage': '2.76', 'paper': '110111', 'can': '6143', 'glass': '114117', 'plastic': '95021', 'cloth': '14265', 'misc': '123', 'garden': '0', 'month': '1\/1\/2013', 'inc': 1, 'dec': 0, 'difference': '20', 'badge1': 0, 'badge2': 0, 'badge3': 1},
    {'id': 7, 'player': 'AMK', 'wastetotal': '176,144', 'average_per_house': '0.1978', 'recycle_percentage': '1.13', 'paper': '35282', 'can': '8756', 'glass': '36636', 'plastic': '32481', 'cloth': '18423', 'misc': '44566', 'garden': '0', 'month': '1\/1\/2013', 'inc': 1, 'dec': 0, 'difference': '20', 'badge1': 0, 'badge2': 0, 'badge3': 1},
    {'id': 8, 'player': 'TBM', 'wastetotal': '309,220', 'average_per_house': '0.3931', 'recycle_percentage': '1.98', 'paper': '88213', 'can': '8044', 'glass': '105949', 'plastic': '92355', 'cloth': '13148', 'misc': '1511', 'garden': '0', 'month': '1\/1\/2013', 'inc': 1, 'dec': 0, 'difference': '20', 'badge1': 0, 'badge2': 0, 'badge3': 1},
    {'id': 9, 'player': 'WL-Y', 'wastetotal': '285,822', 'average_per_house': '0.6055', 'recycle_percentage': '2.08', 'paper': '167031', 'can': '14142', 'glass': '45832', 'plastic': '45545', 'cloth': '6952', 'misc': '6320', 'garden': '0', 'month': '1\/1\/2013', 'inc': 1, 'dec': 0, 'difference': '20', 'badge1': 0, 'badge2': 0, 'badge3': 1}
  ];

  (function() {

    var visualization;

    var GetRegionsVisualization = function() {
      $scope.recyclingStatistics.map(function(regionInfo) {
        drawVisualization(regionInfo);
      });
    };

    var drawVisualization = function(regionInfo) {

      var handleQueryResponse = function(response) {
        if (response.isError()) {
          alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
          return;
        }

        var dataTable = response.getDataTable();
        //construct view for 2 different charts
        var dataView_bar = new google.visualization.DataView(dataTable);
        dataView_bar.setColumns([6, 7]);
        visualization = new google.visualization.BarChart(document.getElementById('visualization-chart-id-' + regionInfo.id));
        // Set chart options
        var options = {'title': regionInfo.player + ' Recycle over times (kg)',
          'width': 535,
          'height': 500
        };
        visualization.draw(dataView_bar, options);

        var pie_chart = new google.visualization.PieChart(document.getElementById('pie-chart-id-' + regionInfo.id));

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Category');
        data.addColumn('number', 'Kg');
        data.addRows([
          ['Paper', parseFloat(regionInfo.paper)],
          ['Can', parseFloat(regionInfo.can)],
          ['Glass', parseFloat(regionInfo.glass)],
          ['Plastic', parseFloat(regionInfo.plastic)],
          ['Cloth', parseFloat(regionInfo.cloth)],
          ['Miscellaneous', parseFloat(regionInfo.misc)]
        ]);
        
        // Set chart options
        var options_pie = {'title': regionInfo.player + ' Recycle Category',
          'width': 535,
          'height': 300,
          is3D: true
        };

        pie_chart.draw(data, options_pie);
      };

      var query = new google.visualization.Query('https://spreadsheets.google.com/tq?key=0Ap3K3Evv9lLsdGdtTGpWTXZtS1NMS2dPaURIV2tLekE&pub=1');
      // Apply query language.
      query.setQuery('SELECT E,F,G,H,I,J,M,L WHERE B = "' + regionInfo.player + '" ORDER BY M');
      // Send the query with a callback function.
      query.send(handleQueryResponse);
    };

    google.load('visualization', '1', {'callback': 'console.log("Workaround for blank page. Read http://stackoverflow.com/questions/9519673/why-does-google-load-cause-my-page-to-go-blank ")', packages: ['piechart', 'corechart', 'geomap']});
    google.setOnLoadCallback(GetRegionsVisualization);
  })();

})
.controller('BinsSearchCtrl', function($http, $scope, $timeout) {

  $scope.GetBinsStatistics = function() {
    if (jQuery('#bar-example').length > 0) {
      Morris.Bar({
        element: 'bar-example',
        data: [
          {y: 'Ang Mo Kio', a: 100, b: 197},
          {y: 'Bedok', a: 75, b: 562},
          {y: 'City', a: 50, b: 108},
          {y: 'Clementi', a: 75, b: 301},
          {y: 'Hougang', a: 50, b: 339},
          {y: 'Jurong', a: 68, b: 559},
          {y: 'Tampines', a: 75, b: 563},
          {y: 'Queenstown', a: 100, b: 393},
          {y: 'Woodlands', a: 200, b: 605}
        ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Number of bins', 'Collection per household']
      });
    }
  };

  $scope.InitializeOneMap = function() {
    //add map with defined center location and zoom level
    var centerPoint = '28968.103,33560.969';
    var levelNumber = 2;
    $scope.OneMap = new GetOneMap('divMain', 'SM', {level: levelNumber, center: centerPoint});

    $timeout(function() {
      var kmlPath = 'assets/data/binsMapLocation.kml';
      $scope.OneMap.overlayKML(kmlPath);
    }, 1000);

  };

  $scope.GetBinsLocation = function() {
    $http({
      method: 'GET',
      url: 'assets/data/binsLocation.json'
    }).success(function(xhrResponse) {
      $scope.recyclingBinLocations = xhrResponse;
    });
  };

  (function() {
    $scope.InitializeOneMap();
    $scope.GetBinsStatistics();
    $scope.GetBinsLocation();
  })();

});
