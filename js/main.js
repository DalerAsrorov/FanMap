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
            jQuery.get('../docs/countries.txt', function(data) {
              return data; 
            });
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
