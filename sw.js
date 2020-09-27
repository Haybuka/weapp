const staticCacheName = 'site-static-v1';
const assets = [
    '/',
    '/index.html',
    '/assets/scripts/app.js',
    '/assets/scripts/main.js',
    '/assets/css/main.css',
    '/assets/images/icon/app.png',
    '/assets/images/bg.webp',
    '/assets/scripts/axios/dist/axios.min.js',
    'https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,700;1,400&display=swap'
]
//install service worker
self.addEventListener('install', evt => {
    // console.log('installed Service worker ');
    //caches element or pages on install
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
            // console.log('cashing complete', assets);
        })
    )

});

//listen to service being activated
self.addEventListener('activate', evt => {
    // console.log('worker activated')
    evt.waitUntil(
        //to delete old caches so change reflect
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

//fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt)
    //return page on fetch,also is the  cache activation
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
})