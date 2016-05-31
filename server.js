var express = require('express');
var app = express();
var twitter = require('./server/app/twitter');
var bodyParser = require('body-parser');


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
  return res.send("test");
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
