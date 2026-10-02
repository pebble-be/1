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
  allow update:if (request.auth.uid==id&&!request.resource.data.diff(resource.data).affectedKeys().hasAny(['banned','verified']))||(admin()&&request.resource.data.diff(resource.data).affectedKeys().hasOnly(['banned','verified']));
  match /following/{o}{allow read:if auth();allow write:if request.auth.uid==id}
  match /followers/{f}{allow read:if auth();allow write:if request.auth.uid==f}
  match /notifs/{n}{allow read,update,delete:if request.auth.uid==id;allow create:if auth()&&request.resource.data.from==request.auth.uid}}
 match /posts/{p}{allow read:if auth();allow create:if request.auth.uid==request.resource.data.uid;allow delete:if request.auth.uid==resource.data.uid||admin();
  allow update:if auth()&&request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes']);
  match /comments/{c}{allow read:if auth();allow create:if request.auth.uid==request.resource.data.uid;allow delete:if admin()||request.auth.uid==resource.data.uid}}
 match /stories/{s}{allow read:if auth();allow create:if request.auth.uid==request.resource.data.uid;allow delete:if request.auth.uid==resource.data.uid||admin()}
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
