'use strict';

const cacheStatic = [
    './',
    './style.css',
    './app.js'

]
debugger;
let cacheName = 'cacheStatic-v1';
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(cacheStatic);
      })
  );
});

// self.addEventListener('fetch' ,event => {
//   debugger;
//      console.log('fetch');
//     // const req = event.request;
//     // const url = new URL(req.url);
//     // if(url.origin = location.origin){
//     //     event.respondWith(
//     //         caches.match(event.request)
//     //           .then(response => {
//     //             // Cache hit - return response
//     //             if (response) {
//     //               return response;
//     //             }
//     //             return fetch(event.request);
//     //           }
//     //         )
//     //       );
//     // } else {
//     //     event.respondWith(
//     //         caches.match(event.request)
//     //           .then(response => {
//     //             // Cache hit - return response
//     //             if (response) {
//     //               return response;
//     //             }
//     //             return fetch(event.request);
//     //           }
//     //         )
//     //       );
//     // }

//     event.respondWith(
//         caches.match(event.request)
//           .then(function(response) {
//             // Cache hit - return response
//             if (response) {
//               return response;
//             }
    
            
//             var fetchRequest = event.request.clone();
    
//             return fetch(fetchRequest).then(
//               function(response) {
//                 // Check if we received a valid response
//                 if(!response || response.status !== 200 || response.type !== 'basic') {
//                   return response;
//                 }
    

//                 let responseToCache = response.clone();
//                 const new_currencyDb = new_currencyDb-v1;
//                 caches.open(new_currencyDb)
//                   .then(function(cache) {
//                     cache.put(event.request, responseToCache);
//                   });
    
//                 return response;
//               }
//             );
//           })
//         );
    
// } )


self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const dynamicCache = await caches.open('currencyDynamic');
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || await caches.match('');
  }
}

