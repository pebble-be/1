# Pebble v1.2 — 100 % Firebase (aucune donnée de démo)
1. console.firebase.google.com → Create project (Spark = gratuit).
2. Authentication → Sign-in method → **Email/Password** ON.
3. Firestore Database → Create → Rules → colle (inclut l'admin) :
```
rules_version='2';service cloud.firestore{match /databases/{d}/documents{
 function auth(){return request.auth!=null}
 function admin(){return auth()&&exists(/databases/$(d)/documents/admins/$(request.auth.uid))}
 match /admins/{a}{allow read:if auth()&&request.auth.uid==a}
 match /usernames/{u}{allow read:if true;allow create:if auth()&&request.resource.data.uid==request.auth.uid;allow delete:if auth()&&resource.data.uid==request.auth.uid}
 match /users/{id}{allow read:if auth();allow create:if request.auth.uid==id;
  match /tokens/{t}{allow read,write:if request.auth.uid==id}
  allow update:if (request.auth.uid==id&&!request.resource.data.diff(resource.data).affectedKeys().hasAny(['banned','verified']))||(admin()&&request.resource.data.diff(resource.data).affectedKeys().hasOnly(['banned','verified']));
  match /nlikes/{l}{allow read:if auth();allow write:if request.auth.uid==l}
  match /following/{o}{allow read:if auth();allow write:if request.auth.uid==id}
  match /followers/{f}{allow read:if auth();allow write:if request.auth.uid==f}
  match /notifs/{n}{allow read,update,delete:if request.auth.uid==id;allow create:if auth()&&request.resource.data.from==request.auth.uid}}
 match /posts/{p}{allow read:if auth();allow create:if request.auth.uid==request.resource.data.uid;allow delete:if request.auth.uid==resource.data.uid||admin();
  allow update:if auth()&&request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes']);
  match /comments/{c}{allow read:if auth();allow create:if request.auth.uid==request.resource.data.uid;allow delete:if admin()||request.auth.uid==resource.data.uid}}
 match /stories/{s}{allow read:if auth();allow create:if request.auth.uid==request.resource.data.uid;allow delete:if request.auth.uid==resource.data.uid||admin();allow update:if auth()&&request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes','views'])}
 match /chats/{c}{allow read:if request.auth.uid in resource.data.members;allow create,update:if request.auth.uid in request.resource.data.members;allow delete:if request.auth.uid in resource.data.members;
  match /messages/{m}{allow read,update,delete:if request.auth.uid in get(/databases/$(d)/documents/chats/$(c)).data.members;allow create:if request.auth.uid==request.resource.data.from&&request.auth.uid in get(/databases/$(d)/documents/chats/$(c)).data.members}}
 match /reports/{r}{allow create:if auth();allow read,update:if admin()}
 match /auditLogs/{l}{allow read,create:if admin()}
 match /config/{c}{allow read:if auth();allow write:if admin()}}}
```
4. Project settings → Your apps → Web → copie la config dans **fb.js**.
5. Lance en http : `npx serve .` → /login.html (ou `firebase deploy`).
6. **Premier admin** : crée ton compte via signup.html, copie ton UID (Authentication → Users), puis Firestore → Start collection `admins` → Document ID = ton UID (un champ quelconque, ex. role:"owner"). Ouvre ensuite /admin.html.

## Cloudinary (médias : posts, stories, photos de profil, images & vocaux du chat)
1. Dashboard → copie ton **Cloud name**.
2. Settings → Upload → Upload presets → Add upload preset → **Signing mode : Unsigned**, Folder `pebble`, limite de taille (ex. 10 MB), formats autorisés (jpg, png, webp, gif, webm, mp4, m4a, mp3).
3. Dans **fb.js** remplis `CLD={cloud:"...",preset:"..."}`. Ne mets JAMAIS ton API Secret dans le site.
Firestore ne garde que l'URL de l'image (plus de base64).

## Stories & Highlights
Stories : texte déplaçable (couleur/taille), musique (extraits 30 s via l'API publique iTunes, sans clé), 24 h, supprimables. Les stories restent en archive (collection `stories`) pour créer des Highlights (profil → Nouveau). Aucune règle supplémentaire nécessaire.

## Messagerie v2 : non-lus, réactions, saisie, alertes
- **Non-lus** : compteur par conversation (`chats/{id}.unread.{uid}`), remis à 0 à l'ouverture du chat. Badge sur l'icône Messages = somme réelle. Aucune règle supplémentaire.
- **Réactions** ❤️ 😂 👍 : appui long (mobile), double-clic ou clic droit (PC) sur un message. Une seule par personne (champ `rx.{uid}` du message) ; re-toucher la même la retire.
- **Saisie** : champ `typing.{uid}` du chat, rafraîchi toutes les 2,5 s pendant la frappe, remis à 0 à l'envoi.
- **Alertes** : île dynamique si le site est ouvert, notification système si l'onglet est en arrière-plan. Permission : lue depuis le navigateur ; la bannière n'apparaît que si l'état est « default », au plus 1 fois par semaine ; état réel visible dans Paramètres.
- **Push site fermé (optionnel)** : (1) plan Blaze ; (2) Console → Project settings → Cloud Messaging → Web Push certificates → *Generate key pair*, colle la clé dans `FCM_VAPID` (fb.js) ; (3) ajoute la règle `tokens` ci-dessus ; (4) `firebase.json` : `{"functions":{"source":"functions"}}` puis `cd functions && npm i && cd .. && firebase deploy --only functions`.

## v2.8 — Présence précise (Realtime Database) + stories/notes
1. Console → Build → **Realtime Database** → Create database (mode verrouillé) → onglet **Rules** → colle puis Publish :
```
{"rules":{"presence":{".read":"auth!=null","$uid":{".write":"auth!=null && auth.uid===$uid"}}}}
```
2. Copie l'URL affichée en haut de la page Realtime Database et mets-la dans `RTDB_URL` (fb.js) si elle diffère.
3. Re-publie aussi les règles **Firestore** de ce README (nouveautés : `stories` update likes/views, `users/{id}/nlikes`).
Sans Realtime Database, l'app marche comme avant (présence Firestore, moins précise).

## v3.1 — Supprimer un message, vue unique protégée
- **Supprimer** : appui long (mobile) / double-clic / clic droit (PC) sur n'importe quel message → icône corbeille. « Supprimer pour moi » = champ `del.{uid}` (cache le message de ton côté). « Supprimer pour tous » (tes messages seulement) = `dl:true`, contenu vidé, l'autre voit « Message supprimé ».
- **Vue unique** : à l'ouverture, l'URL/texte est effacé du document Firestore (`v:''`), seul le destinataire le voit en mémoire. Capture d'écran : détection **au mieux sur PC** (touche Impr écran, Win+Maj+S, Cmd+Maj+3/4/5). Les navigateurs mobiles n'exposent AUCUN événement de capture → impossible à détecter sur téléphone. Quand détecté : notification `screenshot` + île dynamique chez l'expéditeur, mention sous le message.
- Aucune nouvelle règle Firestore nécessaire. (Option plus stricte : limiter `delete` des messages à `request.auth.uid==resource.data.from` — mais « Supprimer la discussion » devrait alors passer par `del.{uid}`.)
