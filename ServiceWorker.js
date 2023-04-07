const cacheName = "SingularityLab-PepsiRun-0.0.1";
const contentToCache = [
    "Build/PepsiRun_0-0-1_2023-04-07_002.loader.js",
    "Build/PepsiRun_0-0-1_2023-04-07_002.framework.js.unityweb",
    "Build/PepsiRun_0-0-1_2023-04-07_002.data.unityweb",
    "Build/PepsiRun_0-0-1_2023-04-07_002.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
