// (c) Matthew Podwysocki
// Taken from : https://gist.github.com/808460

var http = require('http');
require('./rx-node/rx');
require('./rx-node/rx.aggregates');
require('./rx-node/rx_events');

var client = http.createClient(8080, 'data.tweetsentiments.com');

function getSentimentData(topic) {

	var request = client.request('GET', '/api/search.json?topic=' + topic, {'host': 'data.tweetsentiments.com'});

	var result = request.toObservable('response').SelectMany(function (response) {
		response.setEncoding('utf8');

		var data = '';
		var subject = new Rx.AsyncSubject();
	
		response.on('data', function (chunk) {
			data += chunk;
		});	
	
		response.on('error', function(error) {
			subject.OnError(error);
		});
	
		response.on('end', function() {
			var parsed = JSON.parse(data);
			subject.OnNext(parsed);
			subject.OnCompleted();
		});  
	});
  
	request.end(); 
	return result;
}

Rx.Observable.Interval(5000)
	.SelectMany(
		function () {
			var topic = process.argv[2];
			return getSentimentData(topic)
				.Select(function(sentimentData) {
					return { topic : topic, sentimentData : sentimentData };
				});
		})
	.Subscribe(
		function (result) {
			console.log('topic: ' + result.topic);
			console.log('sentiment index: ' + result.sentimentData.sentiment_index);
			console.log('positive: ' + result.sentimentData.positive);
			console.log('negative: ' + result.sentimentData.negative);
			console.log('neutral: ' + result.sentimentData.neutral);
			console.log('tweets with sentiment: ' + result.sentimentData.results.length);
		},
		function (error) {
			console.log('Error occurred: ' + error);
		});
