angular
  .module('app')
  .controller('RadioMapCtrl', function(topCountryArtists, Geolocation) { // passed parameters in the controller can be included
    var vm = this;
    var cont = [];
    vm.text = "Some random text";

    function getArtists(obj) {
      if(obj.artist !== undefined)
        return obj.artist;
      else
          console.log('no artists')
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

           var extractPromises = function(i) {
             var p = Promise.resolve(topCountryArtists[i]);
             p.then(function(response) {
               var country = response.data.country;
               var data = response.data;
               Geolocation.getGeo(country).then(function(geo) {
                 data.geoObj = geo; // {lat, lng}
                 plot(data);
               })
             })
           }

           for(var i = 0; i < topCountryArtists.length; i++) {
             extractPromises(i);
           }

           function plot(data) {
              var lineAtt = {
                "Country": data.country,
                "1st": data.topartists.artist[0].name,
                "2nd": data.topartists.artist[1].name,
                "3rd":data.topartists.artist[2].name
              };

              var point = new Point({
                longitude: data.geoObj.lng,
                latitude: data.geoObj.lat
              });

              var markerSymbol = new SimpleMarkerSymbol({
                  color: [226, 119, 40],
                  outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 4
                  }
              });

             var pointGraphic = new Graphic({
               geometry: point,
               symbol: markerSymbol,
               attributes: lineAtt,
               popupTemplate: new PopupTemplate({
                 title: "{Name}",
                 content: "{*}"
               })
             });

             view.graphics.add(pointGraphic)
           }

          // Geolocation.getGeo('United States').then(function(geo){
          //     console.log(geo);
          // })


          // // 1. create array of points with different attributes
          // var points = [
          //    point = {
          //      lineAt: {}, // object
          //      location: {} // new Point({lat, lon})
          //      markerSymbol: {} // new SimpleMarkerSymbol({[], {[]}})
          //    },
          //    point = {
          //
          //    },
          //    // ...
          //  ];



          //  // 2. create array of graphics
          //  var pointGraphics = [];
          //  pointGraphics.push(new Graphic(
          //    geometry: location,
          //    symbol: markerSymbol,
          //    attributes: lineAtt,
          //    popupTemplate: new PopupTemplate({
          //      title: "{Name}",
          //      content: "{*}"
          //    })
          //  ))
           //
          //  // 3. Pass graphics to the view
          //  // view.graphics.addMany(pointGraphics);
           //
          //  /**********************
          //   * Create a point graphic
          //   **********************/
           //
          //  // Create an object for storing attributes related to the line
          //  var lineAtt = {
          //    Name: "Keystone Pipeline",
          //    Owner: "TransCanada",
          //    Length: "3,456 km"
          //  };
           //
          //  // First create a point geometry (this is the location of the Titanic)
          //  var point = new Point({
          //    longitude: -49.97,
          //    latitude: 41.73
          //  });
           //
          //  // Create a symbol for drawing the point
          //  var markerSymbol = new SimpleMarkerSymbol({
          //    color: [226, 119, 40],
          //    outline: { // autocasts as new SimpleLineSymbol()
          //      color: [255, 255, 255],
          //      width: 4
          //    }
          //  });
           //
          //  // Create a graphic and add the geometry and symbol to it
          //  var pointGraphic = new Graphic({
          //    geometry: point,
          //    symbol: markerSymbol,
          //    attributes: lineAtt,
          //    popupTemplate: new PopupTemplate({
          //      title: "{Name}",
          //      content: "{*}"
          //    })
          //  });
           //
           //
          //  // Add the graphics to the view's graphics layer
          //  view.graphics.addMany([pointGraphic, polylineGraphic, polygonGraphic]);
         });

    }

  })
