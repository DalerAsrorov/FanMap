angular
  .module('app')
  .factory('Geolocation', function($http) {
    return {
      getGeo: function(country) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + country + '&key=AIzaSyBOc0bLp-196AHHFRNaeubkF44J4_k9McM';
        return $http.get(url).then(function(response) {
          return response.data.results[0].geometry.location;
        });
      }
    };
  });
