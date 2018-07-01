const cacheStatic = [
    './',
    './style.css',
    './app.js'

]

self.addEventListener('ínstall', event=>{
    // console.log('ínstall');
    // const dbCache = idb.open('currencyDb', 1);
    // dbCache.addAll(cacheStatic);

      // Perform install steps
  event.waitUntil(
    caches.open('currencyDb', 1)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(cacheStatic);
      })
  );
})

self.addEventListener('fetch' ,event=>{
    // console.log('fetch');
    // const req = event.request;
    // const url = new URL(req.url);
    // if(url.origin = location.origin){
    //     event.respondWith(
    //         caches.match(event.request)
    //           .then(response => {
    //             // Cache hit - return response
    //             if (response) {
    //               return response;
    //             }
    //             return fetch(event.request);
    //           }
    //         )
    //       );
    // } else {
    //     event.respondWith(
    //         caches.match(event.request)
    //           .then(response => {
    //             // Cache hit - return response
    //             if (response) {
    //               return response;
    //             }
    //             return fetch(event.request);
    //           }
    //         )
    //       );
    // }

    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
    
            
            var fetchRequest = event.request.clone();
    
            return fetch(fetchRequest).then(
              function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }
    

                var responseToCache = response.clone();
    
                caches.open(new_currencyDb)
                  .then(function(cache) {
                    cache.put(event.request, responseToCache);
                  });
    
                return response;
              }
            );
          })
        );
    
} )

