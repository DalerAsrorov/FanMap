angular
  .module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: "/radiomap"
      })
      .when('/radiomap', {
        templateUrl: '/templates/radiomap.html',
        controller: 'RadioMapCtrl'
      })
      .when('/fanmap', {
        templateUrl: '/templates/fanmap.html',
        controller: 'FanMapCtrl'
      })
      .otherwise({
        redirectTo: "/radiomap"
      });
  })
