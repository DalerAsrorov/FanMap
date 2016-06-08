angular
  .module('app')
  .controller('FanMapCtrl', function($http, getArtist) { // passed parameters in the controller can be included
    var vm = this;
    var artist = getArtist;
    vm.listOfUsers = [];

    var url = '/api/twitter/';

    displayMap();

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
           "esri/layers/FeatureLayer",
           "dojo/domReady!"
         ], function(
           Map, PopupTemplate, MapView,
           Graphic, Point, Polyline, Polygon,
           SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
           FeatureLayer
         ) {
             var map = new Map({
               basemap: "gray"
             });

             var view = new MapView({
               center: [-80, 35],
               container: "map-canvas",
               map: map,
               zoom: 3
             });
            // //  // create heat layer
            // //  var heatLayer = new HeatmapLayer({
            // //     config: {
            // //         "useLocalMaximum": false,
            // //         "radius": 40,
            // //         "gradient": {
            // //             0.45: "rgb(000,000,255)",
            // //             0.55: "rgb(000,255,255)",
            // //             0.65: "rgb(000,255,000)",
            // //             0.95: "rgb(255,255,000)",
            // //             1.00: "rgb(255,000,000)"
            // //         }
            // //     },
            // //     "map": map,
            // //     "opacity": 0.85
            // //  }, "heatLayer");
            //
            //  map.addLayer(heatLayer);
            //  var data = [
            //      {
            //          attributes: {},
            //          geometry: {
            //              spatialReference: {wkid: 102100},
            //              type: "point",
            //              x: -13625078.0408,
            //              y: 4548494.332400002
            //          }
            //      },
            //      {
            //          attributes: {},
            //          geometry: {
            //              spatialReference: {wkid: 102100},
            //              type: "point",
            //              x: -13625078.0408,
            //              y: 4548494.332400002
            //          }
            //      }
            // ];
            // heatLayer.setData(data);



         });
    }

    // $http.get('/api/twitter/greenday').then(function(response, err) {
    //   if(err) {
    //     console.log('error', err);
    //   } else {
    //     console.log(response);
    //   }
    // });

    getArtistInfo(artist);
    drawKeywords(artist, 50);

    var url = '/api/twitter/';

    function getArtistInfo(artist) {
      $http.get('/api/lastfm/artist/' + artist).then(function(response, err) {
        if(err) {
          console.log('error', err);
        } else {
          vm.artistInfo = response.data.artist;
          vm.similar = response.data.artist.similar.artist;
        }
      });
    }

    function drawKeywords(artist, index) {
      $http.get('/api/sentiment/keywords/' + artist + '/' + index).then(function(response, err) {
        if(err)
          console.log("Error:", err);
        else {
          var d3CloudData = response.data.data.d3Cloud;
          displayWordCloud(d3CloudData);
        //  console.log(response.data.data.d3Cloud);
        }
      });
    };

    function displayWordCloud(data) {
      console.log('running');
      var words = data;
      $(document).ready(function() {
        //console.log(words);
        $("#wordcloud").jQCloud(words, {
          autoResize: true,
          fontSize: {
            from: 0.1,
            to: 0.02
          }
        });
      });
    }


    // function drawCloud(data) {
    //   // var frequency_list = [{"text":"study","size":40},{"text":"motion","size":15},{"text":"forces","size":10},{"text":"electricity","size":15},{"text":"movement","size":10},
    //   // {"text":"relation","size":5}];
    //
    //    var color = d3.scale.linear()
    //          .domain([0,1,2,3,4,5,6,10,15,20,100])
    //          .range(['#33ccff', "#ff80df", "#ff80ff", "#00cc00", "#9FA1DF", "#0099ff", "#8688C6", ' #33ccff']);
    //
    //    d3.layout.cloud().size([1000, 500])
    //            .words(data)
    //            .rotate(0)
    //            .fontSize(function(d) { return d.size; })
    //            .on("end", draw)
    //            .start();
    //
    //    function draw(words) {
    //        d3.select("#wordcloud").append("svg")
    //                .attr("width", 800)
    //                .attr("height", 400)
    //                .attr("class", "wordcloud")
    //                .append("g")
    //                // without the transform, words words would get cutoff to the left and top, they would
    //                // appear outside of the SVG area
    //                .attr("transform", "translate(350,270)")
    //                .selectAll("text")
    //                .data(words)
    //                .enter().append("text")
    //                .style("font-size", function(d) { return d.size + 18 + "px"; })
    //                .style("fill", function(d, i) { return color(i); })
    //                .attr("transform", function(d) {
    //                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    //                })
    //                .text(function(d) { return d.text; });
    //    }
    // }





  })
