var C="elec-sync-v42",F=["./","index.html","mobile.html","entry.html","icon.png","favicon.png","favicon.ico","favicon-32.png","https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){
 return fetch(u,{mode:u.indexOf("http")===0?"no-cors":"same-origin",cache:"reload"}).then(function(r){return c.put(u,r)}).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C&&(k.indexOf("elec-sync-")===0||/^elec-v\d+$/.test(k))}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request,u=new URL(r.url);
 /* never touch the sync traffic (GitHub API) or anything that is not a plain GET */
 if(r.method!=="GET"||u.hostname==="api.github.com")return;
 e.respondWith((u.origin===self.location.origin?fetch(r.url,{cache:"no-cache"}):fetch(r)).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)});return res})
 .catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||(r.mode==="navigate"?caches.match("index.html"):Response.error())})}))});
