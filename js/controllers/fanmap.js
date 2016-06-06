angular
  .module('app')
  .controller('FanMapCtrl', function($http, getArtist) { // passed parameters in the controller can be included
    var vm = this;
    var artist = getArtist;
    vm.listOfUsers = [];

    var url = '/api/twitter/';

    getArtistInfo(artist);

    // $http.get('/api/twitter/greenday').then(function(response, err) {
    //   if(err) {
    //     console.log('error', err);
    //   } else {
    //     console.log(response);
    //   }
    // });

    console.log('reached');
    var url = '/api/twitter/';

    function getArtistInfo(artist) {
      $http.get('/api/lastfm/artist/' + artist).then(function(response, err) {
        if(err) {
          console.log('error', err);
        } else {
          console.log(response.data.artist);
          vm.artistInfo = response.data.artist;
          vm.similar = response.data.artist.similar.artist;
        }
      });
    }

  })
