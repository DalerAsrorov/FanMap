angular
  .module('app')
  .controller('RadioMapCtrl', function(topCountryArtists, Geolocation, $http) { // passed parameters in the controller can be included
    var vm = this;
    var cont = [];
    vm.topList = [];
    vm.isLoaded = false;

    displayMap();
    displayTop();

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
                 generateList(data);
               })
             })
           }

           var go = function() {
             console.log('here');
           }

           for(var i = 0; i < topCountryArtists.length; i++) {
             extractPromises(i);
           }

           test = function(name) {
             var str = name.toString()
             console.log(str);
             console.log('here');
           }


           function plot(data) {
              var lineAtt = {
                "<b>Country</b>": data.country,
                "<b>1st</b>": "<button class='btn btn-link' onclick=test(\'" + data.topartists.artist[0].name + "\')>" + data.topartists.artist[0].name + "</button>",
                "<b>2nd</b>":  "<button class='btn btn-link'  onclick='test()'>" + data.topartists.artist[1].name + "</button>",
                "<b>3rd</b>": "<button class='btn btn-link'  onclick='test()'>" + data.topartists.artist[2].name + "</button>"
              };

              var point = new Point({
                longitude: data.geoObj.lng,
                latitude: data.geoObj.lat
              });

              var markerSymbol = new SimpleMarkerSymbol({
                  color: [226, 0, 0],
                  outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 120, 120],
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

           var container = [];
           function generateList(data) {
             container.push(data.topartists.artist[0].name);
             container.push(data.topartists.artist[1].name);
             container.push(data.topartists.artist[2].name);

           }
         });
    }

    function displayTop() {
        $http.get('/api/lastfm/top/20').then(function(response, err) {
          if(!err) {
            if(response.status === 200) {
                vm.topList = response.data.artists.artist;
                vm.isLoaded = true;
                console.log(vm.topList);
            } else {
              console.log('Could not find data.');
            }
          }
        });
    }

  })
