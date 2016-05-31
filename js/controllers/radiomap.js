angular
  .module('app')
  .controller('RadioMapCtrl', function(topCountryArtists) { // passed parameters in the controller can be included
    var vm = this;
    var cont = [];
    vm.text = "Some random text";

    var extractPromises = function(i) {
      var p = Promise.resolve(topCountryArtists[i]);
      p.then(function(data) {
        
      })

    }

    for(var i = 0; i < topCountryArtists.length; i++) {
      extractPromises(i);
    }


  })
