angular
  .module('app', ['ngRoute'])
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
            var data = [];

             return txtArray.forEach(function(country) { // api cal for each country
              var apiBase = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' + country + '&api_key=b618453443ef733c126b9d88855f9702&format=json&limit=3';
              return $http.get(apiBase)
               .then(function(response) {
                   response.country = country;
                   data.push(response);
                   return data;
              });

            })


          }
        }
      })
      .when('/fanmap', {
        templateUrl: '/templates/fanmap.html',
        controller: 'FanMapCtrl'
      })
      .otherwise({
        redirectTo: "/radiomap"
      });
  })
