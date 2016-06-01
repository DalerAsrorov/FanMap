angular
  .module('app')
  .controller('RadioMapCtrl', function(topCountryArtists) { // passed parameters in the controller can be included
    var vm = this;
    var cont = [];
    vm.text = "Some random text";

    console.log('Radio Map');

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
           "esri/PopupTemplate",
           "esri/views/MapView",
           "esri/Graphic",
           "esri/geometry/Point",
           "esri/geometry/Polyline",
           "esri/geometry/Polygon",
           "esri/symbols/SimpleMarkerSymbol",
           "esri/symbols/SimpleLineSymbol",
           "esri/symbols/SimpleFillSymbol",
           "dojo/domReady!"
         ], function(
           Map, PopupTemplate, MapView,
           Graphic, Point, Polyline, Polygon,
           SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol
         ) {

           var map = new Map({
             basemap: "gray"
           });

           var view = new MapView({
             center: [-80, 35],
             container: "map",
             map: map,
             zoom: 3
           });



           var points = [

           ]

           /**********************
            * Create a point graphic
            **********************/

           // Create an object for storing attributes related to the line
           var lineAtt = {
             Name: "Keystone Pipeline",
             Owner: "TransCanada",
             Length: "3,456 km"
           };

           // First create a point geometry (this is the location of the Titanic)
           var point = new Point({
             longitude: -49.97,
             latitude: 41.73
           });

           // Create a symbol for drawing the point
           var markerSymbol = new SimpleMarkerSymbol({
             color: [226, 119, 40],
             outline: { // autocasts as new SimpleLineSymbol()
               color: [255, 255, 255],
               width: 4
             }
           });

           // Create a graphic and add the geometry and symbol to it
           var pointGraphic = new Graphic({
             geometry: point,
             symbol: markerSymbol,
             attributes: lineAtt,
             popupTemplate: new PopupTemplate({
               title: "{Name}",
               content: "{*}"
             })
           });


           // Add the graphics to the view's graphics layer
           view.graphics.addMany([pointGraphic, polylineGraphic, polygonGraphic]);
         });

    }

  })
