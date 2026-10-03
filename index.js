// Push réel (site fermé) : envoie une notification FCM à chaque nouveau doc users/{uid}/notifs/{id}
// Nécessite le plan Blaze. Déploiement : firebase deploy --only functions
const functions=require('firebase-functions/v1'),admin=require('firebase-admin');admin.initializeApp();
const K={like:'likes',comment:'comments',follow:'followers',message:'messages'};
exports.pushNotif=functions.firestore.document('users/{uid}/notifs/{nid}').onCreate(async(snap,ctx)=>{
 const n=snap.data(),uid=ctx.params.uid,db=admin.firestore();
 const me=(await db.doc('users/'+uid).get()).data()||{};
 if((me.notif||{})[K[n.type]]===0||(me.blocked||[]).includes(n.from))return;
 const tk=await db.collection(`users/${uid}/tokens`).get();if(tk.empty)return;
 let title='Pebble',body=`${n.fu} ${n.text}`,url='notifications.html',tag=ctx.params.nid;
 if(n.type==='message'){
  const c=(await db.doc('chats/'+[uid,n.from].sort().join('_')).get()).data()||{},k=Math.max(1,+((c.unread||{})[uid])||1);
  title=n.fu;body=k===1?'1 nouveau message':k+' nouveaux messages';if(n.pv)body+='\n'+n.pv;
  url='messages.html?u='+encodeURIComponent(n.fu);tag='msg-'+n.from}
 const tokens=tk.docs.map(d=>d.id);
 const r=await admin.messaging().sendEachForMulticast({tokens,data:{title,body,url,tag},webpush:{headers:{Urgency:'high',TTL:'3600'}}});
 const bad=[];r.responses.forEach((x,i)=>{if(!x.success&&/not-registered|invalid-argument|invalid-registration/.test((x.error&&x.error.code)||''))bad.push(tokens[i])});
 await Promise.all(bad.map(t=>db.doc(`users/${uid}/tokens/${t}`).delete()));
});
