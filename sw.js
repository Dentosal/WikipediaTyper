var CACHE_VERSION = "1.0";
var CACHE_NAME = 'WT-CACHE-'+CACHE_VERSION;
var urlsToCache = [
    'index.html',
    'main.css',
    'main.js',
    'terminal.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener('activate', function(event) {
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit -> return response
            if (false && /* <-- cache off */ response) {
                return response;
            }

            // Not in cache -> fetch
            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(
                function(response) {
                    // Check if we received a valid response
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

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
