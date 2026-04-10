const CACHE='colektor-v126';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
    .then(()=>self.clients.matchAll().then(clients=>clients.forEach(c=>c.postMessage({type:'RELOAD'}))))
  );
});
self.addEventListener('fetch',e=>{
  // Always network first, no caching
  e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request);}));
});
