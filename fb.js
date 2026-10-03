// Firebase Console > Project settings > Your apps > Web app > copie la config ici
const FB={apiKey:"AIzaSyB-KSkINkIX3ZZS1pz-6MIHwSgmeouYOps",authDomain:"kivo-3b86b.firebaseapp.com",projectId:"kivo-3b86b",storageBucket:"kivo-3b86b.firebasestorage.app",messagingSenderId:"1023991218454",appId:"1:1023991218454:web:f59f35f7ca948022d6d037"};
if(FB.apiKey.startsWith('YOUR')){document.body.innerHTML='<div style="padding:30px;font-family:system-ui"><h2>Config Firebase manquante</h2><p>Ouvre fb.js et colle ta config (README.md).</p></div>';throw Error('fb.js not configured')}
firebase.initializeApp(FB);const auth=firebase.auth(),db=firebase.firestore();db.settings({experimentalAutoDetectLongPolling:true,merge:true});const FV=firebase.firestore.FieldValue,TS=()=>FV.serverTimestamp();
const compress=(f,m=900)=>new Promise(r=>{const i=new Image();i.onload=()=>{const k=Math.min(1,m/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL('image/jpeg',.72))};i.src=URL.createObjectURL(f)});

// 2) Cloudinary : Dashboard > cloud name ; Settings > Upload > Upload presets > Add (Signing mode = Unsigned)
const CLD={cloud:"tq7hukef",preset:"pebble_unsigned"};
async function up(file){if(CLD.cloud.startsWith('YOUR')||CLD.preset.startsWith('YOUR'))throw Error('Cloudinary : il manque le upload preset (unsigned) dans fb.js → CLD.preset.');const f=new FormData();f.append('file',file);f.append('upload_preset',CLD.preset);const r=await fetch(`https://api.cloudinary.com/v1_1/${CLD.cloud}/auto/upload`,{method:'POST',body:f}),j=await r.json();if(!r.ok)throw Error('Cloudinary : '+(j.error?.message||r.status));return j.resource_type=='image'?j.secure_url.replace('/upload/','/upload/f_auto,q_auto/'):j.secure_url}

// (Optionnel) Push même site fermé : Console > Project settings > Cloud Messaging > Web Push certificates > Generate key pair, colle la clé publique ici. Voir README.
const FCM_VAPID="";

// (Optionnel) Musique complète : clé API Audius gratuite (api.audius.co/plans) pour de meilleures limites. Peut rester vide.
const AUDIUS_KEY="";
