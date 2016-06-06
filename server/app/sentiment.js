var request = require("request");
var sentiment = require("sentiment");

module.exports = {
  getAnalysis: function(q, callback) {
    var artist = q;
    console.log('sentiments for ...', artist);
    var r1 = sentiment('Cats are stupid.');
    console.dir(r1);        // Score: -2, Comparative: -0.666

    var r2 = sentiment(" back in the day when I was young @GreenDay and @AFI played #nssn but some days I wish I was a kid again. ");
    console.dir(r2);

  }
};
