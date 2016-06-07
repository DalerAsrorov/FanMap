var request = require("request");
var sentiment = require("sentiment");
var twitter = require('twitter');
var twit = new twitter({
  consumer_key: 'zIyyQzO6yZnOiC0jOniFMCBCd',
  consumer_secret: '3RamgYGhyDpT8p8eNqt45V8LAA052rF6sSQaBfSOvvbWlg1leu',
  access_token_key: '2243402142-omEJRTjWQuH1fd0pv8zdw16xL08NHgUmzltCMgh',
  access_token_secret: 'clmO3BcIdFogEC36ylYsVYdpc8VEPY1yEB6hh7bw37tfO'
});
var keyword_extractor = require("keyword-extractor");


module.exports = {
  getKeywordsAnalysis: function(q, index, callback) {
    var index = index;

    if(!index)
      index = 20;

    var keywordsCollection = [];
    twit.get('search/tweets', {q: q, lang: 'en', count: 100, result_type: 'mixed'}, function(error, tweets, response) {
      var arrayOfTweets = tweets.statuses;
      for(var i = 0; i < arrayOfTweets.length; i++) {
        var extractionResult = keyword_extractor.extract(arrayOfTweets[i].text, {
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                          });
        keywordsCollection.push(extractionResult);
        if(i === arrayOfTweets.length - 1) {
          console.log('reached');
          var hugeString = stringify(keywordsCollection);
          var statsMap = matchWords(hugeString);
          var sortedStats = sortMap(statsMap);
          var cutSortedStats = sortedStats.slice(sortedStats.length - index);
          var transformArray = transformToJSON(cutSortedStats);
          var d3Cloud = transformToD3(cutSortedStats);

          var json = {
            "query" : {
              "q": q,
              "index" : index,
              "description": "Get top [index] keywords. "
            },
            "date" : {
              "utc": new Date().getTime(),
              "local_formatted":  new Date().toLocaleString()
            },
            "data" : {
              map: transformArray,
              d3Cloud: d3Cloud,
              totalOccurencesCount: getTotalCount(transformArray)
            }
          }
          callback(json);
        }
      }

      function transformToD3(array) {
        var newArray = [];
        var totalCount = getTotalCountInit(array);

        for(var i = 0; i < array.length; i++) {
          var word = array[i][0].toString();
          var count = array[i][1];
          var percent = (count * 100) / totalCount;

          var obj = {
            "text" : word,
            "size": count
          };
          newArray.push(obj);
        }
        newArray = newArray.reverse();
        return newArray;
      }

      function getTotalCount(array) {
        var total = 0;
        for(var i = 0; i < array.length; i++) {
          total += array[i]['occurenceValue'];
        }

        return total;
      }

      function getTotalCountInit(array) {
        var total = 0;
        for(var i = 0; i < array.length; i++) {
          total += array[i][1];
        }
        return total;
      }

      function transformToJSON(array) {
        var newArray = [];
        var totalCount = getTotalCountInit(array);

        for(var i = 0; i < array.length; i++) {
          var word = array[i][0].toString();
          var count = array[i][1];
          var percent = (count * 100) / totalCount;

          var obj = {
            "word" : word,
            "occurenceValue": count,
            "percent": percent.toFixed(3)
          };
          newArray.push(obj);
        }
        newArray = newArray.reverse();
        return newArray;
      }

      function stringify(arrayOfArrays) { // array of arrays
        var stringSum = "";
        arrayOfArrays.forEach(function(array) {
          var temp = array.join(' ');
          stringSum += temp;
        });

        return stringSum;
      }

      function sortMap(map) {
        var sortable = [];
        for (var obj in map)
              sortable.push([obj, map[obj]])
        sortable.sort(function(a, b) {return a[1] - b[1]})
        return sortable;
      }

      function matchWords(string) {
        /* Below is a regular expression that finds alphanumeric characters
            Next is a string that could easily be replaced with a reference to a form control
           Lastly, we have an array that will hold any words matching our pattern */
        var pattern = /\w+/g,
            string = string,
            matchedWords = string.match( pattern );

        /* The Array.prototype.reduce method assists us in producing a single value from an
           array. In this case, we're going to use it to output an object with results. */
        var counts = matchedWords.reduce(function ( stats, word ) {

            /* `stats` is the object that we'll be building up over time.
               `word` is each individual entry in the `matchedWords` array */
            if ( stats.hasOwnProperty( word ) ) {
                /* `stats` already has an entry for the current `word`.
                   As a result, let's increment the count for that `word`. */
                stats[ word ] = stats[ word ] + 1;
            } else {
                /* `stats` does not yet have an entry for the current `word`.
                   As a result, let's add a new entry, and set count to 1. */
                stats[ word ] = 1;
            }

            /* Because we are building up `stats` over numerous iterations,
               we need to return it for the next pass to modify it. */
            return stats;

            }, {} );

            return counts;
        }
    });

  },
  getGeoAnalysis: function(q, callback) {
    // var artist = q;
    // console.log('sentiments for ...', artist);
    // var r1 = sentiment('Cats are stupid.');
    // console.dir(r1);        // Score: -2, Comparative: -0.666
    //
    // var r2 = sentiment(" back in the day when I was young @GreenDay and @AFI played #nssn but some days I wish I was a kid again. ");
    // console.dir(r2);
  }
};
