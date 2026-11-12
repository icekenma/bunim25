var C='b25-v4',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','lib/pdf.min.js','lib/pdf.worker.min.js'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
function netFirst(r,key){return fetch(r.url,{cache:'no-store',credentials:'same-origin'}).then(function(res){if(res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put(key||r,cp)})}return res}).catch(function(){return caches.match(key||r,{ignoreSearch:true})})}
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);
 if(u.hostname==='api.github.com')return;
 if(r.mode==='navigate'||(u.origin===location.origin&&/(index\.html|\/)$/.test(u.pathname))){e.respondWith(netFirst(r,'index.html'));return}
 if(u.origin===location.origin&&/\/(notes|meals)\/(index\.enc|meta\.json)$/.test(u.pathname)){e.respondWith(netFirst(r,u.pathname));return}
 if(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
  e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){if(res.ok||res.type==='opaque'){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res})}))}
});
