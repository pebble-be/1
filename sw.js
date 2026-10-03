self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
/* Push serveur (FCM, site fermé) : données seules -> on affiche nous-mêmes, sauf si Pebble est déjà visible */
self.addEventListener('push',e=>{let d={};try{const j=e.data.json();d=j.data||j.notification||j}catch(x){}
e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{if(l.some(c=>c.visibilityState=='visible'))return;
return self.registration.showNotification(d.title||'Pebble',{body:d.body||'',tag:d.tag||undefined,renotify:!!d.tag,icon:'icon.svg',data:{url:d.url||'notifications.html'}})}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=new URL((e.notification.data&&e.notification.data.url)||'notifications.html',self.registration.scope).href;
e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{const c=l[0];if(c){return c.focus().then(()=>c.navigate&&c.navigate(u)).catch(()=>clients.openWindow(u))}return clients.openWindow(u)}))});
