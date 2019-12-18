var CACHE_NAME = 'snake5-v0.1';
var urlsToCache = [
	'./',
	'index.html',
	'cake.js',
	'favicon.png',
	'icon.svg',
	'main.js',
	'myLib.js',
	'snake.js',
	'swipe.js',
	'tile.js'
];

self.addEventListener("install", function(event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('Opened cache ', CACHE_NAME);
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener("fetch", function(event){
	console.log(event);
	event.respondWith(
		caches.match(event.request)
			.then(function(response){

				// cache hit
				if(response){
					console.log("cached response: ", response);
					return response;
				}

				var fetchRequest = event.request.clone();

				return fetch(fetchRequest).then(function(response){
					if(response && response.status == 200 && response.type == "basic"){
						var toCache = response.clone();
						caches.open(CACHE_NAME)
							.then(function(cache){
								cache.put(event.request, toCache);
							});
					}
					return response;
				});
			}
		)
	);
});
