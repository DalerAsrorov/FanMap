var util = require('util'),
    twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'zIyyQzO6yZnOiC0jOniFMCBCd',
    consumer_secret: '3RamgYGhyDpT8p8eNqt45V8LAA052rF6sSQaBfSOvvbWlg1leu',
    access_token_key: '2243402142-omEJRTjWQuH1fd0pv8zdw16xL08NHgUmzltCMgh',
    access_token_secret: 'clmO3BcIdFogEC36ylYsVYdpc8VEPY1yEB6hh7bw37tfO'
});

module.exports = {
  getUser: function(name) {
    var route = '/users/lookup.json?screen_name=' + name + ',dump';
    twit.get(route, {}, function(data, err) {
      if(err) {
        console.log(err);
      } else {
        console.log("DATADATADATADATADADTA");
        return data;
      }
    });
  }
};
