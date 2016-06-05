var request = require("request");

module.exports = {
  getTopArtists: function(q, callback) {
    var q = q;
    var key = '&api_key=b618453443ef733c126b9d88855f9702';
    var base = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists';
    var format = '&format=json';
    var limit = '&limit=' + q;
    var url = base + key + format + limit;

    request({
       method: 'GET',
       url: url
     }, function(error, response, body) {
         if(!error && response.statusCode === 200) {
           var data = JSON.parse(body);
           var formatted = new Date().toLocaleString();
           data.execution = {
             date: {
                "utc": new Date().getTime(),
                "local_formatted": formatted
             },
             query: {
               "description": 'Top [limit] artists',
               "limit": q
             }
           };
           callback(data);
         }
     });

  },
  getArtistInfo: function(q, callback) {
    var q = q;
    var key = '&api_key=b618453443ef733c126b9d88855f9702';
    var base = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=';
    var format = '&format=json';

    var url = base + q + key + format;

    request({
       method: 'GET',
       url: url
     }, function(error, response, body) {
         if(!error && response.statusCode === 200) {
           var data = JSON.parse(body);
           var formatted = new Date().toLocaleString();
           data.execution = {
             date: {
                "utc": new Date().getTime(),
                "local_formatted": formatted
             },
             query: {
               "description": 'Get info of the [given] artist.',
               "given": q
             }
           };
           callback(data);
         }
     });
  }
};
