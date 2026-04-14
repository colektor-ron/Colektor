// ColeKtoR SW v60 - force full cache clear
const CACHE = 'colektor-v60';
const ASSETS = ['./index.html','./manifest.json','./icon.png','./logo.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => { console.log('Deleting cache:', k); return caches.delete(k); }))
    )
  );
  self.clients.claim(); // Take control of all pages immediately
});

self.addEventListener('fetch', e => {
  // Network first - always try to get fresh content
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
