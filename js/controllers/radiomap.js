angular
  .module('app')
  .controller('RadioMapCtrl', function(topCountryArtists) { // passed parameters in the controller can be included
    var vm = this;
    console.log(topCountryArtists);
  })
