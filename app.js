const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const IC={home:'<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',compass:'<circle cx=12 cy=12 r=9 /><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',heart:'<path d="M12 20s-8-4.9-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.1-8 11-8 11z"/>',user:'<circle cx=12 cy=8 r=4 /><path d="M4 21a8 8 0 0 1 16 0"/>',sliders:'<path d="M4 7h9M19 7h1M4 17h1M11 17h9"/><circle cx=16 cy=7 r=2 /><circle cx=8 cy=17 r=2 />',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx=11 cy=11 r=7 /><path d="M20 20l-4-4"/>',send:'<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',mic:'<rect x=9 y=3 width=6 height=11 rx=3 /><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',photo:'<rect x=3 y=4 width=18 height=16 rx=3 /><circle cx=9 cy=10 r=1.5 /><path d="M21 16l-5-5-9 9"/>',smile:'<circle cx=12 cy=12 r=9 /><path d="M8 14a5 5 0 0 0 8 0M9 9.5h.01M15 9.5h.01"/>',sticker:'<path d="M5 4h14a1 1 0 0 1 1 1v9l-6 6H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM20 14h-5a1 1 0 0 0-1 1v5"/>',once:'<circle cx=12 cy=12 r=9 stroke-dasharray="3 3"/><path d="M10.5 9.5L12.5 8v8"/>',bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',repeat:'<path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>',back:'<path d="M15 5l-7 7 7 7"/>',ban:'<circle cx=12 cy=12 r=9 /><path d="M5.6 5.6l12.8 12.8"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',out:'<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>',mail:'<rect x=3 y=5 width=18 height=14 rx=3 /><path d="M3 7l9 6 9-6"/>',lock:'<rect x=5 y=11 width=14 height=10 rx=2 /><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',at:'<circle cx=12 cy=12 r=4 /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',dots:'<path stroke-width=3 d="M5 12h.01M12 12h.01M19 12h.01"/>',music:'<path d="M9 18V5l11-2v13"/><circle cx=6 cy=18 r=3 /><circle cx=17 cy=16 r=3 />',check:'<path d="M5 12l5 5 9-10"/>',person:'<circle cx=12 cy=8 r=4 /><path d="M4 21a8 8 0 0 1 16 0"/>'};
document.body.insertAdjacentHTML('afterbegin','<svg width=0 height=0 style=position:absolute>'+Object.entries(IC).map(([k,v])=>`<symbol id=i-${k} viewBox="0 0 24 24">${v}</symbol>`).join('')+'</svg>');
const ic=(n,c='')=>`<svg class="ic ${c}"><use href="#i-${n}"/></svg>`;
const hue=s=>[...s].reduce((a,c)=>a+c.charCodeAt(0),0)%360;
const av=(x,z=46)=>{const h=hue(x.username||'a');return`<div class=av style="width:${z}px;height:${z}px;font-size:${z/2.3}px;background:${x.photo?`url(${x.photo}) center/cover`:`linear-gradient(135deg,hsl(${h} 90% 62%),hsl(${(h+40)%360} 90% 50%))`}">${x.photo?'':esc((x.name||x.username||'?')[0].toUpperCase())}</div>`};
const ago=t=>{if(!t||!t.toMillis)return'';const s=(Date.now()-t.toMillis())/1000;return s<60?"à l'instant":s<3600?(s/60|0)+' min':s<86400?(s/3600|0)+' h':(s/86400|0)+' j'};
function sheet(h){const o=document.createElement('div');o.className='ov';o.innerHTML=`<div class=sheet>${h}</div>`;o.onclick=e=>{if(e.target===o)o.remove()};document.body.append(o);return o}
const URLRE=/\b(?:https?:\/\/|www\.)[^\s<>"]*[^\s<>".,;:!?)'\]]/gi;
const lnk=s=>{s=String(s??'');let o='',i=0,m;URLRE.lastIndex=0;while((m=URLRE.exec(s))){const u=m[0];o+=esc(s.slice(i,m.index))+`<a class=lk href="${esc(/^www/i.test(u)?'https://'+u:u)}" target=_blank rel="noopener noreferrer">${esc(u)}</a>`;i=m.index+u.length}return o+esc(s.slice(i))};
function lightbox(src){const o=document.createElement('div');o.className='ov';o.innerHTML=`<div style="text-align:center"><img src="${esc(src)}" style="max-width:94vw;max-height:78vh;border-radius:16px;display:block;margin:0 auto"><p style=margin:12px><a href="${esc(src)}" target=_blank rel=noopener style="color:#fff;font-weight:600">Ouvrir l'image ↗</a></p><button class=btn>Fermer</button></div>`;o.onclick=e=>{if(!e.target.closest('a'))o.remove()};document.body.append(o)}
let ME;const UC={};
const gu=async id=>UC[id]||(UC[id]={uid:id,...(await db.doc('users/'+id).get()).data()});
const byName=async n=>{const s=await db.doc('usernames/'+n).get();return s.exists?gu(s.data().uid):null};
const notify=(to,type,text,x)=>to==ME.uid?0:db.collection(`users/${to}/notifs`).add({type,from:ME.uid,fu:ME.username,text,seen:false,t:TS(),...(x||{})});
async function follow(id){const a=db.doc(`users/${ME.uid}/following/${id}`),on=(await a.get()).exists,b=db.doc(`users/${id}/followers/${ME.uid}`);if(on){await a.delete();await b.delete()}else{await a.set({t:TS()});await b.set({t:TS()});await notify(id,'follow','a commencé à vous suivre')}return!on}
async function tog(k,id,owner){const has=(ME[k]||[]).includes(id);await db.doc('users/'+ME.uid).update({[k]:has?FV.arrayRemove(id):FV.arrayUnion(id)});ME[k]=has?ME[k].filter(x=>x!=id):[...(ME[k]||[]),id];if(!has&&owner)notify(owner,k=='saved'?'save':'repost',k=='saved'?'a enregistré votre publication':'a republié votre publication');return!has}
function boot(page){navUI(page);if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});return new Promise(r=>auth.onAuthStateChanged(async u=>{if(!u||!u.emailVerified){if(u)await auth.signOut();return location.href='login.html'}const d=await db.doc('users/'+u.uid).get();if(!d.exists)return auth.signOut();if(d.data().banned){await auth.signOut();document.body.innerHTML='<div style="min-height:100vh;display:grid;place-items:center;text-align:center;font-family:system-ui;padding:24px"><div><h1>Compte suspendu</h1><p style=margin:10px>Ton compte a été suspendu par l\'équipe Pebble.</p><a href=login.html>Retour</a></div></div>';return}ME={uid:u.uid,...d.data()};UC[u.uid]=ME;shellData(page);r(ME)}))}
function navUI(p){const N=[['index','home','Accueil'],['discover','compass','Découvrir'],['messages','chat','Messages'],['notifications','heart','Notifications'],['profile','user','Profil'],['settings','sliders','Paramètres']];
 document.body.insertAdjacentHTML('afterbegin','<nav><b>Pebble</b>'+N.map(n=>`<a href="${n[0]}.html" class="${n[0]==p?'on':''}">${ic(n[1])}<span>${n[2]}</span>${n[0]=='notifications'?'<span class=dot id=nb style=display:none></span>':n[0]=='messages'?'<span class=dot id=mb style=display:none></span>':''}</a>`).join('')+'</nav>');
 document.body.insertAdjacentHTML('beforeend','<footer>© 2026 Mourad Project · Pebble v1.7</footer>');$('main').after($('footer'));
 const v0=$('#v');if(v0&&!v0.innerHTML)v0.innerHTML='<div class=sk></div><div class=sk style=height:240px></div><div class=sk></div>';
 const sr=document.createElement('script');sr.type='speculationrules';sr.textContent=JSON.stringify({prefetch:[{source:'document',where:{selector_matches:'nav a'},eagerness:'moderate'}]});document.head.append(sr);
 if(window.visualViewport)visualViewport.addEventListener('resize',()=>document.body.classList.toggle('kb',visualViewport.height<innerHeight*.75));
}
const NK={like:'likes',comment:'comments',follow:'followers',message:'messages'};
/* ===== Dynamic Island : une seule brique pour alertes, saisie et permissions ===== */
const ISL={};
function islx(id){const e=ISL[id];if(!e)return;clearTimeout(e.tm);delete ISL[id];e.el.classList.remove('on');setTimeout(()=>e.el.remove(),420)}
function island(o){const cid=o.low?'isls2':'isls';let box=document.getElementById(cid);if(!box){box=document.createElement('div');box.id=cid;box.className='isls';document.body.append(box)}
 const h=`<span class=ia>${o.u?av(o.u,34):`<span class=ib>${ic(o.k||'heart')}</span>`}</span><span class=it><b>${esc(o.t)}</b><span>${o.s||''}</span></span>${o.r||''}`;let e=ISL[o.id];
 if(e&&e.el.isConnected){e.o=o;e.el.innerHTML=h;e.el.classList.remove('bump');void e.el.offsetWidth;e.el.classList.add('bump')}
 else{const el=document.createElement(o.url||o.open?'a':'div');el.className='isl';el.innerHTML=h;e=ISL[o.id]={el,o};box.append(el);requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('on')));
  el.onclick=ev=>{const x=e.o;if(ev.target.closest('button'))return;if(x.open&&window.PBOPEN){ev.preventDefault();window.PBOPEN(x.open);islx(o.id)}}}
 if(o.url)e.el.href=o.url;clearTimeout(e.tm);if(o.ms)e.tm=setTimeout(()=>islx(o.id),o.ms);return e.el}
const clearOS=tag=>{try{navigator.serviceWorker&&navigator.serviceWorker.getRegistration().then(r=>r&&r.getNotifications({tag}).then(l=>l.forEach(x=>x.close())))}catch(e){}};
const NP=()=>'Notification' in window?Notification.permission:'unsupported';
async function alertNew(n,page){
 const msg=n.type=='message',url=msg?'messages.html?u='+encodeURIComponent(n.fu):'notifications.html';
 if(msg&&n.from==window.PBCHAT&&!document.hidden)return;
 let title='Pebble',body=n.fu+' '+n.text,tag=n.id;
 if(msg){let c=1;try{const d=await db.doc('chats/'+[ME.uid,n.from].sort().join('_')).get();c=Math.max(1,+(((d.data()||{}).unread||{})[ME.uid])||1)}catch(e){}
  title=n.fu;body=c==1?'1 nouveau message':c+' nouveaux messages';tag='msg-'+n.from;if(n.from==window.PBCHAT&&!document.hidden)return}
 if(document.hidden){if(NP()!='granted')return;const o={body:body+(msg&&n.pv?'\n'+n.pv:''),tag,renotify:true,icon:'icon.svg',data:{url}};
  const fb=()=>{try{new Notification(title,o)}catch(e){}};
  navigator.serviceWorker?navigator.serviceWorker.getRegistration().then(r=>r?r.showNotification(title,o):fb()).catch(fb):fb()}
 else{const u=await gu(n.from).catch(()=>null);island({id:msg?'m-'+n.from:n.id,u,k:'heart',t:msg?title:n.fu,s:esc(msg?body:n.text)+(msg&&n.pv?' · '+esc(n.pv):''),url,open:msg?n.from:0,ms:5500})}}
/* Permission : on lit TOUJOURS l'état réel du navigateur ; la bannière ne s'affiche que si l'état est « default », au plus 1 fois / semaine */
function askNotif(){if(NP()!='default'||Date.now()-(+localStorage.pbq||0)<6048e5)return;localStorage.pbq=Date.now();
 island({id:'perm',k:'heart',t:'Activer les alertes',s:'Messages, likes et abonnés en direct',ms:0,r:'<button class=ibtn id=pbY>Activer</button><button class=ix id=pbN>✕</button>'});
 $('#pbY').onclick=async()=>{islx('perm');try{await Notification.requestPermission()}catch(e){}initPush()};$('#pbN').onclick=()=>islx('perm');
 try{navigator.permissions.query({name:'notifications'}).then(p=>p.onchange=()=>{if(NP()!='default')islx('perm')})}catch(e){}}
/* Push réel (site fermé) : optionnel, nécessite FCM_VAPID dans fb.js + la Cloud Function (voir README) */
async function initPush(){if(typeof FCM_VAPID=='undefined'||!FCM_VAPID||!('serviceWorker' in navigator)||NP()!='granted')return;
 try{await new Promise((ok,ko)=>{if(window.firebase&&firebase.messaging)return ok();const s=document.createElement('script');s.src='https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js';s.onload=ok;s.onerror=ko;document.head.append(s)});
  const reg=await navigator.serviceWorker.register('sw.js');await navigator.serviceWorker.ready;
  const t=await firebase.messaging().getToken({vapidKey:FCM_VAPID,serviceWorkerRegistration:reg});
  if(t&&localStorage.pbtk!=t+ME.uid){await db.doc(`users/${ME.uid}/tokens/${t}`).set({t:TS(),ua:navigator.userAgent.slice(0,120)});localStorage.pbtk=t;localStorage.pbtu=ME.uid}}catch(e){}}
function shellData(page){let nN=0,nM=0;const T0=document.title,tt=()=>{document.title=(nN+nM?'('+(nN+nM)+') ':'')+T0},bd=(s,n)=>{const b=$(s);if(!b)return;const p=+b.dataset.n||0;b.dataset.n=n;b.textContent=n>99?'99+':n;b.style.display=n?'inline-block':'none';if(n>p){b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}};
 askNotif();initPush();
 const SK='pbal_'+ME.uid,kn=new Set(JSON.parse(sessionStorage[SK]||'[]')),base=!sessionStorage[SK];
 db.collection(`users/${ME.uid}/notifs`).where('seen','==',false).onSnapshot(s=>{
  const ok=n=>(ME.notif||{})[NK[n.type]]!==0&&!(ME.blocked||[]).includes(n.from),L=s.docs.map(d=>({id:d.id,ref:d.ref,...d.data()})).filter(ok),Nt=L.filter(n=>n.type!='message');
  nN=Nt.length;bd('#nb',nN);tt();
  const ms=n=>n.t&&n.t.toMillis?n.t.toMillis():0,fresh=L.filter(n=>!kn.has(n.id));
  fresh.forEach(n=>kn.add(n.id));sessionStorage[SK]=JSON.stringify([...kn].slice(-300));
  if(!shellData.b&&base){shellData.b=1;return}shellData.b=1;
  fresh.sort((x,y)=>ms(x)-ms(y)).forEach(n=>alertNew(n,page))});
 db.collection('chats').where('members','array-contains',ME.uid).onSnapshot(s=>{nM=s.docs.reduce((t,d)=>{const c=d.data();return t+((ME.blocked||[]).includes((c.members||[]).find(i=>i!=ME.uid))?0:+((c.unread||{})[ME.uid])||0)},0);bd('#mb',nM);tt()});
 db.doc('config/announcement').onSnapshot(d=>{const n=d.data();$('#an')?.remove();if(n&&n.on&&n.text)document.body.insertAdjacentHTML('afterbegin',`<div id=an style="background:linear-gradient(135deg,#ffd43b,#ff9d00);color:#201a08;padding:8px 14px;text-align:center;font-weight:600;position:sticky;top:0;z-index:9">${esc(n.text)}</div>`)})}
async function openPost(p){const o=sheet(''),B=o.firstChild;B.classList.add('w');
 const paint=async()=>{const[a,cs]=await Promise.all([gu(p.uid),db.collection(`posts/${p.id}/comments`).orderBy('t').get()]),lk=(p.likes||[]).includes(ME.uid),sv=(ME.saved||[]).includes(p.id),rp=(ME.reposted||[]).includes(p.id);
  B.innerHTML=`<div class=row>${av(a,38)}<a class=sp href="profile.html?u=${a.username}"><b>${esc(a.username)}</b></a>${p.uid==ME.uid?`<button id=dl>${ic('trash')}</button>`:''}</div><img class=p src="${p.img}"><div class=acts><button id=lk class="${lk?'red':''}">${ic('heart',lk?'f':'')}</button><button id=rp class="${rp?'red':''}">${ic('repeat')}</button><button id=sh>${ic('send')}</button><span class=sp></span><button id=sv>${ic('bookmark',sv?'f':'')}</button></div><b>${(p.likes||[]).length} j'aime</b><p style="margin:6px 0"><b>${esc(a.username)}</b> ${esc(p.cap)}</p>${cs.docs.map(d=>{const c=d.data();return`<p class=mut><b style="color:var(--tx)">${esc(c.username)}</b> ${esc(c.text)}</p>`}).join('')}<div class=row style="margin-top:10px"><input class=in id=cm placeholder="Ajouter un commentaire…"><button class=btn id=cs>${ic('send')}</button></div>`;
  B.querySelector('#lk').onclick=async()=>{await db.doc('posts/'+p.id).update({likes:lk?FV.arrayRemove(ME.uid):FV.arrayUnion(ME.uid)});p.likes=lk?p.likes.filter(x=>x!=ME.uid):[...(p.likes||[]),ME.uid];if(!lk)notify(p.uid,'like','a aimé votre publication');paint()};
  B.querySelector('#rp').onclick=async()=>{await tog('reposted',p.id,p.uid);paint()};B.querySelector('#sh').onclick=()=>{o.remove();shareSheet(p)};B.querySelector('#sv').onclick=async()=>{await tog('saved',p.id,p.uid);paint()};
  if(p.uid==ME.uid)B.querySelector('#dl').onclick=async()=>{await db.doc('posts/'+p.id).delete();o.remove()};
  B.querySelector('#cs').onclick=async()=>{const t=B.querySelector('#cm').value.trim();if(!t)return;await db.collection(`posts/${p.id}/comments`).add({uid:ME.uid,username:ME.username,text:t,t:TS()});notify(p.uid,'comment','a commenté : '+t.slice(0,60));paint()}};paint()}
function authPage(t,s,b,alt){document.body.innerHTML=`<div class=au><div class=hero><b style="font-size:28px">Pebble</b><div><h1>Partage.<br>Découvre.<br>Connecte-toi.</h1><p class=big style="margin-top:16px;font-size:18px;max-width:380px">Tes photos, tes amis et tes conversations, au même endroit.</p></div><small>© 2026 Mourad Project · Pebble v1.7</small></div><div class=form><div class=box><h2 style="font-size:32px">${t}</h2><p class=mut style="margin-bottom:8px">${s}</p>${b}<p class=mut style="text-align:center;margin-top:18px">${alt}</p></div></div></div>`}
const fld=(i,id,ph,ty='text')=>`<div class=fi>${ic(i)}<input class=in id=${id} type=${ty} placeholder="${ph}" autocapitalize=none></div>`;

async function withLoad(b,txt,fn,ms=2e4){const h=b.innerHTML;b.disabled=true;b.innerHTML='<span class=spin></span> '+txt;let to;try{return await Promise.race([fn(),new Promise((_,r)=>to=setTimeout(()=>r(Error("Délai dépassé : vérifie ta connexion, que Firestore Database est bien créée et que les règles sont publiées (voir README).")),ms))])}catch(x){const e=$('#er');if(e){e.className='err';e.textContent=x.message}}finally{clearTimeout(to);b.disabled=false;b.innerHTML=h}}

async function shareSheet(p){const F=await Promise.all((await db.collection(`users/${ME.uid}/following`).get()).docs.map(d=>gu(d.id)));
 const o=sheet(`<b>Partager</b><button class="btn g" id=sst style="margin-top:10px">${ic('plus')} Ajouter à ma story</button><p class=mut style="margin:14px 0 4px">Envoyer à</p>${F.map(u=>`<div class="item row" data-o=${u.uid} style=cursor:pointer>${av(u,38)}<b class=sp>${esc(u.username)}</b><span class=btn>Envoyer</span></div>`).join('')||'<p class=mut>Suis des comptes pour leur envoyer.</p>'}`);
 o.onclick=async e=>{if(e.target==o)return o.remove();
  if(e.target.closest('#sst')){await db.collection('stories').add({uid:ME.uid,img:p.img,t:TS()});o.firstChild.innerHTML='<b>Ajouté à ta story ✓</b>';setTimeout(()=>o.remove(),900)}
  const r=e.target.closest('[data-o]');if(r){const oid=r.dataset.o,id=[ME.uid,oid].sort().join('_');await db.doc('chats/'+id).set({members:[ME.uid,oid],last:'Publication partagée',t:TS()},{merge:true});await db.collection(`chats/${id}/messages`).add({from:ME.uid,k:'img',v:p.img,once:false,seen:false,t:TS()});notify(oid,'message','vous a partagé une publication');o.firstChild.innerHTML='<b>Envoyé ✓</b>';setTimeout(()=>o.remove(),900)}}}

/* ===== Stories & Highlights (style Instagram) ===== */
const SC=['#ffffff','#ffd43b','#ff3b5c','#34c759','#0a84ff','#000000'];
const frame=(it,inner='',sel=-1)=>`<div class=sf style="background:#000 url(${it.img}) center/cover">${(it.texts||[]).map((t,i)=>`<div class="sx${i==sel?' sel':''}" data-i=${i} style="left:${t.x}%;top:${t.y}%;color:${t.c};font-size:${t.s}cqw">${esc(t.t)}</div>`).join('')}${it.music?`<div class=sm>${ic('music')} ${esc(it.music.title)} · ${esc(it.music.artist)}</div>`:''}${inner}</div>`;
const hlNorm=a=>(a||[]).map(h=>h.items?h:{id:'l'+String(h.img||'').slice(-12),title:h.t||'À la une',cover:h.img,items:[{img:h.img,texts:[],music:null,t:null}]});
const hlAll=()=>hlNorm(ME.highlights),hlSave=async a=>{ME.highlights=a;await db.doc('users/'+ME.uid).update({highlights:a})},slim=it=>({img:it.img,texts:it.texts||[],music:it.music||null,t:it.t||null});

function musicPicker(cb){let au,tm,R=[];const stp=()=>{if(au){au.pause();au=null}};
 const o=sheet('<b>Musique</b><input class=in id=mq placeholder="Titre ou artiste…" style="margin:10px 0"><div id=ml style="max-height:48vh;overflow:auto"></div><p class=mut style=margin-top:8px>Extraits de 30 s · iTunes</p>');
 o.querySelector('#mq').oninput=e=>{clearTimeout(tm);tm=setTimeout(async()=>{const t=e.target.value.trim(),l=o.querySelector('#ml');if(!t)return;l.innerHTML='<p class=mut>Recherche…</p>';
  try{const j=await(await fetch('https://itunes.apple.com/search?media=music&entity=song&limit=15&term='+encodeURIComponent(t))).json();R=j.results.filter(x=>x.previewUrl);
   l.innerHTML=R.map((x,i)=>`<div class="item row"><img src="${x.artworkUrl60}" style="width:46px;height:46px;border-radius:10px"><div class=sp><b style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(x.trackName)}</b><span class=mut>${esc(x.artistName)}</span></div><button class="btn g" data-p=${i}>▶</button><button class=btn data-c=${i}>OK</button></div>`).join('')||'<p class=mut>Aucun résultat</p>'}catch(x){l.innerHTML='<p class=mut>Recherche indisponible.</p>'}},350)};
 o.onclick=e=>{const p=e.target.closest('[data-p]'),c=e.target.closest('[data-c]');if(p){stp();au=new Audio(R[+p.dataset.p].previewUrl);au.play().catch(()=>{})}
  if(c){stp();const x=R[+c.dataset.c];o.remove();cb({title:x.trackName,artist:x.artistName,url:x.previewUrl,art:x.artworkUrl60})}if(e.target==o){stp();o.remove()}}}

function storyEditor(done){const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.onchange=async()=>{if(inp.files[0])editor(await compress(inp.files[0],1080),done)};inp.click()}
function editor(img,done){const T=[];let sel=-1,music=null,au=null;const ov=document.createElement('div');ov.className='ov';ov.style.cssText='overflow-y:auto;place-items:start center';document.body.append(ov);
 const sa=()=>{if(au){au.pause();au=null}},g=id=>ov.querySelector(id);
 const draw=()=>{ov.innerHTML=`<div style="width:100%;max-width:440px;margin:0 auto"><div class=row style=margin-bottom:10px><button id=cx style=color:#fff>${ic('x')}</button><b class=sp style=text-align:center>Nouvelle story</b><button class=btn id=pub>Partager</button></div><div id=fw>${frame({img,texts:T,music},'',sel)}</div>
 <div class=tools><button class="btn g" id=ta>Aa Texte</button><button class="btn g" id=mu>${ic('music')} ${music?'Changer':'Musique'}</button>${music?'<button class="btn g" id=mr>Retirer ♪</button>':''}</div>
 ${sel>=0?`<div class=tools>${SC.map(c=>`<span class=sw2 data-c=${c} style="background:${c}"></span>`).join('')}<button class="btn g" id=sm1>A−</button><button class="btn g" id=sp1>A+</button><button class="btn r" id=td>${ic('trash')}</button></div>`:''}
 <div class=err id=er style="text-align:center;margin-top:8px"></div><p class=mut style="text-align:center">Glisse le texte pour le déplacer</p></div>`;wire()};
 const wire=()=>{const fr=g('#fw').firstChild;let dr=-1;
  g('#cx').onclick=()=>{sa();ov.remove()};
  g('#ta').onclick=()=>{const s=sheet('<b>Texte</b><input class=in id=tt maxlength=80 placeholder="Écris quelque chose…" style="margin:10px 0"><button class=btn id=tk>Ajouter</button>');s.querySelector('#tk').onclick=()=>{const t=s.querySelector('#tt').value.trim();s.remove();if(t){T.push({t,x:50,y:50,c:'#ffffff',s:7});sel=T.length-1;draw()}}};
  fr.onpointerdown=e=>{const t=e.target.closest('.sx');if(!t)return;dr=+t.dataset.i;sel=dr;fr.querySelectorAll('.sx').forEach(n=>n.classList.toggle('sel',+n.dataset.i==dr));fr.setPointerCapture(e.pointerId);e.preventDefault()};
  fr.onpointermove=e=>{if(dr<0)return;const r=fr.getBoundingClientRect(),x=Math.min(95,Math.max(5,(e.clientX-r.left)/r.width*100)),y=Math.min(95,Math.max(5,(e.clientY-r.top)/r.height*100));Object.assign(T[dr],{x,y});const n=fr.querySelector(`.sx[data-i="${dr}"]`);n.style.left=x+'%';n.style.top=y+'%'};
  fr.onpointerup=()=>{if(dr>=0){dr=-1;draw()}};
  ov.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{T[sel].c=b.dataset.c;draw()});
  const sz=d=>()=>{T[sel].s=Math.min(16,Math.max(4,T[sel].s+d));draw()};
  if(g('#sm1')){g('#sm1').onclick=sz(-1.5);g('#sp1').onclick=sz(1.5);g('#td').onclick=()=>{T.splice(sel,1);sel=-1;draw()}}
  g('#mu').onclick=()=>musicPicker(m=>{music=m;sa();au=new Audio(m.url);au.play().catch(()=>{});draw()});
  if(g('#mr'))g('#mr').onclick=()=>{music=null;sa();draw()};
  g('#pub').onclick=()=>withLoad(g('#pub'),'Envoi…',async()=>{const url=await up(img);await db.collection('stories').add({uid:ME.uid,img:url,texts:T,music,t:TS()});sa();ov.remove();done&&done()},6e4)};
 draw()}

function addToHL(it,done){const A=hlAll(),o=sheet(`<b>Ajouter aux Highlights</b>${A.map((h,i)=>`<div class="item row" data-i=${i} style=cursor:pointer><div class=av style="width:44px;height:44px;background:url(${h.cover}) center/cover"></div><b class=sp>${esc(h.title)}</b></div>`).join('')}<input class=in id=ht placeholder="Ou nouveau highlight : titre" style=margin-top:10px><button class=btn id=hn style=margin-top:8px>Créer</button>`);
 const fin=m=>{o.firstChild.innerHTML='<b>'+m+'</b>';setTimeout(()=>{o.remove();done&&done()},800)};
 o.onclick=async e=>{if(e.target==o){o.remove();return done&&done()}const r=e.target.closest('[data-i]');if(r){const a=hlAll();a[+r.dataset.i].items.push(slim(it));await hlSave(a);fin('Ajouté ✓')}};
 o.querySelector('#hn').onclick=async()=>{await hlSave([...hlAll(),{id:'h'+Date.now(),title:o.querySelector('#ht').value.trim()||'À la une',cover:it.img,items:[slim(it)]}]);fin('Highlight créé ✓')}}

async function newHL(done){const q=await db.collection('stories').where('uid','==',ME.uid).get(),S=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.t?.seconds||0)-(b.t?.seconds||0)),sel=[];
 const o=sheet(`<b>Nouveau highlight</b><p class=mut>Choisis des stories (archive incluse)</p><div class=grid style="margin:10px 0;max-height:46vh;overflow:auto">${S.map((s,i)=>`<div data-i=${i} style="background:url(${s.img}) center/cover;cursor:pointer;aspect-ratio:9/16;border:3px solid transparent;font-size:14px"></div>`).join('')||'<p class=mut style=grid-column:1/-1>Aucune story. Publie-en une depuis Accueil.</p>'}</div><input class=in id=ht placeholder="Titre"><div class=err id=er></div><button class=btn id=hc style=margin-top:8px>Créer</button>`);
 o.addEventListener('click',e=>{const t=e.target.closest('[data-i]');if(!t)return;const i=+t.dataset.i,k=sel.indexOf(i);k<0?sel.push(i):sel.splice(k,1);t.style.borderColor=k<0?'#ffc400':'transparent'});
 o.querySelector('#hc').onclick=()=>withLoad(o.querySelector('#hc'),'Création…',async()=>{if(!sel.length)throw Error('Choisis au moins une story');const items=sel.map(i=>slim(S[i]));await hlSave([...hlAll(),{id:'h'+Date.now(),title:o.querySelector('#ht').value.trim()||'À la une',cover:items[0].img,items}]);o.remove();done&&done()})}

function viewStories(items,u,o={}){let i=0,tm,au,t0=0,rem=5e3,ps=0;const D=5e3,ov=document.createElement('div');ov.className='ov';
 const clr=()=>{clearTimeout(tm);if(au){au.pause();au=null}},close=()=>{clr();ov.remove()},bar=()=>ov.querySelectorAll('.spb i b')[i];
 const next=()=>{i<items.length-1?(i++,show()):close()},prev=()=>{if(i>0)i--;show()};
 const run=ms=>{const b=bar();if(!b)return;b.style.transition=`width ${ms}ms linear`;requestAnimationFrame(()=>requestAnimationFrame(()=>b.style.width='100%'));clearTimeout(tm);tm=setTimeout(next,ms);t0=Date.now();rem=ms};
 const pause=()=>{if(ps)return;ps=1;clearTimeout(tm);const b=bar();if(b){b.style.transition='none';b.style.width=b.getBoundingClientRect().width/b.parentElement.getBoundingClientRect().width*100+'%'}rem=Math.max(300,rem-(Date.now()-t0));au&&au.pause()};
 const play=()=>{if(!ps)return;ps=0;run(rem);au&&au.play().catch(()=>{})};
 const after=()=>{if(!items.length)close();else{i=Math.min(i,items.length-1);show()}o.onChange&&o.onChange()};
 const menu=()=>{pause();const it=items[i],H=o.hl;const m=sheet(`<b>Options</b>${H?'<button class="btn g" id=m1>Retirer cette photo</button><button class="btn g" id=m2>Renommer le highlight</button><button class="btn r" id=m3>Supprimer le highlight</button>':'<button class="btn g" id=m1>Ajouter aux Highlights</button><button class="btn r" id=m3>Supprimer la story</button>'}<button class="btn g" id=m0>Annuler</button>`),q=s=>m.querySelector(s);
  q('#m0').onclick=()=>{m.remove();play()};
  q('#m1').onclick=async()=>{m.remove();if(!H)return addToHL(it,()=>play());const a=hlAll(),h=a.find(x=>x.id==H.id);h.items.splice(i,1);if(!h.items.length)a.splice(a.indexOf(h),1);else h.cover=h.items[0].img;await hlSave(a);items.splice(i,1);ps=0;after()};
  if(q('#m2'))q('#m2').onclick=()=>{m.remove();const s=sheet(`<b>Renommer</b><input class=in id=rn value="${esc(H.title)}" style="margin:10px 0"><button class=btn id=rk>Enregistrer</button>`);s.querySelector('#rk').onclick=async()=>{const a=hlAll();a.find(x=>x.id==H.id).title=s.querySelector('#rn').value.trim()||'À la une';await hlSave(a);s.remove();o.onChange&&o.onChange();play()}};
  q('#m3').onclick=async()=>{m.remove();if(H){await hlSave(hlAll().filter(x=>x.id!=H.id));close();o.onChange&&o.onChange()}else{await db.doc('stories/'+it.id).delete();items.splice(i,1);ps=0;after()}}};
 const show=()=>{clr();ps=0;const it=items[i];
  ov.innerHTML=`<div style=position:relative>${frame(it,`<div class=spb>${items.map((_,k)=>`<i><b style="width:${k<i?100:0}%"></b></i>`).join('')}</div><div class=shd>${av(u,32)}<span style=flex:1>${esc(u.username)} <span style="font-weight:400;opacity:.8">${ago(it.t)}</span></span>${o.own?`<button id=mo style=color:#fff>${ic('dots')}</button>`:''}<button id=cl style=color:#fff>${ic('x')}</button></div><div id=zl style="position:absolute;left:0;top:64px;bottom:0;width:32%"></div><div id=zr style="position:absolute;right:0;top:64px;bottom:0;width:68%"></div>`)}</div>`;
  if(it.music){au=new Audio(it.music.url);au.volume=.85;au.play().catch(()=>{})}
  run(D);ov.querySelector('#cl').onclick=close;const mo=ov.querySelector('#mo');if(mo)mo.onclick=menu;
  let dn=0,hd;const zd=()=>{dn=Date.now();hd=setTimeout(pause,220)},zu=f=>()=>{clearTimeout(hd);if(Date.now()-dn<220)f();else play()};
  const l=ov.querySelector('#zl'),r=ov.querySelector('#zr');l.onpointerdown=r.onpointerdown=zd;l.onpointerup=zu(prev);r.onpointerup=zu(next);l.onpointercancel=r.onpointercancel=()=>{clearTimeout(hd);play()}};
 document.body.append(ov);show()}
