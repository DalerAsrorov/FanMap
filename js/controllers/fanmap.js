angular
  .module('app')
  .controller('FanMapCtrl', function($http) { // passed parameters in the controller can be included
    console.log('reached');
    var url = '/api/twitter/';

    $http.get('/api/twitter/greenday').then(function(response, err) {
      console.log('reached http****');
      if(err) {
        console.log('error', err);
      } else {
        console.log(response);
      }
    });



  })
