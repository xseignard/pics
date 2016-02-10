(function(Pusher) {

// var pusher = new Pusher({
// 	appId: '174974',
// 	key: 'a737aa345b698be6f05e',
// 	secret: '586bb730ecb6a284fd64'
// });

var pusher = new Pusher('a737aa345b698be6f05e');

pusher.connection.bind('connected', function() {
	console.log('connected');
});

var channel = pusher.subscribe('test');
channel.bind('pusher:subscription_succeeded', function() {
	var triggered = channel.trigger('client-take_picture', {});
});

channel.bind('result', function(data) {
	console.log(data);
});

})(Pusher);