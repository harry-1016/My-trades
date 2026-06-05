const CACHE = 'betlog-v2';
const BASE = '/My-trades';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c =>
    c.addAll([
      BASE + '/',
      BASE + '/index.html',
      BASE + '/manifest.json',
      BASE + '/logo.svg',
      BASE + '/icon-192.png',
      BASE + '/icon-512.png'
    ])
  ));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
