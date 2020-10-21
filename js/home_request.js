// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    return navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function () {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
  //requestPermission();
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

// REQUEST API UNTUK PERTAMA KALI
document.addEventListener("DOMContentLoaded", function () {
  cariKlub();
});

// Check for notification API
if ("Notification" in window) {
  requestPermission();
} else {
  console.log("Browser tidak mendukung notification api");
}

//push notification
function requestPermission() {
    Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }
      
      console.log('notif berhasil')
    });
}

if (('PushManager' in window)) {
  console.log('PushManager available');
  navigator.serviceWorker.getRegistration().then(function(registration) {
      registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: "BEVRcQ28m1fA8wN66tpYbstXWvIqbXl8d-kAr1P-t2fUkP9gG9MjrOT2_bCwvjklkX4MChYPG26FYN5EiLA0Ydk"
      }).then(function(subscribe) {
          console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
          console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
              null, new Uint8Array(subscribe.getKey('p256dh')))));
          console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
              null, new Uint8Array(subscribe.getKey('auth')))));
      }).catch(function(e) {
          console.error('Tidak dapat melakukan subscribe ', e.message);
      });
  });
}

//convert to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}