angular
  .module('app')
  .controller('RadioMapCtrl', function(topCountryArtists) { // passed parameters in the controller can be included
    var vm = this;
    var cont = [];

    for(var i = 0; i < topCountryArtists.length; i++) {
      var p = Promise.resolve(topCountryArtists[i]);
      p.then(function(v) {
        cont.push(v);
        //console.log(v);
      })
    }


  })
