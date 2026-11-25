const C='scf-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(caches.open(C).then(c=>c.match(r,{ignoreSearch:true}).then(m=>{const f=fetch(r).then(n=>{if(n&&n.ok)c.put(r,n.clone());return n}).catch(()=>m||(r.mode==='navigate'?c.match('index.html'):undefined));return m||f})))});
