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

    displayMap();
    // display map on the page
    function displayMap() {
      require([
        "esri/Map",
        "esri/views/SceneView",
        "dojo/domReady!"
      ], function(Map, SceneView) {
        var map = new Map({
            basemap: "streets",
            ground: "world-elevation"
        });
        var view = new SceneView({
          container: "map",  // Reference to the DOM node that will contain the view
          map: map  // References the map object created in step 3
        });


      });

    }

  })
