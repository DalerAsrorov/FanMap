var express = require('express');
var app = express();
// var twitter = require('./server/app/twitter');
var lastfm = require('./server/app/lastfm');
var sentiment = require('./server/app/sentiment');
var twitter_api = require('./server/app/twitter');
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

app.get('/api/lastfm/top/:limit', function(req, res) {
  var limit = req.params.limit;
  lastfm.getTopArtists(limit, function(result) {
     return res.send(result);
  });
});

app.get('/api/lastfm/artist/:artist', function(req, res) {
  var artist = req.params.artist;
  console.log(artist);
  lastfm.getArtistInfo(artist, function(result) {
    return res.send(result);
  });
});

app.get('/api/twitter/:name?', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var name = req.params.name;

  var route = '/users/lookup.json?screen_name=' + name + ',dump';
  twit.get(route, {}, function(something, data) {
    return res.send(data);
  });
});

app.get('/api/twitter/tweets/:query', function(req, res) {
  var query = req.params.query;
  twitter_api.getTweets(query, function(result) {
    return res.send(result);
  });
});

app.get('/api/twitter/stream/:query', function(req, res) {
  var query = req.params.query;
  twitter_api.streamData(query, function(result) {
    //return res.send(result);
  });
});

app.get('/api/sentiment/keywords/:artist/:index', function(req, res) {
  var artist = req.params.artist;
  var index = req.params.index;
  sentiment.getKeywordsAnalysis(artist, index, function(result) {
    return res.send(result);
  });
});



var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
