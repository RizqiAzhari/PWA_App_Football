importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/klub_info.html', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/favorit.html', revision: '1' },
  { url: '/css/klub-detail.css', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/pre-loader.css', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/home_request.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/info_request.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/push.js', revision: '1' },
  { url: '/js/script.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/app-football-small.png', revision: '1' },
  { url: '/app-football.png', revision: '1' },
  { url: '/kisspng-spain-national-football-team-fifa-world-cup-spain-spain-football-team-5b14fff75eaf03.5747164315281029033878.png', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' }
], {
//ignoreURLParametersMatching: [/.*/]  untuk workbox versi 4 keatas
ignoreUrlParametersMatching: [/.*/]
});

// menyimpan cache untuk folder pages
workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-app'
    })
);

// Menyimpan cache untuk fetch data api football
workbox.routing.registerRoute(
  /^https:\/\/(api|crest)\.football-data\.org/ ,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data-api',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Menyimpan cache dari CSS Materialize
workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'materialize-icons',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'materialize-icons-dynamic',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'app-football.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Football-App', options)
  );
});
