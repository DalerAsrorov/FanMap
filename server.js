var express = require('express');
var app = express();
// var twitter = require('./server/app/twitter');
var bodyParser = require('body-parser');
var util = require('util'),
    twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'zIyyQzO6yZnOiC0jOniFMCBCd',
    consumer_secret: '3RamgYGhyDpT8p8eNqt45V8LAA052rF6sSQaBfSOvvbWlg1leu',
    access_token_key: '2243402142-omEJRTjWQuH1fd0pv8zdw16xL08NHgUmzltCMgh',
    access_token_secret: 'clmO3BcIdFogEC36ylYsVYdpc8VEPY1yEB6hh7bw37tfO'
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));

app.get('/api/twitter/:name?', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var name = req.params.name;
  //console.log(twitter.getUser(name));
  //Callback functions

  console.log('before route...');
  var route = '/users/lookup.json?screen_name=' + name + ',dump';
  twit.get(route, {}, function(something, data) {
    console.log(data);
    return res.send(data);
  });

  //return res.send("test");
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
