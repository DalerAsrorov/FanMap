angular
  .module('app')
  .controller('FanMapCtrl', function($http) { // passed parameters in the controller can be included
    console.log('reached');
    var url = '/api/twitter/';

    $http.get('http://localhost:3000/api/twitter/greenday').then(function(response, err) {
      console.log('reached http');
      console.log(response);
      //console.log('e')
    });



  })
