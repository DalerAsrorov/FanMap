angular
  .module('app')
  .controller('FanMapCtrl', function($http, getArtist) { // passed parameters in the controller can be included
    var vm = this;
    var artist = getArtist;
    vm.listOfUsers = [];

    var url = '/api/twitter/';


    $http.get('/api/twitter/greenday').then(function(response, err) {
      if(err) {
        console.log('error', err);
      } else {
        console.log(response);
      }
    });

    console.log('reached');
    var url = '/api/twitter/';
//>>>>>>> d819aa219b17f11f0eaaa355195c5af89d97415f

    // $http.get('/api/twitter/greenday').then(function(response, err) {
    //   if(err) {
    //     console.log('error', err);
    //   } else {
    //     console.log(response);
    //   }
    // });

  })
