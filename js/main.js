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
          
            //http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=b618453443ef733c126b9d88855f9702&format=json
            //http://download.geonames.org/export/dump/countryInfo.txt
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
