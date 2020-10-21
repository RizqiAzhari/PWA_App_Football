var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BEVRcQ28m1fA8wN66tpYbstXWvIqbXl8d-kAr1P-t2fUkP9gG9MjrOT2_bCwvjklkX4MChYPG26FYN5EiLA0Ydk",
   "privateKey": "QvvrpTzXjxO6EsrdrAckJB0K5rES3nMmTLrtCnwbPAo"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/AAAAXLiht6Y:APA91bEm7tuRIcGXCI4CtpMDSg3JVGcpecQgcth9z7E1RUxvVYOIXgLAmwG--lhjqrCdjrHiaqLWxLeNxjMt2FvKa87-q_8fOpkiIytswTeKRKMLQEvxJm30O_0bVddebzj3nbVe9tV-",
   "keys": {
       "p256dh": "BLhWbewHymdBskdtUR+gLzWxO+ZZkdvOwTXEXc4UxHsYSALGfDuQ/ecLq0f7UtmtHZVi/qCwpI2L3tUc0BFvmYA=",
       "auth": "1xpmi4A3dhtS/cLyCv98Mg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
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