angular
  .module('app')
  .controller('FanMapCtrl', function($http, getArtist) { // passed parameters in the controller can be included
    var vm = this;
    var artist = getArtist;
    vm.listOfUsers = [];


    console.log('reached');
    var url = '/api/twitter/';


    $http.get('/api/twitter/greenday').then(function(response, err) {
      if(err) {
        console.log('error', err);
      } else {
        console.log(response);
      }
    });

  })
