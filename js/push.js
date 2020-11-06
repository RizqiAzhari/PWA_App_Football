let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOYH7yHsMCA8_pexKhA-TVRiq3i7XWBDiCefAK6sznutIa_e1Olokgw9bWWfj71LcLbI0RC1yJkC_Q57yE1mu3Y",
   "privateKey": "47h2vuXTgN3yxzEEgpgWNbxkGYH-naAvAzpSvbIyYNQ"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eLFj93r0T5Q:APA91bEON5fst2cbeDi5G1EdgtW5lK1Sz5pMd4A2hi6jAuCPjyRnkdlDX7VMnywTXJ-XXbaIxRhpRyMRWzVzlButtdPTmGuGZCvaI5GLTSV1Q7fONUvthcpnEwceWko3IC0BPs4CyEA9",
   "keys": {
       "p256dh": "BNn+rascfkDjv+a37ADPpdpPqIsNJoMnXmleAWos6EN7DPtST08AH93BQ3gHOH2uijG+SkettlQS1GwIdK1Dz60=",
       "auth": "2irHaU+Lc1cqCuwdy0vvlQ=="
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '398234597286',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).catch(function(err){
   console.log(err);
});