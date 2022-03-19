/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-1e34e03';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./toman_a_lesni_panna_001.html","./toman_a_lesni_panna_002.html","./toman_a_lesni_panna_003.html","./toman_a_lesni_panna_004.html","./toman_a_lesni_panna_005.html","./toman_a_lesni_panna_006.html","./toman_a_lesni_panna_007.html","./toman_a_lesni_panna_008.html","./toman_a_lesni_panna_009.html","./toman_a_lesni_panna_010.html","./toman_a_lesni_panna_011.html","./toman_a_lesni_panna_012.html","./toman_a_lesni_panna_013.html","./toman_a_lesni_panna_014.html","./toman_a_lesni_panna_015.html","./toman_a_lesni_panna_016.html","./toman_a_lesni_panna_017.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/01.jpg","./resources/02.jpg","./resources/03.jpg","./resources/04.jpg","./resources/05.jpg","./resources/06.jpg","./resources/07.jpg","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
