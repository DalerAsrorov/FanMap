angular
  .module('app', ['ngRoute', 'ngSanitize'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: "/radiomap"
      })
      .when('/radiomap', {
        templateUrl: '/templates/radiomap.html',
        controller: 'RadioMapCtrl',
        controllerAs: 'vm',
        resolve: {
          topCountryArtists: function($route, $http, $location) {
            var countries = null;
            var text = $.ajax({type: "GET", url: "../docs/countries.txt", async: false}).responseText; // get the list of countries in ISO format (accepted by LastFM)
            var txtArray = text.split("\n");
            var dataArray = [];

            function getArtists(i) {
              var country = txtArray[i];
              var apiBase = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' + country + '&api_key=b618453443ef733c126b9d88855f9702&format=json&limit=3';
              return $http.get(apiBase).success(function(response) {
                  response.country = country;
                  return response;
              });
            }

            for(var i = 0; i < txtArray.length; i++)
              dataArray.push(getArtists(i));

            return dataArray;
          }
        }
      })
      .when('/fanmap/:artist', {
        templateUrl: '/templates/fanmap.html',
        controller: 'FanMapCtrl',
        controllerAs: 'vm',
        resolve: {
          getArtist: function($route, $http, $location) {
            var artist =  $route.current.pathParams.artist;
            if(!artist)
              $location.path('/radiomap');

            return artist;
          }
        }
      })
      .when('/about', {
        templateUrl: '/templates/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: "/radiomap"
      });
  })
