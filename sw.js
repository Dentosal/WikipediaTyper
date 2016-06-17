var CACHE_VERSION = "1.0";
var CACHE_NAME = 'SW_TEST_CACHE-'+CACHE_VERSION;
var urlsToCache = [
    'index.html',
    'main.css',
    'main.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
    console.log("OK?");
});

self.addEventListener('fetch', function(event) {
    console.log("FETCH", event.request);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (false && /* <-- cache off */ response) {
                return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    // Check if we received a valid response
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have 2 stream.
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );
        })
    );
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        // ok
    }).catch(function(err) {
        alert("registration failed?");
    });
}
